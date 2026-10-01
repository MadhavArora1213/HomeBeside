import { SectionPage } from "@/components/console/section-page";
import { ScrollTextIcon } from "lucide-react";

export default function Page() {
  return <SectionPage title="Audit log" description="Security events, sign-ins and configuration changes." icon={ScrollTextIcon} />;
}
