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
      <section className="border-t border-white/10 bg-[#050B16] py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <FadeIn>
            <p className="section-kicker">Why players use our finder</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              Why Choose Us?
            </h2>
            <p className="mt-2 max-w-2xl text-ink-mute">
              Position-aware yellow tracking, live candidate filtering, and letter-frequency hints
              built for real Wordle boards.
            </p>
          </FadeIn>
          <div className="mt-10">
            <FeatureCards />
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-white/10 bg-gradient-to-br from-black via-[#050B16] to-[#1E6FFF] py-14 text-white md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <FadeIn>
            <p className="section-kicker !text-sky-200/80">Built for clue clarity</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              One finder for green, yellow &amp; gray tiles
            </h2>
            <p className="mt-3 max-w-md text-white/75">
              Enter the clues you already earned on {BRAND.domain}. See every remaining 5-letter
              word without spoilers or answer leaks.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/40 shadow-lift ring-1 ring-white/15">
              <Image
                src={IMAGES.website}
                alt={`${BRAND.name} banner`}
                fill
                className="object-contain p-6 md:p-10"
                sizes="(max-width:768px) 100vw, 560px"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main article + how-to side by side */}
      <section className="bg-[#02060D] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <FadeIn className="lg:col-span-7">
              <MarkdownContent content={beforeSteps} />
            </FadeIn>

            <FadeIn delay={0.06} className="lg:col-span-5">
              <p className="section-kicker">Quick start</p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                Find matches in three simple steps
              </h2>
              <div className="mt-8">
                <StepCards className="grid gap-y-10" />
              </div>
              <a
                href="#finder"
                className="mt-8 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-ring"
              >
                Open finder
              </a>
            </FadeIn>
          </div>

          {afterSteps ? (
            <FadeIn className="mt-12 border-t border-white/10 pt-10">
              <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <MarkdownContent content={afterSteps} />
                </div>
                <div className="mt-8 lg:col-span-5 lg:mt-0">
                  <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6 md:p-7">
                    <p className="section-kicker">Tip</p>
                    <h3 className="font-display text-xl font-bold text-white">
                      Keep clues precise
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-mute">
                      Lock greens first, place yellows where you tried them, then add grays. The list
                      updates live so you can pick a stronger next guess without spoilers.
                    </p>
                    <a
                      href="#finder"
                      className="mt-5 inline-flex text-sm font-semibold text-navy-500 transition hover:text-navy-200"
                    >
                      Back to finder →
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : null}
        </div>
      </section>

      {/* FAQ + CTA side by side */}
      <section className="border-t border-white/10 bg-[#050B16] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <FadeIn>
              <p className="section-kicker">Help center</p>
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                FAQs About Wordle Word Finders
              </h2>
              <p className="mt-2 mb-6 text-ink-mute">
                Quick answers about solvers, openers, hard mode, and how clue filtering works.
              </p>
              <FaqAccordion faqs={HOME_FAQS} />
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="rounded-2xl border border-white/10 bg-[#0B1F3A] p-6 md:p-8">
                <p className="section-kicker">Stuck on today’s puzzle?</p>
                <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                  Use the Wordle word finder now
                </h2>
                <p className="mt-3 text-ink-mute">
                  Drop your green, yellow, and gray clues into the live finder at the top of this page.
                </p>
                <a
                  href="#finder"
                  className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-ring"
                >
                  Go to finder
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
