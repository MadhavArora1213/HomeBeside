import {
  BarChart3Icon,
  ClipboardListIcon,
  HandCoinsIcon,
  HandHelpingIcon,
  HeartHandshakeIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  ScrollTextIcon,
  SettingsIcon,
  SirenIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        href: "/dashboard",
        label: "Dashboard",
        description: "Console home and your access summary",
        icon: LayoutDashboardIcon,
      },
      {
        href: "/analytics",
        label: "Analytics",
        description: "Bookings, growth and service metrics",
        icon: BarChart3Icon,
      },
    ],
  },
  {
    label: "People",
    items: [
      {
        href: "/customers",
        label: "Customers",
        description: "Customer accounts and family memberships",
        icon: UsersIcon,
      },
      {
        href: "/beneficiaries",
        label: "Beneficiaries",
        description: "Care recipients and care plans",
        icon: HeartHandshakeIcon,
      },
      {
        href: "/helpers",
        label: "Helpers",
        description: "Helper profiles, verification and status",
        icon: HandHelpingIcon,
      },
    ],
  },
  {
    label: "Operations",
    items: [
      {
        href: "/tasks",
        label: "Tasks",
        description: "Assignments, scheduling and progress",
        icon: ClipboardListIcon,
      },
      {
        href: "/incidents",
        label: "Incidents",
        description: "Safety events and escalations",
        icon: SirenIcon,
      },
      {
        href: "/support",
        label: "Support",
        description: "Tickets and customer requests",
        icon: LifeBuoyIcon,
      },
    ],
  },
  {
    label: "Finance",
    items: [
      {
        href: "/finance",
        label: "Finance",
        description: "Payments, refunds and helper payouts",
        icon: HandCoinsIcon,
      },
    ],
  },
  {
    label: "Governance",
    items: [
      {
        href: "/audit",
        label: "Audit log",
        description: "Security and configuration history",
        icon: ScrollTextIcon,
      },
      {
        href: "/configuration",
        label: "Configuration",
        description: "Platform settings, roles and permissions",
        icon: SettingsIcon,
      },
    ],
  },
];

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((group) => group.items);

export function titleForPath(pathname: string): string {
  const match = NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match?.label ?? "Console";
}

export function isActivePath(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}
