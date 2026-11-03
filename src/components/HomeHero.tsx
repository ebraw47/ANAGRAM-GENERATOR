"use client";

import Image from "next/image";
import OvulationCalculator from "@/components/OvulationCalculator";
import { FadeIn } from "@/components/motion/Motion";
import { BRAND, IMAGES } from "@/lib/siteConfig";

export default function HomeHero() {
  return (
    <section className="relative -mt-16 overflow-hidden pt-16 text-white">
      <Image
        src={IMAGES.banner}
        alt=""
        fill
        priority
        className="scale-105 object-cover object-center blur-[3px]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1520]/88 via-[#4a0e2e]/82 to-[#2a1520]/92" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 15%, rgba(244,143,177,0.45), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 20%, rgba(194,24,91,0.35), transparent 50%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-6 md:pb-20 md:pt-16">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <Image
            src={IMAGES.brandLogo}
            alt={`${BRAND.name} logo`}
            width={80}
            height={80}
            priority
            className="mx-auto mb-5 rounded-2xl shadow-lift ring-1 ring-white/25"
          />
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-5xl md:text-6xl">
            Ovulation Calculator
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/90 md:text-xl">
            Estimate your fertile window and ovulation date in a clear cycle map.
          </p>
          <p className="mt-2 text-sm font-medium tracking-wide text-white/60">
            {BRAND.domain}
          </p>
        </FadeIn>

        <FadeIn delay={0.12} className="mt-10 md:mt-12">
          <OvulationCalculator />
        </FadeIn>
      </div>
    </section>
  );
}
