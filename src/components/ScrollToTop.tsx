"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

function getScrollY() {
  return Math.max(
    window.scrollY || 0,
    document.documentElement.scrollTop || 0,
    document.body.scrollTop || 0,
    document.scrollingElement?.scrollTop || 0
  );
}

function withInstantScroll(run: () => void) {
  const html = document.documentElement;
  const body = document.body;
  const prevHtml = html.style.scrollBehavior;
  const prevBody = body.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  body.style.scrollBehavior = "auto";
  run();
  html.style.scrollBehavior = prevHtml;
  body.style.scrollBehavior = prevBody;
}

function scrollPageToTop() {
  // Hash targets like #generator can yank the viewport back down after scrollTo.
  if (window.location.hash) {
    const { pathname, search } = window.location;
    window.history.replaceState(null, "", `${pathname}${search}`);
  }

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const jump = () => {
    withInstantScroll(() => {
      const se = document.scrollingElement;
      if (se) se.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo(0, 0);
    });
  };

  if (reduce) {
    jump();
    return;
  }

  // Instant jump is the reliable path; CSS smooth scroll fights window.scrollTo.
  jump();
}

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef<number | null>(null);
  const lastRan = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const handler = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        const now = Date.now();
        if (now - lastRan.current >= 100) {
          const next = getScrollY() > 300;
          setIsVisible((prev) => (prev !== next ? next : prev));
          lastRan.current = now;
        }
        rafId.current = null;
      });
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    document.addEventListener("scroll", handler, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", handler);
      document.removeEventListener("scroll", handler, true);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          key="scroll-top"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollPageToTop();
          }}
          className="fixed bottom-8 right-8 z-[70] inline-flex items-center justify-center rounded-full bg-brand p-3 text-white shadow-lift focus-ring"
          aria-label="Scroll to top"
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.9 }}
          whileHover={reduce ? undefined : { y: -3, scale: 1.05 }}
          whileTap={reduce ? undefined : { scale: 0.96 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
