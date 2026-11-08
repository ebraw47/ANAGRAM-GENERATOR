"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BRAND, ROUTES } from "@/lib/siteConfig";

const navLinks = [
  { href: ROUTES.home, label: "Generator" },
  { href: ROUTES.blog, label: "Blog" },
  { href: ROUTES.about, label: "About" },
  { href: ROUTES.contact, label: "Contact" },
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
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/55 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:h-[4.25rem] md:px-8">
        <Link href="/" className="min-w-0 shrink py-1" aria-label={`${BRAND.name} home`}>
          <span className="flex items-center gap-2 font-display text-sm font-extrabold tracking-tight sm:text-base">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-[0.65rem] font-black text-white">
              AG
            </span>
            <span className="text-ink">
              Anagram <span className="text-brand">Generator</span>
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <nav className="mr-1 hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  isActive(href) ? "text-ink" : "text-ink-mute hover:text-ink"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link href="/#generator" className="cta-pill hidden sm:inline-flex">
            Open tool
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-ink hover:bg-black/5 lg:hidden focus-ring"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-white/40 bg-white/85 backdrop-blur-2xl lg:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`rounded-xl px-3 py-3 text-base font-semibold ${
                    isActive(href) ? "bg-brand/10 text-brand" : "text-ink hover:bg-black/5"
                  }`}
                >
                  {label}
                </Link>
              ))}
              <Link href="/#generator" className="cta-pill mt-2 text-center">
                Open tool
              </Link>
              <Link href={ROUTES.privacy} className="px-3 py-2 text-sm text-ink-mute">
                Privacy
              </Link>
              <Link href={ROUTES.disclaimer} className="px-3 py-2 text-sm text-ink-mute">
                Disclaimer
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
