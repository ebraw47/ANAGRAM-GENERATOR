/** Central brand / domain config for Anagram Generator */
export const SITE_ORIGIN = "https://anagramgenerator.tech";

export const BRAND = {
  name: "Anagram Generator",
  shortName: "Anagram",
  keyword: "anagram generator",
  domain: "anagramgenerator.tech",
  email: "contact@anagramgenerator.tech",
  twitter: "@anagramgen",
  tagline: "Free Anagram Generator & Solver — Words & Phrases",
  description:
    "Free anagram generator and solver in 6 languages. Rearrange words, names, and phrases into dictionary anagrams with voice playback, wildcards, and multi-word mode — private in your browser.",
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
  logo: "/anagram-generator-logo.webp",
  heroLogo: "/anagram-generator-hero-logo.webp",
  icon: "/anagram-generator-favicon.webp",
  favicon: "/favicon.ico",
  brandLogo: "/anagram-generator-logo.webp",
  banner: "/anagram-generator-brand.webp",
  headerLogo: "/anagram-generator-logo.webp",
  headerLogoLight: "/anagram-generator-logo.webp",
  og: "/feature/og-image-1200x630.webp",
  ogSquare: "/anagram-generator-logo.webp",
  twitter: "/feature/twitter-card-1200x600.webp",
  website: "/anagram-generator-unscramble.webp",
  tool: "/anagram-generator-fast.webp",
  heroAlt: "/anagram-generator-search.webp",
  features: "/anagram-generator-accuracy.webp",
  howItWorks: "/anagram-generator-one-click.webp",
  benefits: "/anagram-generator-fast.webp",
  whoCanUse: "/anagram-generator-search.webp",
  vsSentence: "/anagram-generator-unscramble.webp",
  showcase: "/anagram-generator-one-click.webp",
  accuracy: "/anagram-generator-accuracy.webp",
  capitalization: "/anagram-generator-unscramble.webp",
  fast: "/anagram-generator-fast.webp",
  oneClick: "/anagram-generator-one-click.webp",
  search: "/anagram-generator-search.webp",
} as const;

/** Intrinsic pixel sizes — boxes size to the image, not a forced aspect ratio */
export const IMAGE_DIMS: Record<string, { width: number; height: number }> = {
  [IMAGES.logo]: { width: 512, height: 512 },
  [IMAGES.heroLogo]: { width: 442, height: 442 },
  [IMAGES.icon]: { width: 512, height: 512 },
  [IMAGES.banner]: { width: 716, height: 218 },
  [IMAGES.accuracy]: { width: 716, height: 216 },
  [IMAGES.capitalization]: { width: 724, height: 268 },
  [IMAGES.fast]: { width: 716, height: 268 },
  [IMAGES.oneClick]: { width: 724, height: 224 },
  [IMAGES.search]: { width: 718, height: 212 },
  "/blog/what-is-an-anagram.webp": { width: 800, height: 420 },
  "/blog/how-to-use-an-anagram-generator.webp": { width: 800, height: 420 },
  "/blog/famous-anagram-examples.webp": { width: 800, height: 420 },
  "/blog/how-to-solve-anagrams.webp": { width: 800, height: 420 },
  "/blog/anagram-vs-word-unscrambler.webp": { width: 800, height: 420 },
  "/blog/multi-word-anagrams.webp": { width: 800, height: 420 },
  "/blog/anagram-of-a-name.webp": { width: 800, height: 420 },
};

export function imageDims(src: string, fallback = { width: 800, height: 420 }) {
  return IMAGE_DIMS[src] ?? fallback;
}

/**
 * SERP-validated blogs only (word.tips + anagramsgenerator.com + dcode + solvers):
 * definition, how-to, famous examples, solve tips, vs unscrambler, multi-word, name anagrams.
 */
export const ARTICLES = [
  {
    slug: "what-is-an-anagram",
    title: "What Is an Anagram? Definition, Meaning & Simple Examples",
    metaTitle: "What Is an Anagram? | Definition & Examples",
    description:
      "An anagram rearranges every letter of a word or phrase into something new. See clear definitions, classic examples, and how generators find them.",
    date: "2026-11-09",
    image: "/blog/what-is-an-anagram.webp",
  },
  {
    slug: "how-to-use-an-anagram-generator",
    title: "How to Use an Anagram Generator (Step by Step)",
    metaTitle: "How to Use an Anagram Generator | Quick Guide",
    description:
      "Paste letters, pick a language, choose exact / subset / multi-word mode, hear results aloud, and copy dictionary anagrams in seconds.",
    date: "2026-11-08",
    image: "/blog/how-to-use-an-anagram-generator.webp",
  },
  {
    slug: "famous-anagram-examples",
    title: "Famous Anagram Examples: Words, Phrases & Names",
    metaTitle: "Famous Anagram Examples | Words & Phrases",
    description:
      "Classic anagrams from listen → silent to dormitory → dirty room, plus famous name rearrangements and why they stick.",
    date: "2026-11-07",
    image: "/blog/famous-anagram-examples.webp",
  },
  {
    slug: "how-to-solve-anagrams",
    title: "How to Solve Anagrams: Practical Tips That Actually Work",
    metaTitle: "How to Solve Anagrams | Proven Tips",
    description:
      "Alphabetize letters, spot prefixes and suffixes, anchor rare tiles, and use a free generator when you are stuck.",
    date: "2026-11-06",
    image: "/blog/how-to-solve-anagrams.webp",
  },
  {
    slug: "anagram-vs-word-unscrambler",
    title: "Anagram Generator vs Word Unscrambler: What’s the Difference?",
    metaTitle: "Anagram vs Word Unscrambler | Clear Compare",
    description:
      "Exact anagrams use every letter once. Unscramblers also list shorter words from your tiles — learn when to use each mode.",
    date: "2026-11-05",
    image: "/blog/anagram-vs-word-unscrambler.webp",
  },
  {
    slug: "multi-word-anagrams",
    title: "Multi-Word Anagrams: How Phrase Anagrams Work",
    metaTitle: "Multi-Word Anagrams | Phrase Solver Guide",
    description:
      "Turn dormitory into dirty room and schoolmaster into the classroom. Learn phrase anagrams and how to filter for readable results.",
    date: "2026-11-04",
    image: "/blog/multi-word-anagrams.webp",
  },
  {
    slug: "anagram-of-a-name",
    title: "Anagram of a Name: Find Clever Name Anagrams Free",
    metaTitle: "Anagram of a Name | Free Name Anagram Tool",
    description:
      "Rearrange the letters in a name into funny or meaningful phrases. Tips for longer names, min length filters, and privacy.",
    date: "2026-11-03",
    image: "/blog/anagram-of-a-name.webp",
  },
] as const;

export const HOME_FAQS = [
  {
    q: "What is an anagram?",
    a: "An anagram rearranges all the letters of a word or phrase to spell something new, using every letter exactly once. LISTEN and SILENT are anagrams of each other.",
  },
  {
    q: "What is an anagram generator?",
    a: "An anagram generator (also called an anagram maker, finder, or solver) takes your letters and finds valid dictionary words and phrases by rearranging them — no pen-and-paper guessing required.",
  },
  {
    q: "What is the difference between exact anagrams and subset words?",
    a: "Exact mode lists words that use every letter you entered. Subset mode also lists shorter words you can spell from those letters — useful for Scrabble racks, jumbles, and Wordle-style practice.",
  },
  {
    q: "Can this tool make multi-word anagrams?",
    a: "Yes. Switch to multi-word mode to build phrases of two or three real words that together use every letter, like dormitory → dirty room.",
  },
  {
    q: "Can I find an anagram of a name or phrase?",
    a: "Yes. Paste a name or phrase — spaces and punctuation are ignored. Multi-word mode with a minimum word length of 3 or 4 usually gives the cleanest name anagrams.",
  },
  {
    q: "Does the generator support blank tiles or wildcards?",
    a: "Yes. Use ? for an unknown letter (blank tile). The solver tries valid letters in that spot against the dictionary.",
  },
  {
    q: "Is an anagram generator the same as a word unscrambler?",
    a: "They overlap. A word unscrambler finds words hidden in a jumble. An anagram generator does that too, and can narrow results to exact rearrangements that use every letter.",
  },
  {
    q: "Is using an anagram solver cheating?",
    a: "In a sanctioned tournament, any aid is against the rules. For casual games, crosswords, practice, teaching, and learning new words, it is a common study tool.",
  },
  {
    q: "How do I get better multi-word results?",
    a: "Raise the minimum word length, lower the max words (try 2 first), and use inputs of about 8–16 letters. Longer names work best with three-word mode and a min length of 3.",
  },
  {
    q: "Is Anagram Generator free and private?",
    a: "Yes. The tool is free, needs no account, and runs in your browser against bundled word lists — your letters are not uploaded for solving.",
  },
  {
    q: "Which languages does the anagram generator support?",
    a: "Six languages: English, Spanish, French, German, Italian, and Portuguese. Change Language in the tool to load that dictionary and switch the workspace labels.",
  },
  {
    q: "Can I hear the anagram words spoken aloud?",
    a: "Yes. Each result has a speak button that uses your browser’s voice for the selected language — useful for pronunciation and classroom practice.",
  },
] as const;
