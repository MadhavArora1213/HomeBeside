import type { Metadata } from "next";
import LegalDocument, { type LegalSection } from "@/components/marketing/LegalDocument";

export const metadata: Metadata = {
  title: "Terms & Conditions — HomeBeside",
  description:
    "The terms governing your use of HomeBeside's non-emergency family assistance services, bookings, payments and conduct.",
};

const sections: LegalSection[] = [
  {
    id: "acceptance",
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "These Terms & Conditions (\"Terms\") govern your access to and use of the HomeBeside website, mobile web app and services. By creating an account or booking a service, you agree to be bound by these Terms and our Privacy Policy.",
      "If you do not agree with these Terms, you must not use our services.",
    ],
  },
  {
    id: "services",
    heading: "2. Our Services",
    paragraphs: [
      "HomeBeside arranges verified local helpers to provide non-emergency assistance such as check-ins, accompaniment, errands, companion visits and practical support in Ludhiana, Punjab.",
      "HomeBeside is not an emergency service, ambulance, medical clinic or diagnostic provider. Helpers do not provide medical advice, diagnosis, treatment or clinical care.",
    ],
  },
  {
    id: "eligibility",
    heading: "3. Eligibility and Accounts",
    paragraphs: [
      "You must be at least 18 years old and legally capable of entering into binding contracts to use HomeBeside. You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.",
      "You agree to provide accurate, current and complete information, and to update it as necessary.",
    ],
  },
  {
    id: "bookings",
    heading: "4. Bookings and Scheduling",
    paragraphs: [
      "Bookings are subject to helper availability and service coverage. We will confirm a booking and its final price before the visit is reserved.",
      "You are responsible for providing accurate addresses, access instructions and any relevant instructions or preferences for the beneficiary. Changes to a booking may affect availability and price.",
    ],
  },
  {
    id: "payments",
    heading: "5. Pricing and Payments",
    paragraphs: [
      "Pricing is calculated and displayed before you confirm a booking, with no hidden surcharges. The final amount is locked with your reservation and processed through our payment partners.",
      "Unless stated otherwise, payments are due at the time of booking. Applicable taxes are included or shown separately as required by law.",
    ],
  },
  {
    id: "cancellations",
    heading: "6. Cancellations and Refunds",
    paragraphs: [
      "You may cancel or reschedule a booking subject to our cancellation windows. Cancellations made within the permitted window are eligible for a refund or reschedule; late cancellations may incur a charge to compensate the reserved helper.",
      "Refunds for eligible cancellations are processed to the original payment method within a reasonable period.",
    ],
  },
  {
    id: "conduct",
    heading: "7. User Responsibilities and Conduct",
    paragraphs: [
      "You agree not to misuse the service. In particular, you must not:",
    ],
    list: [
      "Request assistance that is unlawful, unsafe, or outside the scope of non-emergency assistance.",
      "Harass, threaten, discriminate against or endanger a helper or any other person.",
      "Provide false information or impersonate another person.",
      "Use the service to transmit unlawful, harmful or infringing content.",
    ],
  },
  {
    id: "helpers",
    heading: "8. Helpers and Verification",
    paragraphs: [
      "Helpers are onboarded, verified and accountable to HomeBeside. We perform identity verification, reference validation and in-person interviews before a helper's first task. While we maintain rigorous standards, we cannot guarantee uninterrupted availability of any particular helper.",
    ],
  },
  {
    id: "limitation",
    heading: "9. Disclaimers and Limitation of Liability",
    paragraphs: [
      "The services are provided on an \"as is\" and \"as available\" basis. To the maximum extent permitted by law, HomeBeside disclaims all warranties, whether express or implied, and is not liable for indirect, incidental, special, consequential or punitive damages arising from your use of the services.",
      "Nothing in these Terms limits liability that cannot be limited under applicable law. In emergencies, always contact local emergency services directly.",
    ],
  },
  {
    id: "changes",
    heading: "10. Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Material changes will be reflected by an updated effective date and, where appropriate, notified to you. Your continued use of the services after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    id: "law",
    heading: "11. Governing Law",
    paragraphs: [
      "These Terms are governed by the laws of India, and the courts of Punjab shall have jurisdiction over any disputes arising in connection with them.",
    ],
  },
  {
    id: "contact",
    heading: "12. Contact Us",
    paragraphs: [
      "For questions about these Terms, contact our care desk at care@homebeside.in or call +91 98765 43210. You may also write to us at our Ludhiana pilot hub on Ferozepur Road, Ludhiana, Punjab 141001.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms & Conditions"
      updated="Last updated: 11 October 2026"
      summary="These terms set out the rules for using HomeBeside, including bookings, payments, cancellations and your responsibilities."
      sections={sections}
    />
  );
}
