"use client";

import Sidebar from "@/components/layouts/Sidebar";
import Topbar from "@/components/layouts/Topbar";
// import { title } from "process";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
