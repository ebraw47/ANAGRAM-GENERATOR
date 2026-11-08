"use client";

import AnagramGenerator from "@/components/AnagramGenerator";
import { FadeIn } from "@/components/motion/Motion";
import { BRAND } from "@/lib/siteConfig";

export default function HomeHero() {
  return (
    <section className="relative w-full max-w-[100vw] overflow-x-hidden text-ink">
      <div className="scenic-blur" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[18rem] bg-gradient-to-b from-white/50 via-white/15 to-transparent sm:h-[28rem]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-3 pb-8 pt-5 sm:px-6 sm:pb-14 sm:pt-10 md:px-8">
        <FadeIn className="mx-auto max-w-2xl px-1 text-center">
          <h1 className="font-display text-[1.65rem] font-extrabold tracking-tight text-ink sm:text-3xl md:text-[2.15rem]">
            Anagram <span className="text-brand">Generator</span>
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-[0.85rem] leading-relaxed text-ink-mute sm:mt-3 sm:text-[0.95rem]">
            Free solver in 6 languages with voice playback — rearrange letters into real dictionary
            anagrams, private and instant on {BRAND.domain}.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-5 w-full sm:mt-10">
          <AnagramGenerator />
        </FadeIn>
      </div>
    </section>
  );
}
