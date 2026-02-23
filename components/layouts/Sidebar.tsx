"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_ITEMS, LOGOUT_ITEM } from "@/lib/navigation/config";
import { useUIStore, useUserStore } from "@/store";

export default function Sidebar() {
  const pathname = usePathname();
  const isCollapsed = useUIStore((s) => s.isSidebarCollapsed);
  const toggleCollapse = useUIStore((s) => s.toggleSidebarCollapse);

  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);

  return (
    <aside
      className={[
        "h-screen sticky top-0 border-r bg-white",
        isCollapsed ? "w-20" : "w-64",
      ].join(" ")}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gray-100" />
          {!isCollapsed && (
            <div className="leading-tight">
              <p className="text-sm font-semibold">
                {user?.companyName ?? "IOA"}
              </p>
              <p className="text-xs text-gray-500">Main Menu</p>
            </div>
          )}
        </div>

        <button
          onClick={toggleCollapse}
          className="text-xs text-gray-500 hover:text-gray-900"
        >
          {isCollapsed ? "›" : "‹"}
        </button>
      </div>

      <nav className="px-3 py-2 space-y-1">
        {SIDEBAR_ITEMS.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm",
                active
                  ? "bg-teal-50 text-teal-900"
                  : "text-gray-700 hover:bg-gray-50",
              ].join(" ")}
            >
              <Icon size={18} />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto p-3">
        <button
          onClick={() => logout()}
          className="w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LOGOUT_ITEM.icon size={18} />
          {!isCollapsed && <span>{LOGOUT_ITEM.title}</span>}
        </button>
      </div>
    </aside>
  );
}
