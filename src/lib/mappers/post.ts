import type { Post, PostListItem } from "@/interfaces/post";

export function mapPostToListItem(post: Post): PostListItem {
  return {
    id: post.id,
    title: post.title,
    description: post.description,
    readTime: post.readTime,
    date: post.createdAt,
    image: post.coverImage,
    categories: post.categoryIds,
    slug: post.slug,
  };
}
