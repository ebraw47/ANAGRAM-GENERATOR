"use client";

import { useDeferredValue, useMemo, useState, useTransition, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ShareButton from "@/components/ShareButton";
import LetterTiles from "@/components/LetterTiles";
import GameTitle from "@/components/GameTitle";
import {
  buildHint,
  filterWords,
  letterFrequency,
  sortCandidates,
  type FinderClues,
  type HintResult,
} from "@/lib/wordle";

const shell =
  "rounded-2xl border border-white/20 bg-white/[0.08] shadow-[0_20px_50px_-24px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:rounded-3xl";

const panel =
  "rounded-xl border border-white/15 bg-white/[0.06] p-3.5 backdrop-blur-xl sm:rounded-2xl sm:p-5";

const btnGhost =
  "rounded-lg border border-white/20 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold tracking-wide text-white/90 backdrop-blur-md transition hover:border-white/35 hover:bg-white/[0.14]";

const btnYellow =
  "rounded-lg border border-[#FFE14D]/45 bg-[#FFE14D]/90 px-3 py-1.5 text-xs font-semibold tracking-wide text-[#1A1508] transition hover:bg-[#FFE14D]";

const btnGreen =
  "rounded-lg border border-[#57D16A]/45 bg-[#57D16A]/85 px-3 py-1.5 text-xs font-semibold tracking-wide text-white transition hover:bg-[#57D16A]";

function SectionLabel({
  id,
  tone,
  children,
}: {
  id: string;
  tone: "green" | "yellow" | "lime";
  children: ReactNode;
}) {
  const dot =
    tone === "green" ? "bg-[#57D16A]" : tone === "yellow" ? "bg-[#FFE14D]" : "bg-[#B8F26E]";
  const text =
    tone === "green"
      ? "text-[#7BE88A]"
      : tone === "yellow"
        ? "text-[#FFE14D]"
        : "text-[#C6F58A]";

  return (
    <h3 id={id} className={`mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] sm:mb-1.5 sm:text-xs ${text}`}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} aria-hidden />
      {children}
    </h3>
  );
}

export default function WordleWordFinder() {
  const reduce = useReducedMotion();
  const [greens, setGreens] = useState<string[]>(["", "", "", "", ""]);
  const [yellowRow, setYellowRow] = useState<string[]>(["", "", "", "", ""]);
  const [grays, setGrays] = useState("");
  const [commonOnly, setCommonOnly] = useState(true);
  const [hint, setHint] = useState<HintResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const clues: FinderClues = useMemo(
    () => ({
      greens: greens.map((g) => (g ? g.toLowerCase() : null)),
      yellows: yellowRow.flatMap((letter, pos) =>
        letter ? [{ letter: letter.toLowerCase(), notPositions: [pos] }] : []
      ),
      grays: grays.toLowerCase().replace(/[^a-z]/g, "").split(""),
    }),
    [greens, yellowRow, grays]
  );

  const deferredClues = useDeferredValue(clues);
  const deferredCommonOnly = useDeferredValue(commonOnly);

  const matches = useMemo(() => {
    const filtered = filterWords(deferredClues, deferredCommonOnly);
    return sortCandidates(filtered);
  }, [deferredClues, deferredCommonOnly]);

  const frequencies = useMemo(() => letterFrequency(matches).slice(0, 10), [matches]);
  const filtering = deferredClues !== clues || deferredCommonOnly !== commonOnly || isPending;

  const setGreenLetter = (index: number, letter: string) => {
    setHint(null);
    setGreens((prev) => {
      const next = [...prev];
      next[index] = letter;
      return next;
    });
  };

  const setYellowLetter = (index: number, letter: string) => {
    setHint(null);
    setYellowRow((prev) => {
      const next = [...prev];
      next[index] = letter;
      return next;
    });
  };

  const setGreenRow = (next: string[]) => {
    setHint(null);
    setGreens(next);
  };

  const setYellowRowValues = (next: string[]) => {
    setHint(null);
    setYellowRow(next);
  };

  const reset = () => {
    setGreens(["", "", "", "", ""]);
    setYellowRow(["", "", "", "", ""]);
    setGrays("");
    setHint(null);
  };

  const showHint = () => {
    startTransition(() => {
      setHint(buildHint(clues, commonOnly));
    });
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className={shell}>
        <div className="flex flex-col gap-3 border-b border-white/10 px-3.5 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
          <div className="min-w-0">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-[11px]">
              Live finder
            </p>
            <GameTitle />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ShareButton tone="light" className="!rounded-lg !border-white/20 !bg-white/[0.08] !px-2.5 !py-1.5" />
            <button type="button" onClick={showHint} className={btnYellow}>
              Hint
            </button>
            <button type="button" onClick={reset} className={btnGreen}>
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-3 px-3.5 py-4 sm:space-y-4 sm:px-6 sm:py-6">
          <div className={panel} role="group" aria-labelledby="green-clues-heading">
            <SectionLabel id="green-clues-heading" tone="green">
              Green — correct position
            </SectionLabel>
            <p className="mb-3 text-xs leading-relaxed text-white/55">
              Type left to right — focus advances across all 5 tiles.
            </p>
            <LetterTiles
              values={greens}
              onLetterChange={setGreenLetter}
              onRowChange={setGreenRow}
              ariaPrefix="Green letter position"
              tone="green"
            />
          </div>

          <div className={panel} role="group" aria-labelledby="yellow-clues-heading">
            <SectionLabel id="yellow-clues-heading" tone="yellow">
              Yellow — in the word, wrong spot
            </SectionLabel>
            <p className="mb-3 text-xs leading-relaxed text-white/55">
              Place each yellow letter where you tried it. Backspace moves back.
            </p>
            <LetterTiles
              values={yellowRow}
              onLetterChange={setYellowLetter}
              onRowChange={setYellowRowValues}
              ariaPrefix="Yellow letter tried in position"
              tone="yellow"
            />
          </div>

          <div className={panel} role="group" aria-labelledby="gray-clues-heading">
            <SectionLabel id="gray-clues-heading" tone="lime">
              Gray — absent letters
            </SectionLabel>
            <p className="mb-3 text-xs leading-relaxed text-white/55">
              Letters not in the answer. Green and yellow letters stay protected.
            </p>
            <input
              aria-label="Absent gray letters"
              value={grays}
              onChange={(e) => {
                setHint(null);
                setGrays(e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase());
              }}
              placeholder="e.g. BCDFJP"
              className="w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 font-display text-base font-medium uppercase tracking-[0.2em] text-white placeholder:text-white/30 outline-none backdrop-blur-md transition focus:border-[#FFE14D]/55 focus:bg-white/[0.09] focus:ring-2 focus:ring-[#FFE14D]/25 sm:px-4 sm:py-3 sm:text-lg"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-white/75 sm:items-center">
              <input
                type="checkbox"
                checked={commonOnly}
                onChange={(e) => {
                  setHint(null);
                  setCommonOnly(e.target.checked);
                }}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/25 bg-white/10 text-[#57D16A] focus:ring-[#57D16A]/40 sm:mt-0"
              />
              Common words only (likely answers first)
            </label>
            <button
              type="button"
              onClick={showHint}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#FFE14D]/45 bg-[#FFE14D]/90 px-4 py-2.5 text-sm font-semibold tracking-wide text-[#1A1508] transition hover:bg-[#FFE14D] sm:w-auto sm:py-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 18h6M10 21h4M12 3a7 7 0 0 0-4 12.7V17h8v-1.3A7 7 0 0 0 12 3z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Get hint
            </button>
          </div>

          <AnimatePresence>
            {hint ? (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                className="rounded-xl border border-[#FFE14D]/30 bg-[#FFE14D]/10 p-4 backdrop-blur-xl sm:rounded-2xl sm:p-5"
              >
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#FFE14D]/90">
                      Hint · {hint.mode}
                    </p>
                    <p className="mt-0.5 font-display text-lg font-semibold text-white">
                      {hint.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHint(null)}
                    className={`${btnGhost} !px-2 !py-1`}
                    aria-label="Dismiss hint"
                  >
                    Close
                  </button>
                </div>
                <p className="text-sm leading-relaxed text-white/70">{hint.tip}</p>
                {hint.hotLetters.length > 0 ? (
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-white/45">
                    Focus letters:{" "}
                    <span className="font-mono text-[#FFE14D]">{hint.hotLetters.join(" · ")}</span>
                  </p>
                ) : null}
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {hint.suggestions.map((word) => (
                    <li
                      key={word}
                      className="rounded-md border border-[#57D16A]/35 bg-[#57D16A]/15 px-2.5 py-1 font-display text-sm font-medium uppercase tracking-wide text-[#B8F26E]"
                    >
                      {word}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/10 px-3.5 py-4 sm:px-6 sm:py-5">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
                Matching words
              </p>
              <p className="mt-0.5 font-display text-2xl font-semibold tracking-tight text-white">
                {matches.length.toLocaleString()}{" "}
                <span className="text-base font-medium text-white/45">
                  {matches.length === 1 ? "word" : "words"}
                </span>
              </p>
            </div>
            {filtering ? (
              <span className="text-xs text-white/40">Updating…</span>
            ) : null}
          </div>

          {frequencies.length > 0 && matches.length > 1 ? (
            <div className="mb-4">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">
                Hot letters
              </p>
              <div className="flex flex-wrap gap-1.5">
                {frequencies.map((f, i) => (
                  <span
                    key={f.letter}
                    className={`inline-flex h-8 min-w-8 items-center justify-center gap-1 rounded-md border px-2 font-display text-sm font-semibold uppercase ${
                      i % 2 === 0
                        ? "border-[#57D16A]/35 bg-[#57D16A]/15 text-[#B8F26E]"
                        : "border-[#FFE14D]/35 bg-[#FFE14D]/12 text-[#FFE14D]"
                    }`}
                  >
                    {f.letter}
                    <span className="font-sans text-[10px] font-medium opacity-70">{f.count}</span>
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${commonOnly}-${matches.length}-${greens.join("")}-${yellowRow.join("")}-${grays}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-h-64 overflow-y-auto rounded-xl border border-white/12 bg-black/15 p-3 backdrop-blur-md sm:rounded-2xl"
            >
              {matches.length === 0 ? (
                <p className="py-8 text-center text-sm text-white/45">
                  No matches. Loosen a constraint or turn off “common words only.”
                </p>
              ) : (
                <ul className="flex flex-wrap gap-1.5">
                  {matches.slice(0, 200).map((word, i) => (
                    <li
                      key={word}
                      className={`rounded-md border px-2.5 py-1 font-display text-sm font-medium uppercase tracking-wide ${
                        i % 2 === 0
                          ? "border-[#57D16A]/30 bg-[#57D16A]/12 text-[#C6F58A]"
                          : "border-[#FFE14D]/30 bg-[#FFE14D]/10 text-[#FFE14D]"
                      }`}
                    >
                      {word}
                    </li>
                  ))}
                  {matches.length > 200 ? (
                    <li className="px-2 py-1 text-xs font-medium uppercase tracking-wide text-white/40">
                      +{matches.length - 200} more
                    </li>
                  ) : null}
                </ul>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
