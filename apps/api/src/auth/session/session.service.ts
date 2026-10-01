import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomBytes, createHash, randomUUID } from 'node:crypto';
import { CacheService } from '../../common/cache/cache.service.js';
import { PrismaService } from '../../common/prisma/prisma.service.js';
import { signJwt } from '../../common/security/jwt.js';

export type RequestMeta = {
  ipAddress?: string | null;
  userAgent?: string | null;
  deviceId?: string | null;
};

export type IssuedSession = {
  sessionId: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshExpiresIn: number;
};

export type SessionState = {
  userId: string;
  deviceId: string | null;
};

function sessionKey(sessionId: string): string {
  return `session:${sessionId}`;
}

function isPotentialInet(value: string): boolean {
  return /^[0-9a-fA-F:.]+$/.test(value);
}

@Injectable()
export class SessionService {
  private readonly jwtSecret: string;
  private readonly accessTtlSeconds: number;
  private readonly refreshTtlSeconds: number;

  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly cache: CacheService,
  ) {
    this.jwtSecret = config.getOrThrow<string>('JWT_SECRET');
    this.accessTtlSeconds = Number(config.get<string>('JWT_ACCESS_TTL') ?? 900);
    this.refreshTtlSeconds = Number(config.get<string>('JWT_REFRESH_TTL') ?? 2592000);
  }

  get accessTtl(): number {
    return this.accessTtlSeconds;
  }

  get refreshTtl(): number {
    return this.refreshTtlSeconds;
  }

  private hash(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  private signAccess(userId: string, sessionId: string, roles: string[]): string {
    return signJwt({ sub: userId, sid: sessionId, typ: 'access', roles }, this.jwtSecret, this.accessTtlSeconds);
  }

  private async persistIp(statement: Promise<number>): Promise<void> {
    try {
      await statement;
    } catch {
      return;
    }
  }

  async issue(userId: string, roles: string[], meta: RequestMeta): Promise<IssuedSession> {
    const sessionId = randomUUID();
    const refreshToken = `${sessionId}.${randomBytes(32).toString('base64url')}`;
    const expiresAt = new Date(Date.now() + this.refreshTtlSeconds * 1000);

    await this.prisma.userSession.create({
      data: {
        id: sessionId,
        userId,
        refreshTokenHash: this.hash(refreshToken),
        deviceId: meta.deviceId ?? null,
        userAgent: meta.userAgent ?? null,
        expiresAt,
      },
    });

    if (meta.ipAddress && isPotentialInet(meta.ipAddress)) {
      await this.persistIp(
        this.prisma.$executeRaw`UPDATE user_sessions SET ip_address = ${meta.ipAddress}::inet WHERE id = ${sessionId}`,
      );
    }

    const ttlRemaining = Math.max(Math.floor((expiresAt.getTime() - Date.now()) / 1000), 1);
    await this.cache.set(
      sessionKey(sessionId),
      JSON.stringify({ userId, deviceId: meta.deviceId ?? null } satisfies SessionState),
      Math.min(ttlRemaining, this.refreshTtlSeconds),
    );

    return {
      sessionId,
      accessToken: this.signAccess(userId, sessionId, roles),
      expiresIn: this.accessTtlSeconds,
      refreshToken,
      refreshExpiresIn: this.refreshTtlSeconds,
    };
  }

  async validate(sessionId: string): Promise<SessionState | null> {
    const key = sessionKey(sessionId);
    const cached = await this.cache.get(key);
    if (cached) {
      try {
        return JSON.parse(cached) as SessionState;
      } catch {
        await this.cache.del(key);
      }
    }

    const row = await this.prisma.userSession.findUnique({ where: { id: sessionId } });
    if (!row || row.revokedAt || row.expiresAt.getTime() <= Date.now()) return null;

    const remaining = Math.max(Math.floor((row.expiresAt.getTime() - Date.now()) / 1000), 1);
    const state: SessionState = { userId: row.userId, deviceId: row.deviceId };
    await this.cache.set(key, JSON.stringify(state), Math.min(remaining, this.refreshTtlSeconds));
    return state;
  }

  async rotate(refreshToken: string, meta: RequestMeta): Promise<IssuedSession> {
    const separator = refreshToken.indexOf('.');
    if (separator <= 0 || separator === refreshToken.length - 1) {
      throw new UnauthorizedException({ code: 'TOKEN_INVALID', message: 'Invalid refresh token' });
    }
    const sessionId = refreshToken.slice(0, separator);

    const row = await this.prisma.userSession.findUnique({
      where: { id: sessionId },
      include: {
        user: { include: { userRoles: { include: { role: true } } } },
      },
    });
    if (!row) {
      throw new UnauthorizedException({ code: 'SESSION_INVALID', message: 'Session not found' });
    }
    if (row.refreshTokenHash !== this.hash(refreshToken)) {
      await this.revoke(sessionId);
      throw new UnauthorizedException({ code: 'SESSION_REUSED', message: 'Session revoked due to refresh token reuse' });
    }
    if (row.revokedAt) {
      await this.cache.del(sessionKey(sessionId));
      throw new UnauthorizedException({ code: 'SESSION_REVOKED', message: 'Session has been revoked' });
    }
    if (row.expiresAt.getTime() <= Date.now()) {
      await this.revoke(sessionId);
      throw new UnauthorizedException({ code: 'SESSION_EXPIRED', message: 'Session expired' });
    }
    if (row.user.status !== 'ACTIVE') {
      await this.revoke(sessionId);
      throw new UnauthorizedException({ code: 'ACCOUNT_DISABLED', message: 'Account is not active' });
    }

    const rotatedToken = `${sessionId}.${randomBytes(32).toString('base64url')}`;
    await this.prisma.userSession.update({
      where: { id: sessionId },
      data: { refreshTokenHash: this.hash(rotatedToken) },
    });
    if (meta.ipAddress && isPotentialInet(meta.ipAddress)) {
      await this.persistIp(
        this.prisma.$executeRaw`UPDATE user_sessions SET ip_address = ${meta.ipAddress}::inet, user_agent = ${meta.userAgent ?? row.userAgent} WHERE id = ${sessionId}`,
      );
    }

    const roles = row.user.userRoles
      .filter((assignment) => assignment.role.isActive)
      .map((assignment) => assignment.role.code);
    const remaining = Math.max(Math.floor((row.expiresAt.getTime() - Date.now()) / 1000), 1);
    await this.cache.set(
      sessionKey(sessionId),
      JSON.stringify({ userId: row.userId, deviceId: row.deviceId } satisfies SessionState),
      remaining,
    );

    return {
      sessionId,
      accessToken: this.signAccess(row.userId, sessionId, roles),
      expiresIn: this.accessTtlSeconds,
      refreshToken: rotatedToken,
      refreshExpiresIn: this.refreshTtlSeconds,
    };
  }

  async revoke(sessionId: string, userId?: string): Promise<boolean> {
    const result = await this.prisma.userSession.updateMany({
      where: { id: sessionId, revokedAt: null, ...(userId ? { userId } : {}) },
      data: { revokedAt: new Date() },
    });
    await this.cache.del(sessionKey(sessionId));
    return result.count > 0;
  }

  async revokeAll(userId: string): Promise<number> {
    const active = await this.prisma.userSession.findMany({
      where: { userId, revokedAt: null },
      select: { id: true },
    });
    const result = await this.prisma.userSession.updateMany({
      where: { userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    for (const session of active) {
      await this.cache.del(sessionKey(session.id));
    }
    return result.count;
  }

  async list(userId: string): Promise<
    Array<{ id: string; ipAddress: string | null; userAgent: string | null; createdAt: Date; expiresAt: Date; deviceId: string | null; deviceName: string | null }>
  > {
    const rows = await this.prisma.$queryRaw<
      Array<{
        id: string;
        ip_address: string | null;
        user_agent: string | null;
        created_at: Date;
        expires_at: Date;
        device_id: string | null;
        device_name: string | null;
      }>
    >`SELECT s.id, host(s.ip_address)::text AS ip_address, s.user_agent, s.created_at, s.expires_at, s.device_id, d.device_name
      FROM user_sessions s
      LEFT JOIN user_devices d ON d.id = s.device_id
      WHERE s.user_id = ${userId} AND s.revoked_at IS NULL AND s.expires_at > now()
      ORDER BY s.created_at DESC`;

    return rows.map((row) => ({
      id: row.id,
      ipAddress: row.ip_address,
      userAgent: row.user_agent,
      createdAt: row.created_at,
      expiresAt: row.expires_at,
      deviceId: row.device_id,
      deviceName: row.device_name,
    }));
  }
}
