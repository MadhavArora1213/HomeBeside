"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, MapPin, Sparkles } from "lucide-react";

interface ServiceItem {
  id: string;
  num: string;
  name: string;
  tag: string;
  note: string;
  image: string;
  aspect: string;
  offsetY?: string;
}

const servicesData: ServiceItem[] = [
  // ── Top Row (Above Center Anchor) ──
  {
    id: "checkin",
    num: "01",
    name: "Check-in on parents",
    tag: "Care & Comfort",
    note: "Scheduled in-person visit to inspect wellbeing, home condition, vitals, and share live photo updates with family.",
    image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[4/5]",
    offsetY: "lg:translate-y-6",
  },
  {
    id: "hospital",
    num: "02",
    name: "Hospital accompaniment",
    tag: "Healthcare",
    note: "Dedicated companion for doctor appointments, navigating clinic queues, lab tests, and a secure ride home.",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[3/4]",
    offsetY: "lg:-translate-y-8",
  },
  {
    id: "medicine",
    num: "03",
    name: "Medicine & essentials",
    tag: "Delivery",
    note: "Pickups from verified local pharmacies, prescription validation, and safe doorstep delivery.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[4/5]",
    offsetY: "lg:translate-y-2",
  },
  {
    id: "companion",
    num: "04",
    name: "Companion visits",
    tag: "Wellbeing",
    note: "Respectful conversation, sharing tea, garden walks, and attentive companionship for elderly parents.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[3/5]",
    offsetY: "lg:-translate-y-12",
  },
  {
    id: "errands",
    num: "05",
    name: "Everyday chores & errands",
    tag: "Support",
    note: "Utility bill payments, grocery market shopping, post office tasks, and household errands.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[4/5]",
    offsetY: "lg:translate-y-8",
  },

  // ── Bottom Row (Below Center Anchor) ──
  {
    id: "technician",
    num: "06",
    name: "Technician supervision",
    tag: "Home Safety",
    note: "A trusted presence at home while electricians, plumbers, or service technicians complete repairs.",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[4/5]",
    offsetY: "lg:translate-y-4",
  },
  {
    id: "digital",
    num: "07",
    name: "Digital assistance",
    tag: "Assistance",
    note: "Patient guidance for smartphones, setting up family video calls with children living afar, and apps.",
    image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[3/4]",
    offsetY: "lg:-translate-y-6",
  },
  {
    id: "documents",
    num: "08",
    name: "Document & administrative help",
    tag: "Advisory",
    note: "Guidance with pension forms, official paperwork, bank queues, and administrative submissions.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[4/5]",
    offsetY: "lg:translate-y-2",
  },
  {
    id: "urgent",
    num: "09",
    name: "Urgent non-emergency support",
    tag: "Priority",
    note: "Priority local support when an unexpected non-medical situation requires quick on-site attention.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[3/5]",
    offsetY: "lg:-translate-y-8",
  },
  {
    id: "pilot",
    num: "10",
    name: "Ludhiana field operations",
    tag: "Pilot Hub",
    note: "Dedicated local operations coordinators ensuring in-person vetting, live monitoring, and quality care.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=700&q=80",
    aspect: "aspect-[4/5]",
    offsetY: "lg:translate-y-6",
  },
];

export default function EditorialServicesSection() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const topRow = servicesData.slice(0, 5);
  const bottomRow = servicesData.slice(5, 10);

  return (
    <section id="services" className="relative w-full overflow-hidden bg-brand-background py-20 lg:py-28">

      {/* ── Soft Ambient Glow ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 h-[650px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(166, 124, 82, 0.16) 0%, rgba(46, 58, 47, 0.10) 50%, transparent 80%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-[clamp(1rem,3vw,2.5rem)]">

        {/* ══════════════════════════════════════════════════════
            1. TOP ASYMMETRIC MASONRY ROW
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6 items-end">
          {topRow.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedService(item)}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-brand-accent/50 bg-brand-surface p-2 shadow-lg shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/15 ${item.offsetY || ""}`}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden rounded-2xl`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-85 transition-opacity group-hover:opacity-95" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center justify-between w-[calc(100%-20px)]">
                  <span className="rounded-full bg-brand-background/90 px-2 py-0.5 text-[9px] font-bold text-brand-primary backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <span className="font-heading text-[11px] font-bold text-white/90">
                    {item.num}
                  </span>
                </div>

                {/* Bottom Title */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <p className="text-xs font-bold text-white leading-tight drop-shadow-sm">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════
            2. CENTER TYPOGRAPHIC ANCHOR & CTA (Exact Layout from Image)
        ══════════════════════════════════════════════════════ */}
        <div className="my-16 lg:my-24 text-center">
          <div className="mx-auto max-w-3xl">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/60 bg-brand-sand/40 px-4 py-1.5 shadow-sm mb-4">
              <span className="h-2 w-2 rounded-full bg-brand-secondary animate-pulse" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
                Our Services
              </span>
            </div>

            {/* Main Headline */}
            <h2
              className="font-heading font-bold tracking-tight text-brand-primary"
              style={{ fontSize: "clamp(2.3rem, 4.8vw, 3.8rem)", lineHeight: 1.15 }}
            >
              Our Services <br />
              <span className="font-heading font-normal italic text-brand-secondary">
                Thoughtful care for your family
              </span>
            </h2>

            {/* Subtitle */}
            <p className="mx-auto mt-4 max-w-[50ch] text-sm leading-relaxed text-brand-muted sm:text-base">
              Non-emergency assistance arranged with screened, respectful local helpers in Ludhiana. Tracked in real time with transparent photographic report backs.
            </p>

            {/* Pill CTA Button (Direct Reference Style) */}
            <div className="mt-8 flex justify-center">
              <Link
                href="/login"
                className="group inline-flex items-center gap-3 rounded-full bg-brand-primary px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-brand-background shadow-xl shadow-brand-primary/20 transition-all duration-300 hover:bg-brand-ink hover:shadow-2xl hover:shadow-brand-ink/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                <span>Explore all 9 care services</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════
            3. BOTTOM ASYMMETRIC MASONRY ROW
        ══════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6 items-start">
          {bottomRow.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedService(item)}
              className={`group relative cursor-pointer overflow-hidden rounded-3xl border border-brand-accent/50 bg-brand-surface p-2 shadow-lg shadow-brand-primary/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/15 ${item.offsetY || ""}`}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden rounded-2xl`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-85 transition-opacity group-hover:opacity-95" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5 flex items-center justify-between w-[calc(100%-20px)]">
                  <span className="rounded-full bg-brand-background/90 px-2 py-0.5 text-[9px] font-bold text-brand-primary backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <span className="font-heading text-[11px] font-bold text-white/90">
                    {item.num}
                  </span>
                </div>

                {/* Bottom Title */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <p className="text-xs font-bold text-white leading-tight drop-shadow-sm">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ── Interactive Service Modal ── */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-ink/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl border border-brand-accent bg-brand-surface p-6 shadow-2xl">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-brand-sand/30 text-brand-ink hover:bg-brand-sand/50"
            >
              ✕
            </button>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-brand-primary/10 px-2.5 py-0.5 text-xs font-bold text-brand-primary">
                {selectedService.tag}
              </span>
              <span className="font-heading text-xs font-semibold text-brand-muted">
                Service #{selectedService.num}
              </span>
            </div>

            <h3 className="mt-3 font-heading text-xl font-bold text-brand-ink">
              {selectedService.name}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              {selectedService.note}
            </p>

            <div className="mt-5 rounded-2xl border border-brand-accent/40 bg-brand-sand/20 p-3.5 text-xs text-brand-ink space-y-2">
              <div className="flex items-center gap-2 text-brand-primary font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Verified companion matched within 15 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-brand-secondary font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>Photo verification report shared upon completion</span>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-brand-accent/30 pt-4">
              <div>
                <p className="text-[10px] uppercase font-bold text-brand-muted">Standard Pilot Rate</p>
                <p className="font-heading text-base font-bold text-brand-primary">₹499 / Visit</p>
              </div>

              <Link
                href="/login"
                className="rounded-full bg-brand-primary px-5 py-2.5 text-xs font-bold text-brand-background shadow-md hover:bg-brand-ink"
              >
                Book This Service
              </Link>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
