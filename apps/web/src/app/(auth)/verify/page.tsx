"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { type SessionSnapshot } from "@/lib/api";
import { resetPhoneSignIn, toFriendlyError } from "@/lib/firebase";
import { clearPendingOtp, getPendingOtp, getServerPendingOtp, subscribePendingOtp } from "@/lib/otp-session";
import { useAuth } from "@/providers/auth-provider";

function maskPhone(phone: string): string {
  if (phone.length < 6) return phone;
  return `${phone.slice(0, 3)}${"•".repeat(Math.max(phone.length - 6, 0))}${phone.slice(-3)}`;
}

export default function VerifyPage() {
  const router = useRouter();
  const { login } = useAuth();
  const pending = useSyncExternalStore(subscribePendingOtp, getPendingOtp, getServerPendingOtp);

  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pending) router.replace("/login");
  }, [pending, router]);

  function finishLogin(snapshot: SessionSnapshot) {
    clearPendingOtp();
    resetPhoneSignIn();
    router.replace(snapshot.onboardingComplete ? "/dashboard" : "/onboarding");
  }

  async function handleVerify(event: FormEvent) {
    event.preventDefault();
    if (!pending) return;
    setError(null);
    setBusy(true);
    try {
      const credential = await pending.confirmation.confirm(code);
      const idToken = await credential.user.getIdToken();
      finishLogin(await login(idToken));
    } catch (err) {
      setError(toFriendlyError(err).message);
      setBusy(false);
    }
  }

  function handleRestart() {
    clearPendingOtp();
    resetPhoneSignIn();
    router.replace("/login");
  }

  if (!pending) return null;

  return (
    <Card className="bg-card ring-brand-accent/60">
      <CardHeader>
        <CardTitle className="font-heading text-xl text-brand-primary">Enter OTP</CardTitle>
        <CardDescription>Code sent to {maskPhone(pending.phone)}.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <form className="flex flex-col gap-4" onSubmit={handleVerify}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="otp">6-digit code</Label>
            <Input
              id="otp"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="123456"
              className="tracking-[0.5em]"
              value={code}
              onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
              required
            />
          </div>
          {error && <p className="text-caption text-destructive">{error}</p>}
          <Button type="submit" className="w-full" disabled={busy || code.length !== 6}>
            {busy ? "Verifying…" : "Verify & continue"}
          </Button>
        </form>
        <button
          type="button"
          className="text-center text-caption text-brand-secondary hover:text-brand-primary"
          onClick={handleRestart}
        >
          Change phone number
        </button>
      </CardContent>
    </Card>
  );
}
