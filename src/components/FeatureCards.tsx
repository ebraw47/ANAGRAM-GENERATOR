"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/motion/Motion";

type CardItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const iconClass = "h-6 w-6";

export const FEATURE_ICONS = {
  styles: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h14" />
    </svg>
  ),
  bolt: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  copy: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M4 16V6a2 2 0 0 1 2-2h10" />
    </svg>
  ),
  chart: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19V5M4 19h16" />
      <path d="M8 15v-4M12 15V8M16 15v-6" />
    </svg>
  ),
  shield: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
    </svg>
  ),
  book: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5V5.5z" />
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    </svg>
  ),
  paste: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 5h6M8 5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
    </svg>
  ),
  spark: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
  check: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
} as const;

export const HOME_FEATURES: CardItem[] = [
  {
    title: "Exact & subset modes",
    description: "True full-letter anagrams or every shorter word hiding in your tiles.",
    icon: FEATURE_ICONS.styles,
  },
  {
    title: "Multi-word phrases",
    description: "Build 2–3 word anagrams like dormitory → dirty room for names and clues.",
    icon: FEATURE_ICONS.bolt,
  },
  {
    title: "6 languages",
    description: "English, Spanish, French, German, Italian, and Portuguese — dictionary + UI.",
    icon: FEATURE_ICONS.book,
  },
  {
    title: "Voice playback",
    description: "Tap speak on any result to hear it in the selected language.",
    icon: FEATURE_ICONS.spark,
  },
  {
    title: "Copy & Scrabble scores",
    description: "Copy one word or the full list; sort by length, points, or A–Z.",
    icon: FEATURE_ICONS.copy,
  },
  {
    title: "Private by design",
    description: "Search runs locally in your browser. Letters never leave your device.",
    icon: FEATURE_ICONS.shield,
  },
];

export const HOME_STEPS: CardItem[] = [
  {
    title: "Enter your letters",
    description: "Paste a jumble, word, name, or phrase. Use ? for a blank tile.",
    icon: FEATURE_ICONS.paste,
  },
  {
    title: "Pick language & mode",
    description: "Choose a dictionary language, then exact, all words, or multi-word.",
    icon: FEATURE_ICONS.spark,
  },
  {
    title: "Copy or speak",
    description: "Browse by length, hear words aloud, and copy what you need.",
    icon: FEATURE_ICONS.check,
  },
];

function IconCard({ item }: { item: CardItem }) {
  return (
    <motion.article
      className="group rounded-3xl border border-black/5 bg-white p-6 shadow-sm transition"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
        {item.icon}
      </div>
      <h3 className="font-display text-lg font-bold tracking-tight text-ink">{item.title}</h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-mute">{item.description}</p>
    </motion.article>
  );
}

export function FeatureCards({ items = HOME_FEATURES }: { items?: CardItem[] }) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <StaggerItem key={item.title}>
          <IconCard item={item} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export function StepCards({
  items = HOME_STEPS,
  className = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
}: {
  items?: CardItem[];
  className?: string;
}) {
  return (
    <Stagger className={className} delay={0.08}>
      {items.map((item) => (
        <StaggerItem key={item.title}>
          <IconCard item={item} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
