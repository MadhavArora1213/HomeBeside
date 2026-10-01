"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ApiError } from "@/lib/api";
import { firebaseConfigured, signUpWithEmail, toFriendlyError } from "@/lib/firebase";
import { useAuth } from "@/providers/auth-provider";

export default function HelperSignupPage() {
  const router = useRouter();
  const { status, session, login } = useAuth();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "authenticated" && session) {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    try {
      const displayName = `${firstName.trim()} ${lastName.trim()}`.trim();
      const idToken = await signUpWithEmail(email, password, displayName);
      await login(idToken);
      router.replace("/dashboard");
    } catch (err) {
      const friendly = err instanceof ApiError ? err : toFriendlyError(err);
      setError(friendly.message);
      setBusy(false);
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
          <CardTitle className="font-heading text-xl text-brand-primary">Create your helper account</CardTitle>
          <CardDescription>
            Sign up to join the HomeBeside helper team. Phone sign-up works from the sign-in page.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {!firebaseConfigured && (
            <p className="rounded-lg border border-brand-accent bg-brand-accent/30 px-3 py-2 text-caption text-brand-ink">
              Sign-up is not configured yet. Add your Firebase keys to enable it.
            </p>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  placeholder="Priya"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  placeholder="Sharma"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  required
                />
              </div>
            </div>
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
                autoComplete="new-password"
                placeholder="••••••••"
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <p className="text-caption text-muted-foreground">Use at least 6 characters.</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input
                id="confirm"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                minLength={6}
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={busy || !firebaseConfigured}>
              {busy ? "Creating account…" : "Create account"}
            </Button>
          </form>

          {error && <p className="text-caption text-destructive">{error}</p>}

          <p className="text-center text-caption text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-brand-secondary hover:text-brand-primary">
              Sign in
            </Link>
          </p>
          <p className="text-center text-caption text-muted-foreground">
            Trouble signing up? Contact your coordinator or support.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
