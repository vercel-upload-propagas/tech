export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="sobre"
      className="border-t border-border/40 bg-card py-12"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-lg font-semibold text-card-foreground">
            Sobre
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Tech Blog é seu guia completo para aprender e dominar tecnologias.
            Oferecemos tutoriais práticos e passo a passo para resolver
            problemas do dia a dia relacionados a tecnologia, aplicativos e
            ferramentas digitais.
          </p>
          <div className="mt-8 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            <p>© {currentYear} Tech Blog. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
