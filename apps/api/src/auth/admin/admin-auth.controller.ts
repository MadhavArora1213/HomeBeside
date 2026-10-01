import { Body, Controller, HttpCode, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AdminAuthService } from './admin-auth.service.js';
import { clearRefreshCookie, setRefreshCookie } from '../cookies.js';
import { AdminLoginDto } from '../dto/admin-login.dto.js';
import type { RequestMeta } from '../session/session.service.js';
import { RateLimit } from '../../common/decorators/rate-limit.decorator.js';
import type { SessionResponse } from '../auth.service.js';

function requestMeta(req: Request): RequestMeta {
  return { ipAddress: req.ip ?? null, userAgent: req.headers['user-agent'] ?? null };
}

@ApiTags('auth-admin')
@Controller('auth/admin')
export class AdminAuthController {
  constructor(private readonly adminAuth: AdminAuthService) {}

  @Post('login')
  @HttpCode(200)
  @RateLimit({ bucket: 'admin_login', limit: 30, windowSeconds: 60 })
  async login(
    @Body() dto: AdminLoginDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SessionResponse> {
    const { refreshToken, ...body } = await this.adminAuth.login(dto, requestMeta(req));
    setRefreshCookie(res, refreshToken, body.refreshExpiresIn);
    return body;
  }

  @Post('logout')
  @HttpCode(204)
  logout(@Res({ passthrough: true }) res: Response): void {
    clearRefreshCookie(res);
  }
}
