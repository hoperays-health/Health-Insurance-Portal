"use client";

import { useEffect } from "react";
import { Bell, Search, Settings } from "lucide-react";
import { useCurrentUser } from "@/hooks/queries/use-user";
import { useUserStore, useUIStore } from "@/store";

export default function Topbar() {
  const { data, isLoading } = useCurrentUser();
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);
  const pageTitle = useUIStore((s) => s.pageTitle);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-gray-800">{pageTitle}</h1>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            placeholder="Search"
            className="h-9 w-64 rounded-lg border pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-teal-200"
          />
        </div>

        <button
          title="bell"
          className="h-9 w-9 rounded-lg border grid place-items-center"
        >
          <Bell size={18} />
        </button>

        <button
          title="settings"
          className="h-9 w-9 rounded-lg border grid place-items-center"
        >
          <Settings size={18} />
        </button>

        <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5">
          <div className="h-8 w-8 rounded-full bg-gray-200" />
          <div className="leading-tight">
            <p className="text-sm font-medium">
              {isLoading ? "Loading..." : (user?.name ?? "—")}
            </p>
            <p className="text-xs text-gray-500">{user?.role ?? "viewer"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
