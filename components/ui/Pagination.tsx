"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2, 3);
    if (currentPage > 4) pages.push("...");
    pages.push("...", totalPages - 1, totalPages);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 mt-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={16} /> Previous
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={i} className="px-2 text-gray-400 text-sm">
              ...
            </span>
          ) : (
            <button
              key={i}
              onClick={() => onPageChange(p as number)}
              className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                currentPage === p
                  ? "bg-teal-600 text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
