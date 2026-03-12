import { clientEnv } from "@/env";
import { fetchPosts } from "@/http/fetch-posts";

const MAX_PAGES = 100;
const ITEMS_PER_PAGE = 100;

export async function GET() {
  const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;
  const urls: string[] = [];

  try {
    const first = await fetchPosts({
      page: 1,
      itemsPerPage: ITEMS_PER_PAGE,
    });

    const totalPages = Math.min(first.meta?.totalPages ?? 1, MAX_PAGES);

    for (const post of first.data ?? []) {
      const lastmod = post.updatedAt
        ? new Date(post.updatedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0];

      urls.push(`  <url>
    <loc>${baseUrl}/post/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);
    }

    for (let page = 2; page <= totalPages; page++) {
      const res = await fetchPosts({
        page,
        itemsPerPage: ITEMS_PER_PAGE,
      });

      for (const post of res.data ?? []) {
        const lastmod = post.updatedAt
          ? new Date(post.updatedAt).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0];

        urls.push(`  <url>
    <loc>${baseUrl}/post/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`);
      }
    }
  } catch {
    // se der erro na API, não quebrar a resposta inteira;
    // retornamos apenas um urlset vazio
  }

  const urlsXml = urls.join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

