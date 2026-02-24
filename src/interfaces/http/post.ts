import type { Post } from "@/interfaces/post";

export interface FetchPostsRequest {
  websiteId: string;
  page?: number;
  itemsPerPage?: number;
  search?: string | null;
  categoryIds?: string[] | null;
  orderBy?: string | null;
  orderDirection?: "asc" | "desc" | null;
}

export interface FetchPostsResponse {
  data: Post[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface GetPostByIdResponse {
  post: Post;
}
