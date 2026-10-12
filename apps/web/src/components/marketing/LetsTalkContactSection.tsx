"use client";

import React, { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

export default function LetsTalkContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Parent Check-in",
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-brand-background py-16 lg:py-24">
      {/* ── Brand Ambient Glow Orbs ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 h-[550px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-35"
          style={{
            background:
              "radial-gradient(circle, rgba(166, 124, 82, 0.25) 0%, rgba(46, 58, 47, 0.15) 50%, transparent 80%)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-[clamp(1rem,4vw,2.5rem)]">
        {/* ══════════════════════════════════════════════════════
            ORGANIC FLUID / WAVY BACKGROUND CONTAINER (Image 1 UI)
            Strictly styled in HomeBeside Forest Green & Bronze Theme
        ══════════════════════════════════════════════════════ */}
        <div className="relative rounded-[2.8rem] bg-gradient-to-br from-brand-primary via-[#243025] to-brand-primary p-4 sm:p-7 lg:p-10 shadow-2xl shadow-brand-primary/25 border border-brand-secondary/20">
          {/* Decorative Fluid SVG Lobes (Brand Theme) */}
          <div className="pointer-events-none absolute -left-4 top-1/4 hidden lg:block">
            <svg width="28" height="120" viewBox="0 0 28 120" fill="none">
              <path
                d="M28 0C12.5 0 0 13.5 0 30C0 46.5 12.5 60 28 60V120H28V0Z"
                fill="#2e3a2f"
              />
            </svg>
          </div>
          <div className="pointer-events-none absolute -right-4 bottom-1/4 hidden lg:block">
            <svg width="28" height="120" viewBox="0 0 28 120" fill="none">
              <path
                d="M0 120C15.5 120 28 106.5 28 90C28 73.5 15.5 60 0 60V0H0V120Z"
                fill="#2e3a2f"
              />
            </svg>
          </div>

          {/* Inner Warm Cream Surface Container (Matches HomeBeside Brand Canvas) */}
          <div className="relative overflow-hidden rounded-[2.2rem] bg-brand-surface p-7 sm:p-10 lg:p-14 shadow-inner border border-brand-accent/40">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14 items-center">
              {/* ──────────────────────────────────────────────
                  LEFT COLUMN: "Let's talk" & Form Inputs
              ────────────────────────────────────────────── */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-secondary/40 bg-brand-sand/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-secondary">
                  <Sparkles className="h-3 w-3 text-brand-secondary" />
                  <span>Direct Care Coordination</span>
                </div>

                <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-primary">
                  Let&apos;s talk
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted max-w-[48ch]">
                  Need a companion for your parents, medicine deliveries, or clinic visits in Ludhiana? Reach our human care desk directly.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-2xl border border-brand-secondary/40 bg-brand-sand/30 p-6 text-center shadow-sm">
                    <CheckCircle2 className="mx-auto h-11 w-11 text-brand-secondary" />
                    <h4 className="mt-3 font-heading text-lg font-bold text-brand-primary">
                      Thank you, {formData.name.split(" ")[0] || "Friend"}!
                    </h4>
                    <p className="mt-1 text-xs text-brand-muted max-w-sm mx-auto">
                      Our Ludhiana care coordinator has received your inquiry and will reach out promptly via phone or WhatsApp.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "Parent Check-in",
                          message: "",
                        });
                      }}
                      className="mt-4 text-xs font-bold text-brand-secondary underline hover:text-brand-primary cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-brand-ink/80 mb-1.5 pl-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jaspreet Kaur"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full rounded-full border border-brand-accent/70 bg-brand-background px-5 py-3 text-sm text-brand-ink placeholder:text-brand-muted/70 focus:border-brand-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 transition-all"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-semibold text-brand-ink/80 mb-1.5 pl-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-full border border-brand-accent/70 bg-brand-background px-5 py-3 text-sm text-brand-ink placeholder:text-brand-muted/70 focus:border-brand-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-semibold text-brand-ink/80 mb-1.5 pl-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-full border border-brand-accent/70 bg-brand-background px-5 py-3 text-sm text-brand-ink placeholder:text-brand-muted/70 focus:border-brand-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 transition-all"
                        />
                      </div>

                      {/* Service Required */}
                      <div>
                        <label className="block text-xs font-semibold text-brand-ink/80 mb-1.5 pl-1">
                          Assistance Needed
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full rounded-full border border-brand-accent/70 bg-brand-background px-5 py-3 text-sm text-brand-ink focus:border-brand-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 transition-all cursor-pointer"
                        >
                          <option value="Parent Check-in">Parent Wellbeing Check-in</option>
                          <option value="Hospital Accompaniment">Hospital & Doctor Visit</option>
                          <option value="Medicine Collection">Medicine & Pharmacy Run</option>
                          <option value="Companion Walk">Companion Visits & Conversation</option>
                          <option value="General Inquiry">General / Pricing Questions</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs font-semibold text-brand-ink/80 mb-1.5 pl-1">
                        Your Message / Neighbourhood in Ludhiana
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us what help your family needs (e.g. Model Town, scheduled days)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full rounded-3xl border border-brand-accent/70 bg-brand-background p-5 text-sm text-brand-ink placeholder:text-brand-muted/70 focus:border-brand-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 transition-all resize-none"
                      />
                    </div>

                    {/* Submit CTA Pill */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="submit"
                        className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-brand-primary px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-brand-background shadow-lg shadow-brand-primary/25 transition-all duration-300 hover:bg-brand-secondary hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      >
                        <span>Send Message</span>
                        <Send className="h-3.5 w-3.5 text-brand-accent" />
                      </button>

                      <span className="text-[11px] text-brand-muted italic">
                        🔒 Confidential & human-coordinated.
                      </span>
                    </div>
                  </form>
                )}
              </div>

              {/* ──────────────────────────────────────────────
                  RIGHT COLUMN: Rich Visual Illustration in Brand Palette
              ────────────────────────────────────────────── */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-left">
                {/* Visual Envelope & Plane Graphic in Brand Palette */}
                <div className="relative mb-8 h-48 w-48 sm:h-56 sm:w-56 flex items-center justify-center">
                  {/* Ambient Light Halo */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-sand/50 via-brand-accent/40 to-brand-secondary/30 blur-xl opacity-80" />

                  {/* Circle Illustration Canvas */}
                  <div className="relative flex h-40 w-40 sm:h-48 sm:w-48 items-center justify-center rounded-full bg-brand-background border border-brand-accent/60 shadow-inner">
                    {/* Letter / Envelope SVG */}
                    <svg className="h-24 w-28 drop-shadow-md" viewBox="0 0 112 96" fill="none">
                      {/* Paper Letter extending from envelope */}
                      <rect
                        x="22"
                        y="8"
                        width="68"
                        height="52"
                        rx="6"
                        fill="#ffffff"
                        stroke="#d9cbb9"
                        strokeWidth="2"
                      />
                      <line x1="32" y1="22" x2="68" y2="22" stroke="#a67c52" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="32" y1="32" x2="80" y2="32" stroke="#d9cbb9" strokeWidth="2" strokeLinecap="round" />
                      <line x1="32" y1="42" x2="64" y2="42" stroke="#d9cbb9" strokeWidth="2" strokeLinecap="round" />

                      {/* Envelope Body */}
                      <path
                        d="M10 38C10 33.5786 13.5786 30 18 30H94C98.4214 30 102 33.5786 102 38V82C102 86.4214 98.4214 90 94 90H18C13.5786 90 10 86.4214 10 82V38Z"
                        fill="#2e3a2f"
                      />
                      {/* Envelope Flap / Triangle */}
                      <path
                        d="M10 34L56 64L102 34"
                        stroke="#a67c52"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    {/* Floating Paper Airplane (Brand Bronze) */}
                    <div className="absolute -top-2 -right-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-secondary text-brand-background shadow-lg shadow-brand-secondary/40 transform rotate-12">
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>

                    {/* Floating Notification Bell Badge */}
                    <div className="absolute -top-3 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-secondary text-brand-background shadow-md border border-brand-surface">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                      </svg>
                    </div>

                    {/* Floating Chat Bubble Badge */}
                    <div className="absolute -bottom-2 -left-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-brand-accent shadow-md border border-brand-surface">
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                      </svg>
                    </div>

                    {/* Decorative Theme Confetti */}
                    <span className="absolute top-8 -left-4 h-2 w-2 rounded-full bg-brand-secondary" />
                    <span className="absolute bottom-6 right-2 h-2.5 w-2.5 rounded-full bg-brand-accent" />
                    <span className="absolute top-3 right-12 h-1.5 w-1.5 rounded-full bg-brand-primary" />
                    <span className="absolute -bottom-1 right-12 text-[10px] text-brand-secondary font-bold">✦</span>
                    <span className="absolute top-12 right-0 text-[10px] text-brand-primary font-bold">✕</span>
                  </div>
                </div>

                {/* Local Contact Information Rows */}
                <div className="space-y-3.5 text-xs text-brand-ink/80 w-full max-w-[320px]">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-sand/50 text-brand-primary">
                      <MapPin className="h-3.5 w-3.5" />
                    </span>
                    <span>Model Town, Ludhiana, Punjab 141002</span>
                  </div>

                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-sand/50 text-brand-primary">
                      <Phone className="h-3.5 w-3.5" />
                    </span>
                    <a href="tel:+919876543210" className="hover:text-brand-secondary font-bold text-brand-ink">
                      +91 98765 43210 (Care Desk)
                    </a>
                  </div>

                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-sand/50 text-brand-primary">
                      <Mail className="h-3.5 w-3.5" />
                    </span>
                    <a href="mailto:care@homebeside.in" className="hover:text-brand-secondary font-bold text-brand-ink">
                      care@homebeside.in
                    </a>
                  </div>
                </div>

                {/* Social Quick-Access Buttons in Brand Tones */}
                <div className="mt-6 flex items-center gap-2.5">
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-brand-background shadow-md hover:bg-brand-secondary transition-all hover:scale-110 border border-brand-secondary/30"
                  >
                    <MessageCircle className="h-4 w-4 text-brand-accent" />
                  </a>
                  <a
                    href="tel:+919876543210"
                    aria-label="Call"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-secondary text-brand-background shadow-md hover:bg-brand-primary transition-all hover:scale-110 border border-brand-accent/40"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href="mailto:care@homebeside.in"
                    aria-label="Email"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-surface text-brand-primary shadow-md hover:bg-brand-sand/40 transition-all hover:scale-110 border border-brand-accent/60"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
