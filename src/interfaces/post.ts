export interface Post {
  id: string;
  websiteId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  coverImage: string;
  readTime: number;
  createdAt: string;
  updatedAt: string;
  categoryIds: string[];
}

export interface PostListItem {
  id: string;
  title: string;
  description: string;
  readTime: number;
  date: string;
  image: string;
  categories: string[];
  slug: string;
}
