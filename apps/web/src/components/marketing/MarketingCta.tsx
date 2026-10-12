import Link from "next/link";

interface MarketingCtaProps {
  eyebrow?: string;
  title: string;
  description: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export default function MarketingCta({
  eyebrow = "Homes Feel Closer",
  title,
  description,
  primary = { label: "Get Started Free", href: "/login" },
  secondary = { label: "View All Services", href: "/#services" },
}: MarketingCtaProps) {
  return (
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
              {eyebrow}
            </span>
            <h2 className="mt-4 font-heading text-3xl font-bold text-brand-background sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-[46ch] text-base leading-relaxed text-brand-background/75 sm:text-lg">
              {description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href={primary.href}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-background px-8 py-3 text-sm font-semibold tracking-wide text-brand-primary shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-sand"
              >
                {primary.label}
              </Link>
              {secondary && (
                <Link
                  href={secondary.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-brand-background/35 px-8 py-3 text-sm font-semibold tracking-wide text-brand-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-background/10"
                >
                  {secondary.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
