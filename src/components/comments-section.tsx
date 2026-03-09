"use client";

import { useEffect, useState } from "react";

interface Comment {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

interface CommentsSectionProps {
  slug: string;
}

const STORAGE_PREFIX = "comments:";

export function CommentsSection({ slug }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(STORAGE_PREFIX + slug);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Comment[];
      setComments(parsed);
    } catch {
      // ignore parse errors
    }
  }, [slug]);

  const saveComments = (next: Comment[]) => {
    setComments(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_PREFIX + slug, JSON.stringify(next));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    if (!name || !message) return;

    const next: Comment[] = [
      {
        id: `${Date.now()}`,
        name,
        message,
        createdAt: new Date().toISOString(),
      },
      ...comments,
    ];
    saveComments(next);
    e.currentTarget.reset();
  };

  return (
    <section className="mt-12 space-y-6" aria-label="Comentários">
      <h2 className="text-xl font-semibold text-card-foreground">
        Comentários
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="comment-name"
            className="text-sm font-medium text-card-foreground"
          >
            Nome
          </label>
          <input
            id="comment-name"
            name="name"
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Seu nome"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="comment-message"
            className="text-sm font-medium text-card-foreground"
          >
            Comentário
          </label>
          <textarea
            id="comment-message"
            name="message"
            required
            rows={3}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="O que achou deste tutorial?"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Publicar comentário
        </button>
      </form>

      {comments.length > 0 && (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="rounded-lg border border-border bg-card px-4 py-3 text-sm"
            >
              <p className="font-semibold text-card-foreground">
                {comment.name}
              </p>
              <p className="mt-1 whitespace-pre-line text-muted-foreground">
                {comment.message}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

