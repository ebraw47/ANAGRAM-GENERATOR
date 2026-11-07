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
      <section className="section-glass border-t border-navy-900/10 py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <FadeIn>
            <p className="section-kicker">Why writers switch to us</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#20242C] md:text-3xl">
              Why Choose Our Title Case Converter?
            </h2>
            <p className="mt-2 max-w-2xl text-ink-mute">
              Style-accurate capitalization, live SEO counts, and private browser-side conversion —
              built for headlines that have to look right every time.
            </p>
          </FadeIn>
          <div className="mt-10">
            <FeatureCards />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-navy-900/10 py-14 text-[#20242C] md:py-16">
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <FadeIn>
            <p className="section-kicker">Built for publishers</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#20242C] md:text-3xl">
              One converter for every capitalization style
            </h2>
            <p className="mt-3 max-w-md text-ink-mute">
              AMA, AP, APA, Bluebook, Chicago, MLA, NY Times, Wikipedia, sentence case,
              UPPERCASE, and lowercase — convert on {BRAND.domain} without juggling separate
              tools or memorizing style manuals.
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="relative">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white/20 shadow-lift ring-1 ring-navy-900/10">
              <Image
                src={IMAGES.website}
                alt={`${BRAND.name} hero`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 560px"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-navy-900/10 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <FadeIn className="relative order-2 md:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white/60 shadow-lift ring-1 ring-navy-900/10">
              <Image
                src={IMAGES.features}
                alt="Title case converter features"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 560px"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="order-1 md:order-2">
            <p className="section-kicker">Features that close SERP gaps</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#20242C] md:text-3xl">
              Style guides, batch lines, and SEO length in one place
            </h2>
            <ul className="mt-4 space-y-3 text-[1.05rem] leading-relaxed text-ink-soft">
              <li>Compare APA vs Chicago preposition rules side by side.</li>
              <li>Paste multi-line title lists and convert each line independently.</li>
              <li>Watch character counts so SERP titles stay readable.</li>
              <li>Preserve common acronyms and optional ALL CAPS words.</li>
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className="section-glass py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <FadeIn className="lg:col-span-7">
              <MarkdownContent content={beforeSteps} />
            </FadeIn>

            <FadeIn delay={0.06} className="lg:col-span-5">
              <p className="section-kicker">Quick start</p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#20242C] md:text-3xl">
                Convert titles in three simple steps
              </h2>
              <div className="mt-8">
                <StepCards className="grid gap-y-10" />
              </div>
              <a
                href="#converter"
                className="mt-8 inline-flex rounded-xl bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-ring"
              >
                Open converter
              </a>
            </FadeIn>
          </div>

          {afterSteps ? (
            <FadeIn className="mt-12 border-t border-navy-900/10 pt-10">
              <div className="mx-auto max-w-3xl lg:mx-0 lg:max-w-none lg:grid lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <MarkdownContent content={afterSteps} />
                </div>
                <div className="mt-8 space-y-6 lg:col-span-5 lg:mt-0">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-navy-900/10">
                    <Image
                      src={IMAGES.vsSentence}
                      alt="Title case versus sentence case"
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 420px"
                    />
                  </div>
                  <div className="rounded-2xl border border-navy-900/10 bg-white/90 p-6 shadow-soft backdrop-blur-sm md:p-7">
                    <p className="section-kicker">Tip</p>
                    <h3 className="font-display text-xl font-bold text-[#20242C]">
                      Match the guide your audience expects
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-mute">
                      Academic papers lean APA, Chicago, or MLA. Newsrooms lean AP or NY Times.
                      Legal and medical titles may need Bluebook or AMA. Switch styles in one click
                      and copy the version your editor wants.
                    </p>
                    <a
                      href="#converter"
                      className="mt-5 inline-flex text-sm font-semibold text-brand transition hover:text-brand-dark"
                    >
                      Back to converter →
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : null}
        </div>
      </section>

      <section className="border-y border-navy-900/10 py-14 md:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <FadeIn>
            <p className="section-kicker">Who it&apos;s for</p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-[#20242C] md:text-3xl">
              Built for writers, marketers, students, and editors
            </h2>
            <p className="mt-3 text-ink-mute">
              Anyone who publishes titles — blogs, books, product pages, research papers, or social
              posts — can keep capitalization consistent without opening a style manual.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-navy-900/10">
              <Image
                src={IMAGES.whoCanUse}
                alt="Who can use a title case converter"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 560px"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-glass border-t border-navy-900/10 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <FadeIn>
              <p className="section-kicker">Help center</p>
              <h2 className="font-display text-2xl font-bold text-[#20242C] md:text-3xl">
                FAQs About Title Case Converters
              </h2>
              <p className="mt-2 mb-6 text-ink-mute">
                Quick answers about style guides, sentence case, SEO titles, privacy, and free use.
              </p>
              <FaqAccordion faqs={HOME_FAQS} />
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="overflow-hidden rounded-2xl border border-navy-900/10 bg-white/90 shadow-soft backdrop-blur-sm">
                <div className="relative aspect-[16/9]">
                  <Image
                    src={IMAGES.benefits}
                    alt="Benefits of title case converter"
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, 560px"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <p className="section-kicker">Ready to capitalize?</p>
                  <h2 className="font-display text-2xl font-bold text-[#20242C] md:text-3xl">
                    Use the free title case converter now
                  </h2>
                  <p className="mt-3 text-ink-mute">
                    Paste a headline at the top of this page, pick your style guide, and copy a
                    clean title in seconds.
                  </p>
                  <a
                    href="#converter"
                    className="mt-6 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-ring"
                  >
                    Go to converter
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
