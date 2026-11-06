"use client";

import Image from "next/image";
import WordleWordFinder from "@/components/WordleWordFinder";
import { FadeIn } from "@/components/motion/Motion";
import { BRAND, IMAGES } from "@/lib/siteConfig";

export default function HomeHero() {
  return (
    <section className="relative -mt-[3.75rem] overflow-hidden pt-[3.75rem] text-white sm:-mt-16 sm:pt-16 md:-mt-20 md:pt-20 lg:-mt-[5.5rem] lg:pt-[5.5rem]">
      <div className="absolute inset-0 bg-[#02060D]" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 12% 8%, rgba(30,111,255,0.45), transparent 55%), radial-gradient(ellipse 55% 42% at 92% 18%, rgba(77,163,255,0.22), transparent 52%), linear-gradient(165deg, #000000 0%, #050B16 38%, #0B1F3A 72%, #02060D 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(77,163,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(77,163,255,0.35) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-5 sm:pb-10 sm:pt-6 md:px-6 md:pb-12 md:pt-7">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Image
            src={IMAGES.brandLogo}
            alt={`${BRAND.name} logo`}
            width={640}
            height={220}
            priority
            sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 480px"
            className="mx-auto mb-3 h-auto w-[280px] object-contain sm:mb-3.5 sm:w-[380px] md:w-[480px]"
          />
          <h1 className="font-display text-xl font-bold tracking-tight text-white/95 drop-shadow-sm sm:text-2xl md:text-[1.65rem]">
            Wordle Word Finder 2026
          </h1>
          <p className="mx-auto mt-1.5 max-w-xl text-sm text-sky-200/70 sm:text-base">
            Enter green, yellow, and gray clues. See every 5-letter word that still fits.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-5 sm:mt-6 md:mt-7">
          <WordleWordFinder />
        </FadeIn>
      </div>
    </section>
  );
}
