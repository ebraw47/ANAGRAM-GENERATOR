"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import {
  AnagramMode,
  EXAMPLE_INPUTS,
  LANGUAGES,
  findAnagrams,
  loadDictionary,
  scrubInput,
  type AnagramHit,
  type LangCode,
} from "@/lib/anagram";
import { ROUTES } from "@/lib/siteConfig";
import { greetingFor, todayLabelFor, toolCopy } from "@/lib/toolI18n";

type SortKey = "length" | "score" | "alpha";
type SidebarId = AnagramMode | "examples";

const MODE_ICONS: Record<AnagramMode, ReactNode> = {
  subset: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h14" />
    </svg>
  ),
  exact: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  multi: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
  ),
};

export default function AnagramGenerator() {
  const [input, setInput] = useState("");
  const [lang, setLang] = useState<LangCode>("en");
  const [mode, setMode] = useState<AnagramMode>("subset");
  const [minLength, setMinLength] = useState(3);
  const [maxWords, setMaxWords] = useState<2 | 3>(2);
  const [sortKey, setSortKey] = useState<SortKey>("length");
  const [hits, setHits] = useState<AnagramHit[]>([]);
  const [truncated, setTruncated] = useState(false);
  const [letterCount, setLetterCount] = useState(0);
  const [dictReady, setDictReady] = useState(false);
  const [dictError, setDictError] = useState("");
  const [copied, setCopied] = useState("");
  const [speakingWord, setSpeakingWord] = useState("");
  const [isPending, startTransition] = useTransition();
  const [shareNote, setShareNote] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dictRef = useRef<string[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const examples = EXAMPLE_INPUTS[lang];
  const t = toolCopy(lang);

  useEffect(() => {
    let cancelled = false;
    setDictReady(false);
    setDictError("");
    dictRef.current = null;
    loadDictionary(lang)
      .then((words) => {
        if (cancelled) return;
        dictRef.current = words;
        setDictReady(true);
      })
      .catch(() => {
        if (!cancelled) setDictError("error");
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(""), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    if (!shareNote) return;
    const t = setTimeout(() => setShareNote(""), 2200);
    return () => clearTimeout(t);
  }, [shareNote]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const runSearch = useCallback(
    (source?: string) => {
      const text = source ?? input;
      const dict = dictRef.current;
      if (!dict) return;
      const { letters, wildcards } = scrubInput(text);
      if (letters.length + wildcards < 2) {
        setHits([]);
        setTruncated(false);
        setLetterCount(0);
        return;
      }

      startTransition(() => {
        const result = findAnagrams(dict, text, {
          mode,
          minLength,
          maxWords,
          maxResults: mode === "multi" ? 800 : 500,
        });
        setHits(result.hits);
        setTruncated(result.truncated);
        setLetterCount(result.letterCount);
      });
    },
    [input, mode, minLength, maxWords]
  );

  useEffect(() => {
    if (!dictReady) return;
    if (!input.trim()) {
      setHits([]);
      setTruncated(false);
      setLetterCount(0);
      return;
    }
    const t = setTimeout(() => runSearch(), 180);
    return () => clearTimeout(t);
  }, [input, mode, minLength, maxWords, dictReady, runSearch]);

  const sortedHits = useMemo(() => {
    const list = [...hits];
    list.sort((a, b) => {
      if (sortKey === "score") {
        if (b.score !== a.score) return b.score - a.score;
        return a.word.localeCompare(b.word);
      }
      if (sortKey === "alpha") return a.word.localeCompare(b.word);
      if (b.length !== a.length) return b.length - a.length;
      if (b.score !== a.score) return b.score - a.score;
      return a.word.localeCompare(b.word);
    });
    return list;
  }, [hits, sortKey]);

  const grouped = useMemo(() => {
    const map = new Map<number, AnagramHit[]>();
    for (const hit of sortedHits) {
      const key = hit.word.includes(" ") ? hit.word.replace(/ /g, "").length : hit.length;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(hit);
    }
    return [...map.entries()].sort((a, b) => b[0] - a[0]);
  }, [sortedHits]);

  const exactCount = useMemo(() => sortedHits.filter((h) => h.exact).length, [sortedHits]);
  const topScore = sortedHits[0]?.score ?? 0;

  const copyWord = async (word: string) => {
    try {
      await navigator.clipboard.writeText(word);
      setCopied(word);
    } catch {
      setShareNote(toolCopy(lang).copyFailedManual);
    }
  };

  const speakWord = (word: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    const text = word.trim();
    if (!text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = toolCopy(lang).locale;
    utterance.rate = 0.92;

    const voices = window.speechSynthesis.getVoices();
    const locale = toolCopy(lang).locale;
    const match =
      voices.find((v) => v.lang === locale) ||
      voices.find((v) => v.lang.startsWith(locale.slice(0, 2)));
    if (match) utterance.voice = match;

    utterance.onstart = () => setSpeakingWord(text);
    utterance.onend = () => setSpeakingWord("");
    utterance.onerror = () => setSpeakingWord("");
    window.speechSynthesis.speak(utterance);
  };

  const copyAll = async () => {
    const list = sortedHits.map((h) => h.word).join("\n");
    try {
      await navigator.clipboard.writeText(list);
      setCopied("__all__");
    } catch {
      setShareNote(toolCopy(lang).copyFailed);
    }
  };

  const clearAll = () => {
    setInput("");
    setHits([]);
    setTruncated(false);
    setLetterCount(0);
    inputRef.current?.focus();
  };

  const selectMode = (next: AnagramMode) => {
    setMode(next);
    setMobileNav(false);
  };

  const sidebarBtn = (id: SidebarId, active: boolean, onClick: () => void, icon: ReactNode, label: string) => (
    <button
      key={id}
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition ${
        active
          ? "bg-white text-ink shadow-sm"
          : "text-white/70 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className={active ? "text-brand" : "text-white/55"}>{icon}</span>
      <span>{label}</span>
    </button>
  );

  return (
    <div className="mac-tablet relative mx-auto w-full max-w-[min(1120px,100%)] overflow-hidden">
      {/* Soft leafy blur — desktop only (blur filters lag mobile scroll) */}
      <div
        className="pointer-events-none absolute -inset-x-14 -inset-y-10 -z-10 hidden rounded-[3rem] opacity-100 blur-3xl md:block"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 20% 30%, rgba(98, 148, 88, 0.55), transparent 70%), radial-gradient(ellipse 50% 45% at 85% 25%, rgba(190, 210, 155, 0.7), transparent 65%), radial-gradient(ellipse 60% 55% at 55% 85%, rgba(72, 118, 78, 0.4), transparent 70%)",
        }}
        aria-hidden
      />

      <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-sm sm:rounded-[2rem] sm:bg-white/90 sm:shadow-[0_40px_90px_-30px_rgba(40,70,40,0.45),0_0_0_1px_rgba(255,255,255,0.65)_inset] sm:backdrop-blur-xl">
        {/* Mac chrome */}
        <div className="flex items-center gap-2 border-b border-black/5 px-3 py-2.5 sm:px-5 sm:py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] sm:h-3 sm:w-3" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] sm:h-3 sm:w-3" />
          <span className="ml-2 hidden truncate text-xs font-medium text-ink-mute sm:ml-3 sm:inline">
            {t.workspaceTitle}
          </span>

          <div className="ml-auto flex min-w-0 items-center gap-1.5 sm:gap-2">
            <Link
              href={ROUTES.blog}
              className="inline-flex max-w-[9.5rem] items-center truncate rounded-full border border-black/8 bg-white px-2.5 py-1.5 text-[0.7rem] font-semibold text-ink shadow-sm transition hover:bg-white sm:max-w-none sm:px-4 sm:text-sm"
            >
              {t.readGuides}
            </Link>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/8 bg-white/90 text-ink shadow-sm transition hover:bg-white"
                aria-label="More options"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <circle cx="5" cy="12" r="1.7" />
                  <circle cx="12" cy="12" r="1.7" />
                  <circle cx="19" cy="12" r="1.7" />
                </svg>
              </button>
              {menuOpen ? (
                <div className="absolute right-0 z-30 mt-2 w-44 overflow-hidden rounded-2xl border border-black/8 bg-white p-1.5 shadow-lift">
                  <Link
                    href={ROUTES.about}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-ink hover:bg-brand-soft"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.about}
                  </Link>
                  <Link
                    href={ROUTES.contact}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-ink hover:bg-brand-soft"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.contact}
                  </Link>
                  <Link
                    href={ROUTES.blog}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-ink hover:bg-brand-soft"
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.allGuides}
                  </Link>
                  <button
                    type="button"
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-ink hover:bg-brand-soft lg:hidden"
                    onClick={() => {
                      setMobileNav((v) => !v);
                      setMenuOpen(false);
                    }}
                  >
                    {t.modesMenu}
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Mobile mode chips — always visible under chrome */}
        <div className="flex gap-2 overflow-x-auto border-b border-black/5 bg-white px-3 py-2.5 lg:hidden">
          {(Object.keys(MODE_ICONS) as AnagramMode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => selectMode(m)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                mode === m
                  ? "bg-brand text-white"
                  : "border border-black/8 bg-white text-ink-soft"
              }`}
            >
              {t.mode[m].label}
            </button>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="shrink-0 rounded-full border border-black/8 bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft"
          >
            {t.clearBoard}
          </button>
        </div>

        <div className="flex min-h-0 flex-col lg:min-h-[40rem] lg:flex-row">
          {/* Sidebar — desktop / optional mobile drawer */}
          <aside
            className={`${
              mobileNav ? "flex" : "hidden"
            } w-full shrink-0 flex-col bg-[#1c1f1a] p-3 text-white sm:p-4 lg:flex lg:w-[13.5rem]`}
          >
            <div className="mb-5 flex items-center gap-2 px-2 pt-1">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-xs font-extrabold text-white">
                AG
              </span>
              <div>
                <p className="text-sm font-semibold leading-none">Anagram</p>
                <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-white/45">Workspace</p>
              </div>
            </div>

            <p className="mb-2 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/35">
              {t.modes}
            </p>
            <nav className="space-y-1" aria-label="Anagram modes">
              {(Object.keys(MODE_ICONS) as AnagramMode[]).map((m) =>
                sidebarBtn(m, mode === m, () => selectMode(m), MODE_ICONS[m], t.mode[m].label)
              )}
            </nav>

            <p className="mb-2 mt-6 px-2 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white/35">
              {t.actions}
            </p>
            <div className="space-y-1">
              {sidebarBtn(
                "examples",
                false,
                () => {
                  setInput(examples[1] ?? examples[0]);
                  setMobileNav(false);
                },
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>,
                t.tryWord(examples[1] ?? examples[0])
              )}
              <button
                type="button"
                onClick={clearAll}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <svg className="h-5 w-5 text-white/55" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                {t.clearBoard}
              </button>
              <button
                type="button"
                onClick={copyAll}
                disabled={!sortedHits.length}
                className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white disabled:opacity-40"
              >
                <svg className="h-5 w-5 text-white/55" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <rect x="8" y="8" width="12" height="12" rx="2" />
                  <path d="M4 16V6a2 2 0 0 1 2-2h10" />
                </svg>
                {copied === "__all__" ? t.copiedList : t.copyAll}
              </button>
            </div>

            <div className="mt-auto hidden rounded-2xl bg-white/5 p-3 text-xs leading-relaxed text-white/50 lg:block">
              {t.mode[mode].hint}
            </div>
          </aside>

          {/* Main workspace */}
          <div className="flex min-w-0 flex-1 flex-col bg-white sm:bg-white/70">
            <div className="border-b border-black/5 px-3 py-4 sm:px-6 sm:py-6">
              <div className="flex flex-wrap items-end justify-between gap-2 sm:gap-3">
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-mute sm:text-xs">
                    {todayLabelFor(lang)}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink sm:text-[1.75rem]">
                    {greetingFor(lang)}, {t.puzzler}
                  </h2>
                  <p className="mt-1 text-xs text-ink-mute sm:text-sm">{t.mode[mode].short}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-mute">
                  {!dictReady && !dictError ? <span className="text-brand">{t.loadingDict}</span> : null}
                  {dictError ? <span className="text-red-600">{t.dictError}</span> : null}
                  {shareNote ? <span className="text-brand">{shareNote}</span> : null}
                  {isPending ? <span>{t.searching}</span> : null}
                </div>
              </div>

              {/* Command / search bar */}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="relative min-w-0 flex-1">
                  <span className="sr-only">Letters, word, or phrase</span>
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
                    </svg>
                  </span>
                  <input
                    ref={inputRef}
                    id="anagram-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        runSearch();
                      }
                    }}
                    spellCheck={false}
                    placeholder={t.placeholder}
                    className="w-full rounded-xl border border-black/8 bg-white py-3 pl-11 pr-3 text-base text-ink shadow-sm outline-none transition placeholder:text-ink-mute/70 focus:border-brand/40 focus:ring-4 focus:ring-brand/10 sm:rounded-2xl sm:py-3.5 sm:pl-12 sm:pr-4 sm:text-[0.95rem]"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => runSearch()}
                  disabled={!dictReady}
                  className="w-full shrink-0 rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-black disabled:opacity-60 sm:w-auto sm:rounded-2xl sm:py-3.5"
                >
                  {t.generate}
                </button>
              </div>

              {/* Quick chips */}
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {examples.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => {
                      if (/\s/.test(ex)) setMode("multi");
                      setInput(ex);
                    }}
                    className="shrink-0 rounded-full border border-black/8 bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft transition hover:border-brand/40 hover:text-brand"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              {/* Filters row */}
              <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-wider text-ink-mute">
                    {t.language}
                  </span>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as LangCode)}
                    className="w-full rounded-xl border border-black/8 bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand/40"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.label} · {l.native}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-wider text-ink-mute">
                    {t.minLength}
                  </span>
                  <select
                    value={minLength}
                    onChange={(e) => setMinLength(Number(e.target.value))}
                    className="w-full rounded-xl border border-black/8 bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand/40"
                  >
                    {[2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n}+
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-wider text-ink-mute">
                    {t.maxWords}
                  </span>
                  <select
                    value={maxWords}
                    onChange={(e) => setMaxWords(Number(e.target.value) as 2 | 3)}
                    disabled={mode !== "multi"}
                    className="w-full rounded-xl border border-black/8 bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand/40 disabled:opacity-45"
                  >
                    <option value={2}>{t.upTo2}</option>
                    <option value={3}>{t.upTo3}</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-[0.65rem] font-bold uppercase tracking-wider text-ink-mute">
                    {t.sortBy}
                  </span>
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    className="w-full rounded-xl border border-black/8 bg-white px-3 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand/40"
                  >
                    <option value="length">{t.sortLength}</option>
                    <option value="score">{t.sortScore}</option>
                    <option value="alpha">{t.sortAlpha}</option>
                  </select>
                </label>
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-1.5 px-3 py-3 sm:gap-3 sm:px-6 sm:py-4">
              {[
                { label: t.lettersN, value: String(letterCount), tone: "bg-[#f7f4ee] sm:bg-white" },
                { label: t.results, value: String(sortedHits.length), tone: "bg-[#f7f4ee] sm:bg-white" },
                { label: t.exactHits, value: String(exactCount), tone: "bg-[#f7f4ee] sm:bg-white" },
                { label: t.topScore, value: String(topScore), tone: "bg-[#f7f4ee] sm:bg-white" },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`${card.tone} rounded-xl border border-black/5 px-2 py-2 sm:rounded-2xl sm:px-4 sm:py-3 sm:shadow-sm`}
                >
                  <p className="truncate text-[0.55rem] font-bold uppercase tracking-wider text-ink-mute sm:text-[0.65rem]">
                    {card.label}
                  </p>
                  <p className="mt-0.5 font-display text-lg font-bold text-ink sm:mt-1 sm:text-2xl">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Results panels — no nested overflow on mobile (avoids scroll lag / trapped scroll) */}
            <div className="grid min-h-0 flex-1 gap-3 px-3 pb-4 sm:gap-4 sm:px-6 sm:pb-5 lg:grid-cols-12">
              <section className="flex flex-col rounded-2xl border border-black/5 bg-white shadow-sm lg:col-span-7 lg:min-h-[16rem] lg:overflow-hidden">
                <div className="flex items-center justify-between border-b border-black/5 px-3 py-2.5 sm:px-4 sm:py-3">
                  <h3 className="font-display text-sm font-bold text-ink sm:text-base">{t.myResults}</h3>
                  <span className="text-[0.7rem] font-semibold text-ink-mute sm:text-xs">
                    {sortedHits.length ? `${sortedHits.length} ${t.found}` : t.waiting}
                  </span>
                </div>
                <div className="px-2 py-3 sm:flex-1 sm:overflow-y-auto sm:px-4 lg:max-h-[28rem]">
                  {!input.trim() ? (
                    <div className="flex flex-col items-center justify-center px-3 py-8 text-center sm:min-h-[12rem]">
                      <p className="font-display text-base font-bold text-ink sm:text-lg">{t.startTitle}</p>
                      <p className="mt-2 max-w-sm text-xs leading-relaxed text-ink-mute sm:text-sm">
                        {t.startBody}
                      </p>
                    </div>
                  ) : !sortedHits.length && !isPending ? (
                    <p className="px-2 py-8 text-center text-sm text-ink-mute">
                      {t.noMatches}
                    </p>
                  ) : (
                    <div className="space-y-4 sm:space-y-5">
                      {grouped.map(([len, group]) => (
                        <div key={len}>
                          <p className="mb-2 px-1 text-[0.65rem] font-bold uppercase tracking-wider text-ink-mute">
                            {len}-letter {mode === "multi" ? t.letterSet : t.letterWords} · {group.length}
                          </p>
                          <ul className="space-y-1">
                            {group.map((hit) => (
                              <li key={hit.word}>
                                <div className="flex items-center gap-1 rounded-xl px-1.5 py-1.5 transition hover:bg-[#f7f4ee] sm:gap-2 sm:px-3 sm:py-2">
                                  <button
                                    type="button"
                                    onClick={() => copyWord(hit.word)}
                                    className="flex min-w-0 flex-1 items-center gap-2 rounded-lg py-1 text-left sm:gap-3"
                                    title={t.copy}
                                  >
                                    <span
                                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                                        hit.exact
                                          ? "border-brand bg-brand/15 text-brand"
                                          : "border-black/10 bg-white text-transparent"
                                      }`}
                                      aria-hidden
                                    >
                                      {hit.exact ? (
                                        <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                      ) : null}
                                    </span>
                                    <span className="min-w-0 flex-1 break-words font-mono text-[0.8rem] font-semibold text-ink sm:text-sm">
                                      {hit.word}
                                    </span>
                                    <span className="text-[0.65rem] font-bold text-ink-mute sm:text-[0.7rem]">
                                      {hit.score} {t.pts}
                                    </span>
                                    {copied === hit.word ? (
                                      <span className="text-[0.65rem] font-bold uppercase text-brand">{t.copied}</span>
                                    ) : null}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => speakWord(hit.word)}
                                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition focus-ring sm:h-8 sm:w-8 ${
                                      speakingWord === hit.word
                                        ? "border-brand bg-brand/15 text-brand"
                                        : "border-black/8 bg-white text-ink-mute hover:border-brand/35 hover:text-brand"
                                    }`}
                                    aria-label={`${t.speak}: ${hit.word}`}
                                    title={speakingWord === hit.word ? t.speaking : t.speak}
                                  >
                                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6 9H3v6h3l5 4V5Z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
                                    </svg>
                                  </button>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {truncated ? (
                        <p className="px-1 text-xs text-ink-mute">
                          {t.resultCap}
                        </p>
                      ) : null}
                    </div>
                  )}
                </div>
              </section>

              <section className="flex flex-col rounded-2xl border border-black/5 bg-white shadow-sm lg:col-span-5 lg:min-h-[14rem] lg:overflow-hidden">
                <div className="border-b border-black/5 px-3 py-2.5 sm:px-4 sm:py-3">
                  <h3 className="font-display text-sm font-bold text-ink sm:text-base">{t.upcomingTips}</h3>
                </div>
                <ul className="space-y-3 px-3 py-3 sm:flex-1 sm:overflow-y-auto sm:px-4 sm:py-4 lg:max-h-[28rem]">
                  <li className="rounded-2xl bg-brand-soft/60 px-4 py-3">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-brand">{t.mode.exact.label}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{t.tipExactTitle}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-mute">
                      {t.tipExactBody}
                    </p>
                  </li>
                  <li className="rounded-2xl bg-brand-soft/60 px-4 py-3">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-brand">{t.mode.multi.label}</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{t.tipNamesTitle}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-mute">
                      {t.tipNamesBody}
                    </p>
                  </li>
                  <li className="rounded-2xl bg-brand-soft/60 px-4 py-3">
                    <p className="text-[0.65rem] font-bold uppercase tracking-wider text-brand">?</p>
                    <p className="mt-1 text-sm font-semibold text-ink">{t.tipBlanksTitle}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-mute">
                      {t.tipBlanksBody}
                    </p>
                  </li>
                  {sortedHits.slice(0, 3).map((hit) => (
                    <li key={`top-${hit.word}`} className="flex items-center justify-between gap-2 rounded-2xl border border-black/5 px-4 py-3">
                      <div className="min-w-0">
                        <p className="text-[0.65rem] font-bold uppercase tracking-wider text-ink-mute">{t.topFind}</p>
                        <p className="truncate font-mono text-sm font-bold text-ink">{hit.word}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => speakWord(hit.word)}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-xl border transition focus-ring ${
                            speakingWord === hit.word
                              ? "border-brand bg-brand/15 text-brand"
                              : "border-black/8 bg-white text-ink-mute hover:border-brand/35 hover:text-brand"
                          }`}
                          aria-label={`${t.speak}: ${hit.word}`}
                          title={speakingWord === hit.word ? t.speaking : t.speak}
                        >
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6 9H3v6h3l5 4V5Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => copyWord(hit.word)}
                          className="rounded-xl bg-ink px-3 py-1.5 text-xs font-bold text-white"
                        >
                          {t.copy}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
