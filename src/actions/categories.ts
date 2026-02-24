"use server";

import { fetchCategories } from "@/http/fetch-categories";
import type { Category } from "@/interfaces/category";

/**
 * Action: retorna categorias para filtro/UI (id + nome).
 * Em caso de erro na API, retorna array vazio (não quebra a página).
 */
export async function getCategoriesAction(): Promise<Category[]> {
  try {
    const res = await fetchCategories();
    return Array.isArray(res?.data) ? res.data : [];
  } catch {
    return [];
  }
}
