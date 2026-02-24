"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 280;

/**
 * Botão flutuante "Voltar" que aparece ao rolar a página do post,
 * para não precisar subir até o topo para voltar.
 */
export function FloatingBackButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Link
        href="/"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg outline-none transition-transform hover:scale-105 focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Voltar para a página inicial"
      >
        <span className="sr-only">Voltar</span>
        <span aria-hidden className="text-xl leading-none">←</span>
      </Link>
    </div>
  );
}
