import Link from "next/link";
import Image from "next/image";
import { ARTICLES, BRAND, IMAGES, ROUTES } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-navy-900/10 bg-white/70 text-ink-soft backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Link href="/" className="mb-4 inline-block" aria-label={`${BRAND.name} home`}>
              <Image
                src={IMAGES.headerLogo}
                alt={`${BRAND.name} logo`}
                width={280}
                height={57}
                className="h-11 w-auto max-w-[280px] object-contain object-left"
              />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-ink-mute">
              Free title case converter for headlines, blog posts, books, and SEO titles. APA,
              Chicago, AP, MLA, sentence case, and more — right in your browser.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-[#20242C]">
              Quick Links
            </h2>
            <ul className="space-y-2.5 text-sm text-ink-mute">
              <li>
                <Link href={ROUTES.home} className="transition-colors hover:text-navy-900">
                  Converter
                </Link>
              </li>
              <li>
                <Link href={ROUTES.blog} className="transition-colors hover:text-navy-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={ROUTES.about} className="transition-colors hover:text-navy-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href={ROUTES.contact} className="transition-colors hover:text-navy-900">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href={ROUTES.privacy} className="transition-colors hover:text-navy-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={ROUTES.disclaimer} className="transition-colors hover:text-navy-900">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-[#20242C]">
              Guides
            </h2>
            <ul className="space-y-2.5 text-sm text-ink-mute">
              {ARTICLES.slice(0, 5).map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/${a.slug}`}
                    className="line-clamp-1 transition-colors hover:text-navy-900"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ink-mute">
              <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-navy-900">
                {BRAND.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-900/10 pt-6 text-center text-sm text-ink-mute">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. |{" "}
            <Link href="/" className="transition-colors hover:text-navy-900">
              {BRAND.domain}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
