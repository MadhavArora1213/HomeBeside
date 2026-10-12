import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}

export default function PageIntro({ eyebrow, title, description, children }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-background via-[#f6f2ec] to-brand-surface px-[clamp(1rem,4vw,2rem)] pt-16 pb-14 lg:pt-20 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-32 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full blur-[130px] opacity-60"
          style={{
            background:
              "radial-gradient(circle, rgba(166, 124, 82, 0.16) 0%, rgba(217, 203, 185, 0.28) 50%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full border border-brand-accent/60 bg-brand-sand/40 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-brand-secondary">
          {eyebrow}
        </span>
        <h1
          className="mt-4 font-heading font-bold tracking-tight text-brand-primary"
          style={{ fontSize: "clamp(2.2rem, 4.6vw, 3.6rem)", lineHeight: 1.15 }}
        >
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-[58ch] text-base leading-relaxed text-brand-ink/70 sm:text-lg">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}
