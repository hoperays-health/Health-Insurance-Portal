import React from "react";

export default function StatsCard({
  title,
  value,
  subValue,
  icon,
  iconBg = "bg-teal-50",
  iconColor = "text-teal-500",
}: {
  title: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 flex items-start justify-between shadow-sm">
      <div>
        <p className="text-xs text-gray-500 font-medium">{title}</p>
        <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>
        {subValue && <p className="text-xs text-gray-400 mt-1">{subValue}</p>}
      </div>
      <div
        className={`h-10 w-10 rounded-xl ${iconBg} ${iconColor} grid place-items-center flex-shrink-0`}
      >
        {icon}
      </div>
    </div>
  );
}
