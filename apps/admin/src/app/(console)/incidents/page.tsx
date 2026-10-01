import { SectionPage } from "@/components/console/section-page";
import { SirenIcon } from "lucide-react";

export default function Page() {
  return <SectionPage title="Incidents" description="Safety events, escalations and resolution tracking." icon={SirenIcon} />;
}
