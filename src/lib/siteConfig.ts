/** Central brand / domain config for Ovulation Calculator */
export const SITE_ORIGIN = "https://ovulationcalculator.io";

export const BRAND = {
  name: "Ovulation Calculator",
  shortName: "OvulationCalc",
  keyword: "ovulation calculator",
  domain: "ovulationcalculator.io",
  email: "contact@ovulationcalculator.io",
  twitter: "@ovulationcalc",
  tagline: "Find Your Fertile Window & Ovulation Date",
  description:
    "Free ovulation calculator to estimate your fertile window and ovulation date. Enter your last period and cycle length for personalized fertility timing.",
} as const;

export const ROUTES = {
  home: "/",
  about: "/about-us",
  blog: "/category/blog",
  contact: "/contact-us",
  privacy: "/privacy-policy",
  disclaimer: "/disclaimer",
} as const;

export const IMAGES = {
  logo: "/logo.png",
  favicon: "/logo.png",
  brandLogo: "/logo.png",
  banner: "/ovalution-calculator-cover.webp",
  og: "/feature/og-image-1200x630.png",
  ogSquare: "/feature/og-square-1200x1200.png",
  twitter: "/feature/twitter-card-1200x600.png",
  website: "/ovalution-calculator-cover.webp",
  tool: "/ovalution-calculator-cover.webp",
  heroAlt: "/ovalution-calculator-cover.webp",
} as const;

/**
 * SERP-validated blog pillars only (competitor + query research):
 * ovulation calculator, ovulation calendar, fertile window, calculate ovulation,
 * signs of ovulation, best time to conceive, irregular periods, ovulation test kits,
 * cervical mucus, basal body temperature.
 */
export const ARTICLES = [
  {
    slug: "how-to-use-an-ovulation-calculator",
    title: "How to Use an Ovulation Calculator: Step-by-Step Guide",
    metaTitle: "How to Use an Ovulation Calculator | Step-by-Step",
    description:
      "Enter your last period date and average cycle length to estimate ovulation and your fertile window. A clear walkthrough of how ovulation calculators work.",
    date: "2026-11-04",
    image: "/blog/how-to-use-ovulation-calculator.svg",
  },
  {
    slug: "ovulation-calendar",
    title: "Ovulation Calendar: Track Your Most Fertile Days",
    metaTitle: "Ovulation Calendar | Track Fertile Days",
    description:
      "Use an ovulation calendar to map fertile days from your cycle length. Learn how calendar tracking works and when estimates are less reliable.",
    date: "2026-11-03",
    image: "/blog/ovulation-calendar.svg",
  },
  {
    slug: "fertile-window",
    title: "Fertile Window Explained: When Are You Most Fertile?",
    metaTitle: "Fertile Window Explained | Most Fertile Days",
    description:
      "Your fertile window is about six days each cycle. See why the days before ovulation matter most and how to time intercourse.",
    date: "2026-11-02",
    image: "/blog/fertile-window.svg",
  },
  {
    slug: "how-to-calculate-ovulation",
    title: "How to Calculate Ovulation From Your Cycle Length",
    metaTitle: "How to Calculate Ovulation | Cycle Length Guide",
    description:
      "Ovulation usually happens about 14 days before your next period. Learn the math for 21-, 28-, and 35-day cycles with clear examples.",
    date: "2026-11-01",
    image: "/blog/how-to-calculate-ovulation.svg",
  },
  {
    slug: "signs-of-ovulation",
    title: "Signs of Ovulation: Body Clues You Can Track",
    metaTitle: "Signs of Ovulation | Body Clues & Tracking",
    description:
      "Recognize common ovulation signs: egg-white cervical mucus, LH surge, BBT rise, mild cramps, breast tenderness, and spotting.",
    date: "2026-10-30",
    image: "/blog/signs-of-ovulation.svg",
  },
  {
    slug: "best-time-to-conceive",
    title: "Best Time to Conceive: When to Have Sex Around Ovulation",
    metaTitle: "Best Time to Conceive Around Ovulation",
    description:
      "Pregnancy odds peak in the days before ovulation. Practical timing tips from fertile-window research for couples trying to conceive.",
    date: "2026-10-28",
    image: "/blog/best-time-to-conceive.svg",
  },
  {
    slug: "irregular-periods-and-ovulation",
    title: "Irregular Periods and Ovulation: What Calculators Miss",
    metaTitle: "Irregular Periods & Ovulation Tracking",
    description:
      "Irregular cycles make calendar estimates less accurate. Learn backup methods like OPKs, mucus tracking, and when to see a clinician.",
    date: "2026-10-26",
    image: "/blog/irregular-periods.svg",
  },
  {
    slug: "how-to-use-an-ovulation-test",
    title: "How to Use an Ovulation Test Kit (OPK) Correctly",
    metaTitle: "How to Use an Ovulation Test Kit | OPK Guide",
    description:
      "Learn when to start LH ovulation tests, how to read a positive surge, and how to combine kits with an ovulation calculator.",
    date: "2026-10-24",
    image: "/blog/ovulation-test-kits.svg",
  },
  {
    slug: "cervical-mucus-and-fertility",
    title: "Cervical Mucus and Fertility: Reading Peak Fertility Clues",
    metaTitle: "Cervical Mucus Changes & Fertility",
    description:
      "Clear, stretchy, egg-white cervical mucus often signals peak fertility. Pair mucus observation with your ovulation calendar results.",
    date: "2026-10-22",
    image: "/blog/cervical-mucus.svg",
  },
  {
    slug: "basal-body-temperature-tracking",
    title: "Basal Body Temperature Tracking for Ovulation",
    metaTitle: "Basal Body Temperature (BBT) Ovulation Guide",
    description:
      "A small rise in waking temperature can confirm ovulation after it happens. Learn how to chart BBT with fertile-window estimates.",
    date: "2026-10-20",
    image: "/blog/bbt-tracking.svg",
  },
] as const;

export const HOME_FAQS = [
  {
    q: "How does an ovulation calculator work?",
    a: "You enter the first day of your last period and your average cycle length. The calculator estimates ovulation about 14 days before your next period and highlights a roughly six-day fertile window when pregnancy is most likely.",
  },
  {
    q: "How accurate is an ovulation calculator?",
    a: "Results are estimates. Cycles vary month to month, and irregular periods reduce calendar accuracy. Combine the calculator with cervical mucus changes, ovulation tests, or clinician guidance for better timing.",
  },
  {
    q: "What is a fertile window?",
    a: "Your fertile window is about six days each cycle — typically the five days before ovulation plus ovulation day — when unprotected sex is most likely to lead to pregnancy.",
  },
  {
    q: "When should I have sex to get pregnant?",
    a: "Odds are often highest one to two days before ovulation. Many people start trying a few days before the estimated ovulation date and continue through ovulation day.",
  },
  {
    q: "Can I use an ovulation calculator as birth control?",
    a: "No. Do not use this tool alone to prevent pregnancy. Estimates can miss early or late ovulation. Talk with a clinician about reliable contraception.",
  },
  {
    q: "What if my cycle is not 28 days?",
    a: "Enter your average cycle length. Ovulation is estimated relative to the next period (luteal phase ≈ 14 days), so longer or shorter cycles shift the predicted ovulation date.",
  },
  {
    q: "What if I have irregular periods?",
    a: "Calendar estimates are less reliable when cycles vary widely. Track several cycles, use ovulation predictor kits or mucus changes, and consult a healthcare professional if cycles stay unpredictable.",
  },
  {
    q: "What are common signs of ovulation?",
    a: "Common signs include clearer stretchy cervical mucus, a positive LH test, mild one-sided cramping, breast tenderness, bloating, light spotting, and a slight rise in basal body temperature after ovulation.",
  },
  {
    q: "How long does the egg live after ovulation?",
    a: "An egg is typically viable for about 12 to 24 hours after release. Sperm can live up to about five days in the reproductive tract, which is why the days before ovulation matter so much.",
  },
  {
    q: "When should I see a doctor about fertility?",
    a: "If you are under 35 and have tried for a year without pregnancy — or 35+ and have tried for six months — talk with a clinician. Seek care sooner for very irregular cycles, known PCOS, or other medical concerns.",
  },
] as const;
