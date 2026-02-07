import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getPostBySlug } from "@/actions/posts";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Tornar a página dinâmica para evitar erros durante o build
export const dynamic = "force-dynamic";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
      return {
        title: "Post não encontrado",
      };
    }

    const url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/post/${slug}`;

    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        url,
        type: "article",
        publishedTime: post.date,
        images: [
          {
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.description,
        images: [post.image],
      },
      alternates: {
        canonical: url,
      },
    };
  } catch (error) {
    console.error("Erro ao gerar metadados:", error);
    // Retornar metadados básicos em caso de erro
    return {
      title: "Erro ao carregar post",
      description: "Ocorreu um erro ao carregar o post",
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/post/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Tech Blog",
    },
    publisher: {
      "@type": "Organization",
      name: "Tech Blog",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-background">
        <Header />

        <main>
          <article className="py-12 sm:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <Breadcrumbs
                  items={[{ label: "Home", href: "/" }, { label: post.title }]}
                />

                {/* Botão Voltar */}
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="mb-8"
                  aria-label="Voltar para página inicial"
                >
                  <Link href="/">← Voltar</Link>
                </Button>

                {/* Imagem de Capa */}
                <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg bg-muted shadow-lg sm:h-96">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 896px"
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Conteúdo do Post */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <time
                        dateTime={post.date}
                        className="flex items-center gap-1"
                      >
                        <span aria-hidden="true">⏱</span>
                        <span>{post.readTime}</span>
                      </time>
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground/50"
                      >
                        •
                      </span>
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl lg:text-5xl">
                      {post.title}
                    </h1>
                    <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                      {post.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="article-content [&_article]:space-y-6 [&_article]:text-foreground [&_article_h1]:mb-4 [&_article_h1]:mt-8 [&_article_h1]:text-3xl [&_article_h1]:font-bold [&_article_h1]:first:mt-0 [&_article_h1]:leading-tight [&_article_h1]:text-foreground [&_article_h2]:mb-3 [&_article_h2]:mt-6 [&_article_h2]:text-2xl [&_article_h2]:font-bold [&_article_h2]:leading-tight [&_article_h2]:text-foreground [&_article_h3]:mb-2 [&_article_h3]:mt-5 [&_article_h3]:text-xl [&_article_h3]:font-semibold [&_article_h3]:leading-tight [&_article_h3]:text-foreground [&_article_h4]:mb-2 [&_article_h4]:mt-4 [&_article_h4]:text-lg [&_article_h4]:font-semibold [&_article_h4]:text-foreground [&_article_p]:mb-4 [&_article_p]:leading-8 [&_article_p]:text-foreground/90 [&_article_ul]:mb-4 [&_article_ul]:ml-6 [&_article_ul]:list-disc [&_article_ul]:space-y-2 [&_article_ol]:mb-4 [&_article_ol]:ml-6 [&_article_ol]:list-decimal [&_article_ol]:space-y-2 [&_article_li]:leading-7 [&_article_li]:text-foreground/90 [&_article_strong]:font-semibold [&_article_strong]:text-foreground [&_article_em]:italic [&_article_code]:rounded-md [&_article_code]:bg-muted [&_article_code]:px-1.5 [&_article_code]:py-0.5 [&_article_code]:text-sm [&_article_code]:font-mono [&_article_code]:text-foreground [&_article_pre]:mb-4 [&_article_pre]:overflow-x-auto [&_article_pre]:rounded-lg [&_article_pre]:bg-muted [&_article_pre]:p-4 [&_article_pre_code]:bg-transparent [&_article_pre_code]:p-0 [&_article_blockquote]:my-4 [&_article_blockquote]:border-l-4 [&_article_blockquote]:border-primary [&_article_blockquote]:pl-4 [&_article_blockquote]:italic [&_article_blockquote]:text-muted-foreground [&_article_a]:text-primary [&_article_a]:underline [&_article_a]:underline-offset-4 [&_article_a]:transition-colors [&_article_a]:hover:text-primary/80 [&_article_img]:my-6 [&_article_img]:rounded-lg [&_article_img]:w-full [&_article_img]:h-auto [&_article_hr]:my-8 [&_article_hr]:border-border [&_article_table]:w-full [&_article_table]:my-4 [&_article_table]:border-collapse [&_article_th]:border [&_article_th]:border-border [&_article_th]:bg-muted [&_article_th]:px-4 [&_article_th]:py-2 [&_article_th]:text-left [&_article_th]:font-semibold [&_article_td]:border [&_article_td]:border-border [&_article_td]:px-4 [&_article_td]:py-2"
                      dangerouslySetInnerHTML={{
                        __html: post.content,
                      }}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}
