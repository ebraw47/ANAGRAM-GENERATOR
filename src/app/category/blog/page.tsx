import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageBannerPattern } from "@/components/BoxPattern";
import { ARTICLES, BRAND, ROUTES, SITE_ORIGIN } from "@/lib/siteConfig";

const PAGE_URL = `${SITE_ORIGIN}${ROUTES.blog}`;
const PAGE_TITLE = "Blog - Wordle Word Finder";
const PAGE_DESCRIPTION =
  "Wordle strategy guides: starting words, color rules, hard mode, repeated letters, and how to use a Wordle word finder.";

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
    <div className="bg-[#050B16] text-[#F2F6FF]">
      <header className="page-banner relative overflow-hidden border-b border-white/10 text-white">
        <PageBannerPattern opacity={0.35} />
        <div className="relative mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
            Guides & tips
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            {PAGE_DESCRIPTION}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((a) => (
            <article
              key={a.slug}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3A] shadow-sm transition hover:border-brand/50 hover:shadow-soft"
            >
              <Link href={`/${a.slug}`} className="block">
                <div className="relative aspect-[16/9] overflow-hidden bg-navy-950">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover object-left transition duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <time
                    className="text-xs font-semibold uppercase tracking-wide text-navy-500"
                    dateTime={a.date}
                  >
                    {new Date(a.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 font-display text-xl font-bold text-white group-hover:text-navy-500 line-clamp-2">
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
