import { XML_HEADERS, absoluteUrl, escapeXml } from "@/lib/sitemapData";

export function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const sitemaps = [
    "/page-sitemap.xml",
    "/post-sitemap.xml",
    "/image-sitemap.xml",
  ];

  const entries = sitemaps
    .map(
      (path) => `  <sitemap>
    <loc>${escapeXml(absoluteUrl(path))}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`;

  return new Response(body, { headers: XML_HEADERS });
}
