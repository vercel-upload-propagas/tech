import type { Metadata } from "next";

import { getCategoriesAction } from "@/actions/categories";
import { getPostsAction } from "@/actions/posts";
import { CategoryFilter } from "@/components/category-filter";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PostsSectionClient } from "@/components/posts-section-client";

const POSTS_PER_PAGE = 12;

function normalizeCategoryParam(
  category: string | string[] | undefined
): string[] {
  if (category == null || category === "") return [];
  return Array.isArray(category) ? category : [category];
}

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
  searchParams: Promise<{
    page?: string;
    search?: string;
    category?: string | string[];
  }>;
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
  const categoryIds = normalizeCategoryParam(params.category);

  const [categories, initialPosts] = await Promise.all([
    getCategoriesAction(),
    getPostsAction({
      page: currentPage,
      itemsPerPage: POSTS_PER_PAGE,
      search: searchQuery || undefined,
      categoryIds: categoryIds.length ? categoryIds : undefined,
    }),
  ]);

  const initialRequestKey = [
    String(currentPage),
    searchQuery,
    [...categoryIds].sort().join(","),
  ].join("|");

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
              <CategoryFilter
                categories={categories}
                selectedCategoryIds={categoryIds}
              />
              <PostsSectionClient
                initialData={initialPosts}
                initialRequestKey={initialRequestKey}
              />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
