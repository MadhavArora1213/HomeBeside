import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService, type SessionResponse, type SessionWithRefresh } from './auth.service.js';
import { clearRefreshCookie, readRefreshCookie, setRefreshCookie } from './cookies.js';
import { RecordConsentsDto } from './dto/record-consents.dto.js';
import { RefreshSessionDto } from './dto/refresh-session.dto.js';
import { StartSessionDto } from './dto/start-session.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import type { RequestMeta } from './session/session.service.js';
import { CurrentAuth } from '../common/decorators/current-auth.decorator.js';
import { RateLimit } from '../common/decorators/rate-limit.decorator.js';
import { JwtSessionGuard } from '../common/guards/jwt-session.guard.js';
import { PermissionGuard } from '../common/guards/permission.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import type { AuthContext } from '../common/types/auth.js';

function requestMeta(req: Request): RequestMeta {
  return { ipAddress: req.ip ?? null, userAgent: req.headers['user-agent'] ?? null };
}

function splitRefresh({ refreshToken: _refreshToken, ...body }: SessionWithRefresh): SessionResponse {
  return body;
}

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('session')
  @HttpCode(200)
  @RateLimit({ bucket: 'session_start', limit: 30, windowSeconds: 60 })
  async startSession(
    @Body() dto: StartSessionDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SessionResponse> {
    const session = await this.auth.startSession(dto, requestMeta(req));
    setRefreshCookie(res, session.refreshToken, session.refreshExpiresIn);
    return splitRefresh(session);
  }

  @Post('session/refresh')
  @HttpCode(200)
  @RateLimit({ bucket: 'session_refresh', limit: 120, windowSeconds: 60 })
  async refreshSession(
    @Body() dto: RefreshSessionDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<SessionResponse> {
    const token = readRefreshCookie(req, dto.refreshToken);
    if (!token) {
      clearRefreshCookie(res);
      throw new UnauthorizedException({ code: 'NO_REFRESH_TOKEN', message: 'No refresh token provided' });
    }
    const session = await this.auth.refreshSession(token, requestMeta(req));
    setRefreshCookie(res, session.refreshToken, session.refreshExpiresIn);
    return splitRefresh(session);
  }

  @Post('session/revoke')
  @HttpCode(204)
  @RateLimit({ bucket: 'session_revoke', limit: 120, windowSeconds: 60 })
  async revokeSession(
    @Body() dto: RefreshSessionDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const token = readRefreshCookie(req, dto.refreshToken);
    if (token) {
      await this.auth.revokeByRefreshToken(token, requestMeta(req));
    }
    clearRefreshCookie(res);
  }

  @Post('session/revoke-all')
  @HttpCode(200)
  @UseGuards(JwtSessionGuard, RolesGuard, PermissionGuard)
  async revokeAllSessions(@CurrentAuth() auth: AuthContext, @Req() req: Request) {
    return this.auth.revokeAllSessions(auth, requestMeta(req));
  }

  @Get('me')
  @UseGuards(JwtSessionGuard, RolesGuard, PermissionGuard)
  me(@CurrentAuth() auth: AuthContext) {
    return this.auth.me(auth);
  }

  @Get('sessions')
  @UseGuards(JwtSessionGuard, RolesGuard, PermissionGuard)
  listSessions(@CurrentAuth() auth: AuthContext) {
    return this.auth.listSessions(auth);
  }

  @Delete('sessions/:id')
  @HttpCode(204)
  @UseGuards(JwtSessionGuard, RolesGuard, PermissionGuard)
  async revokeSessionById(
    @CurrentAuth() auth: AuthContext,
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<void> {
    await this.auth.revokeSession(auth, id, requestMeta(req));
  }

  @Post('consents')
  @UseGuards(JwtSessionGuard, RolesGuard, PermissionGuard)
  @RateLimit({ bucket: 'consents_write', limit: 20, windowSeconds: 60 })
  recordConsents(@CurrentAuth() auth: AuthContext, @Body() dto: RecordConsentsDto, @Req() req: Request) {
    return this.auth.recordConsents(auth, dto, requestMeta(req));
  }

  @Patch('profile')
  @UseGuards(JwtSessionGuard, RolesGuard, PermissionGuard)
  updateProfile(@CurrentAuth() auth: AuthContext, @Body() dto: UpdateProfileDto, @Req() req: Request) {
    return this.auth.updateProfile(auth, dto, requestMeta(req));
  }
}
