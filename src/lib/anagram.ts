/** Client-side anagram engine — frequency maps + optional multi-word search */

export type AnagramMode = "exact" | "subset" | "multi";

export type LangCode = "en" | "es" | "fr" | "de" | "it" | "pt";

export const LANGUAGES: readonly {
  code: LangCode;
  label: string;
  native: string;
}[] = [
  { code: "en", label: "English", native: "English" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "pt", label: "Portuguese", native: "Português" },
] as const;

export type AnagramOptions = {
  mode: AnagramMode;
  minLength: number;
  maxWords: 2 | 3;
  maxResults?: number;
};

export type AnagramHit = {
  word: string;
  length: number;
  score: number;
  exact: boolean;
};

export type AnagramResult = {
  hits: AnagramHit[];
  truncated: boolean;
  letterCount: number;
  wildcardCount: number;
};

const SCRABBLE: Record<string, number> = {
  a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1, j: 8, k: 5, l: 1, m: 3,
  n: 1, o: 1, p: 3, q: 10, r: 1, s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
};

/** Accents ignored for matching (café → cafe), same approach as top anagram tools */
export function stripAccents(raw: string): string {
  return raw.normalize("NFD").replace(/\p{M}/gu, "");
}

export function scrubInput(raw: string): { letters: string; wildcards: number } {
  const lower = stripAccents(raw.toLowerCase());
  let letters = "";
  let wildcards = 0;
  for (const ch of lower) {
    if (ch >= "a" && ch <= "z") letters += ch;
    else if (ch === "?" || ch === "*") wildcards += 1;
  }
  return { letters, wildcards: Math.min(wildcards, 2) };
}

export function letterCounts(letters: string): number[] {
  const counts = new Array(26).fill(0);
  for (const ch of letters) counts[ch.charCodeAt(0) - 97] += 1;
  return counts;
}

export function scrabbleScore(word: string): number {
  let n = 0;
  for (const ch of word) n += SCRABBLE[ch] ?? 0;
  return n;
}

function canSpell(word: string, pool: number[], wildcards: number): boolean {
  const need = new Array(26).fill(0);
  for (const ch of word) need[ch.charCodeAt(0) - 97] += 1;
  let missing = 0;
  for (let i = 0; i < 26; i++) {
    if (need[i] > pool[i]) missing += need[i] - pool[i];
  }
  return missing <= wildcards;
}

function subtractWord(pool: number[], word: string): number[] | null {
  const next = pool.slice();
  for (const ch of word) {
    const i = ch.charCodeAt(0) - 97;
    if (next[i] <= 0) return null;
    next[i] -= 1;
  }
  return next;
}

function remainingLetters(pool: number[]): number {
  return pool.reduce((a, b) => a + b, 0);
}

export function findAnagrams(
  dictionary: readonly string[],
  rawInput: string,
  options: AnagramOptions
): AnagramResult {
  const { letters, wildcards } = scrubInput(rawInput);
  const letterCount = letters.length + wildcards;
  const maxResults = options.maxResults ?? 400;

  if (letterCount < 2) {
    return { hits: [], truncated: false, letterCount, wildcardCount: wildcards };
  }

  const pool = letterCounts(letters);
  const minLen = Math.max(2, options.minLength);

  if (options.mode === "multi") {
    return findMultiWord(dictionary, pool, wildcards, minLen, options.maxWords, maxResults, letterCount);
  }

  const hits: AnagramHit[] = [];
  let truncated = false;

  for (const word of dictionary) {
    if (word.length < minLen) continue;
    if (word.length > letterCount) continue;
    if (options.mode === "exact" && word.length !== letterCount) continue;
    if (!canSpell(word, pool, wildcards)) continue;

    hits.push({
      word,
      length: word.length,
      score: scrabbleScore(word),
      exact: word.length === letterCount && wildcards === 0,
    });

    if (hits.length >= maxResults) {
      truncated = true;
      break;
    }
  }

  hits.sort((a, b) => {
    if (b.length !== a.length) return b.length - a.length;
    if (b.score !== a.score) return b.score - a.score;
    return a.word.localeCompare(b.word);
  });

  return { hits, truncated, letterCount, wildcardCount: wildcards };
}

function findMultiWord(
  dictionary: readonly string[],
  pool: number[],
  wildcards: number,
  minLen: number,
  maxWords: 2 | 3,
  maxResults: number,
  letterCount: number
): AnagramResult {
  // Prefer familiar-length candidates; skip ultra-long words that can't fit.
  const candidates = dictionary.filter(
    (w) => w.length >= minLen && w.length <= letterCount && canSpell(w, pool, wildcards)
  );
  candidates.sort((a, b) => b.length - a.length || a.localeCompare(b));

  const results: AnagramHit[] = [];
  const seen = new Set<string>();
  let truncated = false;
  let steps = 0;
  const stepCap = 250_000;

  function addPhrase(parts: string[]) {
    const sorted = [...parts].sort();
    const key = sorted.join(" ");
    if (seen.has(key)) return;
    seen.add(key);
    const phrase = parts.join(" ");
    results.push({
      word: phrase,
      length: phrase.replace(/ /g, "").length,
      score: parts.reduce((n, w) => n + scrabbleScore(w), 0),
      exact: true,
    });
  }

  function search(remaining: number[], words: string[], startIdx: number) {
    if (results.length >= maxResults) {
      truncated = true;
      return;
    }
    if (++steps > stepCap) {
      truncated = true;
      return;
    }

    const left = remainingLetters(remaining);
    if (left === 0 && words.length >= 2) {
      addPhrase(words);
      return;
    }
    if (words.length >= maxWords) return;
    if (left < minLen && left !== 0) return;

    for (let i = startIdx; i < candidates.length; i++) {
      if (truncated || results.length >= maxResults) return;
      const word = candidates[i];
      if (word.length > left + wildcards) continue;
      // Enforce non-increasing length to cut permutations of the same phrase
      if (words.length && word.length > words[words.length - 1].length) continue;

      const next = subtractWord(remaining, word);
      if (!next) continue;

      const nextWords = [...words, word];
      const nextLeft = remainingLetters(next);

      if (nextLeft === 0) {
        if (nextWords.length >= 2) addPhrase(nextWords);
        continue;
      }

      if (nextWords.length < maxWords && nextLeft >= minLen) {
        search(next, nextWords, i);
      }
    }
  }

  // Single-word exact matches first (true one-word anagrams)
  for (const word of candidates) {
    if (word.length === letterCount && canSpell(word, pool, wildcards)) {
      const key = word;
      if (!seen.has(key)) {
        seen.add(key);
        results.push({
          word,
          length: word.length,
          score: scrabbleScore(word),
          exact: true,
        });
      }
    }
    if (results.length >= maxResults) {
      truncated = true;
      break;
    }
  }

  if (!truncated) search(pool, [], 0);

  results.sort((a, b) => {
    const aw = a.word.includes(" ") ? a.word.split(" ").length : 1;
    const bw = b.word.includes(" ") ? b.word.split(" ").length : 1;
    if (aw !== bw) return aw - bw;
    if (b.length !== a.length) return b.length - a.length;
    return a.word.localeCompare(b.word);
  });

  return {
    hits: results.slice(0, maxResults),
    truncated: truncated || results.length > maxResults,
    letterCount,
    wildcardCount: wildcards,
  };
}

const dictCache = new Map<LangCode, string[]>();
const dictPromises = new Map<LangCode, Promise<string[]>>();

export async function loadDictionary(lang: LangCode = "en"): Promise<string[]> {
  const hit = dictCache.get(lang);
  if (hit) return hit;

  const pending = dictPromises.get(lang);
  if (pending) return pending;

  const promise = fetch(`/data/words-${lang}.txt`)
    .then((r) => {
      if (!r.ok) throw new Error(`Failed to load ${lang} dictionary`);
      return r.text();
    })
    .then((text) => {
      const words = text.split(/\r?\n/).filter(Boolean);
      dictCache.set(lang, words);
      dictPromises.delete(lang);
      return words;
    })
    .catch((err) => {
      dictPromises.delete(lang);
      throw err;
    });

  dictPromises.set(lang, promise);
  return promise;
}

export const EXAMPLE_INPUTS: Record<LangCode, readonly string[]> = {
  en: ["listen", "dormitory", "astronomer", "the eyes", "schoolmaster", "eleven plus two"],
  es: ["amor", "roma", "casa", "sombra", "palabra", "corazon"],
  fr: ["amour", "roman", "ecole", "parole", "silence", "etoile"],
  de: ["liebe", "haus", "schule", "nacht", "wasser", "freund"],
  it: ["amore", "roma", "casa", "scuola", "parola", "cuore"],
  pt: ["amor", "casa", "escola", "palavra", "noite", "amigo"],
};
