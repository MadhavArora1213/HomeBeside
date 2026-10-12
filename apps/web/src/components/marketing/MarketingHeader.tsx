import Link from "next/link";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary focus-visible:transition-none";

export const marketingNavLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#how", label: "How It Works" },
  { href: "/#safety", label: "Trust & Safety" },
  { href: "/about", label: "About" },
  { href: "/faqs", label: "FAQs" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact" },
];

export default function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-accent/35 bg-brand-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-[clamp(1rem,4vw,2rem)]">
        <Link
          href="/"
          className={`font-heading text-2xl font-bold tracking-wide text-brand-primary ${focusRing}`}
        >
          HomeBeside
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {marketingNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium text-brand-ink/80 transition-colors duration-200 hover:text-brand-primary ${focusRing}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className={`hidden text-sm font-medium text-brand-ink/80 transition-colors duration-200 hover:text-brand-primary lg:inline-flex ${focusRing}`}
          >
            Sign In
          </Link>
          <Link
            href="/login"
            className={`hidden rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-background shadow-md shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-ink sm:inline-flex ${focusRing}`}
          >
            Book a Helper
          </Link>

          <details className="group relative lg:hidden">
            <summary
              className={`flex min-h-10 cursor-pointer list-none items-center justify-center rounded-full border border-brand-primary/40 px-5 text-sm font-semibold text-brand-primary transition-colors duration-200 hover:bg-brand-accent/40 [&::-webkit-details-marker]:hidden ${focusRing}`}
            >
              Menu
            </summary>
            <nav
              aria-label="Primary mobile"
              className="absolute right-0 top-[calc(100%+8px)] z-50 flex w-56 flex-col items-start gap-4 rounded-2xl border border-brand-accent bg-brand-surface p-5 shadow-xl"
            >
              {marketingNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium text-brand-ink hover:text-brand-primary ${focusRing}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                className={`text-sm font-medium text-brand-ink hover:text-brand-primary ${focusRing}`}
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className={`inline-flex w-full items-center justify-center rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-background ${focusRing}`}
              >
                Book a Helper
              </Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
