"use client";

import { useEffect } from "react";

/**
 * Injeta <link rel="prev"> e <link rel="next"> no <head> para SEO de listagens paginadas.
 * Google usa esses links para consolidar sinais e evitar conteúdo duplicado.
 */
export function PaginationLinks({
  prevUrl,
  nextUrl,
}: {
  prevUrl: string | null;
  nextUrl: string | null;
}) {
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    if (prevUrl) {
      const link = document.createElement("link");
      link.rel = "prev";
      link.href = prevUrl;
      document.head.appendChild(link);
      links.push(link);
    }
    if (nextUrl) {
      const link = document.createElement("link");
      link.rel = "next";
      link.href = nextUrl;
      document.head.appendChild(link);
      links.push(link);
    }
    return () => {
      links.forEach((link) => link.remove());
    };
  }, [prevUrl, nextUrl]);

  return null;
}
