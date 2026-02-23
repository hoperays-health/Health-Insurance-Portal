"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import StatusBadge from "@/components/ui/StatusBadge";
import Pagination from "@/components/ui/Pagination";
import {
  Search,
  SlidersHorizontal,
  Download,
  X,
  ChevronDown,
} from "lucide-react";
import DataTable from "@/components/ui/Table";
import { usePageTitle } from "@/hooks/queries/usePage";

type Policy = {
  id: string;
  client: string;
  plan: string;
  status: string;
  amount: string;
  region: string;
};

const ALL_POLICIES: Policy[] = Array.from({ length: 30 }, (_, i) => ({
  id: `POL-123-${2828 + i}`,
  client: [
    "Demola John",
    "Sarah Ahmed",
    "Kemi Balogun",
    "Tunde Ojo",
    "Amaka Nwosu",
  ][i % 5],
  plan: ["Premium", "Basic", "Standard"][i % 3],
  status: ["Active", "Active", "Active", "Renewed", "Expired"][i % 5],
  amount: "N200,000",
  region: ["North East", "Lagos", "Abuja", "Akure", "Ekiti"][i % 5],
}));

const PAGE_SIZE = 6;

export default function PoliciesPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dateRange] = useState("10/08/2023 to 10/08/2023");

  const filtered = ALL_POLICIES.filter(
    (p) =>
      p.client.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()),
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  usePageTitle("Policies");

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
          <h2 className="text-sm font-semibold text-gray-700">Policies</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 bg-gray-50">
              {dateRange}
              <button
                title="close"
                className="ml-1 text-gray-400 hover:text-gray-700"
              >
                <X size={12} />
              </button>
            </div>

            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search Client"
                className="h-9 pl-9 pr-4 rounded-lg border border-gray-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-teal-300 w-44"
              />
            </div>

            <button className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={13} /> Filter By{" "}
              <ChevronDown size={12} />
            </button>

            <button className="flex items-center gap-1.5 h-9 px-4 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium transition-colors">
              <Download size={13} /> Export
            </button>
          </div>
        </div>

        {/* Table — row is now typed as Policy */}
        <DataTable<Policy>
          columns={[
            { header: "Policy ID", accessor: "id", sortable: true },
            { header: "Client Name", accessor: "client" },
            { header: "Plan", accessor: "plan" },
            {
              header: "Status",
              render: (row: Policy) => <StatusBadge status={row.status} />,
            },
            { header: "Amount", accessor: "amount" },
            { header: "Region", accessor: "region" },
            {
              header: "Action",
              render: (row: Policy) => (
                <button
                  title="navigation"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/policies/${row.id}`);
                  }}
                  className="h-7 w-7 rounded-full border border-gray-200 grid place-items-center hover:bg-gray-100 transition-colors"
                >
                  <span className="w-1 h-1 bg-gray-400 rounded-full ring-2 ring-offset-1 ring-gray-300" />
                </button>
              ),
            },
          ]}
          data={paginated}
          onRowClick={(row: Policy) => router.push(`/policies/${row.id}`)}
        />

        <Pagination
          currentPage={page}
          totalPages={Math.ceil(filtered.length / PAGE_SIZE)}
          onPageChange={setPage}
        />
      </div>
    </>
  );
}
