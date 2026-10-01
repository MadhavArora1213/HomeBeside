import { SectionPage } from "@/components/console/section-page";
import { SettingsIcon } from "lucide-react";

export default function Page() {
  return <SectionPage title="Configuration" description="Platform settings, roles, permissions and service catalog." icon={SettingsIcon} />;
}
