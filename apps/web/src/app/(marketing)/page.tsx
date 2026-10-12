import type { Metadata } from "next";
import Link from "next/link";
import WellnessHeroSection from "@/components/marketing/WellnessHeroSection";
import EditorialServicesSection from "@/components/marketing/EditorialServicesSection";
import VisualWorkflowSection from "@/components/marketing/VisualWorkflowSection";
import PaperNotesFaqSection from "@/components/marketing/PaperNotesFaqSection";
import LetsTalkContactSection from "@/components/marketing/LetsTalkContactSection";

export const metadata: Metadata = {
  title: "HomeBeside — Homes Feel Closer",
  description:
    "A trusted person for your family when you cannot be there. Book company-verified local helpers for non-emergency help — check-ins, hospital accompaniment, pickups and errands. Pilot: Ludhiana.",
};

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const services = [
  {
    name: "Check-in on parents",
    note: "A helper visits at the scheduled hour and reports back on well-being and home condition.",
    tag: "Care & Comfort",
  },
  {
    name: "Doctor & hospital accompaniment",
    note: "Dedicated accompaniment for appointments, navigating lines, tests, and a secure ride home.",
    tag: "Healthcare",
  },
  {
    name: "Medicine, groceries & essentials",
    note: "Pickups from verified local pharmacies or markets, safely hand-delivered to doorstep.",
    tag: "Delivery",
  },
  {
    name: "Errands & everyday tasks",
    note: "Utility bills, post office errands, dry cleaning, and small chores that accumulate.",
    tag: "Support",
  },
  {
    name: "Technician & repair supervision",
    note: "A trusted presence at home while electricians, plumbers, or installers do their job.",
    tag: "Home Safety",
  },
  {
    name: "Companion visits",
    note: "Caring, respectful conversation, tea, walks in the garden, and thoughtful company.",
    tag: "Wellbeing",
  },
  {
    name: "Digital assistance",
    note: "Patient guidance for smartphones, setting up family video calls, and resolving app questions.",
    tag: "Assistance",
  },
  {
    name: "Document & administrative help",
    note: "Paperwork, application queues, pension attestations, and government center guidance.",
    tag: "Advisory",
  },
  {
    name: "Urgent non-emergency support",
    note: "Priority local support when an unexpected non-medical situation needs quick attention.",
    tag: "Priority",
  },
];

const steps = [
  {
    num: "01",
    title: "Tell us what is needed",
    body: "Select a service, specify recipient details, pick time slot and provide any custom family preferences.",
  },
  {
    num: "02",
    title: "Vetted helper matching",
    body: "Our operations coordinator matches an experienced, verified professional tailored for the task.",
  },
  {
    num: "03",
    title: "Live traceable visit",
    body: "Helper check-in, on-site time, and progress updates are logged transparently on your portal.",
  },
  {
    num: "04",
    title: "Detailed completion report",
    body: "Receive photographic proof, task notes, and observations promptly after conclusion.",
  },
];

const faqs = [
  {
    q: "Is HomeBeside an emergency service?",
    a: "No. We provide scheduled non-emergency assistance. In cases requiring urgent medical triage, please contact local emergency authorities (112 or local hospital).",
  },
  {
    q: "How are helpers screened and verified?",
    a: "Every helper undergoes mandatory identity verification, background reference validation, in-person interviews, and behavioral standards training.",
  },
  {
    q: "Where is the pilot service currently active?",
    a: "We are currently operating our launch pilot in Ludhiana, Punjab, serving selected residential sectors with dedicated operations staff.",
  },
  {
    q: "How does transparent pricing work?",
    a: "Pricing is calculated upfront before booking confirmation with zero hidden surcharge. The finalized amount is locked securely with the task reservation.",
  },
  {
    q: "How quickly can a booking be arranged?",
    a: "Bookings can be scheduled days ahead or reserved with few hours advance notice depending on real-time helper zone availability.",
  },
];

const pillars = [
  {
    title: "Rigorous Background Checks",
    desc: "Government identity checks, neighborhood references, and formal onboarding criteria.",
  },
  {
    title: "Complete Digital Traceability",
    desc: "Every milestone from dispatch to departure is securely logged with timestamps.",
  },
  {
    title: "Human Operations Supervision",
    desc: "Experienced human managers monitor active tasks and provide live resolution backup.",
  },
  {
    title: "Privacy & Data Protection",
    desc: "Family addresses, contact numbers, and notes are encrypted with strict access controls.",
  },
  {
    title: "Structured Escalation Protocol",
    desc: "Clear procedures for unanticipated home findings with direct emergency contacts.",
  },
];

const boundaries = [
  "Not an ambulance, emergency room, or triage response team.",
  "Not a medical clinic, doctor consultation, or diagnostic provider.",
  "Not an uncurated gig-board where anonymous workers accept jobs.",
];

const stats = [
  { value: "100%", label: "Verified Personnel", sub: "Vetted background & identity" },
  { value: "4-Step", label: "Structured Visits", sub: "Documented from start to end" },
  { value: "9+", label: "Care Services", sub: "From check-ins to clinic visits" },
  { value: "Ludhiana", label: "Pilot City", sub: "Dedicated local care team" },
];

/* ─── Styles ────────────────────────────────────────────────────────────────── */

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary focus-visible:transition-none";

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-background text-brand-ink selection:bg-brand-primary/10 selection:text-brand-primary">

      {/* ── Visual CSS Styles ── */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50%      { opacity: 0.24; transform: scale(1.05); }
        }
        .anim-fade-up   { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
        .anim-float     { animation: subtleFloat 6s ease-in-out infinite; }
        .anim-glow      { animation: pulseGlow 8s ease-in-out infinite; }
        .delay-1 { animation-delay: 100ms; }
        .delay-2 { animation-delay: 200ms; }
        .delay-3 { animation-delay: 320ms; }
        .delay-4 { animation-delay: 450ms; }
        .delay-5 { animation-delay: 600ms; }

        details[open] .faq-icon { transform: rotate(180deg); }
        .faq-icon { transition: transform 0.28s ease; }
        details[open] { border-color: rgba(46,58,47,0.35); background-color: rgba(255,255,255,0.9); }

        .card-elevate {
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.28s ease, border-color 0.28s ease;
        }
        .card-elevate:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 36px -12px rgba(46,58,47,0.08), 0 0 0 1px rgba(166,124,82,0.18);
          border-color: rgba(46,58,47,0.25);
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.76);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(217, 203, 185, 0.45);
        }
      `}</style>

      <main>
        {/* ══════════════════════════════════════════════════════
            HERO SECTION — Wellness & Healthcare Editorial Layout
        ══════════════════════════════════════════════════════ */}
        <WellnessHeroSection />

        {/* ══════════════════════════════════════════════════════
            SERVICES — Asymmetric Editorial Gallery UI (Reference Photo Layout)
        ══════════════════════════════════════════════════════ */}
        <EditorialServicesSection />

        {/* ══════════════════════════════════════════════════════
            HOW IT WORKS — Interactive Visual Workflow Pipeline
        ══════════════════════════════════════════════════════ */}
        <VisualWorkflowSection />

        {/* ══════════════════════════════════════════════════════
            TRUST & SAFETY
        ══════════════════════════════════════════════════════ */}
        <section id="safety" className="px-[clamp(1rem,4vw,2rem)] py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl">

            <div className="mb-14 text-center">
              <span className="inline-block rounded-full bg-brand-sand/50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-secondary">
                Safety Protocol
              </span>
              <h2 className="mt-3 font-heading text-3xl font-bold text-brand-ink sm:text-4xl lg:text-5xl">
                Trust is built through process, not promises
              </h2>
              <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-brand-ink/70">
                The institutional safeguards protecting each booking — alongside our explicit operating boundaries.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">

              {/* Pillars Left Column */}
              <div className="glass-panel rounded-3xl p-8 lg:col-span-7">
                <h3 className="font-heading text-xl font-bold text-brand-primary">
                  The Five Pillars of HomeBeside Verification
                </h3>
                <p className="mt-1 text-sm text-brand-muted">
                  Standards enforced across every helper and visit without exception.
                </p>

                <div className="mt-6 space-y-4">
                  {pillars.map((pil) => (
                    <div key={pil.title} className="flex items-start gap-3.5 rounded-2xl bg-brand-surface/80 p-4 border border-brand-accent/30">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-brand-ink">{pil.title}</h4>
                        <p className="mt-0.5 text-xs leading-relaxed text-brand-ink/70">{pil.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boundaries & Emergency Notice */}
              <div className="flex flex-col gap-6 lg:col-span-5">

                <div className="rounded-3xl border border-brand-accent/60 bg-brand-sand/45 p-8">
                  <h3 className="font-heading text-lg font-bold text-brand-primary">
                    What We Are Not
                  </h3>
                  <p className="mt-1 text-xs text-brand-muted">
                    Clear boundaries maintain family safety and regulatory honesty.
                  </p>

                  <div className="mt-5 space-y-3">
                    {boundaries.map((b) => (
                      <div key={b} className="flex items-start gap-3 rounded-xl bg-brand-surface/75 p-3.5 border border-brand-accent/40">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-muted/20 text-xs font-bold text-brand-muted">
                          ✕
                        </span>
                        <p className="text-xs leading-relaxed text-brand-ink font-medium">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl border border-brand-emergency/30 bg-brand-emergency/5 p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-emergency/15 text-brand-emergency font-bold">
                      !
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-brand-ink">Emergency Disclosure</h4>
                      <p className="mt-0.5 text-xs text-brand-muted">
                        In any medical emergency, please dial your city emergency hospital number directly.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════
            FAQS — Editorial Paper-Notes & Metallic Clips UI (Image 2)
        ══════════════════════════════════════════════════════ */}
        <PaperNotesFaqSection />

        {/* ══════════════════════════════════════════════════════
            CONTACT — "Let's Talk" Organic Fluid UI (Image 1)
        ══════════════════════════════════════════════════════ */}
        <LetsTalkContactSection />

        {/* ══════════════════════════════════════════════════════
            CTA BANNER
        ══════════════════════════════════════════════════════ */}
        <section className="px-[clamp(1rem,4vw,2rem)] py-20 lg:py-28">
          <div className="mx-auto w-full max-w-7xl">
            <div
              className="relative overflow-hidden rounded-3xl bg-brand-primary px-8 py-20 text-center shadow-2xl sm:px-14 sm:py-24"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 70% 60% at 50% 10%, rgba(166,124,82,0.28) 0%, transparent 70%)",
              }}
            >
              <div className="relative z-10 mx-auto max-w-3xl">
                <span className="inline-block rounded-full bg-brand-background/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-background/80">
                  Homes Feel Closer
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold text-brand-background sm:text-4xl lg:text-5xl">
                  Care you can count on for the people you love most.
                </h2>
                <p className="mx-auto mt-5 max-w-[46ch] text-base leading-relaxed text-brand-background/75 sm:text-lg">
                  Join families in Ludhiana who trust HomeBeside for everyday assistance and compassionate accompaniment.
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/login"
                    className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-background px-8 py-3 text-sm font-semibold tracking-wide text-brand-primary shadow-xl transition-all duration-300 hover:bg-brand-sand hover:-translate-y-0.5"
                  >
                    Get Started Free
                  </Link>
                  <a
                    href="#services"
                    className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-background/35 px-8 py-3 text-sm font-semibold tracking-wide text-brand-background transition-all duration-300 hover:bg-brand-background/10 hover:-translate-y-0.5"
                  >
                    View All Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}
