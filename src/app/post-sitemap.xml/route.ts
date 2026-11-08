import { SITEMAP_POSTS, XML_HEADERS, renderUrlSet } from "@/lib/sitemapData";

export function GET() {
  return new Response(renderUrlSet(SITEMAP_POSTS), { headers: XML_HEADERS });
}
