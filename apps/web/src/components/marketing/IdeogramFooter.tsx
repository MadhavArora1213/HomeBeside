"use client";

import React from "react";
import Link from "next/link";

export default function IdeogramFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-brand-accent/40 bg-brand-background pt-16 pb-12 sm:pt-20 sm:pb-16 text-brand-ink">

      {/* ── Soft Ambient Glow Rising from Bottom (Brand Palette: Warm Bronze & Forest Green) ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -bottom-24 left-1/2 h-[380px] w-[950px] -translate-x-1/2 rounded-full blur-[130px] opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(166, 124, 82, 0.18) 0%, rgba(46, 58, 47, 0.10) 45%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-[clamp(1rem,4vw,2.5rem)]">

        {/* ══════════════════════════════════════════════════════
            TOP ROW: Brand Info Column + 4 Link Columns
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6 lg:gap-8">

          {/* ── Brand Left Column (Span 2 on lg) ── */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 pr-0 lg:pr-6">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              {/* Geometric Care Emblem (inspired by Ideogram's signature motif) */}
              <svg
                className="h-7 w-7 text-brand-primary transition-transform duration-300 group-hover:scale-105"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.75" />
                <path
                  d="M16 6C13 11 13 21 16 26"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path
                  d="M16 6C19 11 19 21 16 26"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path
                  d="M6 16C11 13 21 13 26 16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
                <path
                  d="M6 16C11 19 21 19 26 16"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>

              <span className="font-heading text-2xl font-bold tracking-tight text-brand-primary">
                HomeBeside
              </span>
            </Link>

            <p className="mt-4 max-w-[32ch] text-sm leading-relaxed text-brand-muted">
              A trusted person for your family when you cannot be there. Non-emergency assistance & accompaniment.
            </p>

            {/* App / Pilot Pill Button (matching Ideogram's iPhone app button) */}
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-flex items-center gap-2.5 rounded-full border border-brand-accent/80 bg-brand-surface/90 px-4 py-2 text-xs font-semibold text-brand-ink shadow-sm transition-all duration-200 hover:border-brand-primary hover:bg-brand-surface hover:-translate-y-0.5 active:translate-y-0"
              >
                {/* Mobile / App Icon */}
                <svg className="h-3.5 w-3.5 text-brand-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 1.01-2.87-.96.04-2.07.65-2.73 1.43-.58.67-1.09 1.74-1.04 2.8 1.07.08 2.14-.58 2.76-1.36z" />
                </svg>
                <span>Mobile Web App</span>
              </Link>
            </div>
          </div>

          {/* ── Link Column 1: Services ── */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-semibold text-brand-ink">Services</h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/#services" className="transition-colors hover:text-brand-primary">
                  Check-in on parents
                </Link>
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-brand-primary">
                  Hospital accompaniment
                </Link>
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-brand-primary">
                  Medicine & essentials
                </Link>
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-brand-primary">
                  Everyday errands
                </Link>
              </li>
              <li>
                <Link href="/#services" className="transition-colors hover:text-brand-primary">
                  Companion visits
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Link Column 2: Trust & Safety ── */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-semibold text-brand-ink">Trust & Safety</h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/privacy" className="font-semibold text-brand-secondary transition-colors hover:text-brand-primary flex items-center gap-1.5">
                  <span>🛡️</span> <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/#safety" className="transition-colors hover:text-brand-primary">
                  Background verification
                </Link>
              </li>
              <li>
                <Link href="/#safety" className="transition-colors hover:text-brand-primary">
                  In-person interviews
                </Link>
              </li>
              <li>
                <Link href="/#safety" className="transition-colors hover:text-brand-primary">
                  Live visit updates
                </Link>
              </li>
              <li>
                <Link href="/#safety" className="transition-colors hover:text-brand-primary">
                  Digital traceability
                </Link>
              </li>
              <li>
                <Link href="/#safety" className="transition-colors hover:text-brand-primary">
                  Escalation protocols
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Link Column 3: Company ── */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-semibold text-brand-ink">Company</h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <Link href="/#how" className="transition-colors hover:text-brand-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/about" className="transition-colors hover:text-brand-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="transition-colors hover:text-brand-primary">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-brand-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-brand-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-brand-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="transition-colors hover:text-brand-primary">
                  Become a Helper
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Link Column 4: Social / Connect ── */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-semibold text-brand-ink">Connect</h4>
            <ul className="space-y-2.5 text-sm text-brand-muted">
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-brand-primary"
                >
                  X (Twitter)
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-brand-primary"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-brand-primary"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-brand-primary"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-brand-primary"
                >
                  WhatsApp Care Desk
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════
            HORIZONTAL DIVIDER LINE
        ══════════════════════════════════════════════════════ */}
        <div className="mt-14 pt-8 border-t border-brand-accent/40">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-brand-ink/80 font-medium">© 2026 HomeBeside, Inc.</span>
              <span className="hidden sm:inline text-brand-accent">•</span>
              <Link
                href="/privacy"
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/70 bg-brand-surface px-3 py-1 font-semibold text-brand-primary shadow-xs transition-all hover:border-brand-secondary hover:text-brand-secondary"
              >
                <span>🛡️</span>
                <span>Privacy Policy</span>
              </Link>
              <Link
                href="/terms"
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-accent/70 bg-brand-surface px-3 py-1 font-semibold text-brand-primary shadow-xs transition-all hover:border-brand-secondary hover:text-brand-secondary"
              >
                <span>📜</span>
                <span>Terms of Service</span>
              </Link>
            </div>
            <p className="text-[11px] text-brand-muted/80">
              Pilot City: Ludhiana, Punjab · Non-Emergency Family Care
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            GIANT WATERMARK WORDMARK (Ideogram-style watermark)
        ══════════════════════════════════════════════════════ */}
        <div className="relative mt-10 overflow-hidden flex justify-center items-end select-none pointer-events-none">
          <span
            className="font-heading font-bold tracking-tight text-brand-primary/[0.05] leading-none whitespace-nowrap"
            style={{
              fontSize: "clamp(4.5rem, 15vw, 13.5rem)",
              transform: "translateY(22%)",
            }}
          >
            HomeBeside
          </span>
        </div>

      </div>

    </footer>
  );
}
