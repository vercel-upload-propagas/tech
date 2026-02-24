import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Conheça o Tech Blog: tutoriais práticos de tecnologia, aplicativos e ferramentas digitais para o dia a dia.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="conteudo">
        <article
          className="py-12 sm:py-16 lg:py-20"
          aria-labelledby="sobre-titulo"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1
                id="sobre-titulo"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Sobre o Tech Blog
              </h1>

              <section className="mt-8 space-y-4" aria-labelledby="missao">
                <h2 id="missao" className="text-xl font-semibold">
                  Nossa missão
                </h2>
                <p className="leading-7 text-muted-foreground">
                  O Tech Blog é seu guia para aprender e dominar tecnologias do
                  dia a dia. Publicamos tutoriais práticos e passo a passo sobre
                  aplicativos, ferramentas digitais e desenvolvimento, para você
                  resolver problemas reais com clareza e objetividade.
                </p>
              </section>

              <section
                className="mt-8 space-y-4"
                aria-labelledby="conteudo-sobre"
              >
                <h2 id="conteudo-sobre" className="text-xl font-semibold">
                  O que você encontra aqui
                </h2>
                <ul className="list-inside list-disc space-y-2 leading-7 text-muted-foreground">
                  <li>Tutoriais passo a passo em português</li>
                  <li>Dicas de aplicativos e ferramentas digitais</li>
                  <li>Conteúdo sobre programação e desenvolvimento</li>
                  <li>Guias para tarefas comuns em tecnologia</li>
                </ul>
              </section>

              <section
                className="mt-8 space-y-4"
                aria-labelledby="acessibilidade"
              >
                <h2 id="acessibilidade" className="text-xl font-semibold">
                  Acessibilidade
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Nos preocupamos em tornar o site acessível ao maior número de
                  pessoas. Utilizamos estrutura semântica (HTML), link para
                  pular ao conteúdo principal, contraste adequado e suporte a
                  navegação por teclado. Se encontrar barreiras de acesso,
                  <Link
                    href="/contato"
                    className="mx-1 text-primary underline underline-offset-4 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    entre em contato
                  </Link>
                  .
                </p>
              </section>

              <nav className="mt-12" aria-label="Links relacionados">
                <p>
                  <Link
                    href="/"
                    className="text-primary underline underline-offset-4 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary hover:text-primary/80"
                  >
                    ← Voltar ao início
                  </Link>
                </p>
              </nav>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
