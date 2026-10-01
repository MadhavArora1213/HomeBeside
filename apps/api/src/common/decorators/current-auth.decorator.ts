import { createParamDecorator, type ExecutionContext, UnauthorizedException } from '@nestjs/common';
import type { AuthContext } from '../types/auth.js';

export const CurrentAuth = createParamDecorator((_data: unknown, context: ExecutionContext): AuthContext => {
  const request = context.switchToHttp().getRequest<{ auth?: AuthContext }>();
  if (!request.auth) {
    throw new UnauthorizedException({ code: 'NOT_AUTHENTICATED', message: 'Authentication required' });
  }
  return request.auth;
});
