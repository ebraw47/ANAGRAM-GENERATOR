"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/Motion";
import { ARTICLES, ROUTES } from "@/lib/siteConfig";

export default function HomeGuides() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Guides & tips</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
            Anagram guides
          </h2>
          <p className="mt-3 text-ink-mute">
            Clear, SERP-backed reading for definitions, examples, solve tips, and name play.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-10 overflow-hidden rounded-[2rem] border border-black/5 bg-white/90 shadow-lift backdrop-blur-sm">
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a, i) => {
              const num = String(i + 1).padStart(2, "0");
              const date = new Date(a.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
              return (
                <StaggerItem key={a.slug}>
                  <motion.div
                    whileHover={{ backgroundColor: "rgba(231, 240, 233, 0.55)" }}
                    transition={{ duration: 0.2 }}
                    className="h-full border-b border-black/5 sm:odd:border-r lg:[&:nth-child(3n)]:border-r-0 lg:border-r"
                  >
                    <Link href={`/${a.slug}`} className="group flex h-full flex-col p-6 md:p-8">
                      <div className="flex items-start justify-between gap-3">
                        <span className="font-display text-4xl font-extrabold tracking-tight text-ink/15 transition group-hover:text-brand/35 md:text-5xl">
                          {num}
                        </span>
                        <span className="rounded-full bg-paper px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink-mute">
                          {date}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-lg font-bold leading-snug tracking-tight text-ink transition group-hover:text-brand md:text-xl">
                        {a.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-mute line-clamp-3">
                        {a.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink">
                        Read guide
                        <span
                          aria-hidden
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-white transition group-hover:translate-x-0.5 group-hover:bg-brand"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </FadeIn>

        <FadeIn delay={0.12} className="mt-8 flex justify-center">
          <Link
            href={ROUTES.blog}
            className="inline-flex rounded-full border border-black/10 bg-white/80 px-5 py-2.5 text-sm font-semibold text-ink transition hover:bg-white"
          >
            View all guides
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
