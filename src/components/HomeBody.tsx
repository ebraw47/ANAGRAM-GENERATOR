"use client";

import Image from "next/image";
import MarkdownContent from "@/components/MarkdownContent";
import FaqAccordion from "@/components/FaqAccordion";
import { FeatureCards, StepCards } from "@/components/FeatureCards";
import { FadeIn } from "@/components/motion/Motion";
import { BRAND, HOME_FAQS, IMAGES } from "@/lib/siteConfig";

export default function HomeBody({
  beforeSteps,
  afterSteps,
}: {
  beforeSteps: string;
  afterSteps: string;
}) {
  return (
    <>
      <section className="bg-paper py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <FadeIn>
            <p className="section-kicker">Why people use our calculator</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Why Choose Us?
            </h2>
            <p className="mt-2 max-w-2xl text-ink-mute">
              Clear fertile-window estimates, cycle education, and a tablet-style tool built for
              timing around ovulation.
            </p>
          </FadeIn>
          <div className="mt-10">
            <FeatureCards />
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-[#C2185B]/15 bg-gradient-to-br from-[#2a1520] via-[#4a0e2e] to-[#C2185B] py-14 text-white md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <FadeIn>
            <p className="section-kicker !text-white/60">Built for cycle clarity</p>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              One tablet view for ovulation &amp; fertile days
            </h2>
            <p className="mt-3 max-w-md text-white/75">
              Enter your last period and average cycle length on {BRAND.domain}. See ovulation,
              fertile days, and your next expected period without a cluttered form.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lift ring-1 ring-white/15">
              <Image
                src={IMAGES.website}
                alt={`${BRAND.name} cover`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 560px"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">
          <MarkdownContent content={beforeSteps} />
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-4 md:px-6">
          <FadeIn className="mb-8 text-center md:mb-10">
            <p className="section-kicker">Quick start</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Calculate in three simple steps
            </h2>
          </FadeIn>
          <StepCards />
        </div>

        {afterSteps ? (
          <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:pb-16">
            <MarkdownContent content={afterSteps} />
          </div>
        ) : null}
      </section>

      <section className="border-t border-slate-200 bg-white py-10 md:py-12">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <FadeIn>
            <p className="section-kicker">Ready to find your fertile window?</p>
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              Use the ovulation calculator now
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-ink-mute">
              Select your last period start and cycle length in the Cycle Studio at the top of this
              page.
            </p>
            <a
              href="#calculator"
              className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-ring"
            >
              Go to calculator
            </a>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-slate-200/80 bg-paper py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <FadeIn>
            <p className="section-kicker">Help center</p>
            <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
              FAQs About Ovulation Calculators
            </h2>
            <p className="mt-2 mb-8 text-ink-mute">
              Quick answers about fertile windows, timing, and what estimates can (and can’t) do.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <FaqAccordion faqs={HOME_FAQS} />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
