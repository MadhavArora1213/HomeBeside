import type { NextFunction, Request, Response } from 'express';

const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

export function createOriginGuard(allowedOrigins: Set<string>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!UNSAFE_METHODS.has(req.method)) {
      next();
      return;
    }
    const origin = req.headers.origin;
    if (!origin || allowedOrigins.has(origin)) {
      next();
      return;
    }
    res.status(403).json({
      statusCode: 403,
      code: 'ORIGIN_NOT_ALLOWED',
      message: 'Request origin is not allowed',
    });
  };
}
