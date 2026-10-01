"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@workspace/ui/components/sheet";
import { ChevronDownIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { titleForPath } from "./nav";
import { SidebarNav } from "./sidebar-nav";
import { useAuth } from "@/providers/auth-provider";

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "A";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function ConsoleHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { session, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const title = titleForPath(pathname);
  const name = [session?.user.firstName, session?.user.lastName].filter(Boolean).join(" ") || "Admin";
  const contact = session?.user.email ?? session?.user.phone ?? "";
  const consoleRole = session?.roles.find((role) => ["ADMIN", "SUPERADMIN", "OPS"].includes(role)) ?? "ADMIN";

  async function handleSignOut() {
    await logout();
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-brand-accent/70 bg-brand-background/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger
          aria-label="Open navigation"
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-brand-ink transition-colors outline-none hover:bg-brand-sand/60 focus-visible:ring-3 focus-visible:ring-brand-secondary/40 lg:hidden"
        >
          <MenuIcon className="size-5" aria-hidden="true" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-72 border-r border-brand-accent/70 bg-brand-surface p-0"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Console navigation</SheetTitle>
            <SheetDescription>Jump to a console section</SheetDescription>
          </SheetHeader>
          <SidebarNav onNavigate={() => setMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="flex min-w-0 flex-col">
        <h1 className="truncate font-heading text-lg leading-tight text-brand-primary">{title}</h1>
        <span className="hidden text-caption text-brand-muted sm:block">
          HomeBeside Admin Console
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <span className="hidden items-center gap-1.5 rounded-full border border-brand-accent/70 bg-brand-sand/40 px-2.5 py-1 text-caption font-medium text-brand-ink md:inline-flex">
          <span className="size-1.5 rounded-full bg-brand-success" aria-hidden="true" />
          {consoleRole}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex max-w-[14rem] items-center gap-2 rounded-lg border border-brand-accent/60 bg-brand-surface py-1.5 pr-2 pl-1.5 text-sm transition-colors outline-none hover:bg-brand-sand/50 focus-visible:ring-3 focus-visible:ring-brand-secondary/40">
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-primary text-caption font-semibold text-brand-background"
            >
              {initialsOf(name)}
            </span>
            <span className="hidden min-w-0 flex-col items-start leading-tight sm:flex">
              <span className="truncate font-medium text-brand-primary">{name}</span>
              <span className="truncate text-caption text-brand-muted">{contact}</span>
            </span>
            <ChevronDownIcon className="size-3.5 shrink-0 text-brand-muted" aria-hidden="true" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-60">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="px-3 py-2">
                <span className="block truncate text-sm font-medium text-foreground">{name}</span>
                <span className="block truncate text-caption text-muted-foreground">{contact}</span>
                <span className="mt-1 inline-flex flex-wrap gap-1">
                  {session?.roles.map((role) => (
                    <span
                      key={role}
                      className="rounded-full bg-brand-accent/50 px-2 py-0.5 text-[0.7rem] font-medium text-brand-ink"
                    >
                      {role}
                    </span>
                  ))}
                </span>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="gap-2 focus:bg-brand-emergency/10"
              onClick={handleSignOut}
            >
              <LogOutIcon className="size-4" aria-hidden="true" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
