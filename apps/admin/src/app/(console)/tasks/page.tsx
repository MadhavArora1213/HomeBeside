import { SectionPage } from "@/components/console/section-page";
import { ClipboardListIcon } from "lucide-react";

export default function Page() {
  return <SectionPage title="Tasks" description="Task assignments, scheduling and completion tracking." icon={ClipboardListIcon} />;
}
