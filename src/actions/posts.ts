"use server";

import { cacheLife, cacheTag } from "next/cache";

import { fetchCategories } from "@/http/fetch-categories";
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
 * Resolve categoryIds em nomes usando a lista de categorias.
 * Cache: 1h (cacheLife) + tag "posts" para revalidação on-demand.
 */
export async function getPostsAction(params: {
  page: number;
  itemsPerPage: number;
  search?: string;
  categoryIds?: string[];
}): Promise<GetPostsActionResult> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");
  cacheTag("categories");

  try {
    const [categoriesRes, response] = await Promise.all([
      fetchCategories(),
      fetchPosts({
        page: params.page,
        itemsPerPage: params.itemsPerPage,
        search: params.search || undefined,
        categoryIds: params.categoryIds?.length
          ? params.categoryIds
          : undefined,
      }),
    ]);
    const data = response?.data;
    const meta = response?.meta;
    const categoryNamesById = new Map(
      (categoriesRes?.data ?? []).map((c) => [c.id, c.name])
    );
    const posts: PostListItem[] = Array.isArray(data)
      ? data.map((post) => mapPostToListItem(post, categoryNamesById))
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
 * Cache: 1 dia (cacheLife) + tag "posts" e "post-{slug}" para revalidação on-demand.
 */
export async function getPostBySlugAction(
  slug: string
): Promise<GetPostBySlugResult> {
  "use cache";
  cacheLife("days");
  cacheTag("posts");
  cacheTag(`post-${slug}`);

  try {
    const res = await getPostBySlug(slug);
    return { post: res?.post ?? null };
  } catch {
    return { post: null };
  }
}
