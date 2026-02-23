const variants: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-500",
  Expired: "bg-red-100 text-red-500",
  Renewed: "bg-gray-200 text-gray-600",
  Issued: "bg-yellow-100 text-yellow-700",
  Pending: "bg-orange-100 text-orange-600",
  Printed: "bg-gray-200 text-gray-700",
  Dispatched: "bg-blue-100 text-blue-600",
  Delivered: "bg-green-100 text-green-700",
  Lapsed: "bg-pink-100 text-pink-600",
  New: "bg-gray-100 text-gray-600",
  "High Value": "bg-teal-100 text-teal-700",
};

export default function StatusBadge({ status }: { status: string }) {
  const cls = variants[status] ?? "bg-gray-100 text-gray-500";
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${cls}`}
    >
      {status}
    </span>
  );
}
