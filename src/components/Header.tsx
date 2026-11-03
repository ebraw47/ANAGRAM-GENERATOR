"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ShareButton from "@/components/ShareButton";
import { BRAND, IMAGES, ROUTES } from "@/lib/siteConfig";

const navLinks = [
  { href: ROUTES.home, label: "Calculator" },
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        transparent
          ? "border-0 bg-transparent shadow-none"
          : "border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label={`${BRAND.name} home`}>
          <span
            className={`relative h-9 w-9 overflow-hidden rounded-lg shadow-sm ring-1 ${
              transparent ? "ring-white/25" : "ring-navy-100"
            }`}
          >
            <Image
              src={IMAGES.logo}
              alt={`${BRAND.name} logo`}
              width={36}
              height={36}
              className="object-cover"
              priority
            />
          </span>
          <span
            className={`font-display text-lg font-bold tracking-tight transition-colors md:text-xl ${
              transparent
                ? "text-white group-hover:text-white/90"
                : "text-ink group-hover:text-navy-800"
            }`}
          >
            <span className={transparent ? "text-white" : "text-ink"}>Ovulation</span>
            <span className={`ml-1.5 font-semibold ${transparent ? "text-white/90" : "text-brand"}`}>
              Calculator
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <ShareButton
            tone={transparent ? "light" : "dark"}
            className="hidden sm:inline-flex"
            label
          />
          <ShareButton
            tone={transparent ? "light" : "dark"}
            className="sm:hidden !px-2"
          />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`relative pb-0.5 text-sm font-semibold transition-colors ${
                  transparent
                    ? isActive(href)
                      ? "text-white"
                      : "text-white/80 hover:text-white"
                    : isActive(href)
                      ? "text-ink"
                      : "text-ink hover:text-navy-700"
                }`}
              >
                {label}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full transition-all duration-300 ${
                    transparent ? "bg-white" : "bg-brand"
                  } ${isActive(href) ? "w-full" : "w-0"}`}
                />
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg lg:hidden focus-ring ${
              transparent
                ? "text-white hover:bg-white/10"
                : "text-ink hover:bg-slate-100"
            }`}
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
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
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
                    isActive(href) ? "bg-slate-100 text-ink" : "text-ink hover:bg-slate-50"
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
