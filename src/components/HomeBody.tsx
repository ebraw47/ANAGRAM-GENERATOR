"use client";

import { useState } from "react";
import Image from "next/image";
import MarkdownContent from "@/components/MarkdownContent";
import { FeatureCards, StepCards } from "@/components/FeatureCards";
import { FadeIn } from "@/components/motion/Motion";
import { BRAND, IMAGES, imageDims } from "@/lib/siteConfig";

const TABS = [
  {
    id: "exact",
    label: "Exact anagrams",
    title: "Full-letter rearrangements only",
    body: "When every letter must be used once — jumbles, crossword enumerations, and true anagram answers — Exact mode filters the noise.",
  },
  {
    id: "subset",
    label: "All words",
    title: "Unscramble every playable word",
    body: "Subset mode lists shorter words hiding in your tiles — ideal for Scrabble racks, Wordle practice, and classroom challenges.",
  },
  {
    id: "multi",
    label: "Multi-word",
    title: "Phrase anagrams for names & clues",
    body: "Split letters across two or three real words. Famous results like dormitory → dirty room start here.",
  },
  {
    id: "private",
    label: "Private search",
    title: "Everything stays in your browser",
    body: "Matching runs locally against bundled dictionaries in 6 languages. No account, no upload — rearrange, speak, and copy.",
  },
] as const;

const STATS = [
  { value: "6", label: "Languages with full dictionaries + UI" },
  { value: "3", label: "Modes — exact, subset, multi-word" },
  { value: "Voice", label: "Speak any result in the selected language" },
  { value: "0$", label: "Free forever, no sign-up wall" },
];

export default function HomeBody({
  beforeSteps,
  afterSteps,
}: {
  beforeSteps: string;
  afterSteps: string;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("exact");
  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <>
      {/* Feature tabs — LIMA-style */}
      <section className="overflow-x-hidden py-12 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Define anagrams the way you actually solve them
            </h2>
            <p className="mt-3 text-ink-mute">
              Switch modes like a workspace — not a one-size list dump.
            </p>
          </FadeIn>

          <FadeIn delay={0.06} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TABS.map((t) => {
              const on = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`rounded-3xl border px-5 py-5 text-left transition ${
                    on
                      ? "border-brand/30 bg-white shadow-lift"
                      : "border-black/5 bg-white/50 hover:bg-white"
                  }`}
                >
                  <p className={`text-sm font-bold ${on ? "text-brand" : "text-ink"}`}>{t.label}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-mute line-clamp-2">{t.body}</p>
                </button>
              );
            })}
          </FadeIn>

          <FadeIn delay={0.1} className="relative mt-8 overflow-hidden rounded-[2rem] border border-black/5 bg-white/70 p-6 shadow-lift backdrop-blur-sm md:p-10">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 90% 20%, rgba(63,107,75,0.12), transparent 55%)",
              }}
            />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <p className="section-kicker">Workspace mode</p>
                <h3 className="font-display text-2xl font-bold text-ink md:text-3xl">{active.title}</h3>
                <p className="mt-3 text-ink-mute">{active.body}</p>
                <a href="#generator" className="cta-pill mt-6">
                  Try this mode
                </a>
              </div>
              <Image
                src={IMAGES.features}
                alt={active.title}
                width={imageDims(IMAGES.features).width}
                height={imageDims(IMAGES.features).height}
                unoptimized
                className="relative z-10 block h-auto w-full rounded-2xl border-0"
                sizes="(max-width:768px) 100vw, 520px"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why choose — soft feature grid */}
      <section className="py-6 md:py-10">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-8">
          <FadeIn className="max-w-2xl">
            <p className="section-kicker">Why puzzlers switch</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Why choose our anagram generator?
            </h2>
            <p className="mt-3 text-ink-mute">
              Exact matches, 6 languages, voice playback, phrase splits, and Scrabble scores — in one
              calm workspace.
            </p>
          </FadeIn>
          <div className="mt-10">
            <FeatureCards />
          </div>
        </div>
      </section>

      {/* Zigzag feature 1 */}
      <section className="overflow-x-hidden py-12 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-3 sm:px-4 md:grid-cols-2 md:gap-16 md:px-8">
          <FadeIn>
            <p className="section-kicker">Product</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Connect letters to every real word they hide
            </h2>
            <p className="mt-4 text-ink-mute">
              Whether you searched for an anagram generator, maker, finder, or word rearranger, this
              tool covers exact rearrangements and every shorter play on {BRAND.domain}.
            </p>
            <a href="#generator" className="cta-pill mt-6">
              Open generator
            </a>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white p-3 shadow-lift">
              <Image
                src={IMAGES.website}
                alt={`${BRAND.name} unscramble letters`}
                width={imageDims(IMAGES.website).width}
                height={imageDims(IMAGES.website).height}
                unoptimized
                className="block h-auto w-full rounded-2xl border-0"
                sizes="(max-width:768px) 100vw, 560px"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Zigzag feature 2 */}
      <section className="overflow-x-hidden py-12 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-3 sm:px-4 md:grid-cols-2 md:gap-16 md:px-8">
          <FadeIn className="order-2 md:order-1">
            <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white p-3 shadow-lift">
              <Image
                src={IMAGES.search}
                alt="Filter anagram results by length and mode"
                width={imageDims(IMAGES.search).width}
                height={imageDims(IMAGES.search).height}
                unoptimized
                className="block h-auto w-full rounded-2xl border-0"
                sizes="(max-width:768px) 100vw, 560px"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.08} className="order-1 md:order-2">
            <p className="section-kicker">Focus</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Stay focused on the answers that matter
            </h2>
            <ul className="mt-4 space-y-3 text-ink-soft">
              <li>6 languages — English, Spanish, French, German, Italian, Portuguese</li>
              <li>Speak button to hear any result aloud</li>
              <li>Blank tiles with `?` wildcards</li>
              <li>Min length, Scrabble sort, and one-click copy</li>
            </ul>
            <a href="#generator" className="cta-pill mt-6">
              Generate now
            </a>
          </FadeIn>
        </div>
      </section>

      {/* How-to + steps */}
      <section className="overflow-x-hidden py-10 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <FadeIn className="min-w-0 lg:col-span-7">
              <div className="soft-panel p-4 sm:p-6 md:p-8">
                <MarkdownContent content={beforeSteps} />
              </div>
            </FadeIn>
            <FadeIn delay={0.06} className="min-w-0 lg:col-span-5">
              <p className="section-kicker">Quick start</p>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Generate anagrams in three steps
              </h2>
              <div className="mt-6 sm:mt-8">
                <StepCards className="grid gap-4" />
              </div>
              <a href="#generator" className="cta-pill mt-6 sm:mt-8">
                Open generator
              </a>
            </FadeIn>
          </div>

          {afterSteps ? (
            <FadeIn className="mt-10 min-w-0 sm:mt-12">
              <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                <div className="soft-panel min-w-0 p-4 sm:p-6 md:p-8 lg:col-span-7">
                  <MarkdownContent content={afterSteps} />
                </div>
                <div className="min-w-0 space-y-6 lg:col-span-5">
                  <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white p-3 shadow-lift">
                    <Image
                      src={IMAGES.vsSentence}
                      alt="Exact anagrams versus word unscrambling"
                      width={imageDims(IMAGES.vsSentence).width}
                      height={imageDims(IMAGES.vsSentence).height}
                      unoptimized
                      className="block h-auto w-full rounded-2xl border-0"
                      sizes="(max-width:768px) 100vw, 420px"
                    />
                  </div>
                  <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-sm md:p-7">
                    <p className="section-kicker">Tip</p>
                    <h3 className="font-display text-xl font-bold text-ink">
                      Exact mode for true anagrams
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-mute">
                      Need a full rearrangement? Use Exact. Holding a Scrabble rack? Stay on All
                      words. For names, try Multi-word with min length 3 or 4.
                    </p>
                    <a href="#generator" className="mt-5 inline-flex text-sm font-semibold text-brand hover:text-brand-dark">
                      Back to generator →
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ) : null}
        </div>
      </section>

      {/* Who it's for */}
      <section className="overflow-x-hidden py-12 md:py-20">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-3 sm:px-4 md:grid-cols-2 md:gap-16 md:px-8">
          <FadeIn>
            <p className="section-kicker">Who it&apos;s for</p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Built for players, puzzlers, teachers, and writers
            </h2>
            <p className="mt-4 text-ink-mute">
              Scrabble, crosswords, Jumble, classroom challenges, or clever name anagrams — generate
              answers without uploading your text.
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white p-3 shadow-lift">
              <Image
                src={IMAGES.whoCanUse}
                alt="Who can use an anagram generator"
                width={imageDims(IMAGES.whoCanUse).width}
                height={imageDims(IMAGES.whoCanUse).height}
                unoptimized
                className="block h-auto w-full rounded-2xl border-0"
                sizes="(max-width:768px) 100vw, 560px"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats */}
      <section className="overflow-x-hidden py-12 md:py-20">
        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4 md:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              More gets solved when the modes work together
            </h2>
          </FadeIn>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((s) => (
              <FadeIn key={s.value}>
                <div className="rounded-3xl border border-black/5 bg-white px-6 py-8 text-center shadow-sm">
                  <p className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-mute">{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
