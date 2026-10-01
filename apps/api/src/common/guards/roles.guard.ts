import { CanActivate, ForbiddenException, Injectable, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { AuthContext } from '../types/auth.js';
import { ROLES_KEY } from '../decorators/roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest<{ auth?: AuthContext }>();
    const auth = request.auth;
    if (!auth) {
      throw new ForbiddenException({ code: 'NOT_AUTHENTICATED', message: 'Authentication required' });
    }
    if (!required.some((role) => auth.roles.includes(role))) {
      throw new ForbiddenException({ code: 'NOT_AUTHORIZED', message: 'Insufficient role' });
    }
    return true;
  }
}
