import Link from "next/link";
import { ARTICLES, BRAND, ROUTES } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="relative z-20 mt-auto bg-[#141614] text-white/75">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2" aria-label={`${BRAND.name} home`}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-xs font-black text-white">
                AG
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                {BRAND.name}
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Free anagram generator and solver for words, names, and phrases — private in your
              browser on {BRAND.domain}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-8 md:gap-6">
            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                Product
              </h2>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href="/#generator" className="transition hover:text-white">
                    Generator
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.blog} className="transition hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/multi-word-anagrams" className="transition hover:text-white">
                    Multi-word
                  </Link>
                </li>
                <li>
                  <Link href="/anagram-of-a-name" className="transition hover:text-white">
                    Name anagrams
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                Company
              </h2>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link href={ROUTES.about} className="transition hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.contact} className="transition hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href={`mailto:${BRAND.email}`} className="transition hover:text-white">
                    Email
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-white/40">
                Guides
              </h2>
              <ul className="space-y-2.5 text-sm">
                {ARTICLES.slice(0, 4).map((a) => (
                  <li key={a.slug}>
                    <Link href={`/${a.slug}`} className="line-clamp-1 transition hover:text-white">
                      {a.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href={ROUTES.privacy} className="transition hover:text-white">
              Privacy
            </Link>
            <Link href={ROUTES.disclaimer} className="transition hover:text-white">
              Disclaimer
            </Link>
            <Link href="/" className="transition hover:text-white">
              {BRAND.domain}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
