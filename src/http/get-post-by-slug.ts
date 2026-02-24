import { cache } from "react";

import { clientEnv } from "@/env";
import type { GetPostByIdResponse } from "@/interfaces/http/post";
import { CACHE } from "@/lib/cache-config";
import { requestDelay } from "@/lib/delay";

/**
 * GET /posts/slug/:slug?websiteId=...
 * Backend: params { slug }, query { websiteId }
 * cache(): deduplica chamada no mesmo request (generateMetadata + page).
 */
async function getPostBySlugImpl(slug: string): Promise<GetPostByIdResponse> {
  await requestDelay();
  const url = new URL(
    `${clientEnv.NEXT_PUBLIC_API_URL}/posts/slug/${encodeURIComponent(slug)}`
  );
  url.searchParams.set("websiteId", clientEnv.WEBSITE_ID);
  const response = await fetch(url.toString(), {
    next: {
      revalidate: CACHE.revalidatePosts,
      tags: [CACHE.tags.posts, CACHE.tags.post(slug)],
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }

  return response.json() as Promise<GetPostByIdResponse>;
}

export const getPostBySlug = cache(getPostBySlugImpl);
