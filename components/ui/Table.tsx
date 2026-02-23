import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export type Column<T> = {
  header: string;
  accessor?: keyof T;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
};

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className="overflow-auto rounded-xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/70">
            {columns.map((col, i) => (
              <th
                key={i}
                className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wide"
              >
                <span className="flex items-center gap-1">
                  {col.header}
                  {col.sortable && (
                    <span className="flex flex-col">
                      <ChevronUp size={10} className="text-gray-300 -mb-0.5" />
                      <ChevronDown size={10} className="text-gray-300" />
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, r) => (
            <tr
              key={r}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-gray-50 last:border-b-0 transition-colors ${
                onRowClick ? "cursor-pointer hover:bg-teal-50/40" : ""
              }`}
            >
              {columns.map((col, i) => (
                <td key={i} className="py-3.5 px-4 text-gray-700">
                  {col.render
                    ? col.render(row)
                    : col.accessor
                      ? String(row[col.accessor] ?? "")
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
