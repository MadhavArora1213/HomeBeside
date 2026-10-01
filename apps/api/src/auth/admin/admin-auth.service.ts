import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuditService } from '../audit/audit.service.js';
import { AuthorizationService } from '../authorization.service.js';
import type { SessionWithRefresh } from '../auth.service.js';
import { AdminLoginDto } from '../dto/admin-login.dto.js';
import { type RequestMeta, SessionService } from '../session/session.service.js';
import { CacheService } from '../../common/cache/cache.service.js';
import { PrismaService } from '../../common/prisma/prisma.service.js';
import { hashPassword, verifyPassword } from '../../common/security/password.scrypt.js';

const CONSOLE_ROLES = ['ADMIN', 'SUPERADMIN', 'OPS'];

@Injectable()
export class AdminAuthService {
  private readonly maxFailedAttempts: number;
  private readonly lockoutSeconds: number;

  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly sessions: SessionService,
    private readonly authorization: AuthorizationService,
    private readonly audit: AuditService,
    private readonly cache: CacheService,
  ) {
    this.maxFailedAttempts = Number(config.get<string>('AUTH_MAX_FAILED_ATTEMPTS') ?? 10);
    this.lockoutSeconds = Number(config.get<string>('AUTH_LOCKOUT_MINUTES') ?? 15) * 60;
  }

  async login(dto: AdminLoginDto, meta: RequestMeta): Promise<SessionWithRefresh> {
    const email = dto.email.trim().toLowerCase();
    const lockKey = `auth:lockout:admin:${email}`;
    const attempts = Number((await this.cache.get(lockKey)) ?? 0);
    if (attempts >= this.maxFailedAttempts) {
      const retryAfter = await this.cache.ttlSeconds(lockKey);
      await this.audit.record({
        action: 'auth.admin.login.locked',
        entityType: 'user',
        newValues: { email },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          code: 'LOCKED_OUT',
          message: 'Too many failed attempts; try again later',
          retryAfterSeconds: retryAfter,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { userRoles: { include: { role: true } } },
    });

    let passwordValid = false;
    if (user?.passwordHash) {
      passwordValid = await verifyPassword(dto.password, user.passwordHash);
    } else {
      await hashPassword(dto.password);
    }

    if (!user || !passwordValid) {
      await this.cache.increment(lockKey, this.lockoutSeconds);
      await this.audit.record({
        actorUserId: user?.id ?? null,
        action: 'auth.admin.login.failed',
        entityType: 'user',
        entityId: user?.id ?? null,
        newValues: { email, reason: 'invalid_credentials' },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      throw new UnauthorizedException({ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' });
    }

    if (user.status !== 'ACTIVE') {
      await this.audit.record({
        actorUserId: user.id,
        action: 'auth.admin.login.failed',
        entityType: 'user',
        entityId: user.id,
        newValues: { reason: `status:${user.status}` },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      throw new ForbiddenException({ code: 'ACCOUNT_DISABLED', message: 'Account is not active' });
    }

    const roles = user.userRoles
      .filter((assignment) => assignment.role.isActive)
      .map((assignment) => assignment.role.code);
    if (!roles.some((role) => CONSOLE_ROLES.includes(role))) {
      await this.audit.record({
        actorUserId: user.id,
        action: 'auth.admin.login.failed',
        entityType: 'user',
        entityId: user.id,
        newValues: { reason: 'console_role_missing' },
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
      throw new ForbiddenException({ code: 'NOT_AUTHORIZED', message: 'No console access for this account' });
    }

    await this.cache.del(lockKey);

    const issued = await this.sessions.issue(user.id, roles, meta);

    await this.audit.record({
      actorUserId: user.id,
      action: 'auth.admin.login',
      entityType: 'user_session',
      entityId: issued.sessionId,
      ipAddress: meta.ipAddress,
      userAgent: meta.userAgent,
    });

    return {
      accessToken: issued.accessToken,
      expiresIn: issued.expiresIn,
      refreshExpiresIn: issued.refreshExpiresIn,
      refreshToken: issued.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePhotoUrl: user.profilePhotoUrl,
        preferredLanguage: user.preferredLanguage,
        timezone: user.timezone,
        currency: user.currency,
        status: user.status,
      },
      roles,
      permissions: await this.authorization.permissionsForRoles(roles),
      onboardingComplete: true,
    };
  }
}
