"use client";

import { useSearchParams } from "next/navigation";

import { PostsGridSkeleton } from "@/components/posts-grid-skeleton";

interface PostsSectionWrapperProps {
  /** Chave que identifica o conteúdo atual (vinda do servidor). */
  contentKey: string;
  children: React.ReactNode;
}

/**
 * Enquanto a URL (filtros) mudar e o conteúdo ainda não for o da nova URL,
 * mostra o skeleton. Assim o usuário vê loading imediato ao trocar categoria/página/busca.
 */
export function PostsSectionWrapper({
  contentKey,
  children,
}: PostsSectionWrapperProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";
  const categories = searchParams.getAll("category");
  const requestedKey = [page, search, [...categories].sort().join(",")].join(
    "|"
  );

  if (requestedKey !== contentKey) {
    return <PostsGridSkeleton />;
  }

  return <>{children}</>;
}
