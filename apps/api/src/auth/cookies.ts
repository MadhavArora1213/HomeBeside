import type { Request, Response } from 'express';

export const REFRESH_COOKIE = 'fa_refresh';

function isSecure(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function setRefreshCookie(res: Response, token: string, maxAgeSeconds: number): void {
  res.cookie(REFRESH_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isSecure(),
    path: '/api/v1/auth',
    maxAge: maxAgeSeconds * 1000,
  });
}

export function clearRefreshCookie(res: Response): void {
  res.clearCookie(REFRESH_COOKIE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: isSecure(),
    path: '/api/v1/auth',
  });
}

export function readRefreshCookie(req: Request, fallbackBodyToken?: string): string | null {
  const header = req.headers.cookie;
  if (header) {
    for (const part of header.split(';')) {
      const separator = part.indexOf('=');
      if (separator === -1) continue;
      const name = part.slice(0, separator).trim();
      if (name === REFRESH_COOKIE) {
        const value = part.slice(separator + 1).trim();
        if (value) return decodeURIComponent(value);
      }
    }
  }
  if (fallbackBodyToken && fallbackBodyToken.length > 0) return fallbackBodyToken;
  return null;
}
