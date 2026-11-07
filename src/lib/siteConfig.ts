/** Central brand / domain config for Title Case Converter */
export const SITE_ORIGIN = "https://titlecaseconverter.io";

export const BRAND = {
  name: "Title Case Converter",
  shortName: "TitleCase",
  keyword: "title case converter",
  domain: "titlecaseconverter.io",
  email: "contact@titlecaseconverter.io",
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
  logo: "/logo.webp",
  icon: "/favicon.png",
  favicon: "/favicon.ico",
  brandLogo: "/logo.webp",
  banner: "/title-case-converter-hero.webp",
  headerLogo: "/logo.webp",
  headerLogoLight: "/logo.webp",
  og: "/feature/og-image-1200x630.webp",
  ogSquare: "/feature/og-square-1200x1200.webp",
  twitter: "/feature/twitter-card-1200x600.webp",
  website: "/title-case-converter-hero.webp",
  tool: "/title-case-converter-features.webp",
  heroAlt: "/title-case-converter-1.webp",
  features: "/title-case-converter-features.webp",
  howItWorks: "/how-title-case-converter-works.webp",
  benefits: "/benefits-of-title-case-converter.webp",
  whoCanUse: "/who-can-use-title-case-converter.webp",
  vsSentence: "/title-case-vs-sentence-case.webp",
  showcase: "/title-case-converter-3.webp",
} as const;

/**
 * SERP-validated blog pillars only (competitor + query research):
 * title case converter, title case vs sentence case, capitalization rules
 * (APA/Chicago/AP/MLA), words to capitalize, how converter works, who uses it.
 */
export const ARTICLES = [
  {
    slug: "title-case-vs-sentence-case",
    title: "Title Case vs Sentence Case: What’s the Difference?",
    metaTitle: "Title Case vs Sentence Case | Clear Examples",
    description:
      "Learn when to use title case vs sentence case for headlines, headings, and SEO titles — with style-guide examples and a free converter.",
    date: "2026-11-07",
    image: "/title-case-vs-sentence-case.webp",
  },
  {
    slug: "title-capitalization-rules",
    title: "Title Capitalization Rules: APA, Chicago, AP & MLA Compared",
    metaTitle: "Title Capitalization Rules | APA Chicago AP MLA",
    description:
      "Compare AMA, AP, APA, Bluebook, Chicago, MLA, NY Times, and Wikipedia title case — prepositions, FANBOYS, last-word rules, and more.",
    date: "2026-11-06",
    image: "/title-case-converter-features.webp",
  },
  {
    slug: "how-to-use-a-title-case-converter",
    title: "How to Use a Title Case Converter (Step by Step)",
    metaTitle: "How to Use a Title Case Converter | Quick Guide",
    description:
      "Paste a headline, pick a style guide, use Convert/Clear and pro options, then copy perfect title case in seconds.",
    date: "2026-11-05",
    image: "/how-title-case-converter-works.webp",
  },
  {
    slug: "words-to-capitalize-in-a-title",
    title: "Words to Capitalize in a Title (and Which to Leave Lowercase)",
    metaTitle: "Words to Capitalize in a Title | Major vs Minor",
    description:
      "Know which nouns, verbs, and short words get capitals — and when on, in, up, or by must be capitalized by context.",
    date: "2026-11-04",
    image: "/title-case-converter-1.webp",
  },
  {
    slug: "benefits-of-title-case-converter",
    title: "Benefits of Using a Title Case Converter",
    metaTitle: "Benefits of a Title Case Converter",
    description:
      "Save time, stay consistent across style guides, and ship cleaner headlines for blogs, SEO titles, books, and marketing campaigns.",
    date: "2026-11-03",
    image: "/benefits-of-title-case-converter.webp",
  },
  {
    slug: "who-can-use-title-case-converter",
    title: "Who Can Use a Title Case Converter?",
    metaTitle: "Who Can Use a Title Case Converter",
    description:
      "Writers, students, marketers, editors, developers, and e-commerce teams — see how each role uses a free title capitalization tool.",
    date: "2026-11-02",
    image: "/who-can-use-title-case-converter.webp",
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
    a: "TitleCaseConverter.io supports AMA, AP, APA, Bluebook, Chicago, MLA, NY Times, and Wikipedia title case, plus sentence case, upper case, and lower case.",
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
