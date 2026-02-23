"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export type GrowthPoint = { label: string; value: number };

export function PolicyGrowthChart({ data }: { data: GrowthPoint[] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-gray-700">
          Policy Growth over time
        </p>
        <select className="h-8 rounded-lg border border-gray-200 px-3 text-xs text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-teal-300">
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
          >
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0d9488"
              strokeWidth={2}
              dot={{ fill: "#0d9488", r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export type RevenueByPlanPoint = { plan: string; value: number };

export function RevenueByPlanChart({ data }: { data: RevenueByPlanPoint[] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-700 mb-4">
        Revenue by plan
      </p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
          >
            <XAxis
              dataKey="plan"
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                fontSize: 12,
              }}
            />
            <Bar dataKey="value" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const STATUS_COLORS: Record<string, string> = {
  Active: "#1a1a2e",
  Issued: "#f59e0b",
  Expired: "#f97316",
  Renewed: "#7c3aed",
};

export type PolicyStatusPoint = { name: string; value: number };

export function PolicyStatusPieChart({ data }: { data: PolicyStatusPoint[] }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-700 mb-4">
        Policy Status Distribution
      </p>
      <div className="h-56 flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              innerRadius={40}
              dataKey="value"
              paddingAngle={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={STATUS_COLORS[entry.name] ?? "#e5e7eb"}
                />
              ))}
            </Pie>
            <Legend
              iconType="square"
              iconSize={10}
              formatter={(value) => (
                <span style={{ fontSize: 12, color: "#374151" }}>{value}</span>
              )}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
