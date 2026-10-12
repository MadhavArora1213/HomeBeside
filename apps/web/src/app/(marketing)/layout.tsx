import IdeogramFooter from "@/components/marketing/IdeogramFooter";
import MarketingHeader from "@/components/marketing/MarketingHeader";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-background text-brand-ink selection:bg-brand-primary/10 selection:text-brand-primary">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <IdeogramFooter />
    </div>
  );
}
