"use client";

import { useEffect } from "react";
import { useBreadcrumbs, type Crumb } from "@/contexts/breadcrumbs-context";

export function SetBreadcrumbs({ items }: { items: Crumb[] }) {
  const { setCrumbs } = useBreadcrumbs();

  useEffect(() => {
    setCrumbs(items);
    return () => setCrumbs([]);
  }, [items, setCrumbs]);

  return null;
}
