"use client";
import StatsCard from "@/components/ui/StatsCard";
import StatusBadge from "@/components/ui/StatusBadge";
import {
  PolicyGrowthChart,
  RevenueByPlanChart,
  PolicyStatusPieChart,
} from "@/components/charts/Charts";
import { FileText, Users, TrendingUp, DollarSign } from "lucide-react";
import DataTable from "@/components/ui/Table";
import { usePageTitle } from "@/hooks/queries/usePage";

const growthData = [
  { label: "Jan", value: 40 },
  { label: "Feb", value: 55 },
  { label: "Mar", value: 48 },
  { label: "Apr", value: 70 },
  { label: "May", value: 65 },
  { label: "Jun", value: 90 },
  { label: "Jul", value: 85 },
];

const revenueByPlan = [
  { plan: "Basic", value: 1200000 },
  { plan: "Standard", value: 1800000 },
  { plan: "Premium", value: 2500000 },
];

const policyStatusData = [
  { name: "Active", value: 45 },
  { name: "Issued", value: 30 },
  { name: "Expired", value: 10 },
  { name: "Renewed", value: 15 },
];

type RecentPolicy = {
  id: string;
  client: string;
  plan: string;
  status: string;
  amount: string;
  region: string;
};

const recentPolicies: RecentPolicy[] = [
  {
    id: "POL-123-2828",
    client: "Demola John",
    plan: "Premium",
    status: "Active",
    amount: "N200,000",
    region: "North East",
  },
  {
    id: "POL-123-2829",
    client: "Sarah Ahmed",
    plan: "Basic",
    status: "Issued",
    amount: "N90,000",
    region: "Lagos",
  },
  {
    id: "POL-123-2830",
    client: "Kemi Balogun",
    plan: "Standard",
    status: "Expired",
    amount: "N150,000",
    region: "Abuja",
  },
  {
    id: "POL-123-2831",
    client: "Tunde Ojo",
    plan: "Premium",
    status: "Renewed",
    amount: "N200,000",
    region: "Akure",
  },
];

export default function DashboardPage() {
  usePageTitle("Dashboard");
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Policies"
          value="284"
          subValue="+12 this month"
          icon={<FileText size={18} />}
        />
        <StatsCard
          title="Active Clients"
          value="46"
          icon={<Users size={18} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Renewals Due"
          value="18"
          subValue="Next 30 days"
          icon={<TrendingUp size={18} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />
        <StatsCard
          title="Total Revenue"
          value="₦5.5M"
          subValue="This quarter"
          icon={<DollarSign size={18} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-500"
        />
      </div>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Policies"
          value="284"
          subValue="+12 this month"
          icon={<FileText size={18} />}
        />
        <StatsCard
          title="Active Clients"
          value="46"
          icon={<Users size={18} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Renewals Due"
          value="18"
          subValue="Next 30 days"
          icon={<TrendingUp size={18} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />
        <StatsCard
          title="Total Revenue"
          value="₦5.5M"
          subValue="This quarter"
          icon={<DollarSign size={18} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-500"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <RevenueByPlanChart data={revenueByPlan} />

        <PolicyGrowthChart data={growthData} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <PolicyStatusPieChart data={policyStatusData} />
        <PolicyStatusPieChart data={policyStatusData} />
      </div>

      <div className="gap-4 mb-6">
        <DataTable<RecentPolicy>
          columns={[
            { header: "Policy ID", accessor: "id", sortable: true },
            { header: "Client Name", accessor: "client" },
            { header: "Plan", accessor: "plan" },
            {
              header: "Status",
              render: (row) => <StatusBadge status={row.status} />,
            },
            { header: "Amount", accessor: "amount" },
            { header: "Region", accessor: "region" },
          ]}
          data={recentPolicies}
        />
      </div>
    </>
  );
}
