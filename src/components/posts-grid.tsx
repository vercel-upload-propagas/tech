"use client";

import { Pagination } from "@/components/pagination";
import { PostCard } from "@/components/post-card";
import type { PostListItem } from "@/interfaces/post";

interface PostsGridProps {
  posts: PostListItem[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  loading?: boolean;
}

export function PostsGrid({
  posts,
  currentPage,
  totalPages,
  searchQuery,
  loading = false,
}: PostsGridProps) {
  if (loading) {
    return (
      <div className="py-12 text-center" role="status" aria-live="polite">
        <p className="text-lg text-muted-foreground">Carregando tutoriais...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-12 text-center" role="status" aria-live="polite">
        <p className="text-lg text-muted-foreground">
          {searchQuery
            ? `Nenhum tutorial encontrado para "${searchQuery}"`
            : "Nenhum post encontrado"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label="Lista de tutoriais"
      >
        {posts.map((post) => (
          <div key={post.id} role="listitem">
            <PostCard
              id={post.id}
              title={post.title}
              description={post.description}
              readTime={post.readTime}
              date={post.date}
              image={post.image}
              categories={post.categories}
              href={`/post/${post.slug}`}
            />
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12" aria-label="Navegação de páginas">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            searchQuery={searchQuery}
          />
        </div>
      )}
    </>
  );
}
