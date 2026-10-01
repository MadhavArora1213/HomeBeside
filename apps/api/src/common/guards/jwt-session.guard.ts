import { CanActivate, Injectable, type ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { AuthContext } from '../types/auth.js';
import { JwtError, verifyJwt } from '../security/jwt.js';
import { SessionService } from '../../auth/session/session.service.js';

type AccessClaims = {
  sub: string;
  sid: string;
  typ: string;
  roles: string[];
};

@Injectable()
export class JwtSessionGuard implements CanActivate {
  private readonly jwtSecret: string;

  constructor(
    config: ConfigService,
    private readonly sessions: SessionService,
  ) {
    this.jwtSecret = config.getOrThrow<string>('JWT_SECRET');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string | undefined> }>();
    const authorization = request.headers.authorization;
    if (!authorization?.startsWith('Bearer ')) {
      throw new UnauthorizedException({ code: 'NOT_AUTHENTICATED', message: 'Missing bearer token' });
    }

    let claims: AccessClaims;
    try {
      claims = verifyJwt(authorization.slice(7), this.jwtSecret) as unknown as AccessClaims;
    } catch (error) {
      if (error instanceof JwtError) {
        throw new UnauthorizedException({ code: error.code, message: 'Invalid or expired token' });
      }
      throw error;
    }
    if (claims.typ !== 'access' || !claims.sub || !claims.sid) {
      throw new UnauthorizedException({ code: 'TOKEN_INVALID', message: 'Invalid access token' });
    }

    const session = await this.sessions.validate(claims.sid);
    if (!session || session.userId !== claims.sub) {
      throw new UnauthorizedException({ code: 'SESSION_INVALID', message: 'Session is no longer valid' });
    }

    const auth: AuthContext = {
      userId: claims.sub,
      sessionId: claims.sid,
      roles: Array.isArray(claims.roles) ? claims.roles : [],
    };
    const augmented = request as { auth?: AuthContext };
    augmented.auth = auth;
    return true;
  }
}
