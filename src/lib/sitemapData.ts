import { ARTICLES, BRAND, IMAGES, ROUTES, SITE_ORIGIN } from "./siteConfig";

export type SitemapPage = {
  path: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export type SitemapImage = {
  path: string;
  pagePath: string;
  title: string;
  caption: string;
};

const TODAY = "2026-11-09";

/** Static / tool pages (page-sitemap.xml) */
export const SITEMAP_PAGES: SitemapPage[] = [
  { path: ROUTES.home, lastmod: TODAY, changefreq: "daily", priority: 1.0 },
  { path: ROUTES.blog, lastmod: TODAY, changefreq: "weekly", priority: 0.85 },
  { path: ROUTES.about, lastmod: TODAY, changefreq: "monthly", priority: 0.6 },
  { path: ROUTES.contact, lastmod: TODAY, changefreq: "monthly", priority: 0.55 },
  { path: ROUTES.privacy, lastmod: TODAY, changefreq: "yearly", priority: 0.35 },
  { path: ROUTES.disclaimer, lastmod: TODAY, changefreq: "yearly", priority: 0.35 },
];

/** Blog articles (post-sitemap.xml) */
export const SITEMAP_POSTS: SitemapPage[] = ARTICLES.map((a) => ({
  path: `/${a.slug}`,
  lastmod: a.date,
  changefreq: "monthly" as const,
  priority: 0.8,
}));

/** Combined pages + posts (index.xml compatibility) */
export const SITEMAP_ALL_URLS: SitemapPage[] = [...SITEMAP_PAGES, ...SITEMAP_POSTS];

export function renderUrlSet(pages: SitemapPage[]): string {
  const urls = pages
    .map(
      (page) => `  <url>
    <loc>${escapeXml(absoluteUrl(page.path))}</loc>
    <lastmod>${escapeXml(page.lastmod)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const SITEMAP_IMAGES: SitemapImage[] = [
  {
    path: IMAGES.heroLogo,
    pagePath: "/",
    title: `${BRAND.name} logo`,
    caption: "Anagram Generator — free anagram solver and maker",
  },
  {
    path: IMAGES.website,
    pagePath: "/",
    title: `${BRAND.name} feature banner`,
    caption: "Rearrange letters into real words and multi-word anagrams",
  },
  {
    path: IMAGES.og,
    pagePath: "/",
    title: `${BRAND.name} open graph image`,
    caption: BRAND.description,
  },
  {
    path: IMAGES.features,
    pagePath: "/",
    title: "Anagram generator features",
    caption: "Exact anagrams, subset words, multi-word phrases, and Scrabble scores",
  },
  {
    path: IMAGES.vsSentence,
    pagePath: "/anagram-vs-word-unscrambler",
    title: "Anagram vs word unscrambler",
    caption: "Compare exact anagrams and subset unscrambling",
  },
  ...ARTICLES.map((a) => ({
    path: a.image,
    pagePath: `/${a.slug}`,
    title: a.title,
    caption: a.description,
  })),
];

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
};
