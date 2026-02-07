"use client";

import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

export function Pagination({
  currentPage,
  totalPages,
  searchQuery,
}: PaginationProps) {
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    return `?${params.toString()}`;
  };

  const pages = [];
  const maxVisible = 5;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="flex items-center justify-center gap-2">
      <Button variant="outline" size="sm" disabled={currentPage === 1} asChild>
        <a href={createPageUrl(currentPage - 1)}>Anterior</a>
      </Button>

      {startPage > 1 && (
        <>
          <Button variant="ghost" size="sm" asChild>
            <a href={createPageUrl(1)}>1</a>
          </Button>
          {startPage > 2 && (
            <span className="px-2 text-muted-foreground">...</span>
          )}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "ghost"}
          size="sm"
          asChild
        >
          <a href={createPageUrl(page)}>{page}</a>
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-muted-foreground">...</span>
          )}
          <Button variant="ghost" size="sm" asChild>
            <a href={createPageUrl(totalPages)}>{totalPages}</a>
          </Button>
        </>
      )}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        asChild
      >
        <a href={createPageUrl(currentPage + 1)}>Próxima</a>
      </Button>
    </nav>
  );
}
