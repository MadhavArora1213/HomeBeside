import { Module } from '@nestjs/common';
import { AdminAuthController } from './admin/admin-auth.controller.js';
import { AdminAuthService } from './admin/admin-auth.service.js';
import { AuditService } from './audit/audit.service.js';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AuthorizationService } from './authorization.service.js';
import { FirebaseModule } from './firebase/firebase.module.js';
import { SessionService } from './session/session.service.js';
import { JwtSessionGuard } from '../common/guards/jwt-session.guard.js';
import { PermissionGuard } from '../common/guards/permission.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';

@Module({
  imports: [FirebaseModule],
  controllers: [AuthController, AdminAuthController],
  providers: [
    AuthService,
    AdminAuthService,
    AuthorizationService,
    AuditService,
    SessionService,
    JwtSessionGuard,
    RolesGuard,
    PermissionGuard,
  ],
  exports: [SessionService, AuthorizationService, AuditService, JwtSessionGuard],
})
export class AuthModule {}
