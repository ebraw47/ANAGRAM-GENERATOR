import Link from "next/link";
import type { Metadata } from "next";
import { PageBannerPattern } from "@/components/BoxPattern";
import { ARTICLES, BRAND, ROUTES, SITE_ORIGIN } from "@/lib/siteConfig";

const PAGE_URL = `${SITE_ORIGIN}${ROUTES.blog}`;
const PAGE_TITLE = "Blog - Anagram Generator";
const PAGE_DESCRIPTION =
  "Anagram guides: definitions, famous examples, solve tips, name anagrams, multi-word phrases, and how to use an anagram generator.";

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
    <div className="text-ink">
      <header className="relative overflow-hidden border-b border-black/5 bg-[#1a1d1a]">
        <PageBannerPattern opacity={0.12} />
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Guides & tips
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Anagram guides
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
            {PAGE_DESCRIPTION}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-lift">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <article
                  key={a.slug}
                  className="border-b border-black/5 transition hover:bg-brand-soft/50 sm:odd:border-r lg:[&:nth-child(3n)]:border-r-0 lg:border-r"
                >
                  <Link href={`/${a.slug}`} className="group flex h-full flex-col p-6 md:p-8">
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-display text-4xl font-extrabold tracking-tight text-ink/15 transition group-hover:text-brand/35 md:text-5xl">
                        {num}
                      </span>
                      <time
                        className="rounded-full bg-paper px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink-mute"
                        dateTime={a.date}
                      >
                        {new Date(a.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="mt-6 font-display text-lg font-bold leading-snug text-ink transition group-hover:text-brand md:text-xl">
                      {a.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-mute line-clamp-3">
                      {a.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                      Read guide
                      <span
                        aria-hidden
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white transition group-hover:translate-x-0.5 group-hover:bg-brand"
                      >
                        →
                      </span>
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
