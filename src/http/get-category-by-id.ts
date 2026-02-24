import { clientEnv } from "@/env";
import type { GetCategoryByIdResponse } from "@/interfaces/http/category";
import { requestDelay } from "@/lib/delay";

export async function getCategoryById(
  id: string
): Promise<GetCategoryByIdResponse> {
  await requestDelay();
  const url = new URL(`${clientEnv.NEXT_PUBLIC_API_URL}/categories/${id}`);
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch category: ${response.status}`);
  }

  return response.json() as Promise<GetCategoryByIdResponse>;
}
