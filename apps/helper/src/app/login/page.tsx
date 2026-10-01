"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ApiError } from "@/lib/api";
import { firebaseConfigured, signInWithEmail, startPhoneSignIn, toFriendlyError } from "@/lib/firebase";
import { setPendingOtp } from "@/lib/otp-session";
import { useAuth } from "@/providers/auth-provider";

function toE164(raw: string): string | null {
  const trimmed = raw.replace(/[\s()-]/g, "");
  const candidate = trimmed.startsWith("+") ? trimmed : `+91${trimmed}`;
  return /^\+[1-9]\d{6,14}$/.test(candidate) ? candidate : null;
}

export default function HelperLoginPage() {
  const router = useRouter();
  const { status, session, login } = useAuth();

  const [mode, setMode] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState<"phone" | "email" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

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
      const idToken = await signInWithEmail(email, password);
      await login(idToken);
      router.replace("/dashboard");
    } catch (err) {
      handleError(err);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-background px-4 py-10">
      <div className="mb-8 text-center">
        <span className="logo-text text-3xl text-brand-primary">HomeBeside</span>
        <p className="tagline text-xs text-brand-secondary">Helper Portal</p>
      </div>
      <Card className="w-full max-w-md bg-card ring-brand-accent/60">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-brand-primary">Helper sign in</CardTitle>
          <CardDescription>
            {mode === "phone"
              ? "We'll send a one-time code to your phone."
              : "Use your registered email to continue."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!firebaseConfigured && (
            <p className="rounded-lg border border-brand-accent bg-brand-accent/30 px-3 py-2 text-caption text-brand-ink">
              Sign-in is not configured yet. Add your Firebase keys to enable it.
            </p>
          )}

          <div className="flex rounded-lg bg-muted p-1 text-sm">
            <button
              type="button"
              className={`flex-1 rounded-md px-3 py-1.5 transition-colors ${
                mode === "phone" ? "bg-background font-medium text-brand-primary shadow-sm" : "text-muted-foreground"
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
              className={`flex-1 rounded-md px-3 py-1.5 transition-colors ${
                mode === "email" ? "bg-background font-medium text-brand-primary shadow-sm" : "text-muted-foreground"
              }`}
              onClick={() => {
                setMode("email");
                setError(null);
              }}
            >
              Email
            </button>
          </div>

          {mode === "phone" ? (
            <form className="flex flex-col gap-4" onSubmit={handlePhone}>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone number</Label>
                <Input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={busy === "phone" || !firebaseConfigured}>
                {busy === "phone" ? "Sending OTP…" : "Continue"}
              </Button>
              <div id="recaptcha-container" />
            </form>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleEmail}>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
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
                  autoComplete="current-password"
                  placeholder="••••••••"
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={busy === "email" || !firebaseConfigured}>
                {busy === "email" ? "Please wait…" : "Sign in"}
              </Button>
            </form>
          )}

          {error && <p className="text-caption text-destructive">{error}</p>}

          <p className="text-center text-caption text-muted-foreground">
            New helper?{" "}
            <a href="/signup" className="font-medium text-brand-secondary hover:text-brand-primary">
              Create an account
            </a>
          </p>
          <p className="text-center text-caption text-muted-foreground">
            Helper access is granted by your coordinator. Trouble signing in? Contact support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
