"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/motion/Motion";

type Faq = { q: string; a: string };

export default function FaqAccordion({ faqs }: { faqs: readonly Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        const num = String(i + 1).padStart(2, "0");

        return (
          <motion.div
            key={faq.q}
            layout={!reduce}
            className={`overflow-hidden rounded-2xl border transition duration-300 ${
              isOpen
                ? "border-brand/40 bg-gradient-to-br from-white via-[#EEF5FF] to-[#FFF6ED] shadow-soft"
                : "border-navy-900/10 bg-white/85 hover:border-brand/30 hover:bg-white"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-start gap-3.5 px-4 py-4 text-left focus-ring sm:gap-4 sm:px-5 sm:py-5"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span
                className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-display text-xs font-bold tracking-wide transition sm:h-10 sm:w-10 sm:text-sm ${
                  isOpen
                    ? "bg-brand text-white shadow-soft"
                    : "bg-navy-50 text-brand ring-1 ring-navy-900/10"
                }`}
                aria-hidden
              >
                {num}
              </span>

              <span className="min-w-0 flex-1 pt-1.5 font-display text-base font-semibold leading-snug text-[#20242C] sm:pt-2 sm:text-lg">
                {faq.q}
              </span>

              <motion.span
                className={`mt-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition sm:mt-2 ${
                  isOpen
                    ? "border-brand/40 bg-brand/10 text-brand"
                    : "border-navy-900/10 bg-navy-50 text-ink-mute"
                }`}
                aria-hidden
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.22, ease: EASE }}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="answer"
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-navy-900/8 px-4 pb-5 pt-0 sm:px-5">
                    <div className="ml-0 border-l-2 border-brand/40 pl-4 pt-4 text-[1.05rem] leading-relaxed text-ink-soft sm:ml-[3.25rem] sm:pl-5">
                      {faq.a}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
