"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store";

export function usePageTitle(title: string) {
  const setPageTitle = useUIStore((s) => s.setPageTitle);

  useEffect(() => {
    setPageTitle(title);
  }, [title, setPageTitle]);
}
