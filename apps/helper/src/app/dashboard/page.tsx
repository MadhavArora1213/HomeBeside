"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { useAuth } from "@/providers/auth-provider";

export default function HelperDashboardPage() {
  const router = useRouter();
  const { status, session, logout } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
  }, [status, router]);

  async function handleLogout() {
    await logout();
    router.replace("/login");
  }

  if (status !== "authenticated" || !session) return null;

  const { user, roles } = session;
  const contact = user.email ?? user.phone ?? "";

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center bg-brand-background px-4 py-10">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <span className="logo-text text-2xl text-brand-primary">HomeBeside</span>
          <p className="tagline text-xs text-brand-secondary">Helper Portal</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Sign out
        </Button>
      </header>
      <Card className="bg-card ring-brand-accent/60">
        <CardHeader>
          <CardTitle className="font-heading text-xl text-brand-primary">
            Hello, {user.firstName || "helper"}
          </CardTitle>
          <CardDescription>{contact}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 text-caption">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground">Roles:</span>
            {roles.map((role) => (
              <span key={role} className="rounded-full bg-brand-accent/50 px-2.5 py-0.5 text-brand-ink">
                {role}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground">You are signed in. Your tasks will appear here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
