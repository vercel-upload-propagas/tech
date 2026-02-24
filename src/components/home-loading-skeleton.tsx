"use client";

import { CategoryFilterSkeleton } from "@/components/category-filter-skeleton";
import { PostsGridSkeleton } from "@/components/posts-grid-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton estático para loading (sem Header/Footer para evitar
 * useSearchParams/new Date() fora de Suspense com cacheComponents).
 */
export function HomeLoadingSkeleton() {
  return (
    <main>
      <section className="border-b border-border/40 bg-gradient-to-b from-card to-background py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-4 text-center">
            <Skeleton className="mx-auto h-10 w-full max-w-md" />
            <Skeleton className="mx-auto h-5 w-2/3" />
            <Skeleton className="mx-auto h-5 w-1/2" />
          </div>
        </div>
      </section>
      <section className="bg-background py-16" aria-label="Carregando">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <CategoryFilterSkeleton />
          <PostsGridSkeleton />
        </div>
      </section>
    </main>
  );
}
