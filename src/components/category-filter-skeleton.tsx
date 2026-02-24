"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CategoryFilterSkeleton() {
  return (
    <div
      className="mb-8 flex flex-wrap gap-2"
      role="status"
      aria-label="Carregando filtros"
    >
      <Skeleton className="h-9 w-16 rounded-md" />
      <Skeleton className="h-9 w-24 rounded-md" />
      <Skeleton className="h-9 w-28 rounded-md" />
      <Skeleton className="h-9 w-20 rounded-md" />
      <Skeleton className="h-9 w-32 rounded-md" />
      <Skeleton className="h-9 w-24 rounded-md" />
    </div>
  );
}
