import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import type { DecodedIdToken } from 'firebase-admin/auth';
import { AuditService } from './audit/audit.service.js';
import { AuthorizationService } from './authorization.service.js';
import { FirebaseAdminService } from './firebase/firebase-admin.service.js';
import { RecordConsentsDto } from './dto/record-consents.dto.js';
import { StartSessionDto } from './dto/start-session.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { type IssuedSession, type RequestMeta, SessionService } from './session/session.service.js';
import { PrismaService } from '../common/prisma/prisma.service.js';
import type { AuthContext } from '../common/types/auth.js';

const PUBLIC_USER_SELECT = {
  id: true,
  email: true,
  phone: true,
  firstName: true,
  lastName: true,
  profilePhotoUrl: true,
  preferredLanguage: true,
  timezone: true,
  currency: true,
  status: true,
} as const;

type PublicUser = {
  [K in keyof typeof PUBLIC_USER_SELECT]: K extends 'id' ? string : string | null;
};

type UserWithRoles = {
  id: string;
  email: string | null;
  phone: string | null;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string | null;
  preferredLanguage: string;
  timezone: string;
  currency: string;
  status: string;
  cityId: string;
  userRoles: Array<{ role: { code: string; isActive: boolean } }>;
  helper: { id: string } | null;
  _count?: { consents: number };
};

export type SessionResponse = {
  accessToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
  user: PublicUser;
  roles: string[];
  permissions: string[];
  onboardingComplete: boolean;
};

export type SessionWithRefresh = SessionResponse & { refreshToken: string };

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebase: FirebaseAdminService,
    private readonly sessions: SessionService,
    private readonly authorization: AuthorizationService,
    private readonly audit: AuditService,
  ) {}

  private pickPublicUser(user: UserWithRoles): PublicUser {
    const picked: Record<string, unknown> = {};
    for (const key of Object.keys(PUBLIC_USER_SELECT)) {
      picked[key] = (user as unknown as Record<string, unknown>)[key];
    }
    return picked as PublicUser;
  }

  private async loadUser(userId: string): Promise<UserWithRoles> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: { include: { role: { select: { code: true, isActive: true } } } },
        helper: { select: { id: true } },
        _count: { select: { consents: { where: { accepted: true } } } },
      },
    });
    if (!user) throw new UnauthorizedException({ code: 'USER_NOT_FOUND', message: 'User no longer exists' });
    return user;
  }

  private activeRoles(user: UserWithRoles): string[] {
    return user.userRoles
      .filter((assignment) => assignment.role.isActive)
      .map((assignment) => assignment.role.code);
  }

  private onboardingComplete(user: UserWithRoles): boolean {
    return (user._count?.consents ?? 0) > 0;
  }

  private async defaultLocation(): Promise<{ countryId: string; cityId: string; timezone: string; currency: string }> {
    const country = await this.prisma.country.findFirst({
      where: { isActive: true },
      orderBy: { isoCode: 'asc' },
    });
    if (!country) {
      throw new ServiceUnavailableException({
        code: 'PLATFORM_NOT_INITIALIZED',
        message: 'No active country configured; run the database seed',
      });
    }
    const city = await this.prisma.city.findFirst({
      where: { countryId: country.id, status: 'ACTIVE' },
      orderBy: { name: 'asc' },
    });
    if (!city) {
      throw new ServiceUnavailableException({
        code: 'PLATFORM_NOT_INITIALIZED',
        message: 'No active city configured; run the database seed',
      });
    }
    return { countryId: country.id, cityId: city.id, timezone: country.timezoneDefault, currency: country.currencyCode };
  }

  private async ensureRole(userId: string, roleCode: string): Promise<void> {
    const role = await this.prisma.role.findUnique({ where: { code: roleCode } });
    if (!role || !role.isActive) {
      throw new ServiceUnavailableException({
        code: 'PLATFORM_NOT_INITIALIZED',
        message: `Role ${roleCode} is missing; run the database seed`,
      });
    }
    await this.prisma.userRole.upsert({
      where: { userId_roleId: { userId, roleId: role.id } },
      update: {},
      create: { userId, roleId: role.id },
    });
  }

  private async createUser(decoded: DecodedIdToken): Promise<UserWithRoles> {
    const location = await this.defaultLocation();
    const trimmedName = decoded.name?.trim() ?? '';
    const nameParts = trimmedName ? trimmedName.split(/\s+/) : [];
    const firstName = nameParts[0] ?? 'New';
    const lastName = nameParts.slice(1).join(' ') || '';

    const now = new Date();
    const user = await this.prisma.user.create({
      data: {
        firebaseUid: decoded.uid,
        phone: decoded.phone_number ?? null,
        email: decoded.email ?? null,
        firstName,
        lastName,
        countryId: location.countryId,
        cityId: location.cityId,
        timezone: location.timezone,
        currency: location.currency,
        status: 'ACTIVE',
        phoneVerifiedAt: decoded.phone_number ? now : null,
        emailVerifiedAt: decoded.email && decoded.email_verified ? now : null,
      },
    });
    return this.loadUser(user.id);
  }

  private async provisionHelper(user: UserWithRoles, meta: RequestMeta): Promise<void> {
    try {
      await this.prisma.helper.create({
        data: {
          userId: user.id,
          firstName: user.firstName || 'New',
          lastName: user.lastName || '',
          dateOfBirth: new Date(Date.UTC(2000, 0, 1)),
          gender: 'prefer_not_to_say',
          bio: '',
          experienceYears: 0,
          primaryCityId: user.cityId,
          status: 'ACTIVE',
        },
      });
    } catch (error) {
      // a concurrent sign-up may have provisioned the row already
      if ((error as { code?: string }).code !== 'P2002') throw error;
      return;
    }
    await this.audit.record({
      actorUserId: user.id,
      action: 'auth.helper.provisioned',
      entityType: 'helper',
      entityId: user.id,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  }

  private async resolveFirebaseUser(decoded: DecodedIdToken): Promise<UserWithRoles> {
    const byUid = await this.prisma.user.findUnique({ where: { firebaseUid: decoded.uid } });
    if (byUid) return this.loadUser(byUid.id);

    if (decoded.phone_number) {
      const byPhone = await this.prisma.user.findUnique({ where: { phone: decoded.phone_number } });
      if (byPhone) {
        await this.prisma.user.update({
          where: { id: byPhone.id },
          data: {
            firebaseUid: decoded.uid,
            phoneVerifiedAt: new Date(),
            ...(decoded.email && !byPhone.email ? { email: decoded.email } : {}),
          },
        });
        return this.loadUser(byPhone.id);
      }
    }
    return this.createUser(decoded);
  }

  private async touchDevice(userId: string, dto: StartSessionDto): Promise<string | null> {
    if (!dto.deviceId) return null;
    if (!dto.platform) {
      throw new BadRequestException({
        code: 'PLATFORM_REQUIRED',
        message: 'platform is required when deviceId is provided',
      });
    }
    const now = new Date();
    const device = await this.prisma.userDevice.upsert({
      where: { userId_deviceId: { userId, deviceId: dto.deviceId } },
      update: { lastActiveAt: now, platform: dto.platform, ...(dto.deviceName ? { deviceName: dto.deviceName } : {}) },
      create: {
        userId,
        deviceId: dto.deviceId,
        platform: dto.platform,
        deviceName: dto.deviceName ?? null,
        lastActiveAt: now,
      },
    });
    return device.id;
  }

  private async buildSessionResponse(
    issued: IssuedSession,
    user: UserWithRoles,
    roles: string[],
  ): Promise<SessionResponse> {
    return {
      accessToken: issued.accessToken,
      expiresIn: issued.expiresIn,
      refreshExpiresIn: issued.refreshExpiresIn,
      user: this.pickPublicUser(user),
      roles,
      permissions: await this.authorization.permissionsForRoles(roles),
      onboardingComplete: this.onboardingComplete(user),
    };
  }

  async startSession(dto: StartSessionDto, meta: RequestMeta): Promise<SessionWithRefresh> {
    let decoded: DecodedIdToken;
    try {
      decoded = await this.firebase.verifyIdToken(dto.idToken);
    } catch (error) {
      const code = (error as { code?: string }).code ?? 'TOKEN_INVALID';
      await this.audit.record({
        action: 'auth.session.start.failed',
        entityType: 'user',
        newValues: { audience: dto.audience, reason: String(code) },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      if (error instanceof HttpException) throw error;
      throw new UnauthorizedException({ code: 'TOKEN_INVALID', message: 'Sign-in token is invalid or expired' });
    }

    const user = await this.resolveFirebaseUser(decoded);
    if (user.status !== 'ACTIVE') {
      await this.audit.record({
        actorUserId: user.id,
        action: 'auth.session.start.denied',
        entityType: 'user',
        entityId: user.id,
        newValues: { reason: `status:${user.status}` },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      throw new ForbiddenException({ code: 'ACCOUNT_DISABLED', message: 'Account is not active' });
    }

    const roles = new Set(this.activeRoles(user));
    if (dto.audience === 'customer') {
      await this.ensureRole(user.id, 'CUSTOMER');
      roles.add('CUSTOMER');
    } else {
      if (!user.helper) {
        await this.provisionHelper(user, meta);
      }
      await this.ensureRole(user.id, 'HELPER');
      roles.add('HELPER');
    }

    const deviceId = await this.touchDevice(user.id, dto);
    const roleList = [...roles];
    const issued = await this.sessions.issue(user.id, roleList, { ...meta, deviceId });

    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    await this.audit.record({
      actorUserId: user.id,
      action: 'auth.session.start',
      entityType: 'user_session',
      entityId: issued.sessionId,
      newValues: { audience: dto.audience, roles: roleList },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });

    return { ...(await this.buildSessionResponse(issued, user, roleList)), refreshToken: issued.refreshToken };
  }

  async refreshSession(refreshToken: string, meta: RequestMeta): Promise<SessionWithRefresh> {
    try {
      const issued = await this.sessions.rotate(refreshToken, meta);
      const state = await this.sessions.validate(issued.sessionId);
      if (!state) {
        throw new UnauthorizedException({ code: 'SESSION_INVALID', message: 'Session is no longer valid' });
      }
      const user = await this.loadUser(state.userId);
      return {
        ...(await this.buildSessionResponse(issued, user, this.activeRoles(user))),
        refreshToken: issued.refreshToken,
      };
    } catch (error) {
      await this.audit.record({
        action: 'auth.session.refresh.failed',
        entityType: 'user_session',
        newValues: { reason: (error as { response?: { code?: string } }).response?.code ?? 'error' },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      throw error;
    }
  }

  async revokeByRefreshToken(refreshToken: string, meta: RequestMeta): Promise<void> {
    const sessionId = refreshToken.slice(0, refreshToken.indexOf('.'));
    if (!sessionId) {
      throw new UnauthorizedException({ code: 'TOKEN_INVALID', message: 'Invalid refresh token' });
    }
    const revoked = await this.sessions.revoke(sessionId);
    await this.audit.record({
      action: 'auth.session.revoke',
      entityType: 'user_session',
      entityId: revoked ? sessionId : null,
      newValues: { revoked },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  }

  async me(auth: AuthContext): Promise<{
    user: PublicUser;
    roles: string[];
    permissions: string[];
    onboardingComplete: boolean;
  }> {
    const user = await this.loadUser(auth.userId);
    const roles = this.activeRoles(user);
    return {
      user: this.pickPublicUser(user),
      roles,
      permissions: await this.authorization.permissionsForRoles(roles),
      onboardingComplete: this.onboardingComplete(user),
    };
  }

  async updateProfile(auth: AuthContext, dto: UpdateProfileDto, meta: RequestMeta): Promise<PublicUser> {
    if (dto.cityId) {
      const city = await this.prisma.city.findUnique({ where: { id: dto.cityId } });
      if (!city) {
        throw new BadRequestException({ code: 'CITY_NOT_FOUND', message: 'Unknown city' });
      }
    }
    const updated = await this.prisma.user.update({
      where: { id: auth.userId },
      data: {
        ...(dto.firstName !== undefined ? { firstName: dto.firstName } : {}),
        ...(dto.lastName !== undefined ? { lastName: dto.lastName } : {}),
        ...(dto.preferredLanguage !== undefined ? { preferredLanguage: dto.preferredLanguage } : {}),
        ...(dto.timezone !== undefined ? { timezone: dto.timezone } : {}),
        ...(dto.cityId !== undefined ? { cityId: dto.cityId } : {}),
      },
    });
    await this.audit.record({
      actorUserId: auth.userId,
      action: 'auth.profile.update',
      entityType: 'user',
      entityId: auth.userId,
      newValues: { fields: Object.keys(dto) },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
    return this.pickPublicUser(updated as unknown as UserWithRoles);
  }

  async recordConsents(auth: AuthContext, dto: RecordConsentsDto, meta: RequestMeta): Promise<{ saved: number }> {
    let saved = 0;
    for (const consent of dto.consents) {
      const row = await this.prisma.userConsent.create({
        data: {
          userId: auth.userId,
          consentType: consent.type,
          version: consent.version,
          accepted: consent.accepted,
          acceptedAt: new Date(),
          metadata: { userAgent: meta.userAgent ?? null },
        },
      });
      if (meta.ipAddress && /^[0-9a-fA-F:.]+$/.test(meta.ipAddress)) {
        try {
          await this.prisma.$executeRaw`UPDATE user_consents SET ip_address = ${meta.ipAddress}::inet WHERE id = ${row.id}`;
        } catch {
          // consent row is still recorded without IP if the value is not a valid inet
        }
      }
      saved += 1;
    }
    await this.audit.record({
      actorUserId: auth.userId,
      action: 'auth.consent.record',
      entityType: 'user_consent',
      newValues: { types: dto.consents.map((consent) => consent.type) },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
    return { saved };
  }

  async listSessions(auth: AuthContext) {
    return this.sessions.list(auth.userId);
  }

  async revokeSession(auth: AuthContext, sessionId: string, meta: RequestMeta): Promise<void> {
    const revoked = await this.sessions.revoke(sessionId, auth.userId);
    if (!revoked) {
      throw new NotFoundException({ code: 'SESSION_NOT_FOUND', message: 'Session not found' });
    }
    await this.audit.record({
      actorUserId: auth.userId,
      action: 'auth.session.revoke',
      entityType: 'user_session',
      entityId: sessionId,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
  }

  async revokeAllSessions(auth: AuthContext, meta: RequestMeta): Promise<{ revoked: number }> {
    const revoked = await this.sessions.revokeAll(auth.userId);
    await this.audit.record({
      actorUserId: auth.userId,
      action: 'auth.session.revoke_all',
      entityType: 'user_session',
      newValues: { revoked },
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });
    return { revoked };
  }
}
