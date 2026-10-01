import { SectionPage } from "@/components/console/section-page";
import { UsersIcon } from "lucide-react";

export default function Page() {
  return <SectionPage title="Customers" description="Customer accounts, families and booking history." icon={UsersIcon} />;
}
