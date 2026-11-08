import { SITEMAP_ALL_URLS, XML_HEADERS, renderUrlSet } from "@/lib/sitemapData";

/** Combined URL list kept for older crawlers / bookmarks */
export function GET() {
  return new Response(renderUrlSet(SITEMAP_ALL_URLS), { headers: XML_HEADERS });
}
