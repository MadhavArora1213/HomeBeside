import { CanActivate, ForbiddenException, Injectable, type ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthorizationService } from '../../auth/authorization.service.js';
import { PERMISSIONS_KEY } from '../decorators/require-permission.decorator.js';
import type { AuthContext } from '../types/auth.js';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authorization: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;

    const request = context.switchToHttp().getRequest<{ auth?: AuthContext }>();
    const auth = request.auth;
    if (!auth) {
      throw new ForbiddenException({ code: 'NOT_AUTHENTICATED', message: 'Authentication required' });
    }
    const granted = await this.authorization.permissionsForRoles(auth.roles);
    const missing = required.filter((code) => !granted.includes(code));
    if (missing.length > 0) {
      throw new ForbiddenException({
        code: 'MISSING_PERMISSION',
        message: `Missing permission: ${missing.join(', ')}`,
      });
    }
    return true;
  }
}
