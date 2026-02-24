import type { Category } from "@/interfaces/category";

export interface FetchCategoriesRequest {
  websiteId: string;
  page?: number;
  itemsPerPage?: number;
  search?: string | null;
  orderBy?: string | null;
  orderDirection?: "asc" | "desc" | null;
}

export interface FetchCategoriesResponse {
  data: Category[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface GetCategoryByIdResponse {
  category: Category;
}
