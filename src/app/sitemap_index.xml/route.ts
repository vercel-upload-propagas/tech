import { clientEnv } from "@/env";

export async function GET() {
  const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;
  const lastmod = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/page-sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/post-sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

