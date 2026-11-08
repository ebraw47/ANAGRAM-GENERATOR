"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ShareButton from "@/components/ShareButton";
import { BRAND, ROUTES } from "@/lib/siteConfig";

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
    <header className="sticky top-0 z-50 border-b-2 border-navy-900 bg-navy-900 text-white shadow-[0_3px_0_0_rgba(232,93,4,0.9)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-3 sm:px-4 md:h-[4.5rem] md:px-6">
        <Link
          href="/"
          className="min-w-0 shrink py-1"
          aria-label={`${BRAND.name} home`}
        >
          <span className="block whitespace-nowrap font-display text-[0.8125rem] font-extrabold leading-none tracking-tight sm:text-sm md:text-base">
            <span className="text-white">Title Case </span>
            <span className="text-brand">Converter</span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
          <nav className="mr-1 hidden items-center gap-6 lg:flex" aria-label="Primary">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative pb-0.5 text-sm font-semibold transition-colors ${
                  isActive(href) ? "text-brand" : "text-white/75 hover:text-white"
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

          <ShareButton tone="light" className="hidden sm:inline-flex" label />
          <ShareButton tone="light" className="sm:hidden !px-2 !py-1.5" />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden focus-ring"
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
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="overflow-hidden border-t border-white/10 bg-navy-950 lg:hidden"
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
                  className={`rounded-md px-3 py-3 text-base font-semibold ${
                    isActive(href)
                      ? "bg-brand/20 text-brand"
                      : "text-white/85 hover:bg-white/5 hover:text-white"
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
