import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  updateProfile,
  type Auth,
  type ConfirmationResult,
} from "firebase/auth";
import { ApiError } from "./api";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId && firebaseConfig.appId,
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let recaptcha: RecaptchaVerifier | null = null;

function authInstance(): Auth {
  if (!firebaseConfigured) {
    throw new ApiError(503, "AUTH_NOT_CONFIGURED", "Sign-in is not configured yet. Try again later.");
  }
  if (!auth) {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig as Record<string, string>);
    auth = getAuth(app);
  }
  return auth;
}

export async function signInWithEmail(email: string, password: string): Promise<string> {
  const credential = await signInWithEmailAndPassword(authInstance(), email, password);
  return credential.user.getIdToken();
}

export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string,
): Promise<string> {
  const credential = await createUserWithEmailAndPassword(authInstance(), email, password);
  if (displayName) await updateProfile(credential.user, { displayName });
  return credential.user.getIdToken(true);
}

export async function startPhoneSignIn(phoneE164: string): Promise<ConfirmationResult> {
  const instance = authInstance();
  if (!recaptcha) recaptcha = new RecaptchaVerifier(instance, "recaptcha-container", { size: "invisible" });
  return signInWithPhoneNumber(instance, phoneE164, recaptcha);
}

export function resetPhoneSignIn(): void {
  if (recaptcha) {
    try {
      recaptcha.clear();
    } catch {
      // already cleared
    }
    recaptcha = null;
  }
}

const FIREBASE_MESSAGES: Record<string, string> = {
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "No account found for this email.",
  "auth/email-already-in-use": "An account with this email already exists. Sign in instead.",
  "auth/weak-password": "Password is too weak. Use at least 6 characters.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/too-many-requests": "Too many attempts. Try again later.",
  "auth/invalid-phone-number": "Enter a valid phone number.",
  "auth/code-mismatch": "Incorrect OTP. Check the code and try again.",
  "auth/invalid-verification-code": "Incorrect OTP. Check the code and try again.",
  "auth/code-expired": "OTP expired. Request a new one.",
  "auth/quota-exceeded": "OTP limit reached. Try again later.",
  "auth/billing-not-enabled": "Phone sign-in is not enabled for this project yet.",
};

export function toFriendlyError(err: unknown): ApiError {
  if (err instanceof ApiError) return err;
  const code =
    typeof err === "object" && err !== null && "code" in err ? String((err as { code: unknown }).code) : "";
  const message = FIREBASE_MESSAGES[code] ?? "Sign-in failed. Please try again.";
  return new ApiError(400, code || "AUTH_ERROR", message);
}
