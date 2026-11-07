import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageBannerPattern } from "@/components/BoxPattern";
import { ARTICLES, BRAND, ROUTES, SITE_ORIGIN } from "@/lib/siteConfig";

const PAGE_URL = `${SITE_ORIGIN}${ROUTES.blog}`;
const PAGE_TITLE = "Blog - Title Case Converter";
const PAGE_DESCRIPTION =
  "Title case guides: title vs sentence case, APA/Chicago/AP/MLA rules, words to capitalize, and how to use a title case converter.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: BRAND.name,
    type: "website",
  },
};

export default function BlogCategoryPage() {
  return (
    <div className="text-[#20242C]">
      <header className="page-banner relative overflow-hidden border-b border-navy-900/10">
        <PageBannerPattern opacity={0.2} />
        <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-mute">
            Guides & tips
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#20242C] md:text-4xl">
            Blog
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
            {PAGE_DESCRIPTION}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <article
              key={a.slug}
              className="group overflow-hidden rounded-2xl border border-navy-900/10 bg-white/90 shadow-sm backdrop-blur-sm transition hover:border-brand/40 hover:shadow-soft"
            >
              <Link href={`/${a.slug}`} className="block">
                <div className="relative aspect-[16/9] overflow-hidden bg-navy-50">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover object-center transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <time
                    className="text-xs font-semibold uppercase tracking-wide text-brand"
                    dateTime={a.date}
                  >
                    {new Date(a.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 font-display text-xl font-bold text-[#20242C] group-hover:text-brand line-clamp-2">
                    {a.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-mute line-clamp-3">
                    {a.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                    Read More
                    <span aria-hidden className="transition group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
