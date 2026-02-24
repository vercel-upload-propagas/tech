import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso do site Tech Blog: condições de uso do conteúdo e do serviço.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/termos" },
};

export default async function TermosPage() {
  await headers();
  const lastUpdated = new Date().toLocaleDateString("pt-BR", {
    dateStyle: "long",
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="conteudo">
        <article
          className="py-12 sm:py-16 lg:py-20"
          aria-labelledby="termos-titulo"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1
                id="termos-titulo"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Termos de Uso
              </h1>
              <p className="mt-2 text-muted-foreground">
                Última atualização: {lastUpdated}
              </p>

              <section className="mt-8 space-y-4" aria-labelledby="aceite">
                <h2 id="aceite" className="text-xl font-semibold">
                  1. Aceite dos termos
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Ao acessar e usar o Tech Blog, você concorda com estes Termos
                  de Uso. Se não concordar, por favor não utilize o site.
                </p>
              </section>

              <section className="mt-8 space-y-4" aria-labelledby="uso">
                <h2 id="uso" className="text-xl font-semibold">
                  2. Uso do conteúdo
                </h2>
                <p className="leading-7 text-muted-foreground">
                  O conteúdo do site é informativo e destinado a uso pessoal e
                  educacional. Você pode ler, compartilhar e referenciar os
                  artigos, desde que seja dada a atribuição ao Tech Blog. Não é
                  permitido copiar integralmente o conteúdo para outros sites ou
                  publicações sem autorização prévia.
                </p>
              </section>

              <section className="mt-8 space-y-4" aria-labelledby="precisao">
                <h2 id="precisao" className="text-xl font-semibold">
                  3. Precisão das informações
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Nos esforçamos para manter as informações atualizadas e
                  corretas. No entanto, ferramentas e interfaces podem mudar;
                  use o conteúdo como guia e consulte sempre a documentação
                  oficial quando aplicável. O Tech Blog não se responsabiliza
                  por danos decorrentes do uso das informações aqui publicadas.
                </p>
              </section>

              <section className="mt-8 space-y-4" aria-labelledby="links">
                <h2 id="links" className="text-xl font-semibold">
                  4. Links externos
                </h2>
                <p className="leading-7 text-muted-foreground">
                  O site pode conter links para sites de terceiros. Não
                  controlamos o conteúdo desses sites e não nos
                  responsabilizamos por suas práticas ou políticas. O uso de
                  sites externos é por sua conta e risco.
                </p>
              </section>

              <section className="mt-8 space-y-4" aria-labelledby="alteracoes">
                <h2 id="alteracoes" className="text-xl font-semibold">
                  5. Alterações
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Podemos alterar estes Termos de Uso a qualquer momento. A data
                  da última atualização será indicada no topo da página. O uso
                  continuado do site após alterações constitui aceite da nova
                  versão.
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
                <p className="mt-2">
                  <Link
                    href="/privacidade"
                    className="text-primary underline underline-offset-4 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary hover:text-primary/80"
                  >
                    Política de Privacidade
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
