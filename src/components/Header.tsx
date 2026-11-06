"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ShareButton from "@/components/ShareButton";
import { BRAND, IMAGES, ROUTES } from "@/lib/siteConfig";

const navLinks = [
  { href: ROUTES.home, label: "Finder" },
  { href: ROUTES.blog, label: "Blog" },
  { href: ROUTES.about, label: "About Us" },
  { href: ROUTES.contact, label: "Contact Us" },
  { href: ROUTES.disclaimer, label: "Disclaimer" },
  { href: ROUTES.privacy, label: "Privacy Policy" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const readY = () =>
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    const onScroll = () => {
      setScrolled(readY() > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        transparent
          ? "border-0 bg-transparent shadow-none"
          : "border-b border-white/10 bg-[#02060D]/95 shadow-[0_8px_28px_-12px_rgba(0,0,0,0.65)] backdrop-blur-xl"
      }`}
    >
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
            sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, (max-width: 1024px) 380px, 490px"
            className="h-10 w-auto max-w-[min(260px,70vw)] object-contain object-left sm:h-11 sm:max-w-[300px] md:h-14 md:max-w-[380px] lg:h-16 lg:max-w-[490px]"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <ShareButton tone="light" className="hidden sm:inline-flex" label />
          <ShareButton tone="light" className="sm:hidden !px-2" />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative pb-0.5 text-sm font-semibold transition-colors ${
                  isActive(href) ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-[#4DA3FF] transition-all duration-300 ${
                    isActive(href) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10 lg:hidden focus-ring"
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
            className="overflow-hidden border-t border-white/10 bg-[#02060D] lg:hidden"
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
                      ? "bg-brand/20 text-white"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
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
