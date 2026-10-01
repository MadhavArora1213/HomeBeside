import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type App, cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth, type DecodedIdToken } from 'firebase-admin/auth';

@Injectable()
export class FirebaseAdminService {
  private readonly projectId?: string;
  private readonly clientEmail?: string;
  private readonly privateKey?: string;
  private app: App | null = null;

  constructor(config: ConfigService) {
    this.projectId = config.get<string>('FIREBASE_PROJECT_ID');
    this.clientEmail = config.get<string>('FIREBASE_CLIENT_EMAIL');
    this.privateKey = config.get<string>('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
  }

  get isConfigured(): boolean {
    return Boolean(this.projectId && this.clientEmail && this.privateKey);
  }

  private ensureApp(): App {
    if (!this.projectId || !this.clientEmail || !this.privateKey) {
      throw new ServiceUnavailableException({
        code: 'AUTH_NOT_CONFIGURED',
        message: 'Firebase Auth is not configured on this server',
      });
    }
    if (!this.app) {
      const existing = getApps().find((candidate) => candidate.name === 'firebase-auth');
      this.app =
        existing ??
        initializeApp(
          {
            credential: cert({ projectId: this.projectId, clientEmail: this.clientEmail, privateKey: this.privateKey }),
            projectId: this.projectId,
          },
          'firebase-auth',
        );
    }
    return this.app;
  }

  async verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    const app = this.ensureApp();
    return getAuth(app).verifyIdToken(idToken);
  }
}
