import type { ReactNode } from "react";
import Link from "next/link";
import { FileText } from "lucide-react";

export interface LegalSection {
  id: string;
  heading: string;
  paragraphs: string[];
  list?: string[];
}

interface LegalDocumentProps {
  title: string;
  eyebrow?: string;
  updated: string;
  summary: string;
  sections: LegalSection[];
  children?: ReactNode;
}

export default function LegalDocument({
  title,
  eyebrow = "Legal",
  updated,
  summary,
  sections,
}: LegalDocumentProps) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-brand-accent/40 bg-gradient-to-b from-brand-background via-[#f6f2ec] to-brand-surface px-[clamp(1rem,4vw,2rem)] pt-16 pb-12 lg:pt-20 lg:pb-16">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute -top-32 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full blur-[130px] opacity-50"
            style={{
              background:
                "radial-gradient(circle, rgba(166, 124, 82, 0.16) 0%, rgba(217, 203, 185, 0.26) 50%, transparent 80%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-accent/60 bg-brand-sand/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-secondary">
            <FileText className="h-3.5 w-3.5" />
            {eyebrow}
          </span>
          <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-brand-ink/70">
            {summary}
          </p>
          <p className="mt-5 text-xs font-medium uppercase tracking-wider text-brand-muted">
            {updated}
          </p>
        </div>
      </section>

      <section className="px-[clamp(1rem,4vw,2rem)] py-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-4 lg:gap-14">
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-secondary">
                Contents
              </p>
              <nav className="mt-4 flex flex-col gap-1 border-l border-brand-accent/50 pl-4">
                {sections.map((section) => (
                  <Link
                    key={section.id}
                    href={`#${section.id}`}
                    className="py-1 text-sm text-brand-ink/70 transition-colors hover:text-brand-primary"
                  >
                    {section.heading}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          <article className="space-y-10 lg:col-span-3">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="font-heading text-xl font-bold text-brand-primary sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-3 space-y-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-brand-ink/75 sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                  {section.list && (
                    <ul className="mt-2 space-y-2">
                      {section.list.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-brand-ink/75 sm:text-base">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-secondary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}

            <div className="rounded-3xl border border-brand-accent/50 bg-brand-sand/25 p-6">
              <h2 className="font-heading text-lg font-bold text-brand-primary">
                Questions about this policy?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-ink/70">
                Reach our care desk and a member of our team will be glad to help.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-primary px-6 py-2.5 text-sm font-semibold text-brand-background transition-colors hover:bg-brand-ink"
              >
                Contact HomeBeside
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
