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

interface ContatoPageProps {
  searchParams: { success?: string; error?: string };
}

export default function ContatoPage({ searchParams }: ContatoPageProps) {
  const success = searchParams?.success === "1";
  const error = searchParams?.error;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="conteudo">
        <article
          className="py-12 sm:py-16 lg:py-20"
          aria-labelledby="contato-titulo"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl space-y-8">
              <h1
                id="contato-titulo"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Contato
              </h1>

              {success && (
                <p className="rounded-md bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Mensagem enviada com sucesso. Obrigado pelo contato!
                </p>
              )}

              {error && (
                <p className="rounded-md bg-red-50 px-4 py-3 text-sm text-red-700">
                  Ocorreu um erro ao enviar o formulário. Tente novamente.
                </p>
              )}

              <section
                className="space-y-4"
                aria-labelledby="form-contato-titulo"
              >
                <h2
                  id="form-contato-titulo"
                  className="text-xl font-semibold"
                >
                  Envie uma mensagem
                </h2>
                <form
                  action="/api/contact"
                  method="POST"
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-card-foreground"
                    >
                      Nome
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Seu nome"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-card-foreground"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="voce@exemplo.com"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-card-foreground"
                    >
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>

                  {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                    <div className="mt-4">
                      <div
                        className="g-recaptcha"
                        data-sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                        }
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Enviar mensagem
                  </button>
                </form>
              </section>

              {contactEmail && (
                <section
                  className="space-y-2"
                  aria-labelledby="contato-email-titulo"
                >
                  <h2
                    id="contato-email-titulo"
                    className="text-xl font-semibold"
                  >
                    Outros canais
                  </h2>
                  <p className="leading-7 text-muted-foreground">
                    Se preferir, envie um e-mail para:
                  </p>
                  <p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="break-all text-primary underline underline-offset-4 hover:text-primary/80"
                    >
                      {contactEmail}
                    </a>
                  </p>
                </section>
              )}

              <nav className="mt-8" aria-label="Links relacionados">
                <Link
                  href="/"
                  className="text-primary underline underline-offset-4 hover:text-primary/80"
                >
                  ← Voltar ao início
                </Link>
              </nav>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
