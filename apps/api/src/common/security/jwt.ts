import { createHmac, timingSafeEqual } from 'node:crypto';

export type JwtErrorCode = 'TOKEN_MALFORMED' | 'TOKEN_INVALID' | 'TOKEN_EXPIRED';

export class JwtError extends Error {
  constructor(
    message: string,
    readonly code: JwtErrorCode,
  ) {
    super(message);
    this.name = 'JwtError';
  }
}

export type JwtHeader = { alg: string; typ: string };

export type JwtClaims = Record<string, unknown> & {
  sub: string;
  iat: number;
  exp: number;
};

const base64url = (value: string | Buffer): string => Buffer.from(value).toString('base64url');

function sign(data: string, secret: string): string {
  return createHmac('sha256', secret).update(data).digest('base64url');
}

export function signJwt(payload: Record<string, unknown>, secret: string, ttlSeconds: number): string {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64url(JSON.stringify({ ...payload, iat: now, exp: now + ttlSeconds }));
  const signature = sign(`${header}.${body}`, secret);
  return `${header}.${body}.${signature}`;
}

export function verifyJwt(token: string, secret: string): JwtClaims {
  const parts = token.split('.');
  if (parts.length !== 3) throw new JwtError('Malformed token', 'TOKEN_MALFORMED');
  const [headerB64, payloadB64, signatureB64] = parts;

  let header: JwtHeader;
  try {
    header = JSON.parse(Buffer.from(headerB64, 'base64url').toString('utf8')) as JwtHeader;
  } catch {
    throw new JwtError('Malformed header', 'TOKEN_MALFORMED');
  }
  if (header.alg !== 'HS256') throw new JwtError('Unsupported algorithm', 'TOKEN_INVALID');

  const expected = sign(`${headerB64}.${payloadB64}`, secret);
  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(signatureB64);
  if (expectedBuf.length !== actualBuf.length || !timingSafeEqual(expectedBuf, actualBuf)) {
    throw new JwtError('Invalid signature', 'TOKEN_INVALID');
  }

  let payload: JwtClaims;
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8')) as JwtClaims;
  } catch {
    throw new JwtError('Malformed payload', 'TOKEN_MALFORMED');
  }
  if (typeof payload.exp !== 'number' || payload.exp <= Math.floor(Date.now() / 1000)) {
    throw new JwtError('Token expired', 'TOKEN_EXPIRED');
  }
  return payload;
}
