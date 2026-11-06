import { ALL_WORDS, COMMON_WORDS } from "@/data/words";

export type TileColor = "green" | "yellow" | "gray" | "empty";

export type FinderClues = {
  /** Exact green letters by position (null = unknown) */
  greens: (string | null)[];
  /** Yellow: letter present but forbidden in these positions */
  yellows: { letter: string; notPositions: number[] }[];
  /** Letters known absent (when no protected green/yellow copy) */
  grays: string[];
};

export function letterFrequency(words: string[]): { letter: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const word of words) {
    const seen = new Set<string>();
    for (const ch of word) {
      if (seen.has(ch)) continue;
      seen.add(ch);
      counts.set(ch, (counts.get(ch) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([letter, count]) => ({ letter, count }))
    .sort((a, b) => b.count - a.count || a.letter.localeCompare(b.letter));
}

export function filterWords(clues: FinderClues, commonOnly: boolean): string[] {
  const pool = commonOnly ? COMMON_WORDS : ALL_WORDS;
  const greens = clues.greens.map((g) => (g ? g.toLowerCase() : null));
  const yellows = clues.yellows
    .filter((y) => y.letter)
    .map((y) => ({
      letter: y.letter.toLowerCase(),
      notPositions: y.notPositions,
    }));
  const protectedLetters = new Set<string>([
    ...greens.filter(Boolean) as string[],
    ...yellows.map((y) => y.letter),
  ]);
  const grays = clues.grays
    .map((g) => g.toLowerCase())
    .filter((g) => g && !protectedLetters.has(g));

  return pool.filter((word) => {
    for (let i = 0; i < 5; i++) {
      const g = greens[i];
      if (g && word[i] !== g) return false;
    }

    for (const y of yellows) {
      if (!word.includes(y.letter)) return false;
      for (const pos of y.notPositions) {
        if (word[pos] === y.letter) return false;
      }
    }

    for (const g of grays) {
      if (word.includes(g)) return false;
    }

    // Required minimum counts from greens + yellows of same letter
    const required = new Map<string, number>();
    for (const g of greens) {
      if (!g) continue;
      required.set(g, (required.get(g) ?? 0) + 1);
    }
    for (const y of yellows) {
      // yellow adds presence; if already counted via green, still need at least that many
      required.set(y.letter, Math.max(required.get(y.letter) ?? 0, 1));
    }
    for (const [letter, min] of required) {
      let count = 0;
      for (const ch of word) if (ch === letter) count++;
      if (count < min) return false;
    }

    return true;
  });
}

export function scoreByUniqueCoverage(word: string, freq: Map<string, number>): number {
  let score = 0;
  const seen = new Set<string>();
  for (const ch of word) {
    if (seen.has(ch)) continue;
    seen.add(ch);
    score += freq.get(ch) ?? 0;
  }
  return score;
}

export function sortCandidates(words: string[]): string[] {
  const freqList = letterFrequency(words);
  const freq = new Map(freqList.map((f) => [f.letter, f.count]));
  return [...words].sort((a, b) => {
    const sa = scoreByUniqueCoverage(a, freq);
    const sb = scoreByUniqueCoverage(b, freq);
    if (sb !== sa) return sb - sa;
    return a.localeCompare(b);
  });
}

export const STARTER_WORDS = [
  "irate",
  "later",
  "slate",
  "crane",
  "trace",
  "soare",
  "arise",
  "stare",
  "roast",
  "audio",
] as const;

export type HintResult = {
  mode: "opener" | "scout" | "commit";
  title: string;
  tip: string;
  suggestions: string[];
  hotLetters: string[];
};

function knownLetters(clues: FinderClues): Set<string> {
  const set = new Set<string>();
  for (const g of clues.greens) if (g) set.add(g.toLowerCase());
  for (const y of clues.yellows) if (y.letter) set.add(y.letter.toLowerCase());
  for (const g of clues.grays) if (g) set.add(g.toLowerCase());
  return set;
}

/** Score a word by how many still-unknown hot letters it tests. */
function scoutScore(
  word: string,
  hot: Map<string, number>,
  known: Set<string>
): number {
  let score = 0;
  const seen = new Set<string>();
  for (const ch of word) {
    if (seen.has(ch) || known.has(ch)) continue;
    seen.add(ch);
    score += (hot.get(ch) ?? 0) + 1;
  }
  return score;
}

/**
 * Build a Hint: opener / scout / commit suggestions from current clue state.
 */
export function buildHint(clues: FinderClues, commonOnly: boolean): HintResult {
  const matches = sortCandidates(filterWords(clues, commonOnly));
  const freq = letterFrequency(matches);
  const hotMap = new Map(freq.map((f) => [f.letter, f.count]));
  const hotLetters = freq.slice(0, 5).map((f) => f.letter.toUpperCase());
  const known = knownLetters(clues);
  const hasClues =
    clues.greens.some(Boolean) ||
    clues.yellows.some((y) => y.letter) ||
    clues.grays.some(Boolean);

  if (!hasClues || matches.length > 800) {
    return {
      mode: "opener",
      title: "Try a strong opener",
      tip: "Start with five distinct high-frequency letters. IRATE, SLATE, and CRANE are solid everyday openers.",
      suggestions: [...STARTER_WORDS.slice(0, 5)],
      hotLetters: ["E", "A", "R", "O", "T"],
    };
  }

  if (matches.length <= 12) {
    return {
      mode: "commit",
      title: "Commit to a likely answer",
      tip:
        matches.length === 1
          ? "Only one word still fits your clues — play it."
          : `Only ${matches.length} words remain. Pick the most common-looking candidate and go for the win.`,
      suggestions: matches.slice(0, 5),
      hotLetters,
    };
  }

  // Scout: prefer words that test unknown hot letters (from full guess list for coverage)
  const pool = commonOnly ? [...COMMON_WORDS, ...ALL_WORDS.slice(0, 4000)] : ALL_WORDS;
  const scored = pool
    .map((word) => ({ word, score: scoutScore(word, hotMap, known) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.word.localeCompare(b.word));

  const suggestions = [
    ...new Set([
      ...scored.slice(0, 4).map((s) => s.word),
      ...matches.slice(0, 2),
    ]),
  ].slice(0, 5);

  return {
    mode: "scout",
    title: "Scout with new letters",
    tip: `About ${matches.length.toLocaleString()} words still fit. Use a scout guess that tests hot letters (${hotLetters.slice(0, 4).join(", ") || "common vowels"}) instead of forcing early greens.`,
    suggestions,
    hotLetters,
  };
}
