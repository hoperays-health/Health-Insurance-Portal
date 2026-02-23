"use client";
import { useState } from "react";
import StatsCard from "@/components/ui/StatsCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { Search, Clock, Printer, Truck, CheckCircle2 } from "lucide-react";
import DataTable from "@/components/ui/Table";
import { usePageTitle } from "@/hooks/queries/usePage";

type PhysicalCard = {
  id: string;
  client: string;
  status: string;
  requestDate: string;
  policyId: string;
  deliveryAddress: string;
};

type DigitalCard = {
  id: string;
  client: string;
  downloads: number;
  generatedDate: string;
  lastAssessed: string;
  deliveryAddress: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const physicalCards: PhysicalCard[] = [
  {
    id: "IDR-001",
    client: "John Ademola",
    status: "Delivered",
    requestDate: "Sept. 3rd, 1997",
    policyId: "POL-122-222",
    deliveryAddress: "Victoria Island Lagos Nigeria",
  },
  {
    id: "IDR-001",
    client: "John Ademola",
    status: "Printed",
    requestDate: "Sept. 3rd, 1997",
    policyId: "POL-122-222",
    deliveryAddress: "Victoria Island Lagos Nigeria",
  },
  {
    id: "IDR-001",
    client: "John Ademola",
    status: "Dispatched",
    requestDate: "Sept. 3rd, 1997",
    policyId: "POL-122-222",
    deliveryAddress: "Victoria Island Lagos Nigeria",
  },
  {
    id: "IDR-001",
    client: "John Ademola",
    status: "Pending",
    requestDate: "Sept. 3rd, 1997",
    policyId: "POL-122-222",
    deliveryAddress: "Victoria Island Lagos Nigeria",
  },
  {
    id: "IDR-001",
    client: "John Ademola",
    status: "Delivered",
    requestDate: "Sept. 3rd, 1997",
    policyId: "POL-122-222",
    deliveryAddress: "Victoria Island Lagos Nigeria",
  },
  {
    id: "IDR-001",
    client: "John Ademola",
    status: "Delivered",
    requestDate: "Sept. 3rd, 1997",
    policyId: "POL-122-222",
    deliveryAddress: "Victoria Island Lagos Nigeria",
  },
];

const digitalCards: DigitalCard[] = Array.from({ length: 6 }, () => ({
  id: "IDR-001",
  client: "John Ademola",
  downloads: 6,
  generatedDate: "Sept. 3rd, 1997",
  lastAssessed: "Aug. 4th 2003",
  deliveryAddress: "Victoria Island Lagos Nigeria",
}));

type Tab = "physical" | "digital";

export default function IDCardsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("physical");
  const [search, setSearch] = useState("");
  usePageTitle("ID Cards Management");
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Pending"
          value="46"
          icon={<Clock size={18} />}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />
        <StatsCard
          title="Printed"
          value="34"
          icon={<Printer size={18} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatsCard
          title="Dispatched"
          value="12"
          icon={<Truck size={18} />}
          iconBg="bg-purple-50"
          iconColor="text-purple-500"
        />
        <StatsCard
          title="Delivered"
          value="10"
          icon={<CheckCircle2 size={18} />}
          iconBg="bg-teal-50"
          iconColor="text-teal-500"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">ID Cards</h2>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            {(["physical", "digital"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                  activeTab === tab
                    ? "bg-teal-700 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab} Cards
              </button>
            ))}
          </div>

          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Cards"
              className="h-9 pl-9 pr-4 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-300 w-44"
            />
          </div>
        </div>

        {/* Tables */}
        {activeTab === "physical" ? (
          <DataTable<PhysicalCard>
            columns={[
              { header: "Request ID", accessor: "id", sortable: true },
              { header: "Client Name", accessor: "client" },
              {
                header: "Status",
                render: (row) => <StatusBadge status={row.status} />,
              },
              { header: "Request Date", accessor: "requestDate" },
              { header: "Policy ID", accessor: "policyId" },
              { header: "Delivery Address", accessor: "deliveryAddress" },
            ]}
            data={physicalCards}
          />
        ) : (
          <DataTable<DigitalCard>
            columns={[
              { header: "Request ID", accessor: "id", sortable: true },
              { header: "Client Name", accessor: "client" },
              { header: "Total Downloads", accessor: "downloads" },
              { header: "Generated Date", accessor: "generatedDate" },
              { header: "Last Assessed", accessor: "lastAssessed" },
              { header: "Delivery Address", accessor: "deliveryAddress" },
            ]}
            data={digitalCards}
          />
        )}
      </div>
    </>
  );
}
