import { createHash } from 'node:crypto';
import { jest } from '@jest/globals';
import type { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
import { SessionService } from './session.service.js';
import { verifyJwt } from '../../common/security/jwt.js';

const SECRET = 'session-service-secret-'.padEnd(48, 'x');

function makeConfig(): ConfigService {
  const values: Record<string, string> = {
    JWT_SECRET: SECRET,
    JWT_ACCESS_TTL: '900',
    JWT_REFRESH_TTL: '2592000',
  };
  return {
    get: (key: string) => values[key],
    getOrThrow: (key: string) => values[key],
  } as unknown as ConfigService;
}

function makePrisma() {
  return {
    userSession: {
      create: asyncMock(),
      findUnique: asyncMock(),
      findMany: asyncMock(),
      update: asyncMock(),
      updateMany: asyncMock(),
    },
    $executeRaw: asyncMock().mockResolvedValue(1),
  };
}

function makeCache() {
  return {
    get: asyncMock(),
    set: asyncMock().mockResolvedValue(undefined),
    del: asyncMock().mockResolvedValue(undefined),
    increment: asyncMock().mockResolvedValue(1),
    ttlSeconds: asyncMock().mockResolvedValue(42),
  };
}

function sha256(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function asyncMock() {
  return jest.fn<(...args: any[]) => Promise<unknown>>();
}

async function rejectionResponse(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
    return null;
  } catch (error) {
    return (error as HttpException).getResponse();
  }
}

describe('SessionService', () => {
  const meta = { ipAddress: '::1', userAgent: 'jest' };

  it('issue creates a stored session, Redis state and an access token', async () => {
    const prisma = makePrisma();
    const cache = makeCache();
    const service = new SessionService(makeConfig(), prisma as never, cache as never);

    const issued = await service.issue('user-1', ['CUSTOMER'], meta);

    expect(prisma.userSession.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ id: issued.sessionId, userId: 'user-1' }),
      }),
    );
    expect(issued.refreshToken.startsWith(`${issued.sessionId}.`)).toBe(true);
    const claims = verifyJwt(issued.accessToken, SECRET);
    expect(claims.sub).toBe('user-1');
    expect(claims.sid).toBe(issued.sessionId);
    expect(claims.roles).toEqual(['CUSTOMER']);
    expect(cache.set).toHaveBeenCalledWith(`session:${issued.sessionId}`, expect.any(String), expect.any(Number));
  });

  it('rotate issues a new refresh token for the current one', async () => {
    const prisma = makePrisma();
    const cache = makeCache();
    const service = new SessionService(makeConfig(), prisma as never, cache as never);
    const token = 'session-1.secret-value';
    prisma.userSession.findUnique.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      refreshTokenHash: sha256(token),
      revokedAt: null,
      expiresAt: new Date(Date.now() + 60_000),
      deviceId: null,
      userAgent: 'jest',
      user: { status: 'ACTIVE', userRoles: [{ role: { code: 'CUSTOMER', isActive: true } }] },
    });

    const rotated = await service.rotate(token, meta);

    expect(rotated.refreshToken).not.toBe(token);
    expect(rotated.refreshToken.startsWith('session-1.')).toBe(true);
    expect(prisma.userSession.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 'session-1' },
        data: { refreshTokenHash: sha256(rotated.refreshToken) },
      }),
    );
    expect(prisma.userSession.updateMany).not.toHaveBeenCalled();
    expect(verifyJwt(rotated.accessToken, SECRET).roles).toEqual(['CUSTOMER']);
  });

  it('rotate detects reuse of a previous token and revokes the session', async () => {
    const prisma = makePrisma();
    const cache = makeCache();
    const service = new SessionService(makeConfig(), prisma as never, cache as never);
    prisma.userSession.findUnique.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      refreshTokenHash: sha256('session-1.current-token'),
      revokedAt: null,
      expiresAt: new Date(Date.now() + 60_000),
      deviceId: null,
      userAgent: 'jest',
      user: { status: 'ACTIVE', userRoles: [] },
    });
    prisma.userSession.updateMany.mockResolvedValue({ count: 1 });

    const response = await rejectionResponse(service.rotate('session-1.stale-token', meta));

    expect(response).toMatchObject({ code: 'SESSION_REUSED' });
    expect(prisma.userSession.updateMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: expect.objectContaining({ id: 'session-1' }) }),
    );
    expect(cache.del).toHaveBeenCalledWith('session:session-1');
  });

  it('rotate rejects an expired session', async () => {
    const prisma = makePrisma();
    const cache = makeCache();
    const service = new SessionService(makeConfig(), prisma as never, cache as never);
    const token = 'session-1.secret-value';
    prisma.userSession.findUnique.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      refreshTokenHash: sha256(token),
      revokedAt: null,
      expiresAt: new Date(Date.now() - 1000),
      deviceId: null,
      userAgent: 'jest',
      user: { status: 'ACTIVE', userRoles: [] },
    });
    prisma.userSession.updateMany.mockResolvedValue({ count: 1 });

    const response = await rejectionResponse(service.rotate(token, meta));

    expect(response).toMatchObject({ code: 'SESSION_EXPIRED' });
    expect(prisma.userSession.updateMany).toHaveBeenCalled();
  });

  it('rotate rejects a disabled account', async () => {
    const prisma = makePrisma();
    const cache = makeCache();
    const service = new SessionService(makeConfig(), prisma as never, cache as never);
    const token = 'session-1.secret-value';
    prisma.userSession.findUnique.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      refreshTokenHash: sha256(token),
      revokedAt: null,
      expiresAt: new Date(Date.now() + 60_000),
      deviceId: null,
      userAgent: 'jest',
      user: { status: 'SUSPENDED', userRoles: [] },
    });
    prisma.userSession.updateMany.mockResolvedValue({ count: 1 });

    const response = await rejectionResponse(service.rotate(token, meta));

    expect(response).toMatchObject({ code: 'ACCOUNT_DISABLED' });
  });

  it('validate serves the cached state without touching the database', async () => {
    const prisma = makePrisma();
    const cache = makeCache();
    const service = new SessionService(makeConfig(), prisma as never, cache as never);
    cache.get.mockResolvedValue(JSON.stringify({ userId: 'user-1', deviceId: null }));

    await expect(service.validate('session-1')).resolves.toEqual({ userId: 'user-1', deviceId: null });
    expect(prisma.userSession.findUnique).not.toHaveBeenCalled();
  });

  it('validate returns null for a revoked session', async () => {
    const prisma = makePrisma();
    const cache = makeCache();
    const service = new SessionService(makeConfig(), prisma as never, cache as never);
    cache.get.mockResolvedValue(null);
    prisma.userSession.findUnique.mockResolvedValue({
      id: 'session-1',
      userId: 'user-1',
      revokedAt: new Date(),
      expiresAt: new Date(Date.now() + 60_000),
    });

    await expect(service.validate('session-1')).resolves.toBeNull();
  });

  it('revokeAll revokes active sessions and clears their cache entries', async () => {
    const prisma = makePrisma();
    const cache = makeCache();
    const service = new SessionService(makeConfig(), prisma as never, cache as never);
    prisma.userSession.findMany.mockResolvedValue([{ id: 's1' }, { id: 's2' }]);
    prisma.userSession.updateMany.mockResolvedValue({ count: 2 });

    await expect(service.revokeAll('user-1')).resolves.toBe(2);
    expect(cache.del).toHaveBeenCalledWith('session:s1');
    expect(cache.del).toHaveBeenCalledWith('session:s2');
  });
});
