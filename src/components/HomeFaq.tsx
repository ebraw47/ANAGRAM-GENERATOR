"use client";

import Image from "next/image";
import FaqAccordion from "@/components/FaqAccordion";
import { FadeIn } from "@/components/motion/Motion";
import { BRAND, HOME_FAQS, IMAGES, imageDims } from "@/lib/siteConfig";

export default function HomeFaq() {
  return (
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <FadeIn>
            <p className="section-kicker">Help center</p>
            <h2 className="font-display text-3xl font-bold text-ink md:text-4xl">
              FAQs about anagram generators
            </h2>
            <p className="mt-2 mb-6 text-ink-mute">
              Languages, voice playback, multi-word phrases, wildcards, privacy, and free use.
            </p>
            <FaqAccordion faqs={HOME_FAQS} />
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-lift">
              <Image
                src={IMAGES.benefits}
                alt="Benefits of anagram generator"
                width={imageDims(IMAGES.benefits).width}
                height={imageDims(IMAGES.benefits).height}
                unoptimized
                className="block h-auto w-full border-0"
                sizes="(max-width:768px) 100vw, 560px"
              />
              <div className="p-6 md:p-8">
                <p className="section-kicker">Ready to rearrange?</p>
                <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                  Your letters, finally working together
                </h2>
                <p className="mt-3 text-ink-mute">
                  Paste letters above, switch language, tap speak to hear results, and copy anagrams on{" "}
                  {BRAND.domain}.
                </p>
                <a href="#generator" className="cta-pill mt-6">
                  Get started free
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
