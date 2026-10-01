"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { hasConsoleRole } from "@/lib/console";
import { useAuth } from "@/providers/auth-provider";
import { ConsoleHeader } from "@/components/console/console-header";
import { SidebarNav } from "@/components/console/sidebar-nav";

export default function ConsoleLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { status, session, logout } = useAuth();
  const authorized = status === "authenticated" && Boolean(session) && hasConsoleRole(session?.roles ?? []);

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated" || !session) {
      router.replace("/login");
      return;
    }
    if (!hasConsoleRole(session.roles)) {
      void logout().then(() => router.replace("/login"));
    }
  }, [status, session, router, logout]);

  if (!authorized) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-brand-background">
        <span className="logo-text text-3xl text-brand-primary">HomeBeside</span>
        <p className="tagline text-xs text-brand-secondary">Admin Console</p>
        <p className="text-caption text-brand-muted" role="status">
          Loading console…
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-brand-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-brand-accent/70 bg-brand-surface lg:block">
        <SidebarNav />
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <ConsoleHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
