"use server";

import { cacheLife, cacheTag } from "next/cache";

import { fetchCategories } from "@/http/fetch-categories";
import type { Category } from "@/interfaces/category";

/**
 * Action: retorna categorias para filtro/UI.
 * Cache: 1h (cacheLife) + tag "categories" para revalidação on-demand.
 */
export async function getCategoriesAction(): Promise<Category[]> {
  "use cache";
  cacheLife("hours");
  cacheTag("categories");

  try {
    const res = await fetchCategories();
    return Array.isArray(res?.data) ? res.data : [];
  } catch {
    return [];
  }
}
