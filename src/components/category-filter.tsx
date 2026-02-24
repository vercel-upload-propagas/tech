"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import type { Category } from "@/interfaces/category";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryIds: string[];
}

export function CategoryFilter({
  categories,
  selectedCategoryIds,
}: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const buildUrl = (categoryIds: string[]) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    categoryIds.forEach((id) => params.append("category", id));
    return `/?${params.toString()}`;
  };

  const toggleCategory = (categoryId: string) => {
    const next = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter((id) => id !== categoryId)
      : [...selectedCategoryIds, categoryId];
    return buildUrl(next);
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      <Button
        variant={selectedCategoryIds.length === 0 ? "default" : "outline"}
        size="sm"
        asChild
      >
        <Link href={buildUrl([])}>Todas</Link>
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={
            selectedCategoryIds.includes(category.id) ? "default" : "outline"
          }
          size="sm"
          asChild
        >
          <Link href={toggleCategory(category.id)}>{category.name}</Link>
        </Button>
      ))}
    </div>
  );
}
