import { clientEnv } from "@/env";

export async function GET() {
  const baseUrl = clientEnv.NEXT_PUBLIC_SITE_URL;
  const today = new Date().toISOString().split("T")[0];

  const urls = [
    {
      loc: `${baseUrl}`,
      lastmod: today,
      changefreq: "hourly",
      priority: "1.0",
    },
    {
      loc: `${baseUrl}/sobre`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      loc: `${baseUrl}/privacidade`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      loc: `${baseUrl}/cookies`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      loc: `${baseUrl}/termos`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.5",
    },
    {
      loc: `${baseUrl}/contato`,
      lastmod: today,
      changefreq: "monthly",
      priority: "0.5",
    },
  ];

  const urlsXml = urls
    .map(
      (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}

