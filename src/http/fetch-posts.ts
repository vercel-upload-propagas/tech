import { clientEnv } from "@/env";
import type {
  FetchPostsRequest,
  FetchPostsResponse,
} from "@/interfaces/http/post";
import { CACHE } from "@/lib/cache-config";
import { requestDelay } from "@/lib/delay";

function buildPostsUrl(params: Partial<FetchPostsRequest> = {}): URL {
  const websiteId = params.websiteId ?? clientEnv.WEBSITE_ID;
  const url = new URL(`${clientEnv.NEXT_PUBLIC_API_URL}/posts`);
  url.searchParams.set("websiteId", websiteId);
  if (params.page != null) url.searchParams.set("page", String(params.page));
  if (params.itemsPerPage != null)
    url.searchParams.set("itemsPerPage", String(params.itemsPerPage));
  if (params.search != null && params.search !== "")
    url.searchParams.set("search", params.search);
  if (params.categoryIds?.length) {
    url.searchParams.set("categoryIds", params.categoryIds.join(","));
  }
  if (params.orderBy != null) url.searchParams.set("orderBy", params.orderBy);
  if (params.orderDirection != null)
    url.searchParams.set("orderDirection", params.orderDirection);
  return url;
}

export async function fetchPosts(
  params?: Partial<FetchPostsRequest>
): Promise<FetchPostsResponse> {
  await requestDelay();
  const url = buildPostsUrl(params);
  const response = await fetch(url.toString(), {
    next: {
      revalidate: CACHE.revalidateHome,
      tags: [CACHE.tags.posts],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }

  return response.json() as Promise<FetchPostsResponse>;
}
