"use server";

import { prisma } from "@/lib/prisma";

const WEBSITE_ID = process.env.WEBSITE_ID || "";

export interface PostListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  readTime: number;
  date: string;
  image: string;
  categories: string[];
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
  category?: string;
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

export async function getCategories(): Promise<string[]> {
  try {
    const categories = await prisma.category.findMany({
      where: {
        websiteId: WEBSITE_ID,
      },
      select: {
        name: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return categories.map((cat) => cat.name);
  } catch {
    return [];
  }
}

export async function getPosts({
  page = 1,
  limit = 6,
  search = "",
  category = "",
}: GetPostsParams = {}): Promise<GetPostsResult> {
  try {
    const skip = (page - 1) * limit;

    // Construir filtro de busca
    const searchFilter = search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            {
              description: { contains: search, mode: "insensitive" as const },
            },
          ],
        }
      : {};

    // Construir filtro de categoria
    const categoryFilter = category
      ? {
          postCategories: {
            some: {
              category: {
                name: {
                  equals: category,
                  mode: "insensitive" as const,
                },
                websiteId: WEBSITE_ID,
              },
            },
          },
        }
      : {};

    // Combinar filtros
    const where = {
      websiteId: WEBSITE_ID,
      ...searchFilter,
      ...categoryFilter,
    };

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
          postCategories: {
            select: {
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
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
      categories: post.postCategories.map((pc) => pc.category.name),
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
  } catch (error) {
    // Log temporário para diagnóstico na Vercel
    if (process.env.VERCEL) {
      console.error("Erro ao buscar posts:", error);
    }
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
    const post = await prisma.post.findFirst({
      where: {
        slug,
        websiteId: WEBSITE_ID,
      },
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
  } catch (error) {
    // Log temporário para diagnóstico na Vercel
    if (process.env.VERCEL) {
      console.error("Erro ao buscar post por slug:", error);
    }
    return null;
  }
}
