"use client";

import Image from "next/image";
import TitleCaseConverter from "@/components/TitleCaseConverter";
import { FadeIn } from "@/components/motion/Motion";
import { BRAND, IMAGES } from "@/lib/siteConfig";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden text-[#20242C]">
      <div className="pointer-events-none absolute inset-0 hero-gradient" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-5 sm:pb-10 sm:pt-6 md:px-6 md:pb-12 md:pt-7">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Image
            src={IMAGES.brandLogo}
            alt={`${BRAND.name} logo`}
            width={640}
            height={220}
            priority
            sizes="(max-width: 640px) 280px, (max-width: 768px) 380px, 480px"
            className="mx-auto mb-3 h-auto w-[260px] object-contain sm:mb-3.5 sm:w-[360px] md:w-[440px]"
          />
          <h1 className="font-display text-xl font-bold tracking-tight text-[#20242C] sm:text-2xl md:text-[1.65rem]">
            Free Title Case Converter
          </h1>
          <p className="mx-auto mt-1.5 max-w-xl text-sm text-ink-mute sm:text-base">
            Capitalize headlines with AMA, AP, APA, Bluebook, Chicago, MLA, NY Times &amp; Wikipedia — plus sentence case and more.
          </p>
        </FadeIn>

        <FadeIn delay={0.08} className="mt-5 sm:mt-6 md:mt-7">
          <TitleCaseConverter />
        </FadeIn>
      </div>
    </section>
  );
}
