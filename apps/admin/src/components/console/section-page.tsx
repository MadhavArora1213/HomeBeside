import type { LucideIcon } from "lucide-react";

type SectionPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function SectionPage({ title, description, icon: Icon }: SectionPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-1.5">
        <h2 className="font-heading text-2xl text-brand-primary">{title}</h2>
        <p className="max-w-2xl text-sm text-brand-ink/70">{description}</p>
      </header>

      <section className="rounded-2xl border border-brand-accent/50 bg-brand-surface px-6 py-12 text-center shadow-[0_1px_2px_rgb(46_58_47/0.05)] sm:py-16">
        <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-brand-accent/60 bg-brand-sand/40">
          <Icon className="size-6 text-brand-secondary" aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-heading text-lg text-brand-primary">In progress</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-muted">
          {title} management is being built. Records, filters and actions for this module will
          appear here.
        </p>
      </section>
    </div>
  );
}
