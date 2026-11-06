/** Central brand / domain config for Wordle Word Finder */
export const SITE_ORIGIN = "https://wordlewordfinder.net";

export const BRAND = {
  name: "Wordle Word Finder",
  shortName: "WordFinder",
  keyword: "wordle word finder",
  domain: "wordlewordfinder.net",
  email: "contact@wordlewordfinder.net",
  twitter: "@wordlewordfind",
  tagline: "Wordle Solver, Helper & 5-Letter Word Finder",
  description:
    "Free Wordle word finder and solver. Enter green, yellow, and gray clues to see every 5-letter word that still fits — instantly in your browser.",
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
  /** Blue W mark — transparent background (browser favicon only) */
  icon: "/favicon.png",
  favicon: "/favicon.ico",
  brandLogo: "/hero-logo.svg",
  banner: "/wordle-word-finder-banner.webp",
  /** Wordle tiles + WordleWord wordmark for dark surfaces */
  headerLogo: "/header-logo-on-dark.svg",
  /** Wordle tiles + dark WordleWord wordmark for light surfaces */
  headerLogoLight: "/header-logo-light.svg",
  og: "/feature/og-image-1200x630.webp",
  ogSquare: "/feature/og-square-1200x1200.webp",
  twitter: "/feature/twitter-card-1200x600.webp",
  website: "/wordle-word-finder-banner.webp",
  tool: "/wordle-word-finder-banner.webp",
  heroAlt: "/hero-logo.svg",
} as const;

/**
 * SERP-validated blog pillars only (competitor + query research):
 * wordle word finder, wordle solver, best starting words, strategy tips,
 * green/yellow/gray rules, hard mode, repeated letters, second-guess scouting.
 */
export const ARTICLES = [
  {
    slug: "how-to-use-a-wordle-word-finder",
    title: "How to Use a Wordle Word Finder: Green, Yellow & Gray Clues",
    metaTitle: "How to Use a Wordle Word Finder | Step-by-Step",
    description:
      "Enter green letters by position, yellow letters with wrong spots, and gray exclusions. Learn how a Wordle word finder filters candidates in real time.",
    date: "2026-11-06",
    image: "/blog/how-to-use-wordle-word-finder.svg",
  },
  {
    slug: "best-wordle-starting-words",
    title: "Best Wordle Starting Words (Ranked by Letter Coverage)",
    metaTitle: "Best Wordle Starting Words | Ranked Openers",
    description:
      "Compare strong Wordle openers like IRATE, SLATE, CRANE, and TRACE. See why five distinct high-frequency letters beat vowel-only starters.",
    date: "2026-11-05",
    image: "/blog/best-wordle-starting-words.svg",
  },
  {
    slug: "wordle-strategy-tips-and-tricks",
    title: "Wordle Strategy: Tips and Tricks That Shrink the List Faster",
    metaTitle: "Wordle Strategy Tips & Tricks",
    description:
      "Use a fixed opener, a scout second guess, and information-gain thinking. Practical Wordle tips for fewer wasted guesses and stronger streaks.",
    date: "2026-11-04",
    image: "/blog/wordle-strategy-tips.svg",
  },
  {
    slug: "how-wordle-colors-work",
    title: "How Wordle Colors Work: Green, Yellow, and Gray Explained",
    metaTitle: "How Wordle Colors Work | Green Yellow Gray",
    description:
      "Green locks a letter in place, yellow means present but wrong spot, gray removes a copy. Master the color rules before you trust any Wordle helper.",
    date: "2026-11-03",
    image: "/blog/how-wordle-colors-work.svg",
  },
  {
    slug: "wordle-hard-mode-guide",
    title: "Wordle Hard Mode Guide: Rules, Tradeoffs, and Finder Tips",
    metaTitle: "Wordle Hard Mode Guide | Rules & Tips",
    description:
      "Hard mode forces you to reuse greens and yellows. Learn how that kills scout guesses — and how a Wordle word finder still helps you finish.",
    date: "2026-11-02",
    image: "/blog/wordle-hard-mode-guide.svg",
  },
  {
    slug: "wordle-repeated-letters-explained",
    title: "Wordle Repeated Letters: Why a Letter Can Still Turn Gray",
    metaTitle: "Wordle Repeated Letters Explained",
    description:
      "Duplicate letters confuse most solvers. See why SPEED vs SPEND can show one yellow and one gray E — and how to filter correctly.",
    date: "2026-11-01",
    image: "/blog/wordle-repeated-letters.svg",
  },
  {
    slug: "wordle-second-guess-strategy",
    title: "Best Wordle Second Guess Strategy: Scout Before You Commit",
    metaTitle: "Wordle Second Guess Strategy | Scout Words",
    description:
      "Guess two should test fresh letters, not just chase early greens. Learn scout-word thinking and when to switch to committing answers.",
    date: "2026-10-30",
    image: "/blog/wordle-second-guess-strategy.svg",
  },
] as const;

export const HOME_FAQS = [
  {
    q: "What is a Wordle word finder?",
    a: "A Wordle word finder (also called a Wordle solver or helper) filters five-letter words using the green, yellow, and gray clues from your guesses. It shows every candidate that still fits so you can pick a smarter next word.",
  },
  {
    q: "How do I use this Wordle solver?",
    a: "Type green letters in their exact positions, add yellow letters (present but wrong spot), and list gray letters that are absent. Matching words update instantly in your browser — nothing is sent to a server.",
  },
  {
    q: "Is using a Wordle helper cheating?",
    a: "That’s a personal call. Some players only open a finder when they’re one guess from losing; others use it to learn high-value words. The official game does not track helpers. If it keeps the puzzle fun, you’re fine.",
  },
  {
    q: "What’s the best Wordle starting word?",
    a: "Strong openers use five distinct, high-frequency letters. IRATE, LATER, SLATE, CRANE, TRACE, and SOARE are common data-backed picks. Pick one and stick with it so your muscle memory stays consistent.",
  },
  {
    q: "Does this show today’s Wordle answer?",
    a: "No. We never leak the daily answer. The tool only narrows options from the clues you enter, so you still choose the next guess yourself.",
  },
  {
    q: "What’s the difference between common words and all valid guesses?",
    a: "Common words are everyday answers you’re most likely to see. The full list also includes rarer accepted guesses — useful as scout words that burn obscure letters even if they’re unlikely answers.",
  },
  {
    q: "How do yellow letters work in this finder?",
    a: "Yellow means the letter is in the word but not in the position you tried. Our finder requires the letter somewhere and excludes the ruled-out slots — the same constraint that separates a 30-word list from a 4-word list.",
  },
  {
    q: "Why can a letter be both colored and gray?",
    a: "With repeats, Wordle awards greens first, then yellows, and never more colored tiles than the answer contains. An extra copy can turn gray even when the letter is still in the word. See our repeated-letters guide.",
  },
  {
    q: "Does Wordle hard mode change how the finder works?",
    a: "The filtering rules are the same. Hard mode only restricts which guesses the official game accepts next. In hard mode, lean on remaining candidates instead of pure scout words.",
  },
  {
    q: "Is Wordle Word Finder free?",
    a: "Yes. The finder on wordlewordfinder.net is free, runs locally in your browser, and does not require an account or email gate.",
  },
] as const;
