export type AuthErrorCode =
  | "INVALID_CREDENTIALS"
  | "SESSION_EXPIRED"
  | "EMAIL_NOT_VERIFIED"
  | "PHONE_NOT_VERIFIED"
  | "ACCOUNT_DISABLED"
  | "MFA_REQUIRED"
  | "RATE_LIMITED";

export type Session = {
  userId: string;
  sessionId: string;
  roles: string[];
  issuedAt: string;
  expiresAt: string;
};
