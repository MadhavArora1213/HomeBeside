"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  EyeOff,
  UserCheck,
  FileText,
  Clock,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Search,
  Printer,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface PrivacySection {
  id: string;
  number: string;
  title: string;
  summary: string;
  icon: React.ElementType;
  paragraphs: string[];
  bulletPoints?: string[];
  visualCallout?: React.ReactNode;
}

/* ─── Section Data ───────────────────────────────────────────────────────── */

const privacySections: PrivacySection[] = [
  {
    id: "introduction",
    number: "1",
    title: "Introduction",
    summary:
      "Our commitment to protecting family dignity and confidential household information.",
    icon: FileText,
    paragraphs: [
      'HomeBeside ("we", "us", or "our") provides scheduled non-emergency family assistance and companion visits across Ludhiana, Punjab. This Privacy Policy details our transparent standards for collecting, using, disclosing, and safeguarding personal information across our website, web application, and field operations.',
      "By accessing HomeBeside or scheduling helper visits for your parents, you acknowledge and agree to the safeguards outlined in this document. If you do not agree, please do not use our platform.",
    ],
    visualCallout: (
      <div className="rounded-2xl bg-brand-sand/30 border border-brand-accent/60 p-4 text-sm flex items-start gap-3">
        <ShieldCheck className="h-5 w-5 text-brand-secondary shrink-0 mt-0.5" />
        <p className="text-brand-ink/80 leading-relaxed">
          <strong>Jurisdiction &amp; Compliance:</strong> Formulated in compliance
          with applicable Indian data protection principles, including the Digital
          Personal Data Protection Act (DPDP Act, 2023) and IT Act 2000.
        </p>
      </div>
    ),
  },
  {
    id: "information-we-collect",
    number: "2",
    title: "Information We Collect",
    summary:
      "The essential information needed to safely dispatch verified helpers to your home.",
    icon: UserCheck,
    paragraphs: [
      "We only collect information directly required to arrange, verify, and document in-person companion visits. We distinguish between family account details, beneficiary parent information, and technical visit telemetry.",
    ],
    bulletPoints: [
      "Account & Contact Details: Your full name, mobile phone number, email address, and relationship to the beneficiary.",
      "Beneficiary Profile: Elder parent's name, residential address in Ludhiana, dietary/mobility preferences, and visit instructions.",
      "Booking & Task Records: Scheduled date, time slot, duration, helper assignment, and specific assistance scope (e.g., clinic escort, grocery run).",
      "Payment Transactions: Handled securely through RBI-authorized payment gateways. We never store full credit/debit card numbers or CVVs on our servers.",
      "Visit Reports & Photos: Timestamped check-in GPS telemetry, completion observations, task check-off notes, and photo proof sent to authorized family members.",
      "Device Diagnostics: Basic technical logs such as IP address, browser type, and approximate network zone to detect fraud and optimize dispatch.",
    ],
    visualCallout: (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
        <div className="rounded-xl bg-brand-surface p-3 border border-brand-accent/60 shadow-xs">
          <span className="font-bold text-brand-primary block text-sm">
            👤 Family Profile
          </span>
          <span className="text-xs text-brand-muted mt-0.5 block">
            Name &amp; Phone
          </span>
        </div>
        <div className="rounded-xl bg-brand-surface p-3 border border-brand-accent/60 shadow-xs">
          <span className="font-bold text-brand-primary block text-sm">
            📍 Elder&apos;s Home
          </span>
          <span className="text-xs text-brand-muted mt-0.5 block">
            Ludhiana Sector
          </span>
        </div>
        <div className="rounded-xl bg-brand-surface p-3 border border-brand-accent/60 shadow-xs">
          <span className="font-bold text-brand-primary block text-sm">
            📸 Visit Verification
          </span>
          <span className="text-xs text-brand-muted mt-0.5 block">
            Photo &amp; Task Notes
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "your-personal-data",
    number: "2.1",
    title: "Your Personal Data",
    summary: "Details on personal identifiers we process.",
    icon: UserCheck,
    paragraphs: [
      "Personal data includes your name, phone number, email, and any identifiers submitted during account creation. This information is encrypted in transit and at rest.",
    ],
  },
  {
    id: "non-personal-information",
    number: "2.2",
    title: "Non-Personal Information",
    summary: "Aggregated and anonymized telemetry we collect.",
    icon: FileText,
    paragraphs: [
      "We may collect aggregated, anonymized usage data including page views, session durations, and interaction patterns to improve our services. This data cannot be traced back to any individual.",
    ],
  },
  {
    id: "how-we-use",
    number: "3",
    title: "How We Use Your Information",
    summary:
      "Clear, transparent purposes strictly centered around trusted family care.",
    icon: Sparkles,
    paragraphs: [
      "We treat your household data with the highest standard of fiduciary care. We never use family details for third-party commercial marketing or profiling.",
    ],
    bulletPoints: [
      "To match, schedule, and navigate background-vetted companions to your parents' doorstep.",
      "To provide real-time WhatsApp or portal visit updates, progress notifications, and photographic reports.",
      "To facilitate emergency escalation protocols when an on-site helper detects parent discomfort or medical distress.",
      "To process transparent upfront reservations and issue digital invoices with zero surge pricing.",
      "To run comprehensive background checks and in-person behavioral standards audits on all companions.",
      "To comply with legal audit mandates and prevent malicious fraudulent activity.",
    ],
  },
  {
    id: "how-we-share",
    number: "4",
    title: "Sharing Your Information",
    summary:
      "We never sell your data. Sharing is strictly limited to authorized visit fulfilment.",
    icon: EyeOff,
    paragraphs: [
      "HomeBeside does not sell, rent, or trade your personal information to advertising networks, broker agencies, or third-party marketers under any circumstances.",
    ],
    bulletPoints: [
      "With Assigned Helpers: The helper receives only necessary task notes and the street address during their assigned visit window. They cannot access historical files or broader family records.",
      "With Authorized Family Members: Registered relatives linked to your family account receive completion reports, visit photos, and coordinator notes.",
      "With Infrastructure Partners: Regulated payment processors (e.g., Razorpay/Stripe), SMS/WhatsApp dispatch APIs, and ISO-certified cloud hosting providers under legally binding data processing agreements.",
      "With Legal Authorities: Only when explicitly required under formal court summons, Indian law enforcement requests, or to protect the life safety of an elderly parent.",
    ],
    visualCallout: (
      <div className="rounded-2xl border border-brand-secondary/40 bg-brand-surface p-4 shadow-xs">
        <div className="flex items-center gap-2 font-heading text-sm font-bold text-brand-primary">
          <Lock className="h-4 w-4 text-brand-secondary" />
          <span>Time-Scoped Helper Access Guarantee</span>
        </div>
        <p className="mt-1 text-sm text-brand-muted leading-relaxed">
          Companions only view household address details{" "}
          <strong>1 hour before</strong> the scheduled visit slot. Once the task
          report is finalized, sensitive location data is automatically archived.
        </p>
      </div>
    ),
  },
  {
    id: "data-security",
    number: "5",
    title: "Data Security & Encryption",
    summary: "Bank-grade administrative, physical, and digital safeguards.",
    icon: Lock,
    paragraphs: [
      "We implement industry-standard technical measures designed to protect personal and health-related family data against unauthorized disclosure, loss, or manipulation.",
      "All data transmissions between your browser and our platform utilize TLS 1.3 encryption. At rest, database records and visit photographs are protected by AES-256 bit encryption keys.",
      "Internal access by HomeBeside staff is governed by strict Role-Based Access Control (RBAC) and audited by our Ludhiana technical operations team.",
    ],
    visualCallout: (
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        <div className="rounded-xl bg-brand-surface p-3 border border-brand-accent/60">
          <span className="font-bold text-brand-primary block text-sm">
            🔐 256-Bit AES
          </span>
          <span className="text-xs text-brand-muted mt-0.5 block">
            Encrypted data at rest
          </span>
        </div>
        <div className="rounded-xl bg-brand-surface p-3 border border-brand-accent/60">
          <span className="font-bold text-brand-primary block text-sm">
            🛡️ Role-Based Access
          </span>
          <span className="text-xs text-brand-muted mt-0.5 block">
            Strict internal audits
          </span>
        </div>
        <div className="rounded-xl bg-brand-surface p-3 border border-brand-accent/60">
          <span className="font-bold text-brand-primary block text-sm">
            🌐 TLS 1.3 Transport
          </span>
          <span className="text-xs text-brand-muted mt-0.5 block">
            Encrypted web traffic
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "data-retention",
    number: "6",
    title: "Data Retention & Archival",
    summary:
      "Retaining records only as long as needed for family safety and accountability.",
    icon: Clock,
    paragraphs: [
      "We retain personal details for as long as your family account remains active. Visit reports, completion photographs, and GPS check-in logs are stored for a reasonable audit window to resolve questions, support insurance verification, and maintain family continuity.",
      'Upon your written request, accounts and associated beneficiary notes are permanently de-identified or securely purged, subject to statutory tax and bookkeeping requirements under Indian law.',
    ],
  },
  {
    id: "your-rights",
    number: "7",
    title: "Your Rights and Choices",
    summary: "Complete autonomy over your family's personal information.",
    icon: ShieldCheck,
    paragraphs: [
      "Under the Digital Personal Data Protection Act (DPDP Act) and HomeBeside service principles, you maintain full control over your submitted family information.",
    ],
    bulletPoints: [
      "Right to Access: Request a digital copy of all beneficiary profiles, visit logs, and billing invoices associated with your account.",
      "Right to Correction: Instantly update phone numbers, medical preferences, or residential addresses via your account settings or our care desk.",
      "Right to Erasure: Request complete deletion of your profile and beneficiary records when discontinuing service.",
      "Right to Withdraw Consent: Opt out of non-essential service advisories or informational announcements at any time.",
    ],
  },
  {
    id: "cookies",
    number: "8",
    title: "Cookies & Local Storage",
    summary:
      "Minimal functional cookies to keep you signed in and ensure fast page loads.",
    icon: FileText,
    paragraphs: [
      "We use essential session cookies and local storage tokens to keep you securely authenticated and preserve your display preferences. We do not deploy invasive third-party cross-site advertising trackers.",
      "You may disable cookies via your browser settings; however, certain portal functions such as persistent login will be impaired.",
    ],
  },
  {
    id: "changes",
    number: "9",
    title: "Changes to This Privacy Policy",
    summary: "How we notify families of updates and regulatory amendments.",
    icon: Clock,
    paragraphs: [
      'We may revise this Privacy Policy periodically to reflect operational enhancements, new service zones, or legal amendments. When material adjustments occur, we will update the "Effective Date" and notify registered users via email or WhatsApp notification.',
      "Your continued reservation of HomeBeside visits following posted changes signifies acceptance of the revised terms.",
    ],
  },
  {
    id: "contact-desk",
    number: "10",
    title: "Grievance Redressal & Contact Desk",
    summary:
      "Direct access to our Ludhiana privacy officers and human coordinators.",
    icon: MapPin,
    paragraphs: [
      "If you have inquiries, concerns, or requests regarding family data privacy or wish to exercise your data rights, please contact our dedicated care desk directly.",
    ],
    visualCallout: (
      <div className="rounded-2xl border border-brand-accent/70 bg-brand-surface p-5 space-y-3">
        <div className="flex items-center gap-2 font-heading text-sm font-bold text-brand-primary">
          <MapPin className="h-4 w-4 text-brand-secondary" />
          <span>HomeBeside Care &amp; Compliance Desk</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-brand-ink/80 text-sm">
          <div>
            <span className="font-semibold text-brand-primary block">
              Email Inquiries:
            </span>
            <a
              href="mailto:care@homebeside.in"
              className="text-brand-secondary hover:underline"
            >
              care@homebeside.in
            </a>
          </div>
          <div>
            <span className="font-semibold text-brand-primary block">
              Direct Helpline:
            </span>
            <a
              href="tel:+919876543210"
              className="text-brand-secondary hover:underline"
            >
              +91 98765 43210
            </a>
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold text-brand-primary block">
              Ludhiana Pilot Hub:
            </span>
            <span>
              Model Town &amp; Ferozepur Road, Ludhiana, Punjab 141002, India
            </span>
          </div>
        </div>
      </div>
    ),
  },
];

/* ─── Table-of-contents items for the sidebar ────────────────────────────── */

interface TocItem {
  id: string;
  label: string;
  indent: boolean;
}

const tocItems: TocItem[] = privacySections.map((s) => ({
  id: s.id,
  label: `${s.number}. ${s.title}`,
  indent: s.number.includes("."),
}));

/* ─── Gallery placeholder images ─────────────────────────────────────────── */

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&h=400&fit=crop",
    alt: "Family care consultation",
  },
  {
    src: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600&h=400&fit=crop",
    alt: "Secure data protection",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    alt: "Professional healthcare support",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    alt: "Technology and privacy",
  },
];

/* ─── Component ──────────────────────────────────────────────────────────── */

export default function VisualPrivacyPolicy() {
  const [searchFilter, setSearchFilter] = useState("");

  const filteredSections = useMemo(() => {
    if (!searchFilter.trim()) return privacySections;
    const q = searchFilter.toLowerCase();
    return privacySections.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.paragraphs.some((p) => p.toLowerCase().includes(q)) ||
        s.bulletPoints?.some((b) => b.toLowerCase().includes(q))
    );
  }, [searchFilter]);

  return (
    <div className="bg-brand-background min-h-screen text-brand-ink">
      {/* ══════════════════════════════════════════════════════════════
          HERO HEADER — Title, date, search, image gallery
      ══════════════════════════════════════════════════════════════ */}
      <section className="border-b border-brand-accent/40 bg-brand-background pt-12 pb-10 lg:pt-16 lg:pb-14">
        <div className="mx-auto max-w-7xl px-[clamp(1rem,4vw,2rem)]">
          {/* Title */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-brand-primary">
            Privacy Policy
          </h1>

          {/* Date */}
          <p className="mt-2 text-sm text-brand-muted">
            Last updated: 11 October 2026
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex items-center gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-muted" />
              <input
                type="text"
                placeholder="Search any topic..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full rounded-full border border-brand-accent bg-brand-surface pl-10 pr-4 py-2.5 text-sm text-brand-ink placeholder:text-brand-muted/60 focus:border-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 transition-all"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                /* Search is live-filtered */
              }}
              className="rounded-full bg-brand-secondary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-secondary/90 transition-colors"
            >
              Search
            </button>
          </div>

          {/* Intro Paragraph */}
          <p className="mt-8 max-w-3xl text-sm sm:text-base leading-relaxed text-brand-ink/80">
            At HomeBeside (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) we
            value your privacy and are committed to protecting your personal
            information. This Privacy Policy addresses our practices regarding the
            collection, use, disclosure, and protection of your data when you visit
            our website at homebeside.in. By using our services, you agree to the
            terms of this policy. Please read it carefully to understand how we
            handle your information.
          </p>

          {/* 2×2 Image Gallery */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 max-w-3xl">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-brand-sand/30"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading={idx < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTENT + SIDEBAR
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-[clamp(1rem,4vw,2rem)] py-12 lg:py-16">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12 lg:gap-14 items-start">
          {/* ── LEFT: Policy Sections ── */}
          <article className="lg:col-span-8 space-y-10">
            {filteredSections.map((sec) => {
              const Icon = sec.icon;
              const isTopLevel = !sec.number.includes(".");

              return (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-mt-28"
                >
                  {/* Section heading */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-sand/40 text-brand-secondary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h2
                      className={`font-heading font-bold text-brand-primary ${
                        isTopLevel
                          ? "text-xl sm:text-2xl"
                          : "text-lg sm:text-xl"
                      }`}
                    >
                      {sec.number}. {sec.title}
                    </h2>
                  </div>

                  {/* Paragraphs */}
                  <div className="space-y-3 text-sm sm:text-base leading-relaxed text-brand-ink/80 pl-11">
                    {sec.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>

                  {/* Bullet points */}
                  {sec.bulletPoints && (
                    <ul className="mt-4 space-y-2.5 pl-11">
                      {sec.bulletPoints.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-sm sm:text-base text-brand-ink/85 leading-relaxed"
                        >
                          <CheckCircle2 className="h-4 w-4 text-brand-secondary shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Visual callout */}
                  {sec.visualCallout && (
                    <div className="mt-5 pl-11">{sec.visualCallout}</div>
                  )}

                  {/* Section divider */}
                  {isTopLevel && (
                    <div className="mt-8 border-b border-brand-accent/30" />
                  )}
                </section>
              );
            })}

            {/* Empty state */}
            {filteredSections.length === 0 && (
              <div className="rounded-2xl border border-dashed border-brand-accent/80 bg-brand-surface p-12 text-center">
                <AlertCircle className="mx-auto h-10 w-10 text-brand-secondary" />
                <h3 className="mt-3 font-heading text-lg font-bold text-brand-primary">
                  No matching sections found
                </h3>
                <p className="mt-1 text-sm text-brand-muted">
                  No sections match &ldquo;{searchFilter}&rdquo;. Try another
                  term or clear your search.
                </p>
                <button
                  type="button"
                  onClick={() => setSearchFilter("")}
                  className="mt-4 rounded-full bg-brand-primary text-white px-5 py-2 text-sm font-semibold hover:bg-brand-primary/90 transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </article>

          {/* ── RIGHT: Sticky Sidebar ── */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {/* Table of Contents */}
            <div className="rounded-2xl border border-brand-accent/60 bg-brand-surface p-5 shadow-sm">
              <nav className="space-y-0.5">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-brand-sand/30 hover:text-brand-primary group ${
                      item.indent
                        ? "pl-7 text-brand-muted text-xs"
                        : "text-brand-ink/80 font-medium"
                    }`}
                  >
                    <ChevronRight className="h-3 w-3 text-brand-secondary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Print / PDF action */}
            <div className="rounded-2xl border border-brand-accent/60 bg-brand-surface p-4 shadow-sm">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 text-sm text-brand-secondary hover:text-brand-primary font-semibold transition-colors cursor-pointer w-full justify-center"
              >
                <Printer className="h-4 w-4" />
                Print / Save as PDF
              </button>
            </div>

            {/* Contact card */}
            <div className="rounded-2xl border border-brand-accent/60 bg-gradient-to-br from-brand-sand/20 via-brand-surface to-brand-sand/10 p-5 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary text-white mb-3">
                <Phone className="h-4 w-4" />
              </div>
              <h4 className="font-heading text-sm font-bold text-brand-primary">
                Data Protection Officer
              </h4>
              <p className="mt-1 text-sm text-brand-muted leading-relaxed">
                Have questions regarding your family&apos;s data or a formal
                disclosure request?
              </p>
              <div className="mt-3 space-y-1 text-sm">
                <a
                  href="mailto:care@homebeside.in"
                  className="font-semibold text-brand-secondary hover:underline block"
                >
                  care@homebeside.in
                </a>
                <span className="text-brand-muted block">
                  +91 98765 43210 (Ludhiana Desk)
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════════════════ */}
      <section className="border-t border-brand-accent/40 bg-brand-primary text-white px-[clamp(1rem,4vw,2rem)] py-14 lg:py-18 relative overflow-hidden">
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px] opacity-25"
          style={{
            background:
              "radial-gradient(circle, rgba(166, 124, 82, 0.4) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl rounded-3xl border border-brand-secondary/30 bg-[#242e25]/90 p-8 sm:p-12 shadow-2xl backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-secondary/25 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-accent border border-brand-secondary/40">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-secondary" />
              <span>Full Accountability</span>
            </div>
            <h3 className="mt-3 font-heading text-2xl sm:text-3xl font-bold text-white">
              Questions about your family&apos;s data?
            </h3>
            <p className="mt-1.5 text-sm text-brand-accent/80 max-w-lg">
              Our human coordinators in Model Town, Ludhiana are available to walk
              through any privacy questions or data access requests.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-brand-secondary px-6 py-3 text-sm font-bold uppercase tracking-wider text-brand-background shadow-lg hover:bg-brand-sand hover:text-brand-primary transition-all hover:scale-105 border border-brand-accent/40"
            >
              Contact Care Desk
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-brand-accent/30 px-5 py-3 text-sm font-semibold text-white transition-colors"
            >
              Terms of Service <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
