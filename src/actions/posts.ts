"use server";

import { prisma } from "@/lib/prisma";

const WEBSITE_ID = process.env.WEBSITE_ID || "";

// Log de diagnóstico na Vercel
if (process.env.VERCEL) {
  console.log("WEBSITE_ID:", WEBSITE_ID || "NÃO DEFINIDO");
  console.log("WEBSITE_ID length:", WEBSITE_ID.length);
}

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
    if (!WEBSITE_ID) {
      if (process.env.VERCEL) {
        console.error("WEBSITE_ID não está definido ao buscar categorias");
      }
      return [];
    }

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

    if (process.env.VERCEL) {
      console.log(
        `Encontradas ${categories.length} categorias para website ${WEBSITE_ID}`
      );
    }

    return categories.map((cat) => cat.name);
  } catch (error) {
    if (process.env.VERCEL) {
      console.error("Erro ao buscar categorias:", error);
    }
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
    // Validação do WEBSITE_ID
    if (!WEBSITE_ID) {
      if (process.env.VERCEL) {
        console.error(
          "WEBSITE_ID não está definido nas variáveis de ambiente da Vercel"
        );
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

    // Log de diagnóstico na Vercel
    if (process.env.VERCEL) {
      console.log("Buscando posts com filtros:", {
        websiteId: WEBSITE_ID,
        search: search || "vazio",
        category: category || "vazio",
      });
    }

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
    // Log detalhado para diagnóstico na Vercel
    if (process.env.VERCEL) {
      console.error("Erro ao buscar posts:", error);
      console.error("WEBSITE_ID usado:", WEBSITE_ID);
      console.error(
        "Stack trace:",
        error instanceof Error ? error.stack : "N/A"
      );
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
