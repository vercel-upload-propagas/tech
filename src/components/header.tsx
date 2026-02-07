"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchQuery = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(urlSearchQuery);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
      params.set("page", "1");
    } else {
      params.delete("search");
      params.set("page", "1");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
      role="banner"
    >
      <div className="container mx-auto flex h-16 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <a
          href="/"
          className="text-xl font-bold text-foreground transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          aria-label="Tech Blog - Ir para página inicial"
        >
          Tech Blog
        </a>
        <form
          onSubmit={handleSearch}
          className="flex flex-1 items-center gap-2"
          role="search"
          aria-label="Buscar tutoriais"
        >
          <label htmlFor="search-input" className="sr-only">
            Buscar tutoriais
          </label>
          <Input
            id="search-input"
            type="search"
            placeholder="Buscar tutoriais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
            aria-label="Campo de busca"
          />
          <Button type="submit" size="sm" variant="outline" aria-label="Buscar">
            Buscar
          </Button>
        </form>
        <nav aria-label="Navegação principal">
          <Button variant="ghost" size="sm" asChild>
            <a href="#sobre" aria-label="Ir para seção sobre">
              Sobre
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
