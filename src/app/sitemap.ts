import type { MetadataRoute } from "next";

import { clientEnv } from "@/env";
import { fetchPosts } from "@/http/fetch-posts";

const MAX_PAGES = 100;
const ITEMS_PER_PAGE = 100;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;

  const entries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/termos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  try {
    const first = await fetchPosts({
      page: 1,
      itemsPerPage: ITEMS_PER_PAGE,
    });
    const totalPages = Math.min(first.meta?.totalPages ?? 1, MAX_PAGES);

    for (const post of first.data ?? []) {
      entries.push({
        url: `${baseUrl}/post/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      });
    }

    for (let page = 2; page <= totalPages; page++) {
      const res = await fetchPosts({
        page,
        itemsPerPage: ITEMS_PER_PAGE,
      });
      for (const post of res.data ?? []) {
        entries.push({
          url: `${baseUrl}/post/${post.slug}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
          changeFrequency: "daily",
          priority: 0.8,
        });
      }
    }
  } catch {
    // Se a API falhar, retorna só a home
  }

  return entries;
}
