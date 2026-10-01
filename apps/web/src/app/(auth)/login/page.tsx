"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ApiError, type SessionSnapshot } from "@/lib/api";
import {
  firebaseConfigured,
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
  startPhoneSignIn,
  toFriendlyError,
} from "@/lib/firebase";
import { setPendingOtp } from "@/lib/otp-session";
import { useAuth } from "@/providers/auth-provider";

function toE164(raw: string): string | null {
  const trimmed = raw.replace(/[\s()-]/g, "");
  const candidate = trimmed.startsWith("+") ? trimmed : `+91${trimmed}`;
  return /^\+[1-9]\d{6,14}$/.test(candidate) ? candidate : null;
}

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="mr-2.5 size-4">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29A11.86 11.86 0 0 0 0 12c0 1.94.46 3.77 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

const inputClass =
  "h-10 w-full rounded-xl border-brand-accent sm:h-11 bg-brand-background px-4 text-base placeholder:text-brand-muted focus-visible:border-brand-secondary focus-visible:ring-brand-secondary/30";

export default function LoginPage() {
  const router = useRouter();
  const { status, session, login } = useAuth();

  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [signUp, setSignUp] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<"phone" | "email" | "google" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace(session.onboardingComplete ? "/dashboard" : "/onboarding");
    }
  }, [status, session, router]);

  function finishLogin(snapshot: SessionSnapshot) {
    router.replace(snapshot.onboardingComplete ? "/dashboard" : "/onboarding");
  }

  function handleError(err: unknown) {
    const friendly = err instanceof ApiError ? err : toFriendlyError(err);
    setError(friendly.message);
  }

  async function handlePhone(event: FormEvent) {
    event.preventDefault();
    setError(null);
    const e164 = toE164(phone);
    if (!e164) {
      setError("Enter a valid phone number.");
      return;
    }
    setBusy("phone");
    try {
      const confirmation = await startPhoneSignIn(e164);
      setPendingOtp({ phone: e164, confirmation });
      router.push("/verify");
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(null);
    }
  }

  async function handleEmail(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setBusy("email");
    try {
      const idToken = signUp ? await signUpWithEmail(email, password) : await signInWithEmail(email, password);
      finishLogin(await login(idToken));
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(null);
    }
  }

  async function handleGoogle() {
    setError(null);
    setBusy("google");
    try {
      const idToken = await signInWithGoogle();
      finishLogin(await login(idToken));
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <div className="rounded-3xl border border-brand-accent/50 bg-brand-surface p-5 shadow-[0_1px_2px_rgb(46_58_47/0.05),0_20px_48px_-20px_rgb(46_58_47/0.22)] sm:p-9">
      <div className="mb-4 sm:mb-7">
        <h1 className="font-heading text-[1.45rem] leading-tight text-brand-primary sm:text-[1.75rem]">
          {mode === "phone" ? "Sign in with phone" : signUp ? "Create your account" : "Sign in"}
        </h1>
        <p className="mt-1.5 text-sm text-brand-ink/70 sm:text-body">
          {mode === "phone"
            ? "We'll send a one-time code to your phone."
            : signUp
              ? "Set an email and password — you're good to go."
              : "Use your email and password to continue."}
        </p>
      </div>

      {!firebaseConfigured && (
        <p className="mb-5 rounded-xl border border-brand-accent bg-brand-accent/30 px-4 py-3 text-caption text-brand-ink">
          Phone and email sign-in are not configured yet. Add your Firebase keys to enable them.
        </p>
      )}

      <div role="group" aria-label="Sign-in method" className="flex rounded-full border border-brand-accent/70 bg-brand-sand/30 p-1">
        <button
          type="button"
          aria-pressed={mode === "phone"}
          className={`flex-1 rounded-full px-4 py-1.5 text-sm transition-colors sm:py-2 ${
            mode === "phone"
              ? "bg-brand-primary font-medium text-brand-background shadow-sm"
              : "text-brand-muted hover:text-brand-ink"
          }`}
          onClick={() => {
            setMode("phone");
            setError(null);
          }}
        >
          Phone
        </button>
        <button
          type="button"
          aria-pressed={mode === "email"}
          className={`flex-1 rounded-full px-4 py-1.5 text-sm transition-colors sm:py-2 ${
            mode === "email"
              ? "bg-brand-primary font-medium text-brand-background shadow-sm"
              : "text-brand-muted hover:text-brand-ink"
          }`}
          onClick={() => {
            setMode("email");
            setError(null);
          }}
        >
          Email
        </button>
      </div>

      <div className="mt-5">
        {mode === "phone" ? (
          <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handlePhone}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="+91 98765 43210"
                className={inputClass}
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="h-10 w-full rounded-full sm:h-11"
              disabled={busy === "phone" || !firebaseConfigured}
            >
              {busy === "phone" ? "Sending OTP…" : "Continue"}
            </Button>
            <div id="recaptcha-container" />
          </form>
        ) : (
          <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleEmail}>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={inputClass}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete={signUp ? "new-password" : "current-password"}
                placeholder="••••••••"
                className={inputClass}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                minLength={6}
                required
              />
              {signUp && <p className="text-caption text-brand-muted">Use at least 6 characters.</p>}
            </div>
            <Button
              type="submit"
              className="h-10 w-full rounded-full sm:h-11"
              disabled={busy === "email" || !firebaseConfigured}
            >
              {busy === "email" ? "Please wait…" : signUp ? "Create account" : "Sign in"}
            </Button>
            <button
              type="button"
              className="mx-auto text-caption font-medium text-brand-secondary transition-colors hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
              onClick={() => {
                setSignUp((value) => !value);
                setError(null);
              }}
            >
              {signUp ? "Already have an account? Sign in" : "New here? Create an account"}
            </button>
          </form>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-brand-emergency/40 bg-brand-emergency/10 px-4 py-3 text-caption text-brand-emergency"
        >
          {error}
        </p>
      )}

      <div className="my-4 flex items-center gap-3 sm:my-6 text-caption text-brand-muted">
        <span className="h-px flex-1 bg-brand-accent" />
        or
        <span className="h-px flex-1 bg-brand-accent" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-10 w-full rounded-full border-brand-accent bg-brand-background sm:h-11 hover:bg-brand-sand/40 hover:text-brand-ink"
        disabled={busy !== null || !firebaseConfigured}
        onClick={handleGoogle}
      >
        <GoogleMark />
        {busy === "google" ? "Opening Google…" : "Continue with Google"}
      </Button>

      <p className="mt-4 text-center text-caption text-brand-muted sm:mt-6">
        By continuing you agree to our Terms and Privacy Policy.
      </p>
      </div>

      <div className="mt-6 hidden text-center sm:block">
        <Link
          href="/"
          className="text-caption text-brand-muted transition-colors hover:text-brand-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
