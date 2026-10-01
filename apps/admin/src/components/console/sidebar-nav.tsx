"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActivePath, NAV_GROUPS } from "./nav";

function BrandBlock() {
  return (
    <div className="flex flex-col gap-0.5 border-b border-brand-accent/60 px-5 py-5">
      <span className="logo-text text-xl leading-none text-brand-primary">HomeBeside</span>
      <span className="text-[0.65rem] tracking-[0.3em] text-brand-secondary uppercase">
        Admin Console
      </span>
    </div>
  );
}

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <BrandBlock />
      <nav aria-label="Console sections" className="flex-1 overflow-y-auto px-3 py-4">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-5 last:mb-0">
            <p className="px-2 pb-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-brand-muted uppercase">
              {group.label}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-brand-secondary/40 ${
                        active
                          ? "bg-brand-primary font-medium text-brand-background"
                          : "text-brand-ink/75 hover:bg-brand-sand/50 hover:text-brand-primary focus-visible:bg-brand-sand/50"
                      }`}
                    >
                      <item.icon
                        className={`size-4 shrink-0 ${active ? "text-brand-accent" : "text-brand-secondary"}`}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-brand-accent/60 px-5 py-4">
        <p className="text-caption text-brand-muted">Every action is audit-logged.</p>
      </div>
    </div>
  );
}
