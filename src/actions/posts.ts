"use server";

import { fetchPosts } from "@/http/fetch-posts";
import { getPostBySlug } from "@/http/get-post-by-slug";
import type { PostListItem } from "@/interfaces/post";
import { mapPostToListItem } from "@/lib/mappers/post";

export interface GetPostsActionResult {
  posts: PostListItem[];
  currentPage: number;
  totalPages: number;
}

/**
 * Action: retorna posts paginados para a listagem da home.
 * Em caso de erro na API, retorna lista vazia (não quebra a página).
 */
export async function getPostsAction(params: {
  page: number;
  itemsPerPage: number;
  search?: string;
  categoryIds?: string[];
}): Promise<GetPostsActionResult> {
  try {
    const response = await fetchPosts({
      page: params.page,
      itemsPerPage: params.itemsPerPage,
      search: params.search || undefined,
      categoryIds: params.categoryIds?.length ? params.categoryIds : undefined,
    });
    const data = response?.data;
    const meta = response?.meta;
    const posts: PostListItem[] = Array.isArray(data)
      ? data.map(mapPostToListItem)
      : [];

    return {
      posts,
      currentPage: meta?.currentPage ?? 1,
      totalPages: meta?.totalPages ?? 0,
    };
  } catch {
    return {
      posts: [],
      currentPage: 1,
      totalPages: 0,
    };
  }
}

export interface GetPostBySlugResult {
  post: Awaited<ReturnType<typeof getPostBySlug>>["post"] | null;
}

/**
 * Action: retorna um post pelo slug para a página do post.
 * Em caso de erro ou não encontrado, retorna { post: null }.
 */
export async function getPostBySlugAction(
  slug: string
): Promise<GetPostBySlugResult> {
  try {
    const res = await getPostBySlug(slug);
    return { post: res?.post ?? null };
  } catch {
    return { post: null };
  }
}
