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
  calendar: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  window: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 8v4l2.5 2.5" />
    </svg>
  ),
  heart: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
    </svg>
  ),
  tablet: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M10 18h4" />
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
  refresh: (
    <svg className={iconClass} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12a8 8 0 0 1 13.5-5.7L20 8" />
      <path d="M20 4v4h-4M20 12a8 8 0 0 1-13.5 5.7L4 16" />
      <path d="M4 20v-4h4" />
    </svg>
  ),
} as const;

export const HOME_FEATURES: CardItem[] = [
  {
    title: "Fertile Window Map",
    description: "See about six peak fertility days highlighted on a clear cycle calendar.",
    icon: FEATURE_ICONS.window,
  },
  {
    title: "Ovulation Estimate",
    description: "Get an estimated ovulation date based on your period start and cycle length.",
    icon: FEATURE_ICONS.calendar,
  },
  {
    title: "Tablet Cycle Studio",
    description: "A modern device-style calculator with a fertility ring and day timeline.",
    icon: FEATURE_ICONS.tablet,
  },
  {
    title: "Cycle Length Slider",
    description: "Adjust from 21–40 days so longer or shorter cycles shift your estimate.",
    icon: FEATURE_ICONS.chart,
  },
  {
    title: "Educational Guides",
    description: "Learn signs of ovulation, LH tests, BBT, and TTC timing from our blog.",
    icon: FEATURE_ICONS.heart,
  },
  {
    title: "Privacy-First Tool",
    description: "Calculations run in your browser. Estimates are educational — not medical advice.",
    icon: FEATURE_ICONS.shield,
  },
];

export const HOME_STEPS: CardItem[] = [
  {
    title: "Select Your Period Start",
    description: "Tap the first day of your last menstrual period on the cycle pad.",
    icon: FEATURE_ICONS.tap,
  },
  {
    title: "Set Average Cycle Length",
    description: "Slide to your typical cycle length (default 28 days).",
    icon: FEATURE_ICONS.spark,
  },
  {
    title: "View Your Fertile Window",
    description: "See ovulation day, fertile days, and your next expected period.",
    icon: FEATURE_ICONS.refresh,
  },
];

function IconCard({ item }: { item: CardItem }) {
  return (
    <motion.article
      className="group relative rounded-2xl border border-[#F8BBD0] bg-white px-5 pb-6 pt-10"
      whileHover={{
        y: -6,
        borderColor: "#C2185B",
        boxShadow: "0 18px 40px -20px rgba(194, 24, 91, 0.4)",
      }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <motion.div
        className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#F8BBD0] bg-white text-[#C2185B] shadow-sm"
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
      <h3 className="font-display text-lg font-bold tracking-tight text-[#880E4F] md:text-[1.15rem]">
        {item.title}
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-[#7A5A68]">{item.description}</p>
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

export function StepCards({ items = HOME_STEPS }: { items?: CardItem[] }) {
  return (
    <Stagger className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" delay={0.08}>
      {items.map((item) => (
        <StaggerItem key={item.title}>
          <IconCard item={item} />
        </StaggerItem>
      ))}
    </Stagger>
  );
}
