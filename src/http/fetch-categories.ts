import { clientEnv } from "@/env";
import type {
  FetchCategoriesRequest,
  FetchCategoriesResponse,
} from "@/interfaces/http/category";
import { CACHE } from "@/lib/cache-config";
import { requestDelay } from "@/lib/delay";

function buildCategoriesUrl(params: Partial<FetchCategoriesRequest> = {}): URL {
  const websiteId = params.websiteId ?? clientEnv.NEXT_PUBLIC_WEBSITE_ID;
  const url = new URL(`${clientEnv.NEXT_PUBLIC_API_URL}/categories`);
  url.searchParams.set("websiteId", websiteId);
  if (params.page != null) url.searchParams.set("page", String(params.page));
  if (params.itemsPerPage != null)
    url.searchParams.set("itemsPerPage", String(params.itemsPerPage));
  if (params.search != null && params.search !== "")
    url.searchParams.set("search", params.search);
  if (params.orderBy != null) url.searchParams.set("orderBy", params.orderBy);
  if (params.orderDirection != null)
    url.searchParams.set("orderDirection", params.orderDirection);
  return url;
}

export async function fetchCategories(
  params?: Partial<FetchCategoriesRequest>
): Promise<FetchCategoriesResponse> {
  await requestDelay();
  const url = buildCategoriesUrl(params);
  const response = await fetch(url.toString(), {
    next: {
      revalidate: CACHE.revalidateHome,
      tags: [CACHE.tags.categories],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.status}`);
  }

  return response.json() as Promise<FetchCategoriesResponse>;
}
