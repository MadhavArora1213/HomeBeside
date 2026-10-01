import { CanActivate, HttpException, HttpStatus, Injectable, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { Request } from 'express';
import { CacheService } from '../cache/cache.service.js';
import { RATE_LIMIT_KEY, type RateLimitOptions } from '../decorators/rate-limit.decorator.js';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly cache: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const options = this.reflector.getAllAndOverride<RateLimitOptions | undefined>(RATE_LIMIT_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!options) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const identity = request.ip ?? 'unknown';
    const key = `rl:${options.bucket}:${identity}`;
    const count = await this.cache.increment(key, options.windowSeconds);
    if (count > options.limit) {
      const retryAfter = await this.cache.ttlSeconds(key);
      throw new HttpException(
        {
          statusCode: HttpStatus.TOO_MANY_REQUESTS,
          code: 'RATE_LIMITED',
          message: 'Too many requests',
          retryAfterSeconds: retryAfter,
        },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }
    return true;
  }
}
