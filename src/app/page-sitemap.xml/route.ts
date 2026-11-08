import { SITEMAP_PAGES, XML_HEADERS, renderUrlSet } from "@/lib/sitemapData";

export function GET() {
  return new Response(renderUrlSet(SITEMAP_PAGES), { headers: XML_HEADERS });
}
