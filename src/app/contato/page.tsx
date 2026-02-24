import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com o Tech Blog para dúvidas, sugestões ou exercício de direitos sobre seus dados.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="conteudo">
        <article
          className="py-12 sm:py-16 lg:py-20"
          aria-labelledby="contato-titulo"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <h1
                id="contato-titulo"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Contato
              </h1>

              <section
                className="mt-8 space-y-4"
                aria-labelledby="como-contatar"
              >
                <h2 id="como-contatar" className="text-xl font-semibold">
                  Como nos contatar
                </h2>
                {contactEmail ? (
                  <p className="leading-7 text-muted-foreground">
                    Para dúvidas, sugestões, solicitações relativas à{" "}
                    <Link
                      href="/privacidade"
                      className="text-primary underline underline-offset-4 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary hover:text-primary/80"
                    >
                      Política de Privacidade
                    </Link>{" "}
                    (acesso, correção ou exclusão de dados) ou relato de
                    problemas de acessibilidade, envie um e-mail para:
                  </p>
                ) : (
                  <p className="leading-7 text-muted-foreground">
                    Para dúvidas, sugestões ou exercício de direitos sobre seus
                    dados (conforme a{" "}
                    <Link
                      href="/privacidade"
                      className="text-primary underline underline-offset-4 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary hover:text-primary/80"
                    >
                      Política de Privacidade
                    </Link>
                    ), utilize o canal de contato indicado na própria política
                    ou nas redes sociais do projeto, quando disponíveis.
                  </p>
                )}
                {contactEmail && (
                  <p className="mt-4">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="break-all text-primary underline underline-offset-4 focus:rounded focus:outline-none focus:ring-2 focus:ring-primary hover:text-primary/80"
                    >
                      {contactEmail}
                    </a>
                  </p>
                )}
              </section>

              <section
                className="mt-8 space-y-4"
                aria-labelledby="tempo-resposta"
              >
                <h2 id="tempo-resposta" className="text-xl font-semibold">
                  Tempo de resposta
                </h2>
                <p className="leading-7 text-muted-foreground">
                  Buscamos responder em até 30 dias úteis, especialmente em
                  solicitações relacionadas a dados pessoais (LGPD).
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
