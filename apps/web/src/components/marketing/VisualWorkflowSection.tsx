"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  ShieldCheck,
  MapPin,
  Camera,
  Clock,
  ArrowRight,
  FileCheck2,
  UserCheck,
  Radio,
  Sparkles,
  PhoneCall,
} from "lucide-react";

interface WorkflowStep {
  id: number;
  num: string;
  badge: string;
  title: string;
  sub: string;
  tagColor: string;
}

const stepsMeta: WorkflowStep[] = [
  {
    id: 1,
    num: "01",
    badge: "Step 1",
    title: "1-Minute Request",
    sub: "Choose service & pick time slot",
    tagColor: "bg-brand-sand/60 text-brand-primary",
  },
  {
    id: 2,
    num: "02",
    badge: "Step 2",
    title: "Verified Helper Matched",
    sub: "Screened companion assigned in <15m",
    tagColor: "bg-amber-100 text-amber-900",
  },
  {
    id: 3,
    num: "03",
    badge: "Step 3",
    title: "Live Doorstep Visit",
    sub: "GPS verified check-in & progress",
    tagColor: "bg-emerald-100 text-emerald-900",
  },
  {
    id: 4,
    num: "04",
    badge: "Step 4",
    title: "Photo Report Back",
    sub: "Signed summary & photographic proof",
    tagColor: "bg-blue-100 text-blue-900",
  },
];

export default function VisualWorkflowSection() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section id="how" className="relative w-full overflow-hidden bg-brand-background py-20 lg:py-28">

      {/* ── Background Subtle Glow ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[130px] opacity-45"
          style={{
            background:
              "radial-gradient(circle, rgba(166, 124, 82, 0.16) 0%, rgba(46, 58, 47, 0.10) 50%, transparent 80%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-[clamp(1rem,3vw,2.5rem)]">

        {/* ══════════════════════════════════════════════════════
            SECTION HEADER
        ══════════════════════════════════════════════════════ */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-brand-accent/60 bg-brand-sand/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-secondary">
            Visual Workflow
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl lg:text-5xl">
            How a visit is arranged & reported
          </h2>
          <p className="mx-auto mt-3 max-w-[48ch] text-sm leading-relaxed text-brand-muted sm:text-base">
            From your phone to their doorstep. Fully documented, transparent, and verified.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            INTERACTIVE STEP PROGRESS BAR (4 Visual Nodes)
        ══════════════════════════════════════════════════════ */}
        <div className="mx-auto mb-12 max-w-4xl">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stepsMeta.map((s) => {
              const isSelected = activeStep === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveStep(s.id)}
                  className={`group relative flex flex-col rounded-2xl border p-3.5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-brand-primary bg-brand-surface shadow-lg shadow-brand-primary/10 ring-2 ring-brand-primary/20 scale-[1.02]"
                      : "border-brand-accent/50 bg-brand-surface/60 hover:bg-brand-surface hover:border-brand-primary/40"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-heading text-xl font-bold ${
                        isSelected ? "text-brand-primary" : "text-brand-muted/70"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.tagColor}`}
                    >
                      {s.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-bold text-brand-ink">{s.title}</p>
                  <p className="mt-0.5 text-[10px] text-brand-muted line-clamp-1">{s.sub}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            4 INTERACTIVE VISUAL STAGE CARDS (Rich Micro-UIs)
        ══════════════════════════════════════════════════════ */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {/* ── CARD 01: Request & Booking UI ── */}
          <div
            onClick={() => setActiveStep(1)}
            className={`group relative cursor-pointer overflow-hidden rounded-3xl border bg-brand-surface p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 ${
              activeStep === 1
                ? "border-brand-primary ring-2 ring-brand-primary/20 shadow-xl shadow-brand-primary/10"
                : "border-brand-accent/50 hover:border-brand-primary/40"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-brand-accent/30">
              <span className="font-heading text-xs font-bold text-brand-secondary">01 · REQUEST</span>
              <span className="rounded-full bg-brand-sand/50 px-2 py-0.5 text-[9px] font-bold text-brand-primary">
                Instant Lock
              </span>
            </div>

            {/* Visual Booking Widget */}
            <div className="mt-4 rounded-2xl border border-brand-accent/40 bg-gradient-to-b from-[#faf9f6] to-white p-3.5 space-y-2.5 shadow-sm">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-brand-muted">Service</span>
                <span className="font-bold text-brand-ink">Check-in on parents</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-brand-muted">Recipient</span>
                <span className="font-bold text-brand-ink truncate max-w-[120px]">Model Town, Ludhiana</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-brand-muted">Time Slot</span>
                <span className="rounded bg-brand-primary/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand-primary">
                  10:30 AM Tomorrow
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-brand-accent/30 pt-2 text-xs">
                <span className="font-bold text-brand-ink">Fixed Quote</span>
                <span className="font-heading font-black text-brand-primary">₹499</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>Zero surge pricing locked</span>
            </div>
          </div>

          {/* ── CARD 02: Helper Matching & ID Card ── */}
          <div
            onClick={() => setActiveStep(2)}
            className={`group relative cursor-pointer overflow-hidden rounded-3xl border bg-brand-surface p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 ${
              activeStep === 2
                ? "border-brand-primary ring-2 ring-brand-primary/20 shadow-xl shadow-brand-primary/10"
                : "border-brand-accent/50 hover:border-brand-primary/40"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-brand-accent/30">
              <span className="font-heading text-xs font-bold text-amber-800">02 · MATCHING</span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-bold text-amber-900">
                &lt; 15 Mins
              </span>
            </div>

            {/* Helper Identity Badge */}
            <div className="mt-4 rounded-2xl border border-brand-accent/40 bg-gradient-to-b from-[#faf9f6] to-white p-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white font-black text-sm">
                  HS
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white text-[8px] font-bold border-2 border-white">
                    ✓
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-bold text-brand-ink">Harpreet Singh</p>
                  <p className="text-[10px] text-brand-muted">ID: HB-8402 · Ludhiana Hub</p>
                </div>
              </div>

              {/* Clearances */}
              <div className="mt-3 space-y-1.5 border-t border-brand-accent/30 pt-2 text-[10px]">
                <div className="flex items-center justify-between text-brand-ink">
                  <span>Aadhaar Identity</span>
                  <span className="font-bold text-emerald-700">Verified ✓</span>
                </div>
                <div className="flex items-center justify-between text-brand-ink">
                  <span>Police Verification</span>
                  <span className="font-bold text-emerald-700">Passed ✓</span>
                </div>
                <div className="flex items-center justify-between text-brand-ink">
                  <span>Elder Care Etiquette</span>
                  <span className="font-bold text-brand-secondary">Certified</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-brand-primary bg-brand-sand/30 px-3 py-2 rounded-xl border border-brand-accent/40">
              <UserCheck className="h-4 w-4 shrink-0 text-brand-secondary" />
              <span>In-person interviewed staff</span>
            </div>
          </div>

          {/* ── CARD 03: Live Visit & Telemetry Widget ── */}
          <div
            onClick={() => setActiveStep(3)}
            className={`group relative cursor-pointer overflow-hidden rounded-3xl border bg-brand-surface p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 ${
              activeStep === 3
                ? "border-brand-primary ring-2 ring-brand-primary/20 shadow-xl shadow-brand-primary/10"
                : "border-brand-accent/50 hover:border-brand-primary/40"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-brand-accent/30">
              <span className="font-heading text-xs font-bold text-emerald-800">03 · LIVE VISIT</span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-900">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-ping" />
                Active Now
              </span>
            </div>

            {/* Live GPS Check-in Telemetry */}
            <div className="mt-4 rounded-2xl border border-brand-accent/40 bg-gradient-to-b from-[#faf9f6] to-white p-3.5 space-y-2.5 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-bold text-brand-ink">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                <span>Doorstep Check-in Confirmed</span>
              </div>

              {/* Mini Audio Pulse waveform */}
              <div className="rounded-xl bg-brand-surface p-2 border border-brand-accent/30">
                <p className="text-[9px] font-bold text-brand-muted">HELPER AUDIO UPDATE</p>
                <div className="mt-1 flex items-center gap-1">
                  {[8, 16, 22, 14, 26, 18, 10, 20, 12, 16].map((h, i) => (
                    <span
                      key={i}
                      className="w-1 rounded-full bg-brand-secondary"
                      style={{ height: `${h * 0.7}px` }}
                    />
                  ))}
                  <span className="ml-auto text-[9px] font-mono text-brand-muted">0:14s</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-brand-muted">
                <span>Arrival: 10:30 AM</span>
                <span className="font-bold text-brand-primary">On-site: 45 mins</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200">
              <Radio className="h-4 w-4 shrink-0 text-emerald-600 animate-pulse" />
              <span>Real-time milestone updates</span>
            </div>
          </div>

          {/* ── CARD 04: Photo Proof & Completion Sign-Off ── */}
          <div
            onClick={() => setActiveStep(4)}
            className={`group relative cursor-pointer overflow-hidden rounded-3xl border bg-brand-surface p-5 shadow-lg transition-all duration-300 hover:-translate-y-1.5 ${
              activeStep === 4
                ? "border-brand-primary ring-2 ring-brand-primary/20 shadow-xl shadow-brand-primary/10"
                : "border-brand-accent/50 hover:border-brand-primary/40"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-brand-accent/30">
              <span className="font-heading text-xs font-bold text-blue-800">04 · COMPLETION</span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-900">
                Full Report
              </span>
            </div>

            {/* Photo Proof & Report Card */}
            <div className="mt-4 rounded-2xl border border-brand-accent/40 bg-gradient-to-b from-[#faf9f6] to-white p-3.5 shadow-sm">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=500&q=80"
                  alt="Prescription verified photo"
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1.5 left-1.5 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[8px] font-bold text-white">
                  PHOTO PROOF · 10:48 AM
                </span>
              </div>

              <div className="mt-2.5 space-y-1 text-[10px]">
                <div className="flex items-center justify-between text-brand-ink">
                  <span>Prescription Collected</span>
                  <span className="font-bold text-emerald-700">Verified ✓</span>
                </div>
                <div className="flex items-center justify-between text-brand-ink">
                  <span>Vitals & Tea Shared</span>
                  <span className="font-bold text-emerald-700">Completed ✓</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-blue-950 bg-blue-50 px-3 py-2 rounded-xl border border-blue-200">
              <Camera className="h-4 w-4 shrink-0 text-blue-700" />
              <span>Sent directly to your phone</span>
            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════
            BOTTOM ACTION BUTTON
        ══════════════════════════════════════════════════════ */}
        <div className="mt-14 text-center">
          <Link
            href="/login"
            className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-brand-primary px-8 py-3.5 text-sm font-bold tracking-wide text-brand-background shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:bg-brand-ink hover:shadow-xl hover:shadow-brand-ink/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Book a Verified Helper in Ludhiana</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>

    </section>
  );
}
