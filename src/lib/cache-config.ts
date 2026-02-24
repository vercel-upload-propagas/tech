/**
 * Cache para fetches (Next.js).
 * - revalidate: ISR em segundos.
 * - tags: use revalidateTag(tag) em Server Actions após mutações.
 */
const ONE_HOUR = 60 * 60;
const ONE_DAY = 24 * ONE_HOUR;

export const CACHE = {
  /** Home e listagens: 1h. */
  revalidateHome: ONE_HOUR,
  /** Post individual: 1 dia. */
  revalidatePosts: ONE_DAY,
  tags: {
    posts: "posts",
    categories: "categories",
    post: (slug: string) => `post-${slug}` as const,
  },
} as const;
