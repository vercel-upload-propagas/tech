import { clientEnv } from "@/env";
import type { GetPostByIdResponse } from "@/interfaces/http/post";
import { requestDelay } from "@/lib/delay";

export async function getPostById(id: string): Promise<GetPostByIdResponse> {
  await requestDelay();
  const url = new URL(`${clientEnv.NEXT_PUBLIC_API_URL}/posts/${id}`);
  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }

  return response.json() as Promise<GetPostByIdResponse>;
}
