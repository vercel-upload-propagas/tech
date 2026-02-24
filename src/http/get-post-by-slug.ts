import { clientEnv } from "@/env";
import type { GetPostByIdResponse } from "@/interfaces/http/post";
import { requestDelay } from "@/lib/delay";

/**
 * GET /posts/slug/:slug?websiteId=...
 * Backend: params { slug }, query { websiteId }
 */
export async function getPostBySlug(
  slug: string
): Promise<GetPostByIdResponse> {
  await requestDelay();
  const url = new URL(
    `${clientEnv.NEXT_PUBLIC_API_URL}/posts/slug/${encodeURIComponent(slug)}`
  );
  url.searchParams.set("websiteId", clientEnv.WEBSITE_ID);
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }

  return response.json() as Promise<GetPostByIdResponse>;
}
