"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CaseMode,
  STYLE_HELP,
  STYLE_OPTIONS,
  convertCaseDetailed,
  countStats,
  highlightDiff,
} from "@/lib/titleCase";

const PLACEHOLDER =
  "Enter a title and click Convert (or press Ctrl+Enter). The results will be shown below.";

function downloadTextFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function TitleCaseConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<CaseMode>("title-chicago");
  const [keepAllCaps, setKeepAllCaps] = useState(true);
  const [multiLine, setMultiLine] = useState(true);
  const [showExplanations, setShowExplanations] = useState(false);
  const [highlightChanges, setHighlightChanges] = useState(false);
  const [straightQuotes, setStraightQuotes] = useState(false);
  const [convertOnPaste, setConvertOnPaste] = useState(false);
  const [copied, setCopied] = useState(false);
  const [styleHelpOpen, setStyleHelpOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [shareNote, setShareNote] = useState("");
  const [canNativeShare, setCanNativeShare] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const runConvert = useCallback(
    (source?: string) => {
      const text = source ?? input;
      if (!text.trim()) {
        setOutput("");
        return;
      }
      const result = convertCaseDetailed(text, mode, {
        keepAllCaps,
        multiLine,
        straightQuotes,
      });
      setOutput(result.text);
    },
    [input, mode, keepAllCaps, multiLine, straightQuotes]
  );

  // Re-convert live when options/mode change and we already have a result
  useEffect(() => {
    if (!output && !input) return;
    if (!input.trim()) return;
    runConvert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, keepAllCaps, multiLine, straightQuotes]);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  useEffect(() => {
    if (!shareNote) return;
    const t = setTimeout(() => setShareNote(""), 2200);
    return () => clearTimeout(t);
  }, [shareNote]);

  useEffect(() => {
    if (!shareOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (!shareMenuRef.current?.contains(e.target as Node)) setShareOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShareOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [shareOpen]);

  const detailed = useMemo(() => {
    if (!output) return null;
    return convertCaseDetailed(input, mode, { keepAllCaps, multiLine, straightQuotes });
  }, [input, output, mode, keepAllCaps, multiLine, straightQuotes]);

  const diff = useMemo(() => {
    if (!highlightChanges || !output) return null;
    return highlightDiff(input, output);
  }, [highlightChanges, input, output]);

  const stats = useMemo(() => countStats(input), [input]);

  const onPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    if (!convertOnPaste) return;
    const text = e.clipboardData.getData("text");
    if (!text) return;
    e.preventDefault();
    setInput(text);
    const result = convertCaseDetailed(text, mode, {
      keepAllCaps,
      multiLine,
      straightQuotes,
    });
    setOutput(result.text);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runConvert();
    }
  };

  const copyResult = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
    } catch {
      /* ignore */
    }
  };

  const shareToEmail = () => {
    if (!output) return;
    const subject = encodeURIComponent("Converted title");
    const body = encodeURIComponent(output);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setShareOpen(false);
  };

  const shareToNotepad = () => {
    if (!output) return;
    downloadTextFile("converted-title.txt", output, "text/plain;charset=utf-8");
    setShareNote("Downloaded .txt");
    setShareOpen(false);
  };

  const shareToWord = () => {
    if (!output) return;
    const escaped = output
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>");
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Converted Title</title></head><body><p>${escaped}</p></body></html>`;
    downloadTextFile("converted-title.doc", html, "application/msword");
    setShareNote("Downloaded for Word");
    setShareOpen(false);
  };

  const shareToDocs = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      window.open("https://docs.google.com/document/create", "_blank", "noopener,noreferrer");
      setShareNote("Copied — paste in Docs");
    } catch {
      setShareNote("Copy failed");
    }
    setShareOpen(false);
  };

  const shareNative = async () => {
    if (!output || typeof navigator.share !== "function") return;
    try {
      await navigator.share({ title: "Converted title", text: output });
    } catch {
      /* cancelled */
    }
    setShareOpen(false);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setCopied(false);
    setShareOpen(false);
    setShareNote("");
  };

  const actionBtnClass =
    "rounded-lg border border-brand/30 bg-brand px-3 py-1.5 text-xs font-semibold text-white shadow-soft transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40 focus-ring";

  const titleStyles = STYLE_OPTIONS.filter((s) => s.group === "Title Case");
  const otherStyles = STYLE_OPTIONS.filter((s) => s.group === "Other");

  const optionClass =
    "inline-flex items-center gap-2 text-sm text-ink-soft cursor-pointer select-none";
  const checkClass =
    "h-3.5 w-3.5 rounded border-navy-900/25 bg-white text-brand focus:ring-brand focus:ring-offset-0";
  const chipIdle =
    "bg-navy-50 text-ink-soft hover:bg-brand/10 hover:text-navy-900";
  const chipActive = "bg-brand text-white shadow-soft";
  const legendClass =
    "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-mute";

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="tool-glass overflow-hidden rounded-2xl">
        {/* Input */}
        <div className="border-b border-navy-900/8 p-4 sm:p-5 md:p-6">
          <label className="block">
            <span className="sr-only">Enter a title</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={onPaste}
              onKeyDown={onKeyDown}
              placeholder={PLACEHOLDER}
              rows={multiLine ? 5 : 3}
              spellCheck
              className="tool-glass-inset w-full resize-y rounded-xl px-4 py-3 text-base leading-relaxed text-[#20242C] placeholder:text-ink-mute/70 focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/25 sm:min-h-[120px] sm:text-[1.05rem]"
            />
          </label>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <p className="text-xs text-ink-mute sm:text-sm" aria-live="polite">
              {stats.words} words · {stats.chars} characters · {stats.lines} lines
              {stats.chars > 0 && (
                <span className={stats.chars > 60 ? " text-amber-600" : " text-ink-mute/80"}>
                  {" "}
                  · SEO {stats.chars <= 60 ? "OK" : "may truncate"}
                </span>
              )}
            </p>

            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => runConvert()}
                className="rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white shadow-soft transition hover:bg-brand-dark focus-ring"
              >
                Convert
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="rounded-xl border border-navy-900/12 bg-white px-5 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-navy-50 focus-ring"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Styles */}
        <div className="space-y-4 border-b border-navy-900/8 px-4 py-4 sm:px-6 sm:py-5">
          <fieldset>
            <legend className={legendClass}>Title Case</legend>
            <div className="flex flex-wrap gap-1.5 sm:gap-2" role="radiogroup" aria-label="Title case style">
              {titleStyles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={mode === s.id}
                  title={STYLE_HELP[s.id]}
                  onClick={() => setMode(s.id)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition focus-ring sm:px-3 sm:text-sm ${
                    mode === s.id ? chipActive : chipIdle
                  }`}
                >
                  <span className="border-b border-dotted border-current/40">{s.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStyleHelpOpen((v) => !v)}
              className="mt-2 text-xs font-medium text-brand underline decoration-brand/35 underline-offset-2 hover:text-brand-dark"
            >
              Which title case style should I use?
            </button>
            {styleHelpOpen && (
              <div className="tool-glass-inset mt-3 rounded-xl p-3 text-sm text-ink-soft sm:p-4">
                <p className="mb-2 font-semibold text-[#20242C]">{STYLE_OPTIONS.find((s) => s.id === mode)?.label}</p>
                <p>{STYLE_HELP[mode]}</p>
                <ul className="mt-3 grid gap-1.5 text-xs text-ink-mute sm:grid-cols-2">
                  {titleStyles.map((s) => (
                    <li key={s.id}>
                      <strong className="text-[#20242C]">{s.label}:</strong> {STYLE_HELP[s.id]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend className={legendClass}>Other Styles</legend>
            <div className="flex flex-wrap gap-1.5 sm:gap-2" role="radiogroup" aria-label="Other case styles">
              {otherStyles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={mode === s.id}
                  title={STYLE_HELP[s.id]}
                  onClick={() => setMode(s.id)}
                  className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition focus-ring sm:px-3 sm:text-sm ${
                    mode === s.id ? chipActive : chipIdle
                  }`}
                >
                  {s.id === "sentence" ? "Sentence case (proper nouns)" : s.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className={legendClass}>Options</legend>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              <label className={optionClass}>
                <input
                  type="checkbox"
                  className={checkClass}
                  checked={keepAllCaps}
                  onChange={(e) => setKeepAllCaps(e.target.checked)}
                />
                Keep Words in All Caps
              </label>
              <label className={optionClass}>
                <input
                  type="checkbox"
                  className={checkClass}
                  checked={multiLine}
                  onChange={(e) => setMultiLine(e.target.checked)}
                />
                Enable Multi-Line Input
              </label>
              <label className={optionClass}>
                <input
                  type="checkbox"
                  className={checkClass}
                  checked={showExplanations}
                  onChange={(e) => setShowExplanations(e.target.checked)}
                />
                Show Explanations
              </label>
              <label className={optionClass}>
                <input
                  type="checkbox"
                  className={checkClass}
                  checked={highlightChanges}
                  onChange={(e) => setHighlightChanges(e.target.checked)}
                />
                Highlight Changes
              </label>
              <label className={optionClass}>
                <input
                  type="checkbox"
                  className={checkClass}
                  checked={straightQuotes}
                  onChange={(e) => setStraightQuotes(e.target.checked)}
                />
                Use Straight Quotes
              </label>
              <label className={optionClass}>
                <input
                  type="checkbox"
                  className={checkClass}
                  checked={convertOnPaste}
                  onChange={(e) => setConvertOnPaste(e.target.checked)}
                />
                Convert When Text Is Pasted
              </label>
            </div>
          </fieldset>
        </div>

        {/* Result */}
        <div className="px-4 py-4 sm:px-6 sm:py-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className={legendClass}>Result</p>
            <div className="flex items-center gap-2">
              {shareNote ? (
                <span className="hidden text-xs font-medium text-brand sm:inline" aria-live="polite">
                  {shareNote}
                </span>
              ) : null}
              <button
                type="button"
                onClick={copyResult}
                disabled={!output}
                className={actionBtnClass}
              >
                {copied ? "Copied!" : "Copy"}
              </button>

              <div className="relative" ref={shareMenuRef}>
                <button
                  type="button"
                  onClick={() => setShareOpen((v) => !v)}
                  disabled={!output}
                  aria-expanded={shareOpen}
                  aria-haspopup="menu"
                  className={actionBtnClass}
                >
                  Share
                </button>
                {shareOpen && output ? (
                  <div
                    role="menu"
                    className="absolute right-0 z-20 mt-1.5 min-w-[11.5rem] overflow-hidden rounded-xl border border-navy-900/10 bg-white py-1 shadow-lift"
                  >
                    <button
                      type="button"
                      role="menuitem"
                      onClick={shareToEmail}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-[#20242C] transition hover:bg-[#F7F5F0]"
                    >
                      Email
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={shareToDocs}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-[#20242C] transition hover:bg-[#F7F5F0]"
                    >
                      Google Docs
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={shareToNotepad}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-[#20242C] transition hover:bg-[#F7F5F0]"
                    >
                      Notepad (.txt)
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={shareToWord}
                      className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-[#20242C] transition hover:bg-[#F7F5F0]"
                    >
                      MS Word (.doc)
                    </button>
                    {canNativeShare ? (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={shareNative}
                        className="flex w-full items-center gap-2 border-t border-navy-900/8 px-3 py-2 text-left text-xs font-semibold text-[#20242C] transition hover:bg-[#F7F5F0]"
                      >
                        More…
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <div
            className={`tool-glass-inset min-h-[88px] rounded-xl px-4 py-3 text-base leading-relaxed sm:min-h-[100px] sm:text-[1.1rem] ${
              output ? "text-[#20242C]" : "text-ink-mute/70"
            }`}
            aria-live="polite"
          >
            {!output && "Converted title will appear here…"}
            {output && highlightChanges && diff ? (
              <span className="whitespace-pre-wrap break-words">
                {diff.afterParts.map((p, i) =>
                  p.highlight ? (
                    <mark
                      key={i}
                      className="rounded-sm bg-amber-300/50 text-navy-900"
                    >
                      {p.text}
                    </mark>
                  ) : (
                    <span key={i}>{p.text}</span>
                  )
                )}
              </span>
            ) : (
              output && <span className="whitespace-pre-wrap break-words">{output}</span>
            )}
          </div>

          {showExplanations && detailed && detailed.words.length > 0 && (
            <div className="tool-glass-inset mt-4 overflow-hidden rounded-xl">
              <div className="border-b border-navy-900/10 bg-white/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-mute">
                Word-by-word explanations
              </div>
              <ul className="divide-y divide-navy-900/5 text-sm">
                {detailed.words.map((w, i) => (
                  <li
                    key={`${w.original}-${i}`}
                    className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <span className="shrink-0 font-semibold text-[#20242C]">
                      {w.result}
                      {w.changed && (
                        <span className="ml-2 text-xs font-normal text-amber-700">
                          ({w.original} → {w.result})
                        </span>
                      )}
                    </span>
                    <span className="text-ink-mute">{w.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
