/** Central brand / domain config for Title Case Converter */
export const SITE_ORIGIN = "https://titlecaseconverter.tech";

export const BRAND = {
  name: "Title Case Converter",
  shortName: "TitleCase",
  keyword: "title case converter",
  domain: "titlecaseconverter.tech",
  email: "contact@titlecaseconverter.tech",
  twitter: "@titlecaseconv",
  tagline: "Free Title Capitalization Tool — 8 Style Guides",
  description:
    "Free title case converter for headlines, blog posts, and book titles. Convert with AMA, AP, APA, Bluebook, Chicago, MLA, NY Times, and Wikipedia — plus sentence case, options, and explanations.",
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
  logo: "/title-case-converter-logo.webp",
  heroLogo: "/title-case-converter-hero-logo.webp",
  icon: "/title-case-converter-Fav-icon.webp",
  favicon: "/favicon.ico",
  brandLogo: "/title-case-converter-logo.webp",
  banner: "/title-case-converter-brand.webp",
  headerLogo: "/title-case-converter-logo.webp",
  headerLogoLight: "/title-case-converter-logo.webp",
  og: "/feature/og-image-1200x630.webp",
  ogSquare: "/title-case-converter-logo.webp",
  twitter: "/feature/twitter-card-1200x600.webp",
  website: "/title-case-converter-capitalization.webp",
  tool: "/title-case-converter-fast.webp",
  heroAlt: "/title-case-converter-search.webp",
  features: "/title-case-converter-accuracy.webp",
  howItWorks: "/title-case-converter-one-click.webp",
  benefits: "/title-case-converter-fast.webp",
  whoCanUse: "/title-case-converter-search.webp",
  vsSentence: "/title-case-converter-capitalization.webp",
  showcase: "/title-case-converter-one-click.webp",
  accuracy: "/title-case-converter-accuracy.webp",
  capitalization: "/title-case-converter-capitalization.webp",
  fast: "/title-case-converter-fast.webp",
  oneClick: "/title-case-converter-one-click.webp",
  search: "/title-case-converter-search.webp",
} as const;

/** Intrinsic pixel sizes — boxes size to the image, not a forced aspect ratio */
export const IMAGE_DIMS: Record<string, { width: number; height: number }> = {
  [IMAGES.logo]: { width: 146, height: 156 },
  [IMAGES.heroLogo]: { width: 442, height: 442 },
  [IMAGES.icon]: { width: 512, height: 512 },
  [IMAGES.banner]: { width: 716, height: 218 },
  [IMAGES.accuracy]: { width: 716, height: 216 },
  [IMAGES.capitalization]: { width: 724, height: 268 },
  [IMAGES.fast]: { width: 716, height: 268 },
  [IMAGES.oneClick]: { width: 724, height: 224 },
  [IMAGES.search]: { width: 718, height: 212 },
};

export function imageDims(src: string, fallback = { width: 728, height: 272 }) {
  return IMAGE_DIMS[src] ?? fallback;
}

/**
 * SERP-validated blogs only (competitor titlecaseconverter.com + query research):
 * rules, words-to-capitalize, sentence case, title vs sentence, what is title case,
 * how to use converter, APA/Chicago/AP/MLA comparison.
 */
export const ARTICLES = [
  {
    slug: "title-capitalization-rules",
    title: "Title Capitalization Rules: APA, Chicago, AP & MLA Compared",
    metaTitle: "Title Capitalization Rules | APA Chicago AP MLA",
    description:
      "Compare AMA, AP, APA, Bluebook, Chicago, MLA, NY Times, and Wikipedia title case — prepositions, FANBOYS, last-word rules, and more.",
    date: "2026-11-08",
    image: IMAGES.capitalization,
  },
  {
    slug: "words-to-capitalize-in-a-title",
    title: "Words to Capitalize in a Title (and Which to Leave Lowercase)",
    metaTitle: "Words to Capitalize in a Title | Major vs Minor",
    description:
      "Know which nouns, verbs, and short words get capitals — and when on, in, up, or by must be capitalized by context.",
    date: "2026-11-07",
    image: IMAGES.accuracy,
  },
  {
    slug: "title-case-vs-sentence-case",
    title: "Title Case vs Sentence Case: What’s the Difference?",
    metaTitle: "Title Case vs Sentence Case | Clear Examples",
    description:
      "Learn when to use title case vs sentence case for headlines, headings, and SEO titles — with style-guide examples and a free converter.",
    date: "2026-11-06",
    image: IMAGES.vsSentence,
  },
  {
    slug: "what-is-title-case",
    title: "What Is Title Case? Definition, Examples & Rules",
    metaTitle: "What Is Title Case? | Definition & Examples",
    description:
      "Title case (headline style) capitalizes major words in titles. See plain-English rules, edge-case examples, and how converters apply style guides.",
    date: "2026-11-05",
    image: IMAGES.search,
  },
  {
    slug: "how-to-use-a-title-case-converter",
    title: "How to Use a Title Case Converter (Step by Step)",
    metaTitle: "How to Use a Title Case Converter | Quick Guide",
    description:
      "Paste a headline, pick a style guide, use Convert/Clear and pro options, then copy perfect title case in seconds.",
    date: "2026-11-04",
    image: IMAGES.oneClick,
  },
  {
    slug: "sentence-case-converter",
    title: "Sentence Case Converter: What It Is and When to Use It",
    metaTitle: "Sentence Case Converter | Proper Nouns & Titles",
    description:
      "Convert headlines to sentence case with proper-noun awareness. Learn the difference from title case and when quieter capitalization wins.",
    date: "2026-11-03",
    image: IMAGES.fast,
  },
  {
    slug: "apa-chicago-ap-mla-title-case",
    title: "APA vs Chicago vs AP vs MLA Title Case: Which Style Wins?",
    metaTitle: "APA vs Chicago vs AP vs MLA Title Case",
    description:
      "Side-by-side title case differences for prepositions, conjunctions, and last words — plus when academics, newsrooms, and publishers pick each guide.",
    date: "2026-11-02",
    image: IMAGES.features,
  },
] as const;

export const HOME_FAQS = [
  {
    q: "What is title case?",
    a: "Title case (headline style) capitalizes major words in titles of books, films, songs, essays, and many headlines, while articles, short conjunctions, and short prepositions usually stay lowercase mid-title.",
  },
  {
    q: "What is a title case converter?",
    a: "A title case converter applies style-guide capitalization rules to headlines automatically — including context for words like on, in, or by that are only sometimes prepositions.",
  },
  {
    q: "Which style guides does this tool support?",
    a: "TitleCaseConverter.tech supports AMA, AP, APA, Bluebook, Chicago, MLA, NY Times, and Wikipedia title case, plus sentence case, upper case, and lower case.",
  },
  {
    q: "What is the difference between title case and sentence case?",
    a: "Title case capitalizes major words (The Lord of the Rings). Sentence case capitalizes only the first word and proper nouns (The lord of the rings).",
  },
  {
    q: "Which words stay lowercase in title case?",
    a: "Articles (a, an, the), many coordinating conjunctions (and, but, or), and short prepositions (of, in, on, to) usually stay lowercase mid-title — unless the word is acting as an adverb or adjective, or a style guide capitalizes longer prepositions.",
  },
  {
    q: "How do APA and Chicago title case differ?",
    a: "APA (and AP/AMA) typically capitalize prepositions of four or more letters (With, From, About). Chicago, Bluebook, and Wikipedia lowercase more four-letter prepositions; MLA lowercases all prepositions. Chicago also capitalizes yet and so.",
  },
  {
    q: "What do the converter options do?",
    a: "Keep Words in All Caps preserves pasted ALL CAPS in title modes. Multi-line batches titles. Show Explanations and Highlight Changes help you review. Straight Quotes and Convert When Text Is Pasted control punctuation and paste workflow.",
  },
  {
    q: "Does the converter work for SEO page titles?",
    a: "Yes. Paste your meta title, convert, and check the live character count. Aim for roughly 50–60 characters so Google is less likely to truncate your SERP title.",
  },
  {
    q: "Can I convert multiple titles at once?",
    a: "Yes. Enable multi-line input, paste one title per line, and convert the list in one style. Each line is capitalized independently.",
  },
  {
    q: "Is Title Case Converter free and private?",
    a: "Yes. The tool is free, runs in your browser, needs no account, and does not upload your headlines for conversion.",
  },
] as const;
