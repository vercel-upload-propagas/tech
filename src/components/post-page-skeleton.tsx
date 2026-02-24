"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Skeleton } from "@/components/ui/skeleton";

export function PostPageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <article className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-8">
              {/* Breadcrumb */}
              <div className="flex gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>

              {/* Voltar */}
              <Skeleton className="h-9 w-24 rounded-md" />

              {/* Imagem de capa */}
              <Skeleton className="aspect-video w-full rounded-lg" />

              {/* Meta + título + descrição */}
              <div className="flex flex-wrap gap-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-10 w-full max-w-2xl" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-4/5" />

              {/* Conteúdo */}
              <div className="space-y-4 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
