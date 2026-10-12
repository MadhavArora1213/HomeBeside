import type { Metadata } from "next";
import VisualPrivacyPolicy from "@/components/marketing/VisualPrivacyPolicy";

export const metadata: Metadata = {
  title: "Privacy Policy & Family Data Safeguards — HomeBeside",
  description:
    "How HomeBeside collects, uses, shares and safeguards personal information for elderly parents and families across Ludhiana, Punjab. Zero data selling guarantee.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <VisualPrivacyPolicy />
    </main>
  );
}
