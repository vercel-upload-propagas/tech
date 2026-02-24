import type { Post, PostListItem } from "@/interfaces/post";

/**
 * Converte categoryIds em nomes quando categoryNamesById é informado.
 * Caso contrário, retorna os IDs (evita quebrar chamadas sem categorias).
 */
export function mapPostToListItem(
  post: Post,
  categoryNamesById?: Map<string, string>
): PostListItem {
  const categories =
    categoryNamesById && post.categoryIds?.length
      ? post.categoryIds.map((id) => categoryNamesById.get(id) ?? id)
      : (post.categoryIds ?? []);

  return {
    id: post.id,
    title: post.title,
    description: post.description,
    readTime: post.readTime,
    date: post.createdAt,
    image: post.coverImage,
    categories,
    slug: post.slug,
  };
}
