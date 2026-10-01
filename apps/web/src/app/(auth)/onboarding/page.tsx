"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { apiPatch, apiPost, ApiError } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

const CONSENT_VERSION = "1.0";

export default function OnboardingPage() {
  const router = useRouter();
  const { status, session, reload } = useAuth();

  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    } else if (status === "authenticated" && session?.onboardingComplete) {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!terms || !privacy) {
      setError("Please accept the Terms and Privacy Policy to continue.");
      return;
    }
    const form = new FormData(event.currentTarget);
    const firstName = String(form.get("firstName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();
    const language = String(form.get("language") ?? "en");
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";

    setError(null);
    setBusy(true);
    try {
      await apiPatch("/auth/profile", { firstName, lastName, preferredLanguage: language, timezone });
      await apiPost("/auth/consents", {
        consents: [
          { type: "terms", version: CONSENT_VERSION, accepted: true },
          { type: "privacy", version: CONSENT_VERSION, accepted: true },
          { type: "marketing", version: CONSENT_VERSION, accepted: marketing },
        ],
      });
      await reload();
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not save your details. Please try again.");
      setBusy(false);
    }
  }

  if (status !== "authenticated" || !session) return null;

  return (
    <Card className="bg-card ring-brand-accent/60">
      <CardHeader>
        <CardTitle className="font-heading text-xl text-brand-primary">Complete your profile</CardTitle>
        <CardDescription>A few details so we can tailor HomeBeside for you.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                maxLength={100}
                defaultValue={session.user.firstName ?? ""}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                maxLength={100}
                defaultValue={session.user.lastName ?? ""}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="language">Preferred language</Label>
            <select
              id="language"
              name="language"
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
              defaultValue={session.user.preferredLanguage ?? "en"}
            >
              {LANGUAGES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2 text-caption">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-0.5 accent-brand-primary"
                checked={terms}
                onChange={(event) => setTerms(event.target.checked)}
              />
              <span>
                I accept the <span className="font-medium text-brand-primary">Terms of Service</span> (required).
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-0.5 accent-brand-primary"
                checked={privacy}
                onChange={(event) => setPrivacy(event.target.checked)}
              />
              <span>
                I agree to the <span className="font-medium text-brand-primary">Privacy Policy</span> (required).
              </span>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-0.5 accent-brand-primary"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
              />
              <span>Send me offers and updates (optional).</span>
            </label>
          </div>

          {error && <p className="text-caption text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={busy}>
            {busy ? "Saving…" : "Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
