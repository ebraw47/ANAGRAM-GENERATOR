import Link from "next/link";
import { ARTICLES, BRAND, ROUTES } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="relative z-20 border-t-2 border-navy-900 bg-navy-950 text-white/80">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Link
              href="/"
              className="mb-4 inline-block"
              aria-label={`${BRAND.name} home`}
            >
              <span className="whitespace-nowrap font-display text-xl font-extrabold leading-none tracking-tight">
                <span className="text-white">Title Case </span>
                <span className="text-brand">Converter</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Free title case converter for headlines, blog posts, books, and SEO titles. APA,
              Chicago, AP, MLA, sentence case, and more — right in your browser on {BRAND.domain}.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm text-white/65">
              {[
                { href: ROUTES.home, label: "Converter" },
                { href: ROUTES.blog, label: "Blog" },
                { href: ROUTES.about, label: "About Us" },
                { href: ROUTES.contact, label: "Contact Us" },
                { href: ROUTES.privacy, label: "Privacy Policy" },
                { href: ROUTES.disclaimer, label: "Disclaimer" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-white">
              Guides
            </h2>
            <ul className="space-y-2.5 text-sm text-white/65">
              {ARTICLES.slice(0, 5).map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${a.slug}`}
                    className="line-clamp-1 transition-colors hover:text-brand"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-white/65">
              <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-brand">
                {BRAND.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. |{" "}
            <Link href="/" className="transition-colors hover:text-brand">
              {BRAND.domain}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
