"use client";

import { useRef, type ChangeEvent, type KeyboardEvent, type ClipboardEvent } from "react";

type LetterTilesProps = {
  values: string[];
  /** Set one tile (parent must apply with functional setState). */
  onLetterChange: (index: number, letter: string) => void;
  /** Replace the whole row (paste / bulk). */
  onRowChange: (next: string[]) => void;
  ariaPrefix: string;
  tone: "green" | "yellow";
};

const toneStyles = {
  green: {
    empty:
      "border-[#57D16A]/45 bg-white/[0.07] text-white focus:border-[#57D16A] focus:bg-[#57D16A]/15 focus:ring-[#57D16A]/35",
    filled:
      "border-[#57D16A]/70 bg-[#57D16A]/25 text-white focus:border-[#57D16A] focus:ring-[#57D16A]/40",
  },
  yellow: {
    empty:
      "border-[#FFE14D]/45 bg-white/[0.07] text-[#FFE14D] focus:border-[#FFE14D] focus:bg-[#FFE14D]/12 focus:ring-[#FFE14D]/35",
    filled:
      "border-[#FFE14D]/70 bg-[#FFE14D]/22 text-[#FFE14D] focus:border-[#FFE14D] focus:ring-[#FFE14D]/40",
  },
} as const;

function onlyLetters(value: string): string {
  return value.replace(/[^a-zA-Z]/g, "").toUpperCase();
}

export default function LetterTiles({
  values,
  onLetterChange,
  onRowChange,
  ariaPrefix,
  tone,
}: LetterTilesProps) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const focusAt = (index: number) => {
    const el = refs.current[Math.max(0, Math.min(4, index))];
    requestAnimationFrame(() => {
      el?.focus();
      el?.select();
    });
  };

  const setLetter = (index: number, letter: string) => {
    onLetterChange(index, onlyLetters(letter).slice(0, 1));
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      if (values[index]) {
        setLetter(index, "");
      } else if (index > 0) {
        setLetter(index - 1, "");
        focusAt(index - 1);
      }
      return;
    }

    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusAt(index - 1);
      return;
    }

    if (e.key === "ArrowRight" && index < 4) {
      e.preventDefault();
      focusAt(index + 1);
      return;
    }

    if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
      setLetter(index, e.key);
      if (index < 4) focusAt(index + 1);
    }
  };

  /** Mobile soft keyboards often skip reliable keydown letters — handle via input. */
  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const cleaned = onlyLetters(e.target.value);
    if (!cleaned) {
      setLetter(index, "");
      return;
    }
    const letter = cleaned.slice(-1);
    setLetter(index, letter);
    if (index < 4) focusAt(index + 1);
  };

  const handlePaste = (index: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = onlyLetters(e.clipboardData.getData("text"));
    if (!pasted) return;
    const next = [...values];
    let cursor = index;
    for (const ch of pasted.slice(0, 5 - index)) {
      next[cursor] = ch;
      cursor += 1;
    }
    onRowChange(next.map((v) => onlyLetters(v).slice(0, 1)));
    focusAt(Math.min(4, cursor));
  };

  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-2.5">
      {values.map((letter, i) => {
        const filled = Boolean(letter);
        return (
          <input
            key={`${ariaPrefix}-${i}`}
            ref={(el) => {
              refs.current[i] = el;
            }}
            aria-label={`${ariaPrefix} ${i + 1}`}
            value={letter}
            maxLength={2}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            inputMode="text"
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={(e) => handlePaste(i, e)}
            onFocus={(e) => e.currentTarget.select()}
            className={`aspect-square w-full min-w-0 rounded-xl border bg-clip-padding text-center font-display text-xl font-semibold uppercase tracking-wide outline-none backdrop-blur-md transition duration-150 focus:ring-2 sm:rounded-2xl sm:text-2xl md:text-3xl ${
              filled ? toneStyles[tone].filled : toneStyles[tone].empty
            }`}
          />
        );
      })}
    </div>
  );
}
