"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Play, Check, ShieldCheck } from "lucide-react";

export default function WellnessHeroSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-brand-background via-[#f6f2ec] to-brand-surface px-4 pt-10 pb-20 sm:px-6 lg:px-8 lg:pt-14 lg:pb-28">

      {/* ── Soft Ambient Glow Orbs (Brand Palette: Bronze & Forest Green) ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 h-[550px] w-[800px] -translate-x-1/2 rounded-full blur-[130px] opacity-60"
          style={{
            background: "radial-gradient(circle, rgba(166, 124, 82, 0.16) 0%, rgba(217, 203, 185, 0.28) 50%, transparent 80%)",
          }}
        />
        <div
          className="absolute top-1/3 -right-24 h-[420px] w-[420px] rounded-full blur-[110px] opacity-35"
          style={{
            background: "radial-gradient(circle, rgba(46, 58, 47, 0.14) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* ══════════════════════════════════════════════════════
            HERO GRID: Centered Typography Flanked by 4 Visual Elements
            (Matched strictly to HomeBeside Theme & Reference Photo)
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-x-8">

          {/* ──────────────────────────────────────────────────
              LEFT FLANK: Top Avatar Pill + Bottom Photo Card
          ────────────────────────────────────────────────── */}
          <div className="flex flex-col justify-between space-y-10 lg:col-span-3 lg:space-y-16">

            {/* Top Left: Avatar Stack + Label + Squiggly Pulse Line */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center -space-x-2.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Helper Harpreet"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Helper Rajesh"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Helper Simran"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
                />
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-brand-sand/60 text-xs font-bold text-brand-primary shadow-sm">
                  +
                </span>
              </div>

              <span className="mt-3 text-[11px] font-extrabold uppercase tracking-widest text-brand-secondary">
                Become A Helper
              </span>

              {/* Bronze Pulse / Heartbeat Line */}
              <div className="mt-3 text-brand-secondary/80">
                <svg width="110" height="34" viewBox="0 0 110 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 17H26L34 5L44 29L54 9L62 23L70 17H108"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Bottom Left: Tag + Rounded Photo Card */}
            <div className="mx-auto flex flex-col items-center lg:mx-0 lg:items-start">
              <span className="mb-3 text-[11px] font-extrabold uppercase tracking-widest text-brand-secondary">
                Rigorous Care Practices
              </span>

              <div className="group relative overflow-hidden rounded-3xl border border-brand-accent/50 bg-brand-surface p-2 shadow-xl shadow-brand-primary/10 transition-transform duration-300 hover:-translate-y-1">
                <div className="relative h-44 w-52 sm:h-52 sm:w-60 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=700&q=80"
                    alt="Senior Care Practice"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-full bg-brand-primary/90 px-2.5 py-0.5 text-[10px] font-bold text-brand-background backdrop-blur-sm shadow-sm">
                    <Check className="h-3 w-3 text-emerald-400" /> Vetted Visit
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────
              CENTER: Headline, Subtitle, and Dual CTA Buttons
          ────────────────────────────────────────────────── */}
          <div className="text-center lg:col-span-6 px-2 sm:px-4">

            {/* Main Headline (Cinzel Heading, Brand Primary) */}
            <h1
              className="font-heading font-extrabold tracking-tight text-brand-primary"
              style={{ fontSize: "clamp(2.5rem, 5.2vw, 4.3rem)", lineHeight: 1.12 }}
            >
              Elegant mission <br />
              <span className="text-brand-primary">to wellness</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-[48ch] text-sm leading-relaxed text-brand-ink/75 sm:text-base">
              A trusted person for your family when you cannot be there. Verified local helpers for check-ins, hospital appointments, and daily errands in Ludhiana.
            </p>

            {/* Centered Dual CTA Buttons */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/login"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-primary px-8 py-3.5 text-sm font-bold tracking-wide text-brand-background shadow-lg shadow-brand-primary/25 transition-all duration-300 hover:bg-brand-ink hover:shadow-xl hover:shadow-brand-ink/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                Book Session
              </Link>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-brand-primary/30 bg-brand-surface/90 px-7 py-3.5 text-sm font-bold tracking-wide text-brand-primary backdrop-blur-md shadow-sm transition-all duration-300 hover:bg-brand-surface hover:border-brand-primary hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>See a Demo</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-brand-primary/40 text-brand-secondary text-[10px]">
                  <Play className="h-2.5 w-2.5 fill-current ml-0.5" />
                </span>
              </button>
            </div>

            {/* Trust Mini Tagline */}
            <div className="mt-8 flex items-center justify-center gap-5 text-xs font-semibold text-brand-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> 100% In-Person Vetted
              </span>
              <span className="h-3 w-px bg-brand-accent/60" />
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" /> Ludhiana Pilot
              </span>
            </div>

          </div>

          {/* ──────────────────────────────────────────────────
              RIGHT FLANK: Serene Photo Card + Circular Rate Badge
          ────────────────────────────────────────────────── */}
          <div className="flex flex-col justify-between space-y-10 lg:col-span-3 lg:space-y-16">

            {/* Top Right: Serene Woman / Care Companion Photo */}
            <div className="mx-auto flex flex-col items-center lg:mx-0 lg:items-end">
              <div className="group relative overflow-hidden rounded-3xl border border-brand-accent/50 bg-brand-surface p-2 shadow-xl shadow-brand-primary/10 transition-transform duration-300 hover:-translate-y-1">
                <div className="relative h-48 w-56 sm:h-56 sm:w-64 overflow-hidden rounded-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80"
                    alt="Wellness Care Companion"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  <span className="absolute bottom-2.5 right-2.5 rounded-full bg-brand-primary/90 px-2.5 py-0.5 text-[10px] font-bold text-brand-background backdrop-blur-sm shadow-sm">
                    Verified Helper
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Right: Pulse Line + Large Circular Bronze Rate Badge */}
            <div className="flex flex-col items-center lg:items-end">
              {/* Bronze Heartbeat Pulse Line */}
              <div className="mb-4 text-brand-secondary/80">
                <svg width="100" height="30" viewBox="0 0 100 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M2 15H22L30 4L38 26L46 8L52 20L58 15H98"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* Large Circular Brand Secondary (Bronze) Badge */}
              <div className="group relative flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-secondary to-[#8c6742] text-brand-background shadow-2xl shadow-brand-secondary/35 transition-transform duration-300 hover:scale-105">
                <span className="font-heading text-2xl font-black tracking-tight text-white">₹499</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                  Per Visit
                </span>

                {/* Floating Top-Right Mini Badge with Arrow */}
                <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-white text-brand-secondary shadow-md transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ── Demo Video Modal (Styled with HomeBeside Brand Tokens) ── */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-brand-accent/50 bg-brand-surface p-6 shadow-2xl">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-brand-sand/30 text-brand-ink hover:bg-brand-sand/50 transition-colors"
            >
              ✕
            </button>
            <h3 className="font-heading text-xl font-bold text-brand-ink">Experience HomeBeside</h3>
            <p className="mt-2 text-xs leading-relaxed text-brand-muted">
              Watch how our screened companions check in on elderly parents, collect prescriptions, and report back with live photographs.
            </p>
            <div className="mt-5 flex aspect-video w-full items-center justify-center rounded-2xl bg-brand-sand/25 text-brand-primary">
              <div className="flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-brand-background shadow-lg shadow-brand-primary/20">
                  <Play className="h-6 w-6 fill-current ml-1 text-brand-secondary" />
                </div>
                <span className="text-xs font-bold text-brand-ink">1-Minute Care Overview</span>
              </div>
            </div>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="rounded-full bg-brand-primary px-5 py-2 text-xs font-bold text-brand-background hover:bg-brand-ink transition-colors"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
