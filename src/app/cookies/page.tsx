import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Política de cookies do Tech Blog: como usamos cookies, incluindo publicidade e como gerenciar suas preferências.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/cookies" },
};

const linkClass =
  "text-primary underline underline-offset-4 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary hover:text-primary/80";

export default async function CookiesPage() {
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
          aria-labelledby="cookies-titulo"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1
                id="cookies-titulo"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Política de Cookies
              </h1>
              <p className="mt-2 text-muted-foreground">
                Última atualização: {lastUpdated}
              </p>

              <section
                className="mt-8 space-y-4"
                aria-labelledby="o-que-sao-cookies"
              >
                <h2 id="o-que-sao-cookies" className="text-xl font-semibold">
                  1. O que são cookies
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Cookies são pequenos arquivos de texto armazenados no seu
                  dispositivo quando você visita um site. Eles permitem que o
                  site reconheça seu aparelho e guarde informações sobre sua
                  visita (por exemplo, preferências ou itens no carrinho).
                </p>
              </section>

              <section
                className="mt-8 space-y-4"
                aria-labelledby="cookies-que-usamos"
              >
                <h2 id="cookies-que-usamos" className="text-xl font-semibold">
                  2. Cookies que utilizamos
                </h2>
                <p className="leading-7 text-muted-foreground">
                  O Tech Blog utiliza os seguintes tipos de cookies:
                </p>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">
                      Cookies essenciais:
                    </strong>{" "}
                    necessários para o funcionamento básico do site (por
                    exemplo, preferências de exibição).
                  </li>
                  <li>
                    <strong className="text-foreground">
                      Cookies de publicidade:
                    </strong>{" "}
                    usados pelo Google AdSense para exibir anúncios, medir
                    desempenho e personalizar anúncios com base nos seus
                    interesses. O Google e seus parceiros podem usar esses
                    cookies em diversos sites.
                  </li>
                </ul>
              </section>

              <section
                className="mt-8 space-y-4"
                aria-labelledby="como-gerenciar"
              >
                <h2 id="como-gerenciar" className="text-xl font-semibold">
                  3. Como gerenciar cookies
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Você pode configurar seu navegador para bloquear ou apagar
                  cookies. Saiba que isso pode afetar a experiência no site (por
                  exemplo, anúncios podem continuar aparecendo, mas de forma
                  menos personalizada). Para desativar a publicidade
                  personalizada do Google, acesse as{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    configurações de anúncios do Google
                  </a>
                  . Para mais informações sobre como o Google usa cookies,{" "}
                  <a
                    href="https://policies.google.com/technologies/cookies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    consulte a política de cookies do Google
                  </a>
                  .
                </p>
              </section>

              <section className="mt-8 space-y-4" aria-labelledby="duvidas">
                <h2 id="duvidas" className="text-xl font-semibold">
                  4. Dúvidas
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Para perguntas sobre o uso de cookies, consulte nossa{" "}
                  <Link href="/privacidade" className={linkClass}>
                    Política de Privacidade
                  </Link>{" "}
                  ou entre em{" "}
                  <Link href="/contato" className={linkClass}>
                    contato
                  </Link>
                  .
                </p>
              </section>

              <nav className="mt-12 space-y-2" aria-label="Links relacionados">
                <p>
                  <Link href="/" className={linkClass}>
                    ← Voltar ao início
                  </Link>
                </p>
                <p>
                  <Link href="/privacidade" className={linkClass}>
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
