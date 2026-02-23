import Link from "next/link";

import StatusBadge from "@/components/ui/StatusBadge";
import { ArrowLeft } from "lucide-react";
import DataTable from "@/components/ui/Table";
import { usePageTitle } from "@/hooks/queries/usePage";

type PaymentRecord = { date: string; status: string; amount: string };

const payments: PaymentRecord[] = Array.from({ length: 5 }, () => ({
  date: "10/10/2020",
  status: "Active",
  amount: "N200,000",
}));

export default function PolicyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  usePageTitle(`Policy Details - ${params.id}`);
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 max-w-4xl">
        {/* Back */}
        <Link
          href="/policies"
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors w-fit"
        >
          <ArrowLeft size={15} /> Policy Details
        </Link>

        {/* Header */}
        <div className="grid grid-cols-3 gap-4 pb-5 border-b border-gray-100">
          <div>
            <p className="text-xs text-gray-400 mb-1">Policy ID</p>
            <p className="text-sm font-semibold text-gray-800">POL-123-990</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Status</p>
            <StatusBadge status="Active" />
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Policy ID</p>
            <p className="text-sm font-semibold text-gray-800">POL-123-990</p>
          </div>
        </div>

        {/* Client Information */}
        <div className="py-5 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            Client Information
          </p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Name", value: "John Smith" },
              { label: "Policy ID", value: "johnsmith@gmail.com" },
              { label: "Phone Number", value: "+234-908872727" },
              { label: "Region", value: "North West" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="text-sm text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage Details */}
        <div className="py-5 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            Coverage Details
          </p>
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Plan", value: "Premium" },
              { label: "Amount", value: "NGN 90,000" },
              { label: "Start Date", value: "10/10/2020" },
              { label: "End Date", value: "10/10/2020" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-gray-400 mb-1">{label}</p>
                <p className="text-sm text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="pt-5">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            Payment History
          </p>
          <DataTable<PaymentRecord>
            columns={[
              { header: "Date", accessor: "date", sortable: true },
              {
                header: "Status",
                render: (row) => <StatusBadge status={row.status} />,
              },
              { header: "Amount", accessor: "amount" },
            ]}
            data={payments}
          />
        </div>
      </div>
    </>
  );
}
