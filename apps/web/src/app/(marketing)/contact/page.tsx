import type { Metadata } from "next";
import Link from "next/link";
import { Clock, LifeBuoy, Mail, MapPin, MessageCircle, Phone, ArrowUpRight, Sparkles } from "lucide-react";
import PageIntro from "@/components/marketing/PageIntro";
import LetsTalkContactSection from "@/components/marketing/LetsTalkContactSection";

export const metadata: Metadata = {
  title: "Contact — HomeBeside",
  description:
    "Reach the HomeBeside care desk in Ludhiana. Call, email or send a message for bookings, pricing and trust & safety questions.",
};

const channels = [
  {
    icon: Phone,
    label: "Direct Phone Helpline",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
    note: "Mon–Sat, 8:00 AM – 8:00 PM IST",
    action: "Call Desk",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Coordinator",
    value: "+91 98765 43210",
    href: "https://wa.me/919876543210",
    note: "Fastest response for schedules",
    action: "Chat Now",
  },
  {
    icon: Mail,
    label: "Email Inquiries",
    value: "care@homebeside.in",
    href: "mailto:care@homebeside.in",
    note: "Response within 1 business day",
    action: "Send Email",
  },
  {
    icon: MapPin,
    label: "Ludhiana Launch Hub",
    value: "Model Town, Ludhiana",
    href: "#coverage",
    note: "Punjab 141002, India",
    action: "View Sectors",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-brand-background min-h-screen">
      <PageIntro
        eyebrow="Contact & Assistance"
        title={
          <>
            We are here to{" "}
            <span className="font-normal italic text-brand-secondary">help.</span>
          </>
        }
        description="Questions about booking a verified companion, service pricing, or safety standards in Ludhiana? Our human care desk is right beside you."
      />

      {/* ── Direct Contact Channel Cards in Brand Theme ── */}
      <section className="px-[clamp(1rem,4vw,2rem)] -mt-6 sm:-mt-8 mb-4 relative z-10">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <a
                key={ch.label}
                href={ch.href}
                className="group relative flex flex-col justify-between rounded-2xl border border-brand-accent/70 bg-brand-surface p-5 shadow-sm transition-all duration-300 hover:border-brand-secondary hover:shadow-md hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-sand/40 text-brand-primary group-hover:bg-brand-secondary group-hover:text-brand-background transition-colors">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-brand-secondary opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-brand-muted">
                    {ch.label}
                  </p>
                  <p className="mt-1 font-heading text-base font-bold text-brand-primary group-hover:text-brand-secondary transition-colors">
                    {ch.value}
                  </p>
                </div>

                <p className="mt-4 pt-3 border-t border-brand-accent/40 text-[11px] text-brand-muted">
                  {ch.note}
                </p>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Visual Let's Talk Contact Card Section (Image 1 UI in Brand Theme) ── */}
      <LetsTalkContactSection />

      {/* ── Ludhiana Pilot Coverage Band in Brand Palette ── */}
      <section id="coverage" className="border-t border-brand-accent/40 bg-brand-background px-[clamp(1rem,4vw,2rem)] py-20 lg:py-24">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-brand-secondary/40 bg-brand-sand/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-secondary">
              <Sparkles className="h-3 w-3 text-brand-secondary" />
              <span>Pilot Footprint</span>
            </div>
            <h2 className="mt-3 font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
              Currently live across Ludhiana
            </h2>
            <p className="mt-4 max-w-[52ch] text-sm sm:text-base leading-relaxed text-brand-ink/80">
              Our initial pilot covers select residential sectors across Ludhiana, Punjab. Simply mention your sector in the contact form and our coordinator will confirm real-time companion availability.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs sm:text-sm text-brand-primary font-medium">
              <span className="flex items-center gap-2 rounded-full bg-brand-sand/30 border border-brand-accent/60 px-3.5 py-1.5">
                <Clock className="h-4 w-4 text-brand-secondary" /> 7-Day Advance Scheduling
              </span>
              <span className="flex items-center gap-2 rounded-full bg-brand-sand/30 border border-brand-accent/60 px-3.5 py-1.5">
                <LifeBuoy className="h-4 w-4 text-brand-secondary" /> Human Coordinator Backup
              </span>
              <span className="flex items-center gap-2 rounded-full bg-brand-sand/30 border border-brand-accent/60 px-3.5 py-1.5">
                <MapPin className="h-4 w-4 text-brand-secondary" /> 100% Vetted Local Helpers
              </span>
            </div>
          </div>

          <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl border border-brand-accent/70 bg-brand-surface shadow-xl shadow-brand-primary/5">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(166,124,82,0.3) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />
            <div className="relative flex flex-col items-center text-center p-6">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary text-brand-background shadow-lg shadow-brand-primary/25 border border-brand-secondary/40">
                <MapPin className="h-8 w-8 text-brand-secondary" />
              </span>
              <p className="mt-4 font-heading text-2xl font-bold text-brand-primary">
                Ludhiana, Punjab
              </p>
              <p className="text-xs font-semibold text-brand-secondary tracking-widest uppercase mt-1">
                Active Residential Pilot Hub
              </p>
              <p className="mt-2 text-[11px] text-brand-muted max-w-xs">
                Model Town • Sarabha Nagar • BRS Nagar • Civil Lines • Aggar Nagar • South City
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
