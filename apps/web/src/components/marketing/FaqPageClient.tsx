"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  ShieldCheck,
  MapPin,
  Clock,
  HeartHandshake,
  Receipt,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Phone,
  MessageCircle,
  Sparkles,
  ChevronDown,
  ArrowRight,
  ThumbsUp,
  FileText,
  Building2,
  Stethoscope,
  Users,
} from "lucide-react";

interface FaqItem {
  id: string;
  category: "trust" | "pilot" | "services" | "pricing" | "clarity";
  categoryLabel: string;
  question: string;
  answerText: string;
  visualGraphic?: React.ReactNode;
  tags: string[];
}

const allFaqs: FaqItem[] = [
  // ── 1. Trust & Safety ──
  {
    id: "trust-1",
    category: "trust",
    categoryLabel: "Safety & Verification",
    question: "How are HomeBeside helpers screened and background verified?",
    answerText:
      "Every single helper undergoes mandatory physical identity verification with Aadhaar biometric checks, neighborhood reference validation, formal police clearance certificates, and in-person behavioral standards training.",
    visualGraphic: (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px]">
        <div className="flex items-center gap-1.5 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary shrink-0" />
          <span>Biometric KYC</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary shrink-0" />
          <span>Police Record</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary shrink-0" />
          <span>Local References</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary shrink-0" />
          <span>Care Training</span>
        </div>
      </div>
    ),
    tags: ["police", "aadhaar", "screening", "safety", "trust", "background"],
  },
  {
    id: "trust-2",
    category: "trust",
    categoryLabel: "Safety & Verification",
    question: "Is every helper visit traceable in real time with photo updates?",
    answerText:
      "Yes. Check-in timestamps, total on-site duration, live visit checkpoints, and photograph verification reports are sent directly to your phone or WhatsApp report upon task completion.",
    visualGraphic: (
      <div className="rounded-xl bg-brand-sand/30 border border-brand-accent/70 p-3 text-xs space-y-1.5">
        <div className="flex justify-between items-center text-brand-primary font-semibold">
          <span>📍 GPS Check-in Timestamp:</span>
          <span className="font-mono text-brand-secondary font-bold">10:14 AM IST</span>
        </div>
        <div className="flex justify-between items-center text-brand-primary font-semibold">
          <span>📸 Photo Verification of Visit:</span>
          <span className="text-brand-secondary font-bold">Verified on WhatsApp</span>
        </div>
        <div className="flex justify-between items-center text-brand-primary font-semibold">
          <span>⏱️ Doorstep On-Site Duration:</span>
          <span className="font-mono text-brand-secondary font-bold">1 hr 45 min</span>
        </div>
      </div>
    ),
    tags: ["gps", "tracking", "report", "photos", "timestamp", "whatsapp"],
  },
  {
    id: "trust-3",
    category: "trust",
    categoryLabel: "Safety & Verification",
    question: "How is my family's address and personal data protected?",
    answerText:
      "Addresses, contact numbers, and health notes are stored with strict 256-bit encryption. Helpers only receive necessary task details during active visit windows, and data is never sold or shared with third parties.",
    tags: ["privacy", "security", "encryption", "confidential"],
  },

  // ── 2. Pilot & Coverage ──
  {
    id: "pilot-1",
    category: "pilot",
    categoryLabel: "Ludhiana Pilot",
    question: "Which residential sectors in Ludhiana are currently covered?",
    answerText:
      "Our launch pilot is live in selected high-density residential sectors across Ludhiana, managed by on-the-ground zone managers.",
    visualGraphic: (
      <div className="flex flex-wrap gap-1.5 pt-1">
        {["Model Town", "Sarabha Nagar", "BRS Nagar", "Civil Lines", "Aggar Nagar", "South City", "Ferozepur Rd"].map(
          (sector) => (
            <span
              key={sector}
              className="inline-flex items-center gap-1 rounded-full bg-brand-sand/40 px-2.5 py-1 text-[11px] font-medium text-brand-primary border border-brand-accent/70"
            >
              <MapPin className="h-3 w-3 text-brand-secondary" /> {sector}
            </span>
          )
        )}
      </div>
    ),
    tags: ["ludhiana", "punjab", "model town", "sarabha nagar", "coverage", "sectors", "location"],
  },
  {
    id: "pilot-2",
    category: "pilot",
    categoryLabel: "Ludhiana Pilot",
    question: "How quickly can a companion arrive at my parents' home?",
    answerText:
      "You can pre-book visits days in advance for guaranteed schedules, or request urgent zone dispatch with 2 to 4 hours advance notice depending on real-time helper zone density.",
    visualGraphic: (
      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
        <div className="rounded-lg bg-brand-surface p-2.5 border border-brand-accent/60">
          <p className="font-bold text-brand-primary">Pre-Scheduled Slot</p>
          <p className="text-[11px] text-brand-muted mt-0.5">1 to 7 days ahead • 100% Guaranteed</p>
        </div>
        <div className="rounded-lg bg-brand-surface p-2.5 border border-brand-accent/60">
          <p className="font-bold text-brand-primary">Fast Zone Request</p>
          <p className="text-[11px] text-brand-muted mt-0.5">2 to 4 hours notice • Real-time matching</p>
        </div>
      </div>
    ),
    tags: ["timing", "speed", "hours", "advance", "booking", "schedule"],
  },
  {
    id: "pilot-3",
    category: "pilot",
    categoryLabel: "Ludhiana Pilot",
    question: "Can I request the exact same familiar helper for recurring visits?",
    answerText:
      "Yes! Wherever possible, our local coordinators assign a familiar, trusted companion for recurring visits so your parents feel comfortable seeing a recognized face.",
    tags: ["recurring", "same helper", "familiar", "continuity", "elderly"],
  },

  // ── 3. Services & Scope ──
  {
    id: "services-1",
    category: "services",
    categoryLabel: "Care Offerings",
    question: "What specific tasks can a companion assist my parents with?",
    answerText:
      "Our helpers provide friendly non-emergency companionship and home assistance designed to ease daily living for elders.",
    visualGraphic: (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
        <div className="flex items-center gap-2 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <span>🩺</span> <span className="font-medium text-brand-primary">Vitals check-in</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <span>🏥</span> <span className="font-medium text-brand-primary">Doctor escort</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <span>💊</span> <span className="font-medium text-brand-primary">Chemist pickup</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <span>🛒</span> <span className="font-medium text-brand-primary">Grocery errands</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <span>📱</span> <span className="font-medium text-brand-primary">Video calls help</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-brand-surface p-2 border border-brand-accent/60">
          <span>☕</span> <span className="font-medium text-brand-primary">Tea & conversation</span>
        </div>
      </div>
    ),
    tags: ["doctor", "medicine", "grocery", "video call", "tea", "tasks", "services"],
  },
  {
    id: "services-2",
    category: "services",
    categoryLabel: "Care Offerings",
    question: "Will the companion accompany my parents to hospital or clinic queues?",
    answerText:
      "Yes. The companion meets your parent, travels with them safely, assists with clinic registration tokens, holds medicine reports, accompanies them during doctor consultation, and escorts them safely back home.",
    tags: ["hospital", "doctor", "clinic", "token", "queue", "escort"],
  },
  {
    id: "services-3",
    category: "services",
    categoryLabel: "Care Offerings",
    question: "Can helpers supervise home technicians or utility workers?",
    answerText:
      "Yes. Having an accountable HomeBeside companion present when electricians, plumbers, or AC technicians visit ensures elderly parents are never left feeling vulnerable alone.",
    tags: ["technician", "plumber", "electrician", "supervision", "safety"],
  },

  // ── 4. Pricing & Transparency ──
  {
    id: "pricing-1",
    category: "pricing",
    categoryLabel: "Transparent Pricing",
    question: "How does transparent pricing work for HomeBeside visits?",
    answerText:
      "Pricing is locked upfront before confirmation. Standard pilot visits start at flat ₹499 with zero hidden surge multipliers, fuel surcharges, or cash tipping requirements.",
    visualGraphic: (
      <div className="rounded-xl border border-brand-secondary/40 bg-brand-surface p-3 text-xs space-y-1.5">
        <div className="flex justify-between items-center font-bold text-brand-primary">
          <span>Pilot Standard Visit (up to 2 hrs):</span>
          <span className="text-brand-secondary text-sm">₹499 Flat</span>
        </div>
        <div className="flex justify-between items-center text-brand-muted">
          <span>WhatsApp Completion Report & Photos:</span>
          <span className="text-brand-primary font-semibold">₹0 (Free)</span>
        </div>
        <div className="flex justify-between items-center text-brand-muted">
          <span>Dedicated Coordinator Zone Support:</span>
          <span className="text-brand-primary font-semibold">₹0 (Free)</span>
        </div>
      </div>
    ),
    tags: ["pricing", "cost", "499", "flat", "receipt", "surcharge", "fees"],
  },
  {
    id: "pricing-2",
    category: "pricing",
    categoryLabel: "Transparent Pricing",
    question: "When am I charged, and what is your cancellation policy?",
    answerText:
      "Payment is confirmed securely online upon booking. If your family needs to cancel or reschedule, visits cancelled at least 4 hours before the slot receive a 100% full refund or credit.",
    tags: ["payment", "refund", "cancellation", "credit", "reschedule"],
  },
  {
    id: "pricing-3",
    category: "pricing",
    categoryLabel: "Transparent Pricing",
    question: "Are there any monthly subscription commitments required?",
    answerText:
      "No! You can book single visits on an as-needed basis. Optional discounted visit packs are available for families who need regular recurring weekly visits.",
    tags: ["subscription", "commitment", "packs", "recurring", "monthly"],
  },

  // ── 5. What We Are Not ──
  {
    id: "clarity-1",
    category: "clarity",
    categoryLabel: "What We Are Not",
    question: "Is HomeBeside an emergency ambulance or medical triage service?",
    answerText:
      "No. HomeBeside is strictly non-emergency family assistance. For any acute medical emergency, chest pain, or trauma, please dial 112 or local hospital ambulances immediately.",
    visualGraphic: (
      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
        <div className="rounded-xl border border-brand-emergency/40 bg-brand-emergency/10 p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-emergency">🚨 Emergency EMS</span>
          <p className="mt-0.5 text-[11px] text-brand-ink/80 font-medium">Dial 112 or local hospital casualty.</p>
        </div>
        <div className="rounded-xl border border-brand-secondary/40 bg-brand-sand/30 p-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-secondary">🌿 HomeBeside Domain</span>
          <p className="mt-0.5 text-[11px] text-brand-primary font-medium">Scheduled companionship & errands.</p>
        </div>
      </div>
    ),
    tags: ["emergency", "ambulance", "112", "hospital", "triage", "not"],
  },
  {
    id: "clarity-2",
    category: "clarity",
    categoryLabel: "What We Are Not",
    question: "Are your companions certified nurses or medical doctors?",
    answerText:
      "No. Our helpers are compassionate companions and practical home helpers. They do not administer IVs, prescribe medications, or diagnose illnesses.",
    tags: ["doctor", "nurse", "medical", "treatment", "clinical", "not"],
  },
  {
    id: "clarity-3",
    category: "clarity",
    categoryLabel: "What We Are Not",
    question: "Is HomeBeside an open, unvetted gig marketplace?",
    answerText:
      "No. We never post open jobs on public gig boards. Every companion is directly trained, background-vetted, and accountable to our Ludhiana operations coordinators.",
    tags: ["gig", "marketplace", "unvetted", "open board", "accountability"],
  },
];

export default function FaqPageClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expandedIds, setExpandedIds] = useState<string[]>(["trust-1", "pricing-1", "clarity-1"]);
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter((item) => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const markHelpful = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setHelpfulFeedback((prev) => ({ ...prev, [id]: true }));
  };

  // Filter logic
  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((faq) => {
      const matchesCategory =
        selectedCategory === "all" || faq.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const inQuestion = faq.question.toLowerCase().includes(query);
      const inAnswer = faq.answerText.toLowerCase().includes(query);
      const inCategory = faq.categoryLabel.toLowerCase().includes(query);
      const inTags = faq.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && (inQuestion || inAnswer || inCategory || inTags);
    });
  }, [searchQuery, selectedCategory]);

  const categoryPills = [
    { id: "all", label: "All Questions", count: allFaqs.length },
    { id: "trust", label: "🛡️ Safety & Vetting", count: allFaqs.filter((f) => f.category === "trust").length },
    { id: "pilot", label: "📍 Ludhiana Pilot", count: allFaqs.filter((f) => f.category === "pilot").length },
    { id: "services", label: "🤝 Care Offerings", count: allFaqs.filter((f) => f.category === "services").length },
    { id: "pricing", label: "💳 Pricing & Billing", count: allFaqs.filter((f) => f.category === "pricing").length },
    { id: "clarity", label: "⚠️ What We Are Not", count: allFaqs.filter((f) => f.category === "clarity").length },
  ];

  return (
    <div className="bg-brand-background min-h-screen text-brand-ink selection:bg-brand-secondary/30 selection:text-brand-primary">
      {/* ══════════════════════════════════════════════════════
          1. EDITORIAL VISUAL HERO & LIVE KNOWLEDGE SEARCH
      ══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-background via-[#f6f2ec] to-brand-surface pt-16 pb-14 lg:pt-22 lg:pb-20 border-b border-brand-accent/40">
        {/* Ambient Warm Bronze Radial Orb */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -top-32 left-1/2 h-[500px] w-[950px] -translate-x-1/2 rounded-full blur-[140px] opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(166, 124, 82, 0.22) 0%, rgba(217, 203, 185, 0.3) 50%, transparent 80%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-4xl px-[clamp(1rem,4vw,2rem)] text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/40 bg-brand-sand/35 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-secondary shadow-xs">
            <Sparkles className="h-3.5 w-3.5 text-brand-secondary" />
            <span>Family Care Knowledge Hub</span>
          </div>

          <h1 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-primary">
            Curated answers,{" "}
            <span className="italic font-normal text-brand-secondary">in crystal clarity.</span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-brand-muted">
            Everything thoughtful families ask about helper vetting, Ludhiana pilot sectors, transparent pricing, and daily companionship.
          </p>

          {/* ── High-Visibility Interactive Search Bar ── */}
          <div className="mt-8 relative mx-auto max-w-2xl">
            <div className="relative flex items-center rounded-full border-2 border-brand-accent/80 bg-brand-surface px-5 py-2.5 shadow-lg shadow-brand-primary/5 transition-all duration-300 focus-within:border-brand-secondary focus-within:ring-4 focus-within:ring-brand-secondary/15">
              <Search className="h-5 w-5 text-brand-secondary shrink-0" />
              <input
                type="text"
                placeholder="Search answers (e.g. 'police verification', '₹499', 'Model Town', 'emergency')..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-3 py-1.5 text-sm sm:text-base text-brand-ink placeholder:text-brand-muted/70 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="rounded-full p-1 text-brand-muted hover:bg-brand-sand/40 hover:text-brand-primary"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Quick Keyword Suggestions */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs text-brand-muted">
              <span>Popular searches:</span>
              {["Aadhaar KYC", "Ludhiana Pilot", "₹499 Rate", "Doctor Visits", "Emergency"].map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => setSearchQuery(keyword)}
                  className="rounded-full bg-brand-surface border border-brand-accent/60 px-2.5 py-0.5 text-brand-primary hover:border-brand-secondary hover:text-brand-secondary transition-colors cursor-pointer"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          2. VISUAL "WHAT WE ARE VS WHAT WE ARE NOT" CLARITY MATRIX
      ══════════════════════════════════════════════════════ */}
      <section className="border-b border-brand-accent/40 bg-brand-surface px-[clamp(1rem,4vw,2rem)] py-14 lg:py-18">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary">
              Essential Ground Rules
            </span>
            <h2 className="mt-2 font-heading text-2xl sm:text-3xl font-bold text-brand-primary">
              Clear Boundaries for Family Peace of Mind
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-brand-muted">
              We believe in 100% honesty before you book. Here is precisely what we do — and what we don’t.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Rule 1: Emergency */}
            <div className="rounded-2xl border border-brand-accent/70 bg-brand-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-brand-emergency/15 text-brand-emergency flex items-center justify-center shrink-0 border border-brand-emergency/30">
                  <XCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-brand-emergency">
                    WE ARE NOT: An Emergency Ambulance Service
                  </h3>
                  <p className="mt-1 text-xs text-brand-muted leading-relaxed">
                    We do not perform acute trauma rescue or emergency medical transport. In any urgent crisis, please call <strong>112</strong> or your local hospital ambulance directly.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-accent/40 flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary" />
                </div>
                <p className="text-xs text-brand-primary font-medium">
                  <strong>INSTEAD:</strong> We provide dignified, scheduled in-person companion visits, vitals checks, pharmacy pickups, and doctor appointment accompaniment.
                </p>
              </div>
            </div>

            {/* Rule 2: Unvetted Gig App */}
            <div className="rounded-2xl border border-brand-accent/70 bg-brand-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-brand-emergency/15 text-brand-emergency flex items-center justify-center shrink-0 border border-brand-emergency/30">
                  <XCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-brand-emergency">
                    WE ARE NOT: An Anonymous Gig Marketplace
                  </h3>
                  <p className="mt-1 text-xs text-brand-muted leading-relaxed">
                    We never post your home address to an open app board of random taskers. Zero unverified strangers enter your family home.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-accent/40 flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary" />
                </div>
                <p className="text-xs text-brand-primary font-medium">
                  <strong>INSTEAD:</strong> Every helper is 100% background-verified with Aadhaar KYC, clean police clearance, and trained by HomeBeside coordinators.
                </p>
              </div>
            </div>

            {/* Rule 3: Clinical Care */}
            <div className="rounded-2xl border border-brand-accent/70 bg-brand-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-brand-emergency/15 text-brand-emergency flex items-center justify-center shrink-0 border border-brand-emergency/30">
                  <XCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-brand-emergency">
                    WE ARE NOT: Clinical Doctors or ICU Nurses
                  </h3>
                  <p className="mt-1 text-xs text-brand-muted leading-relaxed">
                    Our companions do not diagnose illnesses, prescribe pharmaceutical doses, or perform clinical operations.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-accent/40 flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary" />
                </div>
                <p className="text-xs text-brand-primary font-medium">
                  <strong>INSTEAD:</strong> We help elders navigate hospital tokens, sit with them during clinic waits, pick up prescriptions, and ensure safe return.
                </p>
              </div>
            </div>

            {/* Rule 4: Hidden Surcharges */}
            <div className="rounded-2xl border border-brand-accent/70 bg-brand-background p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-brand-emergency/15 text-brand-emergency flex items-center justify-center shrink-0 border border-brand-emergency/30">
                  <XCircle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-brand-emergency">
                    WE ARE NOT: Surging or Invoicing Surprise Fees
                  </h3>
                  <p className="mt-1 text-xs text-brand-muted leading-relaxed">
                    No surge multipliers, peak time penalties, or doorstep cash negotiations that cause awkwardness for elderly parents.
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-accent/40 flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brand-secondary" />
                </div>
                <p className="text-xs text-brand-primary font-medium">
                  <strong>INSTEAD:</strong> Transparent flat rates locked upfront at ₹499 for pilot visits, complete with digital WhatsApp reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          3. CATEGORIZED VISUAL KNOWLEDGE GRID & DYNAMIC FILTER
      ══════════════════════════════════════════════════════ */}
      <section className="px-[clamp(1rem,4vw,2rem)] py-16 lg:py-24">
        <div className="mx-auto max-w-6xl">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {categoryPills.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-brand-primary text-brand-background shadow-md shadow-brand-primary/20 scale-105 border border-brand-secondary/40"
                    : "bg-brand-surface text-brand-ink/80 hover:bg-brand-sand/30 hover:border-brand-secondary border border-brand-accent/70"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                    selectedCategory === cat.id
                      ? "bg-brand-secondary text-brand-background"
                      : "bg-brand-sand/50 text-brand-muted"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Result Counter */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-brand-accent/40 text-xs text-brand-muted">
            <span className="font-medium">
              Showing <strong>{filteredFaqs.length}</strong> of {allFaqs.length} documented questions
              {searchQuery && (
                <span>
                  {" "}
                  matching &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </span>
              )}
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="hover:text-brand-primary underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>

          {/* Cards Grid */}
          {filteredFaqs.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-brand-accent/80 bg-brand-surface p-12 text-center my-8">
              <AlertTriangle className="mx-auto h-10 w-10 text-brand-secondary" />
              <h3 className="mt-3 font-heading text-lg font-bold text-brand-primary">
                No matching answers found
              </h3>
              <p className="mt-1 text-xs text-brand-muted max-w-sm mx-auto">
                We couldn&apos;t find an answer for &ldquo;{searchQuery}&rdquo;. Try another term, or message our Ludhiana care desk directly.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="rounded-full bg-brand-primary text-brand-background px-5 py-2 text-xs font-bold"
                >
                  Clear Search
                </button>
                <Link
                  href="/contact"
                  className="rounded-full bg-brand-surface border border-brand-accent/70 text-brand-primary hover:border-brand-secondary px-5 py-2 text-xs font-semibold"
                >
                  Contact Desk
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isExpanded = expandedIds.includes(faq.id);
                const isHelpful = helpfulFeedback[faq.id];

                return (
                  <div
                    key={faq.id}
                    className="group rounded-2xl border border-brand-accent/70 bg-brand-surface shadow-xs transition-all duration-300 hover:border-brand-secondary hover:shadow-md overflow-hidden"
                  >
                    <div
                      onClick={() => toggleExpand(faq.id)}
                      className="p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="rounded-md bg-brand-sand/30 border border-brand-accent/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-secondary">
                            {faq.categoryLabel}
                          </span>
                        </div>
                        <h3 className="font-heading text-base sm:text-lg font-bold text-brand-primary group-hover:text-brand-secondary transition-colors">
                          {faq.question}
                        </h3>
                      </div>

                      <div
                        className={`h-8 w-8 rounded-full bg-brand-sand/30 flex items-center justify-center text-brand-primary shrink-0 transition-transform duration-300 ${
                          isExpanded ? "rotate-180 bg-brand-secondary text-brand-background" : ""
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-brand-accent/40 bg-brand-background/40 animate-fadeIn">
                        <p className="text-sm leading-relaxed text-brand-ink/85 mt-2">
                          {faq.answerText}
                        </p>

                        {/* Optional Rich Visual Aid */}
                        {faq.visualGraphic && (
                          <div className="mt-4 pt-3 border-t border-dashed border-brand-accent/60">
                            {faq.visualGraphic}
                          </div>
                        )}

                        {/* Interactive Micro Feedback */}
                        <div className="mt-5 pt-3 border-t border-brand-accent/40 flex items-center justify-between text-xs text-brand-muted">
                          <span className="text-[11px]">Was this clear and helpful?</span>
                          {isHelpful ? (
                            <span className="inline-flex items-center gap-1 text-emerald-800 font-semibold text-[11px]">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Thank you for the feedback!
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={(e) => markHelpful(faq.id, e)}
                              className="inline-flex items-center gap-1 rounded-full bg-brand-surface border border-brand-accent/70 px-3 py-1 hover:border-brand-secondary hover:text-brand-primary transition-colors cursor-pointer"
                            >
                              <ThumbsUp className="h-3 w-3 text-brand-secondary" />
                              <span>Yes, helpful</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          4. STILL HAVE QUESTIONS? FLOATING CARE DESK CONCIERGE
      ══════════════════════════════════════════════════════ */}
      <section className="border-t border-brand-accent/40 bg-brand-primary text-brand-background px-[clamp(1rem,4vw,2rem)] py-16 lg:py-20 relative overflow-hidden">
        {/* Glow */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(166, 124, 82, 0.4) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl rounded-3xl border border-brand-secondary/30 bg-[#242e25]/90 p-8 sm:p-12 shadow-2xl backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5 text-left">
            {/* Avatars */}
            <div className="flex -space-x-3 overflow-hidden shrink-0">
              <img
                className="inline-block h-14 w-14 rounded-full ring-2 ring-brand-primary object-cover"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                alt="Care Lead"
              />
              <img
                className="inline-block h-14 w-14 rounded-full ring-2 ring-brand-primary object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="Field Coordinator"
              />
              <img
                className="inline-block h-14 w-14 rounded-full ring-2 ring-brand-primary object-cover"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                alt="Support Specialist"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl font-bold text-white">
                  Have a specific question about your family?
                </span>
                <span className="inline-flex items-center rounded-full bg-brand-secondary/25 px-2 py-0.5 text-[10px] font-semibold text-brand-accent border border-brand-secondary/40">
                  Ludhiana Live
                </span>
              </div>
              <p className="mt-1 text-xs sm:text-sm text-brand-accent/80 font-sans max-w-lg">
                Our local coordinators can confirm helper arrival time in Model Town, Sarabha Nagar, or BRS Nagar within minutes.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-secondary px-6 py-3 text-xs font-bold uppercase tracking-wider text-brand-background shadow-lg hover:bg-brand-sand hover:text-brand-primary transition-all hover:scale-105 border border-brand-accent/40"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Care Desk
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-brand-accent/30 px-5 py-3 text-xs font-semibold text-brand-background transition-colors"
            >
              Contact Form <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
