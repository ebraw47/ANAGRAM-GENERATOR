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

const TODAY = "2026-11-07";

export const SITEMAP_PAGES: SitemapPage[] = [
  { path: ROUTES.home, lastmod: TODAY, changefreq: "daily", priority: 1.0 },
  { path: ROUTES.blog, lastmod: TODAY, changefreq: "weekly", priority: 0.85 },
  ...ARTICLES.map((a) => ({
    path: `/${a.slug}`,
    lastmod: a.date,
    changefreq: "monthly" as const,
    priority: 0.8,
  })),
  { path: ROUTES.about, lastmod: TODAY, changefreq: "monthly", priority: 0.6 },
  { path: ROUTES.contact, lastmod: TODAY, changefreq: "monthly", priority: 0.55 },
  { path: ROUTES.privacy, lastmod: TODAY, changefreq: "yearly", priority: 0.35 },
  { path: ROUTES.disclaimer, lastmod: TODAY, changefreq: "yearly", priority: 0.35 },
];

export const SITEMAP_IMAGES: SitemapImage[] = [
  {
    path: IMAGES.logo,
    pagePath: "/",
    title: `${BRAND.name} logo`,
    caption: "Title Case Converter — free title capitalization tool",
  },
  {
    path: IMAGES.website,
    pagePath: "/",
    title: `${BRAND.name} hero`,
    caption: "Convert headlines to title case with AMA, AP, APA, Chicago, MLA, and more",
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
    title: "Title case converter features",
    caption: "Style guides, SEO character count, and one-click copy",
  },
  {
    path: IMAGES.vsSentence,
    pagePath: "/title-case-vs-sentence-case",
    title: "Title case vs sentence case",
    caption: "Compare title case and sentence case capitalization",
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
