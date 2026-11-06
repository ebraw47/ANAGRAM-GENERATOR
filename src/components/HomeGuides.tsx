"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, Stagger, StaggerItem } from "@/components/motion/Motion";
import { ARTICLES } from "@/lib/siteConfig";

export default function HomeGuides() {
  return (
    <section className="border-y border-white/10 bg-[#050B16] py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <FadeIn className="max-w-2xl">
          <p className="section-kicker">Guides & tips</p>
          <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
            Wordle strategy guides
          </h2>
          <p className="mt-2 text-ink-mute">
            SERP-backed articles on openers, color rules, hard mode, and smarter second guesses.
          </p>
        </FadeIn>
        <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.slice(0, 6).map((a) => (
            <StaggerItem key={a.slug}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
                <Link
                  href={`/${a.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#0B1F3A] shadow-sm transition hover:border-brand/50 hover:shadow-soft"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-[#02060D]">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      className="object-cover object-left transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold text-white group-hover:text-navy-500 line-clamp-2">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-mute line-clamp-2">
                      {a.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-navy-500">
                      Read guide
                      <span aria-hidden className="transition group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
