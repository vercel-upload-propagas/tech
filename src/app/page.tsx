import type { Metadata } from "next";
import { Suspense } from "react";

import { getPosts } from "@/actions/posts";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PostsGrid } from "@/components/posts-grid";

const POSTS_PER_PAGE = 12;

export const metadata: Metadata = {
  title: "Home",
  description:
    "Aprenda como fazer qualquer coisa relacionada a tecnologia. Tutoriais práticos e passo a passo sobre aplicativos, ferramentas digitais e desenvolvimento.",
  openGraph: {
    title: "Tech Blog - Tutoriais Práticos de Tecnologia",
    description:
      "Aprenda como fazer qualquer coisa relacionada a tecnologia. Tutoriais práticos e passo a passo.",
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
};

interface HomeProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

async function PostsContent({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  try {
    const { posts, pagination } = await getPosts({
      page,
      limit: POSTS_PER_PAGE,
      search,
    });

    return (
      <PostsGrid
        posts={posts}
        currentPage={pagination.page}
        totalPages={pagination.totalPages}
        searchQuery={search}
      />
    );
  } catch (error) {
    console.error("Erro ao carregar posts:", error);
    // Retornar grid vazio em caso de erro
    return (
      <PostsGrid
        posts={[]}
        currentPage={1}
        totalPages={0}
        searchQuery={search}
      />
    );
  }
}

function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tech Blog",
    description:
      "Aprenda como fazer qualquer coisa relacionada a tecnologia. Tutoriais práticos e passo a passo.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const searchQuery = params.search || "";

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          {/* Hero Section */}
          <section
            className="border-b border-border/40 bg-gradient-to-b from-card to-background py-16 sm:py-20 lg:py-24"
            aria-labelledby="hero-heading"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-3xl text-center">
                <h1
                  id="hero-heading"
                  className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
                >
                  Aprenda Como Fazer Qualquer Coisa
                </h1>
                <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg">
                  Tutoriais práticos e passo a passo sobre tecnologia,
                  aplicativos e ferramentas digitais.
                </p>
              </div>
            </div>
          </section>

          {/* Posts Grid */}
          <section
            className="bg-background py-16"
            aria-label="Lista de tutoriais"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <Suspense
                fallback={
                  <div
                    className="py-12 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <p className="text-lg text-muted-foreground">
                      Carregando tutoriais...
                    </p>
                  </div>
                }
              >
                <PostsContent page={currentPage} search={searchQuery} />
              </Suspense>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
