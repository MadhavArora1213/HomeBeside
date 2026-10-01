import Link from "next/link";

function PanelCheck() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-brand-background text-brand-ink">
      <aside className="hidden w-[42%] max-w-xl flex-col justify-between bg-brand-primary p-10 text-brand-background lg:flex">
        <Link
          href="/"
          className="logo-text text-2xl text-brand-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-accent"
        >
          HomeBeside
        </Link>

        <div>
          <p className="tagline text-[0.6875rem] text-brand-background/60">
            Homes Feel Closer
          </p>
          <p className="mt-5 max-w-[18ch] font-heading text-3xl leading-snug">
            A trusted person for your family when you cannot be there.
          </p>
          <ul className="mt-9 space-y-4 text-body text-brand-background/85">
            <li className="flex gap-3">
              <PanelCheck />
              <span>Helpers verified by our company before a first task</span>
            </li>
            <li className="flex gap-3">
              <PanelCheck />
              <span>Every visit traced from booking through completion</span>
            </li>
            <li className="flex gap-3">
              <PanelCheck />
              <span>A human support team, not a bot, when you need help</span>
            </li>
          </ul>
        </div>

        <p className="text-caption text-brand-background/60">
          Non-emergency family assistance · Pilot city: Ludhiana, Punjab
        </p>
      </aside>

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-4 py-5 sm:py-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(217,203,185,0.55),transparent_42%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(166,124,82,0.16)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_at_72%_82%,black,transparent_62%)]"
        />
        <div className="relative z-10 mb-3 text-center sm:mb-6 lg:hidden">
          <Link
            href="/"
            className="logo-text text-2xl text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-secondary sm:text-3xl"
          >
            HomeBeside
          </Link>
          <p className="tagline hidden text-xs text-brand-muted sm:block">Homes Feel Closer</p>
        </div>
        <div className="relative z-10 w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
