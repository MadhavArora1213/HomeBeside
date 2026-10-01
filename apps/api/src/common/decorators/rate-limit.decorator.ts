import { SetMetadata } from '@nestjs/common';

export const RATE_LIMIT_KEY = 'auth:rate_limit';

export type RateLimitOptions = {
  bucket: string;
  limit: number;
  windowSeconds: number;
};

export const RateLimit = (options: RateLimitOptions) => SetMetadata(RATE_LIMIT_KEY, options);
