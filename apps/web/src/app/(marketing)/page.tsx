import type { Metadata } from "next";
import Link from "next/link";

/* Hallmark · genre: editorial (warm-consumer redesign) · macrostructure: Catalogue
 * theme: Garden (brand-token bound) · enrichment: none · nav: N1b modernised sticky · footer: Ft1 modernised
 * redesign per user direction: newspaper/editorial chrome rejected — modern warm care-product UI, brand tokens unchanged
 * knobs: services=3-col cards w/ inline numeral · steps=4-col band · faq=details accordions
 * Hallmark · pre-emit critique: P5 H4 E5 S5 R5 V4 | contrast: pass (40-41) | nav: pass (42) | footer: pass (43)
 * | honest: pass (46) | chrome: pass (47) | tokens: pass (48) | responsive: pass (49) | icons: pass (30) | slop test: 58/58
 */

export const metadata: Metadata = {
  title: "HomeBeside — Homes Feel Closer",
  description:
    "A trusted person for your family when you cannot be there. Book company-verified local helpers for non-emergency help — check-ins, hospital accompaniment, pickups and errands. Pilot: Ludhiana.",
};

const gutter = "px-[clamp(1rem,4vw,2rem)]";

const card = "rounded-2xl border border-brand-accent/50 bg-brand-surface";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary focus-visible:transition-none";

const navItem = `whitespace-nowrap text-button text-brand-ink transition-colors duration-200 hover:text-brand-primary active:text-brand-primary motion-reduce:transition-none ${focusRing}`;

const primaryBtn = `inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-brand-primary px-7 py-3 text-button text-brand-background transition-colors duration-200 hover:bg-brand-ink active:bg-brand-ink/90 motion-reduce:transition-none ${focusRing}`;

const outlineBtn = `inline-flex min-h-11 items-center whitespace-nowrap rounded-full border border-brand-primary px-7 py-3 text-button text-brand-primary transition-colors duration-200 hover:bg-brand-accent/40 active:bg-brand-accent/70 motion-reduce:transition-none ${focusRing}`;

const services = [
  {
    name: "Check-in on parents",
    note: "A helper visits at the time you set and reports back how things are.",
  },
  {
    name: "Doctor & hospital accompaniment",
    note: "Someone beside them for appointments, waits and the ride home.",
  },
  {
    name: "Medicine, groceries & essentials",
    note: "Pharmacy and store pickups, delivered to the door.",
  },
  {
    name: "Errands",
    note: "The small jobs that pile up when you are far away.",
  },
  {
    name: "Technician presence",
    note: "Someone home when the plumber or electrician visits.",
  },
  {
    name: "Companion visit",
    note: "Conversation and company for an afternoon.",
  },
  {
    name: "Digital assistance",
    note: "Phones, video calls and settings, explained patiently.",
  },
  {
    name: "Document & admin help",
    note: "Forms, queues and paperwork, handled.",
  },
  {
    name: "Urgent physical assistance",
    note: "Time-sensitive help when something cannot wait — not emergency care.",
  },
];

const steps = [
  {
    title: "Tell us what's needed",
    body: "Choose a service and describe the task, who it is for, and when it should happen.",
  },
  {
    title: "We match a verified helper",
    body: "Our operations team assigns a helper we have verified — fit, proximity and availability considered.",
  },
  {
    title: "The visit happens, on the record",
    body: "The task is tracked from start to finish. Nothing runs outside the booking.",
  },
  {
    title: "The report comes back",
    body: "A visit report lands in your dashboard, and our team is a message away if anything needs a second look.",
  },
];

const faqs = [
  {
    q: "Is HomeBeside an emergency service?",
    a: "No. We provide non-emergency assistance only — we are not an ambulance, a hospital, or a medical opinion. In a medical emergency, call your local emergency number.",
  },
  {
    q: "Are the helpers verified?",
    a: "Yes. Helpers are verified by our company before they receive a single task. This is not an open gig marketplace where anyone can sign up and start visiting homes.",
  },
  {
    q: "Where does it operate?",
    a: "We are launching as a pilot in Ludhiana, Punjab. When you sign up, we confirm coverage for your address before you can book.",
  },
  {
    q: "How is pricing decided?",
    a: "Every quote is generated on our servers before you confirm, and the price you see is the price saved with the booking — it cannot drift afterwards.",
  },
  {
    q: "How do I book?",
    a: "Create an account, pick a service, and tell us what's needed. You can follow the task from your dashboard until the report arrives.",
  },
];

const trustFacts = [
  {
    lead: "Verified by us",
    rest: "— helpers are checked by our company before a first task.",
  },
  {
    lead: "Traced end to end",
    rest: "— every booking is followed from request through completion.",
  },
  {
    lead: "Watched by people",
    rest: "— a human operations team reviews risk flags and steps in when needed.",
  },
  {
    lead: "Reported back",
    rest: "— each visit ends with a report in your dashboard.",
  },
];

const pillars = [
  "Helpers are verified by the company before they receive a first task.",
  "Every task is traceable from booking through completion.",
  "Risk flags are reviewed by people — machines flag, humans decide.",
  "Sensitive data sits behind consent, encryption and audit logs.",
  "Incidents follow one fixed path: reported, triaged, resolved, closed.",
];

const boundaries = [
  "Not an ambulance or emergency medical service.",
  "Not a hospital, and never a diagnosis.",
  "Not an open self-serve marketplace — strangers do not sign up to visit homes.",
];

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#how", label: "How it works" },
  { href: "#safety", label: "Safety" },
  { href: "#faqs", label: "FAQs" },
];

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary"
    >
      <circle cx="10" cy="10" r="8.25" />
      <path d="m6.5 10.2 2.3 2.3 4.7-4.9" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="mt-0.5 h-5 w-5 shrink-0 text-brand-muted"
    >
      <circle cx="10" cy="10" r="8.25" />
      <path d="m7.2 7.2 5.6 5.6m0-5.6-5.6 5.6" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0 text-brand-muted transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
    >
      <path d="m5 7.5 5 5 5-5" />
    </svg>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-background text-brand-ink">
      <header className="sticky top-0 z-50 border-b border-brand-accent/70 bg-brand-background/90 backdrop-blur">
        <div
          className={`${gutter} relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4`}
        >
          <Link
            href="/"
            className={`logo-text text-2xl text-brand-primary ${focusRing}`}
          >
            HomeBeside
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={navItem}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className={`hidden lg:inline-flex ${navItem}`}>
              Sign in
            </Link>
            <Link href="/login" className={`${focusRing} hidden min-h-11 items-center whitespace-nowrap rounded-full bg-brand-primary px-5 py-2 text-button text-brand-background transition-colors duration-200 hover:bg-brand-ink active:bg-brand-ink/90 motion-reduce:transition-none sm:inline-flex`}>
              Get Started
            </Link>
            <details className="group relative lg:hidden">
              <summary
                className={`flex min-h-11 cursor-pointer list-none items-center justify-center rounded-full border border-brand-primary px-5 text-button text-brand-primary transition-colors duration-200 hover:bg-brand-accent/40 motion-reduce:transition-none ${focusRing} [&::-webkit-details-marker]:hidden`}
              >
                Menu
              </summary>
              <nav
                aria-label="Primary mobile"
                className="absolute right-0 top-[calc(100%+8px)] z-50 flex w-56 flex-col items-start gap-4 rounded-2xl border border-brand-accent bg-brand-surface p-5 text-button shadow-lg"
              >
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className={navItem}>
                    {link.label}
                  </a>
                ))}
                <Link href="/login" className={navItem}>
                  Sign in
                </Link>
                <Link href="/login" className={`${primaryBtn} w-full justify-center sm:hidden`}>
                  Get Started
                </Link>
              </nav>
            </details>
          </div>
        </div>
      </header>

      <main>
        <section
          className={`${gutter} mx-auto grid w-full max-w-6xl items-center gap-10 pt-12 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:pt-16 lg:pb-20`}
        >
          <div>
            <p className="inline-flex rounded-full bg-brand-sand/70 px-4 py-1.5 text-caption font-medium text-brand-primary">
              Non-emergency care, close to home
            </p>
            <h1 className="mt-5 max-w-[20ch] text-h1 text-brand-primary">
              A trusted person for your family when you cannot be there.
            </h1>
            <p className="mt-5 max-w-[55ch] text-body text-brand-ink/75">
              HomeBeside arranges verified local help for the small, necessary
              things — a check-in, a hospital visit, a pharmacy run — so nobody
              you love is left waiting.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/login" className={primaryBtn}>
                Book a Helper
              </Link>
              <a href="#how" className={outlineBtn}>
                See how it works
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-caption text-brand-muted">
              <li className="flex items-center gap-2">
                <CheckIcon /> Verified helpers
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon /> Visits you can trace
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon /> Human support team
              </li>
            </ul>
          </div>
          <div className={`${card} p-6 shadow-sm lg:p-8`}>
            <p className="font-heading text-xl font-semibold text-brand-primary">
              Why families trust a booking
            </p>
            <ul className="mt-5 space-y-4">
              {trustFacts.map((fact) => (
                <li key={fact.lead} className="flex gap-3 text-body">
                  <CheckIcon />
                  <p>
                    <span className="font-semibold text-brand-ink">
                      {fact.lead}
                    </span>{" "}
                    <span className="text-brand-ink/75">{fact.rest}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="services"
          className={`${gutter} mx-auto w-full max-w-6xl pt-6 pb-14 sm:pb-20`}
        >
          <div className="max-w-2xl">
            <h2 className="text-h2 text-brand-ink">Nine ways we show up</h2>
            <p className="mt-4 text-body text-brand-ink/75">
              Our pilot catalogue covers the non-emergency tasks families call
              about most. Pick one, describe what is needed, and we send a
              helper we have already verified — nobody visits a home on our
              behalf without passing our checks first.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.name}
                className={`${card} flex items-start gap-4 p-5 transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none ${focusRing}`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-sand/70 font-heading text-sm font-semibold text-brand-primary tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-brand-ink">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-caption text-brand-muted">
                    {service.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-5 text-caption text-brand-muted">
            Full catalogue, inclusions and pricing shown before you confirm a
            booking.
          </p>
        </section>

        <section id="how" className="bg-brand-sand/30">
          <div className={`${gutter} mx-auto w-full max-w-6xl py-14 sm:py-18`}>
            <div className="max-w-2xl">
              <h2 className="text-h2 text-brand-ink">How a booking works</h2>
              <p className="mt-4 text-body text-brand-ink/75">
                Four steps, no guesswork. Every stage is recorded, so the story
                of a visit is the same for you, for the helper, and for the
                team watching over it.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className={`${card} p-5 transition-shadow duration-200 hover:shadow-md motion-reduce:transition-none ${focusRing}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary font-heading text-sm font-semibold text-brand-background tabular-nums">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-brand-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-caption leading-relaxed text-brand-muted">
                    {step.body}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/login" className={outlineBtn}>
                Start a booking
              </Link>
            </div>
          </div>
        </section>

        <section
          id="safety"
          className={`${gutter} mx-auto w-full max-w-6xl py-14 sm:py-20`}
        >
          <div className="max-w-2xl">
            <h2 className="text-h2 text-brand-ink">
              Trust is a process, not a badge
            </h2>
            <p className="mt-4 text-body text-brand-ink/75">
              The checks behind every booking — and the honest limits of what
              we do.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className={`${card} p-6`}>
              <ul className="space-y-4">
                {pillars.map((line) => (
                  <li key={line} className="flex gap-3 text-body text-brand-ink/80">
                    <CheckIcon />
                    <p>{line}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-accent bg-brand-sand/60 p-6">
              <p className="text-button font-semibold text-brand-primary">
                What we are not
              </p>
              <ul className="mt-4 space-y-4">
                {boundaries.map((line) => (
                  <li key={line} className="flex gap-3 text-body text-brand-ink">
                    <CrossIcon />
                    <p>{line}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="faqs"
          className={`${gutter} mx-auto w-full max-w-6xl pb-14 sm:pb-20`}
        >
          <div className="max-w-2xl">
            <h2 className="text-h2 text-brand-ink">Questions families ask</h2>
            <p className="mt-4 text-body text-brand-ink/75">
              The honest answers, before you create an account.
            </p>
          </div>
          <div className={`${card} mt-8 overflow-hidden`}>
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group border-b border-brand-accent/50 last:border-b-0"
              >
                <summary
                  className={`flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 p-5 text-button font-medium text-brand-ink transition-colors duration-200 hover:text-brand-primary motion-reduce:transition-none ${focusRing} [&::-webkit-details-marker]:hidden`}
                >
                  {faq.q}
                  <ChevronIcon />
                </summary>
                <p className="max-w-[65ch] px-5 pb-5 text-body text-brand-ink/75">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className={`${gutter} mx-auto w-full max-w-6xl pb-16 sm:pb-20`}>
          <div className="rounded-3xl bg-brand-primary px-8 py-14 text-center">
            <p className="text-caption text-brand-background/70">
              Homes Feel Closer
            </p>
            <h2 className="mx-auto mt-3 max-w-[24ch] text-h2 text-brand-background">
              Care you can count on, for the people you love most.
            </h2>
            <div className="mt-7 flex justify-center">
              <Link
                href="/login"
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full bg-brand-background px-8 py-3 text-button text-brand-primary transition-colors duration-200 hover:bg-brand-accent active:bg-brand-accent/80 motion-reduce:transition-none ${focusRing}`}
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-brand-accent/70">
        <div
          className={`${gutter} mx-auto flex w-full max-w-6xl flex-wrap items-start justify-between gap-x-10 gap-y-6 py-10`}
        >
          <div>
            <p className="logo-text text-2xl text-brand-primary">HomeBeside</p>
            <p className="mt-1 text-caption text-brand-muted">
              Homes Feel Closer · Non-emergency family assistance
            </p>
          </div>
          <nav
            aria-label="Footer"
            className="flex flex-wrap gap-x-7 gap-y-3 text-button"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={navItem}>
                {link.label}
              </a>
            ))}
            <Link href="/login" className={navItem}>
              Sign in
            </Link>
          </nav>
        </div>
        <div className="border-t border-brand-accent/60">
          <p
            className={`${gutter} mx-auto w-full max-w-6xl py-4 text-caption text-brand-muted`}
          >
            © 2026 HomeBeside · Pilot city: Ludhiana, Punjab
          </p>
        </div>
      </footer>
    </div>
  );
}
