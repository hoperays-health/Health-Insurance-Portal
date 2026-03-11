import {
  LayoutDashboard,
  FileText,
  CreditCard,
  RefreshCw,
  // BarChart3,
  Wallet,
  LogOut,
  Users,
} from "lucide-react";
export const siteConfig = {
  name: "Insurance Portal",
  description: "Manage your insurance policies and claims with ease",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  links: {
    github: "https://github.com/yourusername/insurance-app",
    docs: "https://docs.yoursite.com",
  },
  theme: {
    defaultTheme: "light",
    storageKey: "insurance-theme",
  },
};

export type SidebarRoute =
  | "/dashboard"
  | "/client"
  | "/policies"
  | "/id-card"
  | "/renewals"
  | "/revenue"
  | "/reports";

export type SidebarItem = {
  title: string;
  href: SidebarRoute;
  icon: React.ElementType;
};

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Clients", href: "/client", icon: Users },
  { title: "Policies", href: "/policies", icon: FileText },
  { title: "ID Card", href: "/id-card", icon: CreditCard },
  { title: "Revenue", href: "/revenue", icon: Wallet },
  { title: "Renewals", href: "/renewals", icon: RefreshCw },
  // { title: "Reports", href: "/reports", icon: BarChart3 },
];

export const LOGOUT_ITEM = { title: "Log Out", icon: LogOut };

export const policyTypes = [
  { value: "life", label: "Life Insurance" },
  { value: "health", label: "Health Insurance" },
  { value: "auto", label: "Auto Insurance" },
  { value: "home", label: "Home Insurance" },
  { value: "business", label: "Business Insurance" },
];

export const policyStatuses = [
  { value: "active", label: "Active", color: "green" },
  { value: "pending", label: "Pending", color: "yellow" },
  { value: "expired", label: "Expired", color: "red" },
  { value: "cancelled", label: "Cancelled", color: "gray" },
];

export const claimStatuses = [
  { value: "submitted", label: "Submitted", color: "blue" },
  { value: "under_review", label: "Under Review", color: "yellow" },
  { value: "approved", label: "Approved", color: "green" },
  { value: "rejected", label: "Rejected", color: "red" },
  { value: "paid", label: "Paid", color: "green" },
];
