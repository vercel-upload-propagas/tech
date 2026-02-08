"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
}

export function CategoryFilter({
  categories,
  selectedCategory,
}: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const buildUrl = (category: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    return `/?${params.toString()}`;
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Button
        variant={selectedCategory === "" ? "default" : "outline"}
        size="sm"
        asChild
      >
        <Link href={buildUrl("")}>Todas</Link>
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          asChild
        >
          <Link href={buildUrl(category)}>{category}</Link>
        </Button>
      ))}
    </div>
  );
}

