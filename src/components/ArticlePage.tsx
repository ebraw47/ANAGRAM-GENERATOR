import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import type { Metadata } from "next";
import { PageBannerPattern } from "@/components/BoxPattern";
import MarkdownContent from "@/components/MarkdownContent";
import { FadeIn } from "@/components/motion/Motion";
import { getMarkdown, stripLeadingH1, stripLeadingImage } from "@/lib/content";
import { ARTICLES, BRAND, IMAGES, SITE_ORIGIN, imageDims } from "@/lib/siteConfig";

type ArticleMeta = (typeof ARTICLES)[number];

export function articleMetadata(article: ArticleMeta): Metadata {
  const url = `${SITE_ORIGIN}/${article.slug}`;
  const metaTitle = article.metaTitle;
  return {
    title: { absolute: metaTitle },
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: metaTitle,
      description: article.description,
      url,
      siteName: BRAND.name,
      type: "article",
      publishedTime: article.date,
      images: [
        {
          url: `${SITE_ORIGIN}${article.image}`,
          ...imageDims(article.image),
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: article.description,
      images: [`${SITE_ORIGIN}${article.image}`],
    },
  };
}

export default function ArticlePage({
  article,
  contentSlug,
}: {
  article: ArticleMeta;
  contentSlug?: string;
}) {
  const raw = getMarkdown(contentSlug || article.slug);
  const content = stripLeadingImage(stripLeadingH1(raw));
  const url = `${SITE_ORIGIN}/${article.slug}`;
  const related = ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: [`${SITE_ORIGIN}${article.image}`],
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: BRAND.name, url: SITE_ORIGIN },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}${IMAGES.logo}` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_ORIGIN },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_ORIGIN}/category/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return (
    <>
      <Script id={`article-schema-${article.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Script id={`breadcrumb-${article.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <article className="text-ink">
        <header className="relative overflow-hidden border-b border-black/5 bg-[#1a1d1a]">
          <PageBannerPattern opacity={0.12} />
          <div className="relative mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
            <nav className="mb-5 text-sm text-white/65" aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link href="/" className="hover:text-brand">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/category/blog" className="hover:text-brand">
                    Blog
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li className="line-clamp-1 text-white">{article.title}</li>
              </ol>
            </nav>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
              Anagram guide
            </p>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl md:leading-tight">
              {article.title}
            </h1>
            <p className="mt-5 text-sm text-white/65">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="mx-2">·</span>
              <span>{BRAND.name}</span>
            </p>
          </div>
        </header>

        <div className="mx-auto w-full min-w-0 max-w-3xl overflow-x-hidden px-3 py-8 sm:px-4 md:px-6 md:py-14">
          <figure className="mb-8 overflow-hidden border-0 sm:mb-10">
            <Image
              src={article.image}
              alt={article.title}
              width={imageDims(article.image).width}
              height={imageDims(article.image).height}
              priority
              unoptimized
              className="block h-auto w-full max-w-full border-0"
              sizes="(max-width:768px) 100vw, 760px"
            />
          </figure>
          <MarkdownContent content={content} />
        </div>

        {related.length > 0 && (
          <aside className="border-t border-black/5 py-12 md:py-14">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
              <FadeIn>
                <p className="section-kicker">Keep reading</p>
                <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">Related guides</h2>
              </FadeIn>
              <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-black/5 bg-white shadow-lift">
                <div className="grid sm:grid-cols-3">
                  {related.map((a, i) => (
                    <FadeIn key={a.slug} delay={0.05 * i}>
                      <Link
                        href={`/${a.slug}`}
                        className="group flex h-full flex-col border-b border-black/5 p-6 transition hover:bg-brand-soft/50 sm:border-b-0 sm:border-r sm:last:border-r-0"
                      >
                        <span className="font-display text-3xl font-extrabold text-ink/15 transition group-hover:text-brand/35">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-4 font-display text-base font-bold leading-snug text-ink transition group-hover:text-brand line-clamp-3">
                          {a.title}
                        </h3>
                        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                          Read
                          <span
                            aria-hidden
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-xs text-white transition group-hover:bg-brand"
                          >
                            →
                          </span>
                        </span>
                      </Link>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}
      </article>
    </>
  );
}
