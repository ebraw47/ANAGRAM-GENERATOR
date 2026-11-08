"use client";

import Image from "next/image";
import TitleCaseConverter from "@/components/TitleCaseConverter";
import { FadeIn } from "@/components/motion/Motion";
import { BRAND } from "@/lib/siteConfig";

export default function HomeHero() {
  return (
    <section className="relative overflow-x-hidden text-ink">
      <div className="pointer-events-none absolute inset-0 hero-gradient" />

      <div className="relative z-10 mx-auto max-w-6xl px-3 pb-8 pt-5 sm:px-4 sm:pb-10 sm:pt-8 md:px-6 md:pb-12 md:pt-10">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Image
            src="/title-case-converter-hero-logo.webp"
            alt={`${BRAND.name} logo`}
            width={442}
            height={442}
            priority
            unoptimized
            className="mx-auto mb-3 h-16 w-16 border-0 object-contain sm:mb-4 sm:h-[4.5rem] sm:w-[4.5rem]"
          />
          <p className="font-display text-[1.65rem] font-extrabold leading-tight tracking-tight text-ink sm:text-4xl md:text-[2.75rem]">
            <span className="text-ink">Title Case </span>
            <span className="text-brand">Converter</span>
          </p>
          <h1 className="mt-2 font-display text-base font-bold tracking-tight text-ink/90 sm:text-xl md:text-2xl">
            Free Title Case Converter
          </h1>
          <p className="mx-auto mt-2 max-w-xl px-1 text-sm leading-relaxed text-ink-mute sm:text-base">
            Capitalize headlines with AMA, AP, APA, Bluebook, Chicago, MLA, NY Times &amp; Wikipedia —
            plus sentence case and more on {BRAND.domain}.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-5 sm:mt-7 md:mt-8">
          <TitleCaseConverter />
        </FadeIn>
      </div>
    </section>
  );
}
