import { JwtError, signJwt, verifyJwt } from './jwt.js';

const SECRET = 'test-secret-value-for-jwt-unit-tests';

describe('jwt HS256 helpers', () => {
  it('signs and verifies a token', () => {
    const token = signJwt({ sub: 'user-1', typ: 'access' }, SECRET, 900);
    const claims = verifyJwt(token, SECRET);
    expect(claims.sub).toBe('user-1');
    expect(claims.typ).toBe('access');
    expect(claims.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it('rejects an expired token', () => {
    const token = signJwt({ sub: 'user-1' }, SECRET, -10);
    expect(() => verifyJwt(token, SECRET)).toThrow(
      expect.objectContaining({ code: 'TOKEN_EXPIRED' }) as Error,
    );
  });

  it('rejects a tampered payload', () => {
    const token = signJwt({ sub: 'user-1' }, SECRET, 900);
    const [header, , signature] = token.split('.');
    const forged = Buffer.from(JSON.stringify({ sub: 'user-2', iat: 1, exp: 9_999_999_999 })).toString('base64url');
    expect(() => verifyJwt(`${header}.${forged}.${signature}`, SECRET)).toThrow(
      expect.objectContaining({ code: 'TOKEN_INVALID' }) as Error,
    );
  });

  it('rejects a token signed with another secret', () => {
    const token = signJwt({ sub: 'user-1' }, 'another-secret', 900);
    expect(() => verifyJwt(token, SECRET)).toThrow(
      expect.objectContaining({ code: 'TOKEN_INVALID' }) as Error,
    );
  });

  it('rejects the alg none attack', () => {
    const header = Buffer.from(JSON.stringify({ alg: 'none', typ: 'JWT' })).toString('base64url');
    const payload = Buffer.from(JSON.stringify({ sub: 'user-1', exp: 9_999_999_999 })).toString('base64url');
    expect(() => verifyJwt(`${header}.${payload}.`, SECRET)).toThrow(
      expect.objectContaining({ code: 'TOKEN_INVALID' }) as Error,
    );
  });

  it('rejects a malformed token', () => {
    expect(() => verifyJwt('not-a-jwt', SECRET)).toThrow(JwtError);
  });
});
