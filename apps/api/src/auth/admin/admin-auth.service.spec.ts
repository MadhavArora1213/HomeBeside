import { jest } from '@jest/globals';
import type { ConfigService } from '@nestjs/config';
import { HttpException } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service.js';
import { hashPassword } from '../../common/security/password.scrypt.js';

const EMAIL = 'admin@example.com';

function makeService() {
  const values: Record<string, string> = {
    AUTH_MAX_FAILED_ATTEMPTS: '3',
    AUTH_LOCKOUT_MINUTES: '15',
  };
  const config = {
    get: (key: string) => values[key],
    getOrThrow: (key: string) => values[key],
  } as unknown as ConfigService;

  const prisma = {
    user: { findUnique: asyncMock(), update: asyncMock() },
  };
  const sessions = { issue: asyncMock() };
  const authorization = { permissionsForRoles: asyncMock().mockResolvedValue(['settings:view']) };
  const audit = { record: asyncMock().mockResolvedValue(undefined) };
  const cache = {
    get: asyncMock().mockResolvedValue(null),
    set: asyncMock().mockResolvedValue(undefined),
    del: asyncMock().mockResolvedValue(undefined),
    increment: asyncMock().mockResolvedValue(1),
    ttlSeconds: asyncMock().mockResolvedValue(120),
  };

  const service = new AdminAuthService(
    config,
    prisma as never,
    sessions as never,
    authorization as never,
    audit as never,
    cache as never,
  );
  return { service, prisma, sessions, authorization, audit, cache };
}

function userRow(overrides: Record<string, unknown> = {}) {
  return {
    id: 'admin-1',
    email: EMAIL,
    phone: null,
    passwordHash: '',
    firstName: 'Platform',
    lastName: 'Admin',
    profilePhotoUrl: null,
    preferredLanguage: 'en',
    timezone: 'Asia/Kolkata',
    currency: 'INR',
    status: 'ACTIVE',
    totpSecret: null,
    twoFactorEnabledAt: null,
    userRoles: [{ role: { code: 'ADMIN', isActive: true } }],
    ...overrides,
  };
}

async function rejectionResponse(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
    return null;
  } catch (error) {
    return (error as HttpException).getResponse();
  }
}

function asyncMock() {
  return jest.fn<(...args: any[]) => Promise<unknown>>();
}

describe('AdminAuthService', () => {
  const meta = { ipAddress: '::1', userAgent: 'jest' };

  it('blocks login while the lockout counter is at the limit', async () => {
    const { service, prisma, cache } = makeService();
    cache.get.mockImplementation(async (key: string) => (key.startsWith('auth:lockout:admin:') ? '3' : null));

    const response = await rejectionResponse(service.login({ email: EMAIL, password: 'whatever-123' }, meta));

    expect(response).toMatchObject({ code: 'LOCKED_OUT' });
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it('rejects a wrong password and increments the lockout counter', async () => {
    const { service, prisma, cache } = makeService();
    prisma.user.findUnique.mockResolvedValue(userRow({ passwordHash: await hashPassword('right-password') }));

    const response = await rejectionResponse(service.login({ email: EMAIL, password: 'wrong-password' }, meta));

    expect(response).toMatchObject({ code: 'INVALID_CREDENTIALS' });
    expect(cache.increment).toHaveBeenCalledWith('auth:lockout:admin:admin@example.com', 900);
  });

  it('rejects an account without a console role', async () => {
    const { service, prisma } = makeService();
    prisma.user.findUnique.mockResolvedValue(
      userRow({
        passwordHash: await hashPassword('right-password'),
        userRoles: [{ role: { code: 'CUSTOMER', isActive: true } }],
      }),
    );

    const response = await rejectionResponse(service.login({ email: EMAIL, password: 'right-password' }, meta));

    expect(response).toMatchObject({ code: 'NOT_AUTHORIZED' });
  });

  it('issues a session directly after password verification, without any MFA step', async () => {
    const { service, prisma, sessions, authorization, audit, cache } = makeService();
    prisma.user.findUnique.mockResolvedValue(userRow({ passwordHash: await hashPassword('right-password') }));
    sessions.issue.mockResolvedValue({
      sessionId: 'sess-1',
      accessToken: 'access-token',
      expiresIn: 900,
      refreshToken: 'refresh-token',
      refreshExpiresIn: 2_592_000,
    });

    const result = await service.login({ email: EMAIL, password: 'right-password' }, meta);

    expect(result.accessToken).toBe('access-token');
    expect(result.refreshToken).toBe('refresh-token');
    expect(result.roles).toEqual(['ADMIN']);
    expect(result.permissions).toEqual(['settings:view']);
    expect(result.user).toMatchObject({ id: 'admin-1', email: EMAIL });
    expect(authorization.permissionsForRoles).toHaveBeenCalledWith(['ADMIN']);
    expect(sessions.issue).toHaveBeenCalledWith('admin-1', ['ADMIN'], meta);
    expect(cache.del).toHaveBeenCalledWith('auth:lockout:admin:admin@example.com');
    expect(audit.record).toHaveBeenCalledWith(
      expect.objectContaining({ action: 'auth.admin.login', entityId: 'sess-1' }),
    );
  });
});
