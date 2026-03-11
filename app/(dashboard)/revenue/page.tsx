"use client";

import { useState } from "react";
import StatusBadge from "@/components/ui/StatusBadge";
import DataTable from "@/components/ui/Table";
import { usePageTitle } from "@/hooks/queries/usePage";
import { Bot, Search } from "lucide-react";
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
  { day: "", value: 4200 },
  { day: "", value: 3800 },
  { day: "Fri\n19", value: 6800 },
  { day: "", value: 7200 },
  { day: "", value: 8400 },
  { day: "Sat\n20", value: 9200 },
  { day: "", value: 9800 },
  { day: "", value: 9600 },
  { day: "Sun\n21", value: 9000 },
  { day: "", value: 9400 },
];

function RenewalsTrendChart() {
  const [period, setPeriod] = useState("Weekly");
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
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
            <linearGradient id="revTrendGrad" x1="0" y1="0" x2="0" y2="1">
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
            formatter={(v: number) => [`₦${v.toLocaleString()}`, "Revenue"]}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2d6a4f"
            strokeWidth={2}
            fill="url(#revTrendGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#2d6a4f" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Bot Icon (matches the screenshot's robot icon) ────────────────────────────

function BotIcon() {
  return (
    <div className="h-10 w-10 rounded-xl bg-teal-50 grid place-items-center flex-shrink-0">
      <Bot size={18} className="text-teal-600" />
    </div>
  );
}

// ── Revenue Stats Card (large amount style) ───────────────────────────────────

function RevenueCard({ title, amount }: { title: string; amount: string }) {
  const [whole, cents] = amount.split(".");
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 flex items-center justify-between shadow-sm">
      <div>
        <p className="text-xs text-gray-500 font-medium mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">
          {whole}
          <span className="text-gray-300">.{cents}</span>
        </p>
      </div>
      <BotIcon />
    </div>
  );
}

// ── Transactions Table ────────────────────────────────────────────────────────

type Transaction = {
  id: string;
  client: string;
  type: string;
  date: string;
  policyId: string;
  amount: string;
  status: string;
};

const transactions: Transaction[] = [
  {
    id: "TXN-001",
    client: "John Ademola",
    type: "Premium",
    date: "Sept 3rd, 1997",
    policyId: "Aug. 4th 2003",
    amount: "₦ 4,900.00",
    status: "Completed",
  },
  {
    id: "TXN-001",
    client: "John Ademola",
    type: "Premium",
    date: "Sept 3rd, 1997",
    policyId: "Aug. 4th 2003",
    amount: "₦ 4,900.00",
    status: "Completed",
  },
  {
    id: "TXN-001",
    client: "John Ademola",
    type: "Premium",
    date: "Sept 3rd, 1997",
    policyId: "Aug. 4th 2003",
    amount: "₦ 4,900.00",
    status: "Completed",
  },
  {
    id: "TXN-001",
    client: "John Ademola",
    type: "Premium",
    date: "Sept 3rd, 1997",
    policyId: "Aug. 4th 2003",
    amount: "₦ 4,900.00",
    status: "Completed",
  },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function RevenuePage() {
  usePageTitle("Revenue");
  const [activeTab, setActiveTab] = useState<"transaction" | "settlement">(
    "transaction",
  );
  const [search, setSearch] = useState("");

  const filtered = transactions.filter(
    (t) =>
      search === "" ||
      t.client.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      {/* Revenue Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <RevenueCard title="Gross Revenue" amount="₦ 4,982,900.00" />
        <RevenueCard title="Platform Service Charge" amount="₦ 4,900.00" />
        <RevenueCard title="Net Revenue" amount="₦ 4,900.00" />
      </div>

      {/* Renewals Trend */}
      <div className="mb-6">
        <RenewalsTrendChart />
      </div>

      {/* Transactions */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-5">
        <p className="text-sm font-semibold text-gray-800 mb-4">Transactions</p>

        {/* Tabs + Search */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("transaction")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "transaction"
                  ? "bg-teal-700 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              Transaction
            </button>
            <button
              onClick={() => setActiveTab("settlement")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "settlement"
                  ? "bg-teal-700 text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              Settlement
            </button>
          </div>

          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search Cards"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-teal-400 w-52"
            />
          </div>
        </div>

        <DataTable<Transaction>
          columns={[
            { header: "Transaction ID", accessor: "id", sortable: true },
            { header: "Client Name", accessor: "client" },
            { header: "Type", accessor: "type" },
            { header: "Date Date", accessor: "date" },
            { header: "Policy ID", accessor: "policyId" },
            {
              header: "Amount",
              render: (row) => (
                <span className="font-semibold text-gray-800">
                  {row.amount}
                </span>
              ),
            },
            {
              header: "Status",
              render: (row) => <StatusBadge status={row.status} />,
            },
          ]}
          data={filtered}
        />
      </div>
    </>
  );
}
