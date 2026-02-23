import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type PolicyStatus =
  | "Active"
  | "Issued"
  | "Expired"
  | "Renewed"
  | "Inactive";

export type Kpi = {
  totalRegisteredClients: number;
  activePolicies: number;
  expiredPolicies: number;
  newPoliciesIssued: number;
  totalRevenueGenerated: number;
  platformServiceCharges: number;
  renewalRate: number;
  churnRate: number;
};

export type RevenueByPlanPoint = {
  plan: "Family" | "Basic" | "Corporate" | "Premium";
  value: number;
};

export type GrowthPoint = { label: string; value: number }; // e.g. Mon..Sun or dates

export type StatusDistributionPoint = { status: PolicyStatus; value: number };

export type RegionDistributionPoint = { region: string; value: number };

export type RecentPolicyRow = {
  policyId: string;
  clientId: string;
  status: PolicyStatus;
  issueDate: string;
  amount: number;
};

type DashboardState = {
  kpi: Kpi | null;
  revenueByPlan: RevenueByPlanPoint[];
  policyGrowth: GrowthPoint[];
  statusDistribution: StatusDistributionPoint[];
  regionDistribution: RegionDistributionPoint[];
  recentPolicies: RecentPolicyRow[];

  growthRange: "Daily" | "Weekly" | "Monthly";
  setGrowthRange: (range: DashboardState["growthRange"]) => void;

  setDashboardData: (
    data: Omit<
      DashboardState,
      "growthRange" | "setGrowthRange" | "setDashboardData"
    >,
  ) => void;
  reset: () => void;
};

export const useDashboardStore = create<DashboardState>()(
  devtools((set) => ({
    kpi: null,
    revenueByPlan: [],
    policyGrowth: [],
    statusDistribution: [],
    regionDistribution: [],
    recentPolicies: [],

    growthRange: "Weekly",
    setGrowthRange: (growthRange) => set({ growthRange }),

    setDashboardData: (data) => set({ ...data }),
    reset: () =>
      set({
        kpi: null,
        revenueByPlan: [],
        policyGrowth: [],
        statusDistribution: [],
        regionDistribution: [],
        recentPolicies: [],
        growthRange: "Weekly",
      }),
  })),
);
