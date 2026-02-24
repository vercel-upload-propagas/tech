"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type { GetPostsActionResult } from "@/actions/posts";
import { getPostsAction } from "@/actions/posts";
import { PostsGrid } from "@/components/posts-grid";
import { PostsGridSkeleton } from "@/components/posts-grid-skeleton";

const POSTS_PER_PAGE = 12;

function buildRequestKey(
  page: string,
  search: string,
  categoryIds: string[]
): string {
  return [page, search, [...categoryIds].sort().join(",")].join("|");
}

interface PostsSectionClientProps {
  /** Dados iniciais do servidor (SSR) para evitar flash de skeleton. */
  initialData: GetPostsActionResult;
  /** Chave que identifica o initialData (page|search|categoryIds). */
  initialRequestKey: string;
}

export function PostsSectionClient({
  initialData,
  initialRequestKey,
}: PostsSectionClientProps) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<GetPostsActionResult>(initialData);
  const [requestKey, setRequestKey] = useState(initialRequestKey);

  const page = searchParams.get("page") ?? "1";
  const search = searchParams.get("search") ?? "";
  const categoryIds = searchParams.getAll("category");
  const currentKey = buildRequestKey(page, search, categoryIds);

  const isStale = currentKey !== requestKey;

  const fetchPosts = useCallback(async () => {
    try {
      const result = await getPostsAction({
        page: Number(page) || 1,
        itemsPerPage: POSTS_PER_PAGE,
        search: search || undefined,
        categoryIds: categoryIds.length ? categoryIds : undefined,
      });
      setData(result);
      setRequestKey(currentKey);
    } catch {
      setRequestKey(currentKey);
    }
  }, [page, search, categoryIds.join(","), currentKey]);

  useEffect(() => {
    if (!isStale) return;
    fetchPosts();
  }, [isStale, fetchPosts]);

  if (isStale) {
    return <PostsGridSkeleton />;
  }

  return (
    <PostsGrid
      posts={data.posts}
      currentPage={data.currentPage}
      totalPages={data.totalPages}
      searchQuery={search}
    />
  );
}
