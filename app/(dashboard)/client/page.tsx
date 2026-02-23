"use client";
import { useState } from "react";
import StatsCard from "@/components/ui/StatsCard";
import StatusBadge from "@/components/ui/StatusBadge";
import { Users, UserCheck, UserPlus, Star } from "lucide-react";
import DataTable from "@/components/ui/Table";
import { usePageTitle } from "@/hooks/queries/usePage";

type Client = {
  clientId: string;
  name: string;
  email: string;
  phone: string;
  policies: number;
  totalValue: string;
  status: string;
  category: string;
};

const clients: Client[] = [
  {
    clientId: "IDR-001",
    name: "John Ademola",
    email: "johnademola@gmail.com",
    phone: "+2349037373773",
    policies: 4,
    totalValue: "N590,000",
    status: "Active",
    category: "Lapsed",
  },
  {
    clientId: "IDR-001",
    name: "John Ademola",
    email: "johnademola@gmail.com",
    phone: "+2349037373773",
    policies: 4,
    totalValue: "N590,000",
    status: "Active",
    category: "High Value",
  },
  {
    clientId: "IDR-001",
    name: "John Ademola",
    email: "johnademola@gmail.com",
    phone: "+2349037373773",
    policies: 4,
    totalValue: "N590,000",
    status: "Active",
    category: "New",
  },
  {
    clientId: "IDR-001",
    name: "John Ademola",
    email: "johnademola@gmail.com",
    phone: "+2349037373773",
    policies: 4,
    totalValue: "N590,000",
    status: "Inactive",
    category: "Lapsed",
  },
  {
    clientId: "IDR-001",
    name: "John Ademola",
    email: "johnademola@gmail.com",
    phone: "+2349037373773",
    policies: 4,
    totalValue: "N590,000",
    status: "Active",
    category: "Lapsed",
  },
];

export default function ClientsPage() {
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );
  usePageTitle("Clients");
  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Client" value="46" icon={<Users size={18} />} />
        <StatsCard
          title="Active"
          value="34"
          icon={<UserCheck size={18} />}
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
        />
        <StatsCard
          title="New Client"
          value="12"
          icon={<UserPlus size={18} />}
          iconBg="bg-green-50"
          iconColor="text-green-500"
        />
        <StatsCard
          title="High Value"
          value="10"
          icon={<Star size={18} />}
          iconBg="bg-yellow-50"
          iconColor="text-yellow-500"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-700">Clients</h2>
          <div className="relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="h-9 pl-4 pr-4 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-300 w-44"
            />
          </div>
        </div>

        <DataTable<Client>
          columns={[
            { header: "Client ID", accessor: "clientId", sortable: true },
            { header: "Client Name", accessor: "name" },
            { header: "Email", accessor: "email" },
            { header: "Phone Number", accessor: "phone" },
            { header: "Policies", accessor: "policies" },
            { header: "Total Value", accessor: "totalValue" },
            {
              header: "Status",
              render: (row) => <StatusBadge status={row.status} />,
            },
            {
              header: "Category",
              render: (row) => <StatusBadge status={row.category} />,
            },
          ]}
          data={filtered}
        />
      </div>
    </>
  );
}
