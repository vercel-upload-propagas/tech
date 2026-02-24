import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de privacidade e uso de dados do Tech Blog, incluindo cookies e anúncios.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacidade" },
};

const linkClass =
  "text-primary underline underline-offset-4 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary hover:text-primary/80";

export default async function PrivacidadePage() {
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
          aria-labelledby="privacidade-titulo"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1
                id="privacidade-titulo"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Política de Privacidade
              </h1>
              <p className="mt-2 text-muted-foreground">
                Última atualização: {lastUpdated}
              </p>

              <section
                className="mt-8 space-y-4"
                aria-labelledby="informacoes-coletadas"
              >
                <h2
                  id="informacoes-coletadas"
                  className="text-xl font-semibold"
                >
                  1. Informações que coletamos
                </h2>
                <p className="leading-7 text-muted-foreground">
                  O Tech Blog pode coletar dados de uso (por exemplo, páginas
                  visitadas, tempo de permanência) por meio de cookies e
                  tecnologias similares, inclusive para exibição de anúncios
                  personalizados. Não vendemos seus dados pessoais a terceiros.
                </p>
              </section>

              <section
                className="mt-8 space-y-4"
                aria-labelledby="cookies-anuncios"
              >
                <h2 id="cookies-anuncios" className="text-xl font-semibold">
                  2. Uso de cookies e anúncios
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Utilizamos o Google AdSense para exibir anúncios. O Google e
                  seus parceiros podem usar cookies para exibir anúncios com
                  base em visitas anteriores ao nosso site ou a outros sites na
                  internet. Você pode desativar a publicidade personalizada nas{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    configurações de anúncios do Google
                  </a>
                  .
                </p>
                <h3 className="mt-4 text-lg font-medium">
                  Tipos de cookies utilizados
                </h3>
                <ul className="list-inside list-disc space-y-1 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Essenciais:</strong>{" "}
                    necessários para o funcionamento do site.
                  </li>
                  <li>
                    <strong className="text-foreground">Publicidade:</strong>{" "}
                    usados pelo AdSense para exibir anúncios relevantes.
                  </li>
                </ul>
                <p className="mt-2 leading-7 text-muted-foreground">
                  Detalhes sobre uso e como gerenciar cookies estão na nossa{" "}
                  <Link href="/cookies" className={linkClass}>
                    Política de Cookies
                  </Link>
                  .
                </p>
              </section>

              <section className="mt-8 space-y-4" aria-labelledby="direitos">
                <h2 id="direitos" className="text-xl font-semibold">
                  3. Seus direitos (LGPD)
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Em conformidade com a Lei Geral de Proteção de Dados (LGPD),
                  você pode solicitar acesso, correção, exclusão ou
                  portabilidade dos seus dados. Para exercer esses direitos,{" "}
                  <Link href="/contato" className={linkClass}>
                    entre em contato
                  </Link>{" "}
                  conosco. Responderemos em até 30 dias úteis.
                </p>
              </section>

              <section className="mt-8 space-y-4" aria-labelledby="alteracoes">
                <h2 id="alteracoes" className="text-xl font-semibold">
                  4. Alterações
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Esta política pode ser atualizada periodicamente. A data da
                  última atualização será indicada no topo da página. O uso
                  continuado do site após alterações constitui aceite da nova
                  versão.
                </p>
              </section>

              <nav className="mt-12 space-y-2" aria-label="Links relacionados">
                <p>
                  <Link href="/" className={linkClass}>
                    ← Voltar ao início
                  </Link>
                </p>
                <p>
                  <Link href="/cookies" className={linkClass}>
                    Política de Cookies
                  </Link>
                </p>
                <p>
                  <Link href="/termos" className={linkClass}>
                    Termos de Uso
                  </Link>
                </p>
                <p>
                  <Link href="/contato" className={linkClass}>
                    Contato
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
