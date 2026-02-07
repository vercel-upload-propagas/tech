"use server";

import { prisma } from "@/lib/prisma";

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  readTime: number;
  date: string;
  image: string;
}

export interface PostDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  readTime: number;
  date: string;
  image: string;
}

export interface GetPostsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetPostsResult {
  posts: PostListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function getPosts({
  page = 1,
  limit = 6,
  search = "",
}: GetPostsParams = {}): Promise<GetPostsResult> {
  try {
    const skip = (page - 1) * limit;

    // Construir filtro de busca
    const where = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            {
              description: { contains: search, mode: "insensitive" as const },
            },
          ],
        }
      : {};

    // Buscar posts e total
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          coverImage: true,
          readTime: true,
          createdAt: true,
        },
      }),
      prisma.post.count({ where }),
    ]);

    // Formatar posts
    const formattedPosts: PostListItem[] = posts.map((post) => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      readTime: post.readTime,
      date: new Date(post.createdAt).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      image: post.coverImage,
    }));

    return {
      posts: formattedPosts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch {
    return {
      posts: [],
      pagination: {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
    };
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        coverImage: true,
        readTime: true,
        createdAt: true,
      },
    });

    if (!post) {
      return null;
    }

    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      description: post.description,
      content: post.content,
      readTime: post.readTime,
      date: new Date(post.createdAt).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      image: post.coverImage,
    };
  } catch {
    return null;
  }
}
