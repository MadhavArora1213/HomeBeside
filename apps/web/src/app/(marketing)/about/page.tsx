import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Eye,
  HeartHandshake,
  Lock,
  MapPin,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import PageIntro from "@/components/marketing/PageIntro";
import MarketingCta from "@/components/marketing/MarketingCta";

export const metadata: Metadata = {
  title: "About — HomeBeside",
  description:
    "HomeBeside connects families with verified local helpers for non-emergency care and accompaniment. Learn our mission, values and how we operate in Ludhiana.",
};

const stats = [
  { value: "100%", label: "Verified Personnel", sub: "Identity & background checked" },
  { value: "9+", label: "Care Services", sub: "From check-ins to clinic visits" },
  { value: "4-Step", label: "Traceable Visits", sub: "Logged start to finish" },
  { value: "Ludhiana", label: "Pilot City", sub: "Dedicated local care team" },
];

const values = [
  {
    icon: HeartHandshake,
    title: "Human dignity first",
    desc: "Every visit begins with respect — for the person receiving care and the helper providing it.",
  },
  {
    icon: ShieldCheck,
    title: "Verification without shortcuts",
    desc: "Identity checks, neighborhood references and in-person interviews before a first task.",
  },
  {
    icon: Eye,
    title: "Radical transparency",
    desc: "Families see check-in, on-site time and completion notes — no black boxes.",
  },
  {
    icon: Clock,
    title: "Reliability you can plan around",
    desc: "Scheduled visits that show up on time, with human operations staff watching every task.",
  },
  {
    icon: MapPin,
    title: "Local, never anonymous",
    desc: "Helpers are known members of the community, not anonymous gig workers.",
  },
  {
    icon: Lock,
    title: "Privacy by default",
    desc: "Addresses, contacts and notes are encrypted with strict, role-based access controls.",
  },
];

const principles = [
  {
    num: "01",
    title: "Company-vetted helpers",
    body: "Helpers are onboarded, trained and accountable to HomeBeside — never an open marketplace of anonymous workers.",
  },
  {
    num: "02",
    title: "Human operations oversight",
    body: "Experienced coordinators monitor active tasks in real time and step in whenever a family needs support.",
  },
  {
    num: "03",
    title: "Explicit boundaries",
    body: "We handle non-emergency assistance only. For anything urgent or medical, we direct families to the right authority.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About HomeBeside"
        title={
          <>
            Care that stays{" "}
            <span className="font-normal italic text-brand-secondary">close to home</span>
          </>
        }
        description="HomeBeside exists so that distance never has to mean neglect. We connect families with trusted, verified local helpers for the everyday, non-emergency care that makes life easier for the people we love."
      >
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/login"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-primary px-8 py-3 text-sm font-semibold tracking-wide text-brand-background shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-ink"
          >
            Book a Helper
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-brand-primary/30 px-8 py-3 text-sm font-semibold tracking-wide text-brand-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-accent/30"
          >
            Talk to our team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageIntro>

      {/* Stats */}
      <section className="px-[clamp(1rem,4vw,2rem)] pb-4">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-brand-accent/50 bg-brand-surface p-6 text-center shadow-sm"
            >
              <p className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold text-brand-ink">{stat.label}</p>
              <p className="mt-0.5 text-xs text-brand-muted">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="px-[clamp(1rem,4vw,2rem)] py-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
              Our Mission
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-ink sm:text-4xl">
              A trusted person for your family, when you cannot be there.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-ink/75">
              Millions of families live far from the parents and relatives who raised them. A
              missed check-in, an appointment that needs company, a prescription that must be
              collected — small tasks that carry enormous weight when no one is nearby.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-ink/75">
              HomeBeside fills that gap with people who are verified, accountable and genuinely
              kind. Not an emergency service, not a medical provider — a dependable human presence
              for the ordinary moments that matter.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-3xl border border-brand-accent/50 bg-brand-surface p-2 shadow-xl shadow-brand-primary/10">
              <img
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=700&q=80"
                alt="Helper accompanying a senior to a visit"
                className="h-56 w-full rounded-2xl object-cover"
              />
            </div>
            <div className="mt-8 overflow-hidden rounded-3xl border border-brand-accent/50 bg-brand-surface p-2 shadow-xl shadow-brand-primary/10">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=700&q=80"
                alt="Companion visit at home"
                className="h-56 w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-sand/20 px-[clamp(1rem,4vw,2rem)] py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-14 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
              What We Stand For
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-ink sm:text-4xl">
              Values that shape every visit
            </h2>
            <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-brand-ink/70">
              These principles are not slogans — they are the operating standards behind each
              booking we accept.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-brand-accent/50 bg-brand-surface p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/10"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold text-brand-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we operate */}
      <section className="px-[clamp(1rem,4vw,2rem)] py-20 lg:py-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
              How We Operate
            </span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-ink sm:text-4xl">
              A company, not a gig board
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-ink/70">
              HomeBeside is built like a service you can hold accountable, with clear standards and
              real people behind it.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {principles.map((item) => (
              <div
                key={item.num}
                className="relative overflow-hidden rounded-3xl border border-brand-accent/50 bg-brand-surface p-8"
              >
                <span className="font-heading text-5xl font-bold text-brand-primary/10">
                  {item.num}
                </span>
                <h3 className="mt-4 font-heading text-lg font-bold text-brand-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6 rounded-3xl border border-brand-accent/50 bg-brand-sand/25 p-6">
            <div className="flex items-center gap-3">
              <UserCheck className="h-6 w-6 text-brand-secondary" />
              <span className="text-sm font-semibold text-brand-ink">
                Every helper verified in person
              </span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-brand-secondary" />
              <span className="text-sm font-semibold text-brand-ink">
                Every visit logged end to end
              </span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-6 w-6 text-brand-secondary" />
              <span className="text-sm font-semibold text-brand-ink">
                Pilot community: Ludhiana, Punjab
              </span>
            </div>
          </div>
        </div>
      </section>

      <MarketingCta
        eyebrow="Join Us"
        title="Care you can count on for the people you love most."
        description="Join families in Ludhiana who trust HomeBeside for everyday assistance and compassionate accompaniment."
      />
    </>
  );
}
