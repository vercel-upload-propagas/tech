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
    // Durante o build, retornar valores vazios
    if (process.env.NEXT_PHASE === "phase-production-build") {
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
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    // Log adicional para debug na Vercel
    if (process.env.VERCEL) {
      console.error(
        "Erro na Vercel - DATABASE_URL existe:",
        !!process.env.DATABASE_URL
      );
      console.error(
        "Erro na Vercel - Tipo do erro:",
        error instanceof Error ? error.message : String(error)
      );
    }
    // Durante o build, retornar valores vazios em vez de lançar erro
    if (process.env.NEXT_PHASE === "phase-production-build") {
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
    // Em produção, logar o erro mas retornar valores vazios para não quebrar a aplicação
    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
      console.error("Erro ao buscar posts em produção:", error);
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
    throw new Error("Erro ao buscar posts");
  }
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    // Durante o build, retornar null
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return null;
    }

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
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    // Log adicional para debug na Vercel
    if (process.env.VERCEL) {
      console.error(
        "Erro na Vercel - DATABASE_URL existe:",
        !!process.env.DATABASE_URL
      );
      console.error(
        "Erro na Vercel - Tipo do erro:",
        error instanceof Error ? error.message : String(error)
      );
    }
    // Durante o build, retornar null em vez de lançar erro
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return null;
    }
    // Em produção, logar o erro mas retornar null para não quebrar a aplicação
    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
      console.error("Erro ao buscar post em produção:", error);
      return null;
    }
    throw new Error("Erro ao buscar post");
  }
}
