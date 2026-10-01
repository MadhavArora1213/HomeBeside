"use client";

import Link from "next/link";
import { useMemo } from "react";
import { BadgeCheckIcon, ChevronRightIcon, LayoutDashboardIcon, ShieldCheckIcon, UsersIcon } from "lucide-react";
import { NAV_ITEMS } from "@/components/console/nav";
import { useAuth } from "@/providers/auth-provider";

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

const TILE_STYLE =
  "flex flex-col gap-1 rounded-2xl border border-brand-accent/50 bg-brand-surface p-4 shadow-[0_1px_2px_rgb(46_58_47/0.05)]";

export default function AdminDashboardPage() {
  const { session } = useAuth();

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [],
  );

  if (!session) return null;

  const name = session.user.firstName || "Admin";
  const contact = session.user.email ?? session.user.phone ?? "—";
  const status = session.user.status ?? "ACTIVE";

  const tiles = [
    {
      label: "Console roles",
      icon: ShieldCheckIcon,
      value: (
        <span className="flex flex-wrap gap-1.5">
          {session.roles.map((role) => (
            <span
              key={role}
              className="rounded-full bg-brand-primary px-2.5 py-0.5 text-caption font-medium text-brand-background"
            >
              {role}
            </span>
          ))}
        </span>
      ),
      caption: "Determined by your role assignments",
    },
    {
      label: "Permissions",
      icon: BadgeCheckIcon,
      value: <span className="text-h2 font-heading text-brand-primary">{session.permissions.length}</span>,
      caption: "Granted to your console roles",
    },
    {
      label: "Console sections",
      icon: LayoutDashboardIcon,
      value: <span className="text-h2 font-heading text-brand-primary">{NAV_ITEMS.length}</span>,
      caption: "Modules available from the sidebar",
    },
    {
      label: "Account",
      icon: UsersIcon,
      value: <span className="break-all text-sm font-medium text-brand-primary">{contact}</span>,
      caption: (
        <span className="inline-flex items-center gap-1.5 text-caption text-brand-muted">
          <span className="size-1.5 rounded-full bg-brand-success" aria-hidden="true" />
          Status {status}
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-1">
        <h2 className="font-heading text-2xl text-brand-primary">
          {greeting()}, {name}
        </h2>
        <p className="text-sm text-brand-ink/70">{today}</p>
      </header>

      <section aria-label="Session summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <article key={tile.label} className={TILE_STYLE}>
            <div className="flex items-center gap-2 text-caption font-medium tracking-wide text-brand-muted uppercase">
              <tile.icon className="size-3.5 text-brand-secondary" aria-hidden="true" />
              {tile.label}
            </div>
            <div className="text-sm text-brand-ink">{tile.value}</div>
            <div className="text-caption text-brand-muted">{tile.caption}</div>
          </article>
        ))}
      </section>

      <section aria-labelledby="modules-heading">
        <div className="mb-3 flex items-baseline justify-between gap-4">
          <h3 id="modules-heading" className="font-heading text-lg text-brand-primary">
            Modules
          </h3>
          <span className="text-caption text-brand-muted">Pick a section to get started</span>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full items-start gap-3 rounded-2xl border border-brand-accent/50 bg-brand-surface p-4 shadow-[0_1px_2px_rgb(46_58_47/0.05)] transition-colors outline-none hover:border-brand-secondary/60 hover:bg-brand-sand/25 focus-visible:ring-3 focus-visible:ring-brand-secondary/40"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-brand-accent/60 bg-brand-sand/40">
                  <item.icon className="size-4.5 text-brand-secondary" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1 text-sm font-medium text-brand-primary">
                    <span className="truncate">{item.label}</span>
                    <ChevronRightIcon
                      className="size-3.5 shrink-0 text-brand-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-secondary"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-0.5 block text-caption text-brand-muted">{item.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="text-caption text-brand-muted">
        Everything you do in this console is recorded in the audit log.
      </p>
    </div>
  );
}
