"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const POST_CARD_COUNT = 6;

function PostCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <Skeleton className="h-48 w-full shrink-0 rounded-none" />
      <CardHeader className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardFooter className="flex items-center gap-2 border-t pt-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-20" />
      </CardFooter>
    </Card>
  );
}

export function PostsGridSkeleton() {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="Carregando tutoriais"
    >
      {Array.from({ length: POST_CARD_COUNT }).map((_, i) => (
        <PostCardSkeleton key={i} />
      ))}
    </div>
  );
}
