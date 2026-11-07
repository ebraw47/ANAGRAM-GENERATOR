"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ShareButton from "@/components/ShareButton";
import { BRAND, IMAGES, ROUTES } from "@/lib/siteConfig";

const navLinks = [
  { href: ROUTES.home, label: "Converter" },
  { href: ROUTES.blog, label: "Blog" },
  { href: ROUTES.about, label: "About Us" },
  { href: ROUTES.contact, label: "Contact Us" },
  { href: ROUTES.disclaimer, label: "Disclaimer" },
  { href: ROUTES.privacy, label: "Privacy Policy" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(32,36,44,0.05)] bg-white shadow-[0_1px_0_rgba(32,36,44,0.03)]">
      <div className="mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between gap-3 px-3 sm:h-16 sm:px-4 md:h-20 md:px-6 lg:h-[5.5rem]">
        <Link
          href="/"
          className="flex min-w-0 flex-1 items-center group sm:flex-none"
          aria-label={`${BRAND.name} home`}
        >
          <Image
            src={IMAGES.headerLogo}
            alt={`${BRAND.name} logo`}
            width={490}
            height={100}
            priority
            sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, (max-width: 1024px) 340px, 420px"
            className="h-9 w-auto max-w-[min(240px,68vw)] object-contain object-left sm:h-10 sm:max-w-[280px] md:h-12 md:max-w-[340px] lg:h-14 lg:max-w-[420px]"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:gap-3">
          <nav className="mr-1 hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative pb-0.5 text-sm font-semibold transition-colors ${
                  isActive(href) ? "text-navy-900" : "text-ink-mute hover:text-navy-900"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-brand transition-all duration-300 ${
                    isActive(href) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy-900 hover:bg-navy-900/5 lg:hidden focus-ring"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          <ShareButton tone="dark" className="hidden sm:inline-flex" label />
          <ShareButton tone="dark" className="sm:hidden !px-2" />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-navy-900/10 bg-white/95 backdrop-blur-xl lg:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-lg px-3 py-3 text-base font-semibold ${
                    isActive(href)
                      ? "bg-brand/10 text-navy-900"
                      : "text-ink-soft hover:bg-navy-900/5 hover:text-navy-900"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
