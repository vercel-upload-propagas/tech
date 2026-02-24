const CURRENT_YEAR = new Date().getFullYear();

const footerLinks = [
  { href: "/sobre", label: "Sobre" },
  { href: "/privacidade", label: "Política de Privacidade" },
  { href: "/cookies", label: "Política de Cookies" },
  { href: "/termos", label: "Termos de Uso" },
  { href: "/contato", label: "Contato" },
] as const;

export function Footer() {
  return (
    <footer
      className="border-t border-border/40 bg-card py-12"
      role="contentinfo"
      aria-label="Rodapé do site"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <nav
            className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
            aria-label="Links institucionais"
          >
            {footerLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-muted-foreground underline underline-offset-4 outline-none transition-colors hover:text-foreground focus:rounded focus:ring-2 focus:ring-primary"
              >
                {label}
              </a>
            ))}
          </nav>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            © {CURRENT_YEAR} Tech Blog. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
