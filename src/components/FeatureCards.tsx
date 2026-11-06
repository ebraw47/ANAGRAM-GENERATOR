"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Stagger, StaggerItem } from "@/components/motion/Motion";

type CardItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const iconClass = "h-7 w-7";

export const FEATURE_ICONS = {
  grid: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  bolt: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  filter: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 5h16l-6 7.5V19l-4 2v-8.5L4 5z" />
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
  tap: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 13V7a2 2 0 1 1 4 0v6" />
      <path d="M12 13v2a4 4 0 0 0 8 0v-1" />
      <path d="M8 13l-2.2 4.2A2.5 2.5 0 0 0 8 21h6" />
    </svg>
  ),
  spark: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  ),
  list: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  ),
} as const;

export const HOME_FEATURES: CardItem[] = [
  {
    title: "Green Position Locks",
    description: "Pin correct letters to exact slots and shrink the dictionary immediately.",
    icon: FEATURE_ICONS.grid,
  },
  {
    title: "Yellow Position Bans",
    description: "Keep present letters while excluding the spots you’ve already ruled out.",
    icon: FEATURE_ICONS.filter,
  },
  {
    title: "Live Candidate List",
    description: "Matching words update as you type — no submit button, no server wait.",
    icon: FEATURE_ICONS.bolt,
  },
  {
    title: "Letter Frequency Hints",
    description: "See which letters dominate the remaining pool so your next guess gains more info.",
    icon: FEATURE_ICONS.chart,
  },
  {
    title: "Privacy-First Browser Tool",
    description: "Filtering runs locally. Your puzzle clues never leave your device.",
    icon: FEATURE_ICONS.shield,
  },
  {
    title: "Strategy Guides",
    description: "Learn openers, scout guesses, hard mode, and duplicate-letter traps from our blog.",
    icon: FEATURE_ICONS.book,
  },
];

export const HOME_STEPS: CardItem[] = [
  {
    title: "Enter Green Letters",
    description: "Type confirmed letters in the exact positions Wordle marked green.",
    icon: FEATURE_ICONS.tap,
  },
  {
    title: "Add Yellow & Gray Clues",
    description: "Place yellow letters where you tried them, then list absent gray letters.",
    icon: FEATURE_ICONS.spark,
  },
  {
    title: "Pick Your Next Guess",
    description: "Browse the filtered list and use hot-letter hints to choose a stronger word.",
    icon: FEATURE_ICONS.list,
  },
];

function IconCard({ item }: { item: CardItem }) {
  return (
    <motion.article
      className="group relative rounded-2xl border border-white/10 bg-[#0B1F3A] px-5 pb-6 pt-10"
      whileHover={{
        y: -6,
        borderColor: "#1E6FFF",
        boxShadow: "0 18px 40px -20px rgba(30, 111, 255, 0.4)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <motion.div
        className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border border-brand/40 bg-[#050B16] text-[#4DA3FF] shadow-sm"
        aria-hidden
        variants={{
          rest: { scale: 1, rotate: 0 },
          hover: { scale: 1.1, rotate: -6 },
        }}
        initial="rest"
        whileHover="hover"
        transition={{ type: "spring", stiffness: 400, damping: 16 }}
      >
        {item.icon}
      </motion.div>
      <h3 className="font-display text-lg font-bold tracking-tight text-white md:text-[1.15rem]">
        {item.title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-mute">{item.description}</p>
    </motion.article>
  );
}

export function FeatureCards({ items = HOME_FEATURES }: { items?: CardItem[] }) {
  return (
    <Stagger className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
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
  className = "grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3",
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
