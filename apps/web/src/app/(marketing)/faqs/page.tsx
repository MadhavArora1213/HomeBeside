import type { Metadata } from "next";
import PaperNotesFaqSection from "@/components/marketing/PaperNotesFaqSection";
import FaqPageClient from "@/components/marketing/FaqPageClient";

export const metadata: Metadata = {
  title: "FAQs & Stories — HomeBeside",
  description:
    "Real stories and verified answers regarding HomeBeside family assistance in Ludhiana — helper vetting, transparent pricing, hospital accompaniment, and safety safeguards.",
};

export default function FaqsPage() {
  return (
    <main className="min-h-screen bg-brand-surface">
      {/* ── 1. Featured Stories & FAQ Carousel (Exact Reference UI) ── */}
      <PaperNotesFaqSection />

      {/* ── 2. Searchable Knowledge Hub & Detailed Index ── */}
      <FaqPageClient />
    </main>
  );
}
