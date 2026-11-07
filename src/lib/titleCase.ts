export type CaseMode =
  | "title-ama"
  | "title-ap"
  | "title-apa"
  | "title-bluebook"
  | "title-chicago"
  | "title-mla"
  | "title-nyt"
  | "title-wikipedia"
  | "sentence"
  | "upper"
  | "lower";

export type WordDecision = {
  original: string;
  result: string;
  reason: string;
  changed: boolean;
};

export type ConvertOptions = {
  keepAllCaps?: boolean;
  multiLine?: boolean;
  straightQuotes?: boolean;
};

export type ConvertResult = {
  text: string;
  words: WordDecision[];
};

const ARTICLES = new Set(["a", "an", "the"]);
const COORD_CONJ = new Set(["and", "but", "or", "nor", "for", "yet", "so"]);
const SHORT_PREPS_3 = new Set([
  "as",
  "at",
  "by",
  "for",
  "in",
  "of",
  "off",
  "on",
  "per",
  "to",
  "up",
  "via",
]);
const PREPS_4_OR_LESS = new Set([
  ...SHORT_PREPS_3,
  "from",
  "into",
  "onto",
  "over",
  "with",
  "upon",
  "like",
  "near",
  "plus",
  "than",
  "amid",
  "amidst",
  "among",
  "down",
  "past",
  "thru",
  "till",
  "unto",
]);
const ALL_PREPS = new Set([
  ...PREPS_4_OR_LESS,
  "about",
  "above",
  "across",
  "after",
  "against",
  "along",
  "around",
  "before",
  "behind",
  "below",
  "beneath",
  "beside",
  "besides",
  "between",
  "beyond",
  "during",
  "except",
  "inside",
  "outside",
  "through",
  "toward",
  "towards",
  "under",
  "until",
  "without",
  "within",
  "amongst",
  "concerning",
  "despite",
  "excepting",
  "excluding",
  "following",
  "including",
  "regarding",
  "since",
  "throughout",
  "underneath",
  "unlike",
  "versus",
  "vs",
]);

/** NYT lowercases a curated set of short prepositions */
const NYT_LOWER_PREPS = new Set(["at", "by", "in", "of", "on", "to", "up", "for", "as"]);

const PROPER_NOUNS = new Set([
  "africa",
  "america",
  "american",
  "asia",
  "atlantic",
  "australia",
  "berlin",
  "britain",
  "british",
  "california",
  "canada",
  "canadian",
  "china",
  "chinese",
  "christmas",
  "earth",
  "english",
  "europe",
  "european",
  "france",
  "french",
  "germany",
  "german",
  "google",
  "india",
  "indian",
  "internet",
  "ireland",
  "italian",
  "italy",
  "japan",
  "japanese",
  "london",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
  "microsoft",
  "new",
  "york",
  "pacific",
  "paris",
  "rome",
  "russia",
  "russian",
  "spain",
  "spanish",
  "tokyo",
  "united",
  "states",
  "washington",
]);

const ACRONYMS = new Set([
  "ai",
  "api",
  "ama",
  "apa",
  "css",
  "csv",
  "faq",
  "html",
  "http",
  "https",
  "id",
  "ios",
  "ip",
  "json",
  "mla",
  "pdf",
  "pr",
  "qr",
  "rss",
  "seo",
  "sms",
  "sql",
  "tv",
  "ui",
  "url",
  "usa",
  "usb",
  "ux",
  "vpn",
  "wifi",
  "xml",
  "ok",
  "ceo",
  "cfo",
  "cto",
  "hr",
  "nyc",
  "la",
  "uk",
  "eu",
  "un",
  "nasa",
  "fbi",
  "cia",
  "nato",
  "nyt",
  "gps",
  "cpu",
  "gpu",
  "hdmi",
  "led",
  "rfid",
  "uv",
]);

export const STYLE_HELP: Record<CaseMode, string> = {
  "title-ama": "Medical / scientific journals — lowercase short prepositions (≤3 letters).",
  "title-ap": "News & marketing — capitalize words of 4+ letters, including longer prepositions.",
  "title-apa": "Social sciences — capitalize major words and any word of 4+ letters.",
  "title-bluebook": "Legal writing — lowercase prepositions of 4 letters or fewer.",
  "title-chicago": "Books & business — lowercase most prepositions of 4 letters or fewer.",
  "title-mla": "Humanities — lowercase all prepositions regardless of length.",
  "title-nyt": "New York Times — curated short-preposition exceptions.",
  "title-wikipedia": "Wikipedia style — lowercase prepositions of 4 letters or fewer.",
  sentence: "Capitalize the first word and known proper nouns; lowercase the rest.",
  upper: "Convert every letter to UPPERCASE.",
  lower: "Convert every letter to lowercase.",
};

function stripEdgePunct(token: string): { lead: string; core: string; trail: string } {
  const match = token.match(/^([^\p{L}\p{N}]*)([\p{L}\p{N}'’.-]*?)([^\p{L}\p{N}]*)$/u);
  if (!match) return { lead: "", core: token, trail: "" };
  return { lead: match[1], core: match[2], trail: match[3] };
}

function capitalizeWord(word: string): string {
  if (!word) return word;
  if (word.includes("-")) {
    return word
      .split("-")
      .map((part) => capitalizeWord(part))
      .join("-");
  }
  if (word.includes("'") || word.includes("’")) {
    const sep = word.includes("'") ? "'" : "’";
    const parts = word.split(sep);
    return parts
      .map((p, i) => (i === 0 ? capitalizeWord(p) : p.toLowerCase()))
      .join(sep);
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function isPrepositionMinor(word: string, mode: CaseMode): boolean {
  const w = word.toLowerCase();
  switch (mode) {
    case "title-mla":
      return ALL_PREPS.has(w);
    case "title-chicago":
    case "title-bluebook":
    case "title-wikipedia":
      return PREPS_4_OR_LESS.has(w);
    case "title-nyt":
      return NYT_LOWER_PREPS.has(w);
    case "title-ama":
    case "title-ap":
    case "title-apa":
    default:
      return SHORT_PREPS_3.has(w);
  }
}

function isMinorWord(word: string, mode: CaseMode): boolean {
  const w = word.toLowerCase();
  if (ARTICLES.has(w)) return true;
  if (COORD_CONJ.has(w)) {
    // Chicago capitalizes yet & so
    if (mode === "title-chicago" && (w === "yet" || w === "so")) return false;
    // NYT capitalizes nor, yet, so
    if (mode === "title-nyt" && (w === "nor" || w === "yet" || w === "so")) return false;
    return true;
  }
  return isPrepositionMinor(word, mode);
}

function forcesLastWord(mode: CaseMode): boolean {
  return (
    mode === "title-ap" ||
    mode === "title-chicago" ||
    mode === "title-mla" ||
    mode === "title-nyt" ||
    mode === "title-wikipedia"
  );
}

function applyQuotes(text: string, straightQuotes: boolean): string {
  if (straightQuotes) {
    return text
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'");
  }
  // Smart quotes for paired quotes (simple pass)
  let out = "";
  let doubleOpen = true;
  let singleOpen = true;
  for (const ch of text) {
    if (ch === '"') {
      out += doubleOpen ? "“" : "”";
      doubleOpen = !doubleOpen;
    } else if (ch === "'") {
      out += singleOpen ? "‘" : "’";
      singleOpen = !singleOpen;
    } else {
      out += ch;
    }
  }
  return out;
}

type TokenDecision = {
  text: string;
  decision?: WordDecision;
};

function decideToken(
  token: string,
  index: number,
  total: number,
  mode: CaseMode,
  keepAllCaps: boolean,
  afterColon = false
): TokenDecision {
  const { lead, core, trail } = stripEdgePunct(token);
  if (!core) return { text: token };

  const originalCore = core;

  // Upper / lower always transform — Keep All Caps only applies to title case (and sentence).
  if (mode === "upper") {
    const result = core.toUpperCase();
    return {
      text: lead + result + trail,
      decision: {
        original: originalCore,
        result,
        reason: "UPPERCASE mode",
        changed: originalCore !== result,
      },
    };
  }

  if (mode === "lower") {
    const result = core.toLowerCase();
    return {
      text: lead + result + trail,
      decision: {
        original: originalCore,
        result,
        reason: "lowercase mode",
        changed: originalCore !== result,
      },
    };
  }

  const isTitleMode = mode.startsWith("title-");
  if (
    isTitleMode &&
    keepAllCaps &&
    core === core.toUpperCase() &&
    /[A-Z]/.test(core) &&
    core.length > 1
  ) {
    return {
      text: lead + core + trail,
      decision: {
        original: originalCore,
        result: core,
        reason: "Kept in ALL CAPS (option enabled)",
        changed: false,
      },
    };
  }

  const lower = core.toLowerCase();
  const acronymKey = lower.replace(/\./g, "");
  if (ACRONYMS.has(acronymKey)) {
    const result = acronymKey.toUpperCase();
    return {
      text: lead + result + trail,
      decision: {
        original: originalCore,
        result,
        reason: "Recognized acronym",
        changed: originalCore !== result,
      },
    };
  }

  if (mode === "sentence") {
    if (index === 0 || afterColon) {
      const result = capitalizeWord(core);
      return {
        text: lead + result + trail,
        decision: {
          original: originalCore,
          result,
          reason: afterColon ? "First word after colon" : "First word of sentence case",
          changed: originalCore !== result,
        },
      };
    }
    if (PROPER_NOUNS.has(lower)) {
      const result = capitalizeWord(core);
      return {
        text: lead + result + trail,
        decision: {
          original: originalCore,
          result,
          reason: "Proper noun recognition",
          changed: originalCore !== result,
        },
      };
    }
    const result = core.toLowerCase();
    return {
      text: lead + result + trail,
      decision: {
        original: originalCore,
        result,
        reason: "Minor word in sentence case",
        changed: originalCore !== result,
      },
    };
  }

  const isFirst = index === 0;
  const isLast = index === total - 1;
  const forceLast = isLast && forcesLastWord(mode);
  const minor = isMinorWord(core, mode);

  if (isFirst || afterColon || forceLast || !minor) {
    const result = capitalizeWord(core);
    let reason = "Major word";
    if (isFirst) reason = "First word of title";
    else if (afterColon) reason = "First word after colon";
    else if (forceLast) reason = "Last word of title";
    else if (ARTICLES.has(lower) || COORD_CONJ.has(lower) || ALL_PREPS.has(lower)) {
      reason = "Capitalized per selected style guide";
    }
    return {
      text: lead + result + trail,
      decision: {
        original: originalCore,
        result,
        reason,
        changed: originalCore !== result,
      },
    };
  }

  const result = core.toLowerCase();
  let reason = "Minor word (article / conjunction / preposition)";
  if (ARTICLES.has(lower)) reason = "Article — left lowercase";
  else if (COORD_CONJ.has(lower)) reason = "Coordinating conjunction — left lowercase";
  else if (ALL_PREPS.has(lower)) reason = "Preposition — left lowercase in this style";

  return {
    text: lead + result + trail,
    decision: {
      original: originalCore,
      result,
      reason,
      changed: originalCore !== result,
    },
  };
}

function convertLineDetailed(
  line: string,
  mode: CaseMode,
  keepAllCaps: boolean
): { text: string; words: WordDecision[] } {
  if (!line.trim()) return { text: line, words: [] };
  const tokens = line.split(/(\s+)/);
  const wordTokens = tokens.filter((t) => !/^\s+$/.test(t) && t.length > 0);
  const words: WordDecision[] = [];
  let wordIndex = 0;
  let afterColon = false;

  const text = tokens
    .map((token) => {
      if (/^\s+$/.test(token) || token.length === 0) return token;
      const { text: out, decision } = decideToken(
        token,
        wordIndex,
        wordTokens.length,
        mode,
        keepAllCaps,
        afterColon
      );
      wordIndex += 1;
      if (decision) words.push(decision);
      // Next word starts a subtitle when this token ends with a colon (possibly after punctuation).
      afterColon = /:\s*$/.test(token) || /:$/.test(out);
      return out;
    })
    .join("");

  return { text, words };
}

export function convertCaseDetailed(
  text: string,
  mode: CaseMode,
  options: ConvertOptions = {}
): ConvertResult {
  const keepAllCaps = options.keepAllCaps ?? true;
  const multiLine = options.multiLine ?? true;
  const straightQuotes = options.straightQuotes ?? false;

  let source = text;
  if (!multiLine) {
    source = text.replace(/\r?\n+/g, " ").replace(/\s+/g, " ").trim();
  }

  const lines = source.split(/\r?\n/);
  const words: WordDecision[] = [];
  const converted = lines
    .map((line) => {
      const part = convertLineDetailed(line, mode, keepAllCaps);
      words.push(...part.words);
      return part.text;
    })
    .join("\n");

  return {
    text: applyQuotes(converted, straightQuotes),
    words,
  };
}

export function convertCase(
  text: string,
  mode: CaseMode,
  options: ConvertOptions = {}
): string {
  return convertCaseDetailed(text, mode, options).text;
}

/** Highlight letters that changed capitalization vs the original input (aligned by whitespace tokens). */
export function highlightDiff(original: string, converted: string): {
  before: string;
  afterParts: { text: string; highlight: boolean }[];
} {
  const oTokens = original.split(/(\s+)/);
  const cTokens = converted.split(/(\s+)/);
  const parts: { text: string; highlight: boolean }[] = [];
  const len = Math.max(oTokens.length, cTokens.length);

  for (let i = 0; i < len; i++) {
    const o = oTokens[i] ?? "";
    const c = cTokens[i] ?? "";
    if (/^\s+$/.test(c) || c.length === 0) {
      parts.push({ text: c, highlight: false });
      continue;
    }
    if (o.toLowerCase() === c.toLowerCase() && o !== c) {
      // letter-level highlight
      let chunk = "";
      for (let j = 0; j < c.length; j++) {
        const changed = o[j] !== c[j];
        if (j === 0) {
          chunk = c[j];
          parts.push({ text: chunk, highlight: changed });
          chunk = "";
        } else {
          const prevChanged = o[j - 1] !== c[j - 1];
          if (changed === prevChanged && parts.length) {
            parts[parts.length - 1].text += c[j];
          } else {
            parts.push({ text: c[j], highlight: changed });
          }
        }
      }
    } else {
      parts.push({ text: c, highlight: o !== c && !!o });
    }
  }

  return { before: original, afterParts: parts };
}

export function countStats(text: string) {
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split(/\r?\n/).length : 0;
  return { chars, charsNoSpaces, words, lines };
}

export const STYLE_OPTIONS: {
  id: CaseMode;
  label: string;
  group: "Title Case" | "Other";
}[] = [
  { id: "title-ama", label: "AMA", group: "Title Case" },
  { id: "title-ap", label: "AP", group: "Title Case" },
  { id: "title-apa", label: "APA", group: "Title Case" },
  { id: "title-bluebook", label: "Bluebook", group: "Title Case" },
  { id: "title-chicago", label: "Chicago", group: "Title Case" },
  { id: "title-mla", label: "MLA", group: "Title Case" },
  { id: "title-nyt", label: "NY Times", group: "Title Case" },
  { id: "title-wikipedia", label: "Wikipedia", group: "Title Case" },
  { id: "sentence", label: "Sentence case", group: "Other" },
  { id: "lower", label: "Lower case", group: "Other" },
  { id: "upper", label: "Upper case", group: "Other" },
];
