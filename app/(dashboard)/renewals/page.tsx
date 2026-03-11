"use client";

import { useState } from "react";
import DataTable from "@/components/ui/Table";
import StatusBadge from "@/components/ui/StatusBadge";
import { usePageTitle } from "@/hooks/queries/usePage";
import { AlertCircle, AlertTriangle, CheckCircle2, Mail } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const trendData = [
  { day: "Mon\n15", value: 1200 },
  { day: "Tue\n16", value: 1800 },
  { day: "", value: 1500 },
  { day: "", value: 1400 },
  { day: "", value: 2200 },
  { day: "Wed\n17", value: 2600 },
  { day: "", value: 2400 },
  { day: "", value: 3200 },
  { day: "Thu\n18", value: 4800 },
  { day: "", value: 5200 },
  { day: "", value: 4600 },
  { day: "Fri\n19", value: 9200 },
  { day: "", value: 9600 },
  { day: "", value: 8800 },
  { day: "Sat\n20", value: 8400 },
  { day: "", value: 7800 },
  { day: "Sun\n21", value: 8600 },
];

function RenewalsTrendChart() {
  const [period, setPeriod] = useState("Weekly");
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm h-full">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-gray-800">Renewals Trend</p>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 bg-white focus:outline-none focus:ring-1 focus:ring-teal-400"
        >
          <option>Weekly</option>
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={trendData}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="rnwTrendGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f0f0f0"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v / 1000}K`}
            domain={[0, 10000]}
            ticks={[0, 2000, 4000, 6000, 8000, 10000]}
          />
          <Tooltip
            contentStyle={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              fontSize: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
            formatter={(v: number) => [v.toLocaleString(), "Renewals"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2d6a4f"
            strokeWidth={2}
            fill="url(#rnwTrendGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#2d6a4f" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function Toggle({
  enabled,
  onToggle,
  label,
}: {
  enabled: boolean;
  onToggle: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={`${label} — ${enabled ? "on" : "off"}`}
      aria-pressed={enabled}
      role="switch"
      aria-checked={enabled}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2 ${
        enabled ? "bg-teal-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function AutomatedReminderSettings() {
  const [reminders, setReminders] = useState({
    thirtyDays: true,
    fourteenDays: true,
    sevenDays: true,
  });

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm h-full">
      <p className="text-sm font-semibold text-gray-800 mb-4">
        Automated Reminder Settings
      </p>
      <div className="space-y-2">
        {[
          {
            label: "30 days before expiry",
            key: "thirtyDays" as const,
          },
          {
            label: "14 days before expiry",
            key: "fourteenDays" as const,
          },
          {
            label: "7 days before expiry",
            key: "sevenDays" as const,
          },
        ].map(({ label, key }) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-lg bg-teal-50/50 px-4 py-3"
          >
            <span className="text-sm text-gray-700">{label}</span>
            <Toggle
              label={label}
              enabled={reminders[key]}
              onToggle={() =>
                setReminders((prev) => ({ ...prev, [key]: !prev[key] }))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function RenewalStatCard({
  title,
  value,
  icon,
  iconBg,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div
        className={`h-10 w-10 rounded-full ${iconBg} grid place-items-center flex-shrink-0`}
      >
        {icon}
      </div>
    </div>
  );
}

type Client = {
  policyId: string;
  client: string;
  plan: string;
  expiryDate: string;
  remindersStatus: number;
  status: string;
};

const clients: Client[] = [
  {
    policyId: "POL-001",
    client: "John Ademola",
    plan: "Premium",
    expiryDate: "10/20/2026",
    remindersStatus: 4,
    status: "Active",
  },
  {
    policyId: "POL-001",
    client: "John Ademola",
    plan: "Premium",
    expiryDate: "10/20/2026",
    remindersStatus: 4,
    status: "Active",
  },
  {
    policyId: "POL-001",
    client: "John Ademola",
    plan: "Premium",
    expiryDate: "10/20/2026",
    remindersStatus: 4,
    status: "Active",
  },
  {
    policyId: "POL-001",
    client: "John Ademola",
    plan: "Premium",
    expiryDate: "10/20/2026",
    remindersStatus: 4,
    status: "Active",
  },
  {
    policyId: "POL-001",
    client: "John Ademola",
    plan: "Premium",
    expiryDate: "10/20/2026",
    remindersStatus: 4,
    status: "Active",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RenewalsPage() {
  usePageTitle("Renewals");

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <RenewalStatCard
          title="Expiring soon"
          value={46}
          iconBg="bg-gray-100"
          icon={<AlertCircle size={18} className="text-gray-400" />}
        />
        <RenewalStatCard
          title="Expired"
          value={34}
          iconBg="bg-amber-50"
          icon={<AlertTriangle size={18} className="text-amber-400" />}
        />
        <RenewalStatCard
          title="Critical < 7 days"
          value={12}
          iconBg="bg-red-50"
          icon={<AlertCircle size={18} className="text-red-400" />}
        />
        <RenewalStatCard
          title="Renewal Rate"
          value="65.9%"
          iconBg="bg-teal-50"
          icon={<CheckCircle2 size={18} className="text-teal-500" />}
        />
      </div>

      {/* Chart + Reminder Settings side by side */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <RenewalsTrendChart />
        <AutomatedReminderSettings />
      </div>

      {/* Clients Table */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-800 mb-3">Clients</p>
        <DataTable<Client>
          columns={[
            { header: "Policy ID", accessor: "policyId", sortable: true },
            { header: "Client Name", accessor: "client" },
            { header: "Plan", accessor: "plan" },
            { header: "Expiry Date", accessor: "expiryDate" },
            { header: "Reminders Status", accessor: "remindersStatus" },
            {
              header: "Status",
              render: (row) => <StatusBadge status={row.status} />,
            },
            {
              header: "Action",
              render: () => (
                <button className="flex items-center gap-1.5 bg-teal-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-teal-800 transition-colors">
                  <Mail size={12} />
                  Send Reminder
                </button>
              ),
            },
          ]}
          data={clients}
        />
      </div>
    </>
  );
}
