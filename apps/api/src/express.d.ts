import 'express';
import type { AuthContext } from './common/types/auth.js';

declare global {
  namespace Express {
    interface Request {
      auth?: AuthContext;
    }
  }
}

export {};
