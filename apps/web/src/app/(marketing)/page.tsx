const palette = [
  { name: "Primary", hex: "#2E3A2F", meaning: "Trust · Stability · Premium" },
  { name: "Secondary", hex: "#A67C52", meaning: "Warmth · Natural · Earthy" },
  { name: "Background", hex: "#FAF9F6", meaning: "Clean · Minimal · Spacious" },
  { name: "Accent", hex: "#D9CBB9", meaning: "Calm · Elegant · Modern" },
  { name: "Text", hex: "#1E1E1E", meaning: "Readable · Strong · Premium" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-background text-brand-ink">
      <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <div>
          <span className="logo-text text-2xl text-brand-primary">
            HomeBeside
          </span>
          <p className="tagline text-xs text-brand-secondary">
            Homes Feel Closer
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-5 text-button">
          <a href="#colors" className="hover:text-brand-primary">
            Colors
          </a>
          <a href="#typography" className="hover:text-brand-primary">
            Typography
          </a>
          <a
            href="#get-started"
            className="rounded-full bg-brand-primary px-5 py-2 text-brand-background hover:opacity-90"
          >
            Get Started
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6">
        <section className="flex flex-col items-center gap-6 py-20 text-center">
          <p className="tagline text-xs text-brand-secondary">
            Non-emergency care, close to home
          </p>
          <h1 className="max-w-2xl text-h1 text-brand-primary">
            Modern Living Made Simple
          </h1>
          <p className="max-w-xl text-body text-brand-ink/80">
            Beautiful homes, thoughtful spaces and a better tomorrow — always
            beside you. Book trusted helpers for your family, right from your
            neighborhood.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#get-started"
              className="rounded-full bg-brand-primary px-8 py-3 text-button text-brand-background hover:opacity-90"
            >
              Book a Helper
            </a>
            <a
              href="#colors"
              className="rounded-full border border-brand-primary px-8 py-3 text-button text-brand-primary hover:bg-brand-accent/40"
            >
              Explore the Brand
            </a>
          </div>
        </section>

        <section id="colors" className="py-10">
          <h2 className="text-h2 text-brand-ink">Color Palette</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {palette.map((c) => (
              <div
                key={c.name}
                className="overflow-hidden rounded-2xl border border-brand-accent/60 bg-white"
              >
                <div
                  className="h-16 border-b border-brand-accent/40"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="p-3">
                  <p className="text-button">{c.name}</p>
                  <p className="text-caption uppercase text-brand-muted">
                    {c.hex}
                  </p>
                  <p className="mt-1 text-caption text-brand-muted">
                    {c.meaning}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="typography" className="py-10">
          <h2 className="text-h2 text-brand-ink">Typography</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-brand-accent/60 bg-white p-6">
              <p className="text-caption uppercase tracking-wider text-brand-muted">
                Headings — Cinzel SemiBold
              </p>
              <p className="font-heading mt-2 text-4xl font-semibold text-brand-primary">
                Aa Cinzel
              </p>
              <p className="mt-3 text-body">
                HomeBeside · Modern Living Made Simple
              </p>
            </div>
            <div className="rounded-2xl border border-brand-accent/60 bg-white p-6">
              <p className="text-caption uppercase tracking-wider text-brand-muted">
                Body — Montserrat Regular
              </p>
              <p className="mt-2 text-4xl">Aa Montserrat</p>
              <p className="mt-3 text-body">
                Beautiful homes, thoughtful spaces and a better tomorrow —
                always beside you.
              </p>
            </div>
          </div>
        </section>

        <section
          id="get-started"
          className="my-10 rounded-3xl bg-brand-primary px-8 py-14 text-center text-brand-background"
        >
          <p className="tagline text-xs opacity-80">Homes Feel Closer</p>
          <h2 className="mt-3 text-h2">Always Beside You</h2>
          <p className="mx-auto mt-3 max-w-lg text-body opacity-90">
            Care you can count on, for the people you love most — warm,
            trustworthy and right around the corner.
          </p>
          <a
            href="#"
            className="mt-7 inline-block rounded-full bg-brand-background px-8 py-3 text-button text-brand-primary hover:bg-brand-accent"
          >
            Get Started
          </a>
        </section>
      </main>

      <footer className="border-t border-brand-accent py-6 text-center text-caption text-brand-muted">
        © 2026 HomeBeside — Homes Feel Closer
      </footer>
    </div>
  );
}
