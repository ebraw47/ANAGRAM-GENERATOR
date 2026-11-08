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

  const titleStyles = STYLE_OPTIONS.filter((s) => s.group === "Title Case");
  const otherStyles = STYLE_OPTIONS.filter((s) => s.group === "Other");

  const optionClass =
    "inline-flex items-center gap-2 text-sm text-ink-soft cursor-pointer select-none";
  const checkClass =
    "h-3.5 w-3.5 rounded-sm border-navy-900/30 bg-white text-brand focus:ring-brand focus:ring-offset-0";

  const styleLink = (active: boolean) =>
    active
      ? "border-b-2 border-brand pb-0.5 font-bold text-brand"
      : "border-b border-dotted border-ink-mute/50 pb-0.5 font-medium text-ink-soft hover:border-brand hover:text-brand";

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="tool-glass overflow-hidden">
        {/* Input — layout mirrors top-ranked titlecaseconverter.com */}
        <div className="border-b-2 border-navy-900/10 p-3 sm:p-5 md:p-6">
          <label className="block">
            <span className="sr-only">Enter a title</span>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={onPaste}
              onKeyDown={onKeyDown}
              placeholder={PLACEHOLDER}
              rows={multiLine ? 4 : 3}
              spellCheck
              className="tool-glass-inset w-full resize-y rounded-none px-3 py-3 text-base leading-relaxed text-ink placeholder:text-ink-mute/70 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 sm:min-h-[128px] sm:px-4 sm:text-[1.05rem]"
            />
          </label>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-ink-mute sm:text-sm" aria-live="polite">
              {stats.words} words · {stats.chars} characters · {stats.lines} lines
              {stats.chars > 0 && (
                <span className={stats.chars > 60 ? " text-brand" : " text-ink-mute/80"}>
                  {" "}
                  · SEO {stats.chars <= 60 ? "OK" : "may truncate"}
                </span>
              )}
            </p>

            <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
              <button
                type="button"
                onClick={() => runConvert()}
                className="hard-shadow-ink border-2 border-navy-900 bg-brand px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-brand-dark focus-ring sm:px-5 sm:py-2"
              >
                Convert
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="hard-shadow-ink border-2 border-navy-900 bg-white px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-ink transition hover:bg-paper focus-ring sm:px-5 sm:py-2"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Styles — text-link style like .com */}
        <div className="space-y-5 border-b-2 border-navy-900/10 px-3 py-4 sm:px-6 sm:py-5">
          <fieldset>
            <legend className="mb-2.5 text-sm font-bold text-ink">Title Case</legend>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2" role="radiogroup" aria-label="Title case style">
              {titleStyles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={mode === s.id}
                  title={STYLE_HELP[s.id]}
                  onClick={() => setMode(s.id)}
                  className={`text-sm transition focus-ring sm:text-[0.95rem] ${styleLink(mode === s.id)}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setStyleHelpOpen((v) => !v)}
              className="mt-3 text-xs font-semibold text-brand underline decoration-brand/40 underline-offset-2 hover:text-brand-dark"
            >
              Which title case style should I use?
            </button>
            {styleHelpOpen && (
              <div className="tool-glass-inset mt-3 p-3 text-sm text-ink-soft sm:p-4">
                <p className="mb-2 font-semibold text-ink">{STYLE_OPTIONS.find((s) => s.id === mode)?.label}</p>
                <p>{STYLE_HELP[mode]}</p>
                <ul className="mt-3 grid gap-1.5 text-xs text-ink-mute sm:grid-cols-2">
                  {titleStyles.map((s) => (
                    <li key={s.id}>
                      <strong className="text-ink">{s.label}:</strong> {STYLE_HELP[s.id]}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend className="mb-2.5 text-sm font-bold text-ink">Other Styles</legend>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2" role="radiogroup" aria-label="Other case styles">
              {otherStyles.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={mode === s.id}
                  title={STYLE_HELP[s.id]}
                  onClick={() => setMode(s.id)}
                  className={`text-sm transition focus-ring sm:text-[0.95rem] ${styleLink(mode === s.id)}`}
                >
                  {s.id === "sentence" ? "Sentence case (proper nouns)" : s.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2.5 text-sm font-bold text-ink">Options</legend>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              <label className={optionClass}>
                <input type="checkbox" className={checkClass} checked={keepAllCaps} onChange={(e) => setKeepAllCaps(e.target.checked)} />
                Keep Words in All Caps
              </label>
              <label className={optionClass}>
                <input type="checkbox" className={checkClass} checked={multiLine} onChange={(e) => setMultiLine(e.target.checked)} />
                Enable Multi-Line Input
              </label>
              <label className={optionClass}>
                <input type="checkbox" className={checkClass} checked={showExplanations} onChange={(e) => setShowExplanations(e.target.checked)} />
                Show Explanations
              </label>
              <label className={optionClass}>
                <input type="checkbox" className={checkClass} checked={highlightChanges} onChange={(e) => setHighlightChanges(e.target.checked)} />
                Highlight Changes
              </label>
              <label className={optionClass}>
                <input type="checkbox" className={checkClass} checked={straightQuotes} onChange={(e) => setStraightQuotes(e.target.checked)} />
                Use Straight Quotes
              </label>
              <label className={optionClass}>
                <input type="checkbox" className={checkClass} checked={convertOnPaste} onChange={(e) => setConvertOnPaste(e.target.checked)} />
                Convert When Text Is Pasted
              </label>
            </div>
          </fieldset>
        </div>

        {/* Result */}
        <div className="px-3 py-4 sm:px-6 sm:py-5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-sm font-bold text-ink">Result</p>
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
                className="border border-navy-900/20 bg-navy-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
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
                  className="border border-navy-900/20 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink transition hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-40 focus-ring"
                >
                  Share
                </button>
                {shareOpen && output ? (
                  <div
                    role="menu"
                    className="absolute right-0 z-20 mt-1.5 min-w-[11.5rem] overflow-hidden border-2 border-navy-900 bg-white py-1 hard-shadow"
                  >
                    {[
                      { label: "Email", onClick: shareToEmail },
                      { label: "Google Docs", onClick: shareToDocs },
                      { label: "Notepad (.txt)", onClick: shareToNotepad },
                      { label: "MS Word (.doc)", onClick: shareToWord },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        role="menuitem"
                        onClick={item.onClick}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-ink transition hover:bg-brand-soft"
                      >
                        {item.label}
                      </button>
                    ))}
                    {canNativeShare ? (
                      <button
                        type="button"
                        role="menuitem"
                        onClick={shareNative}
                        className="flex w-full items-center gap-2 border-t border-navy-900/10 px-3 py-2 text-left text-xs font-semibold text-ink transition hover:bg-brand-soft"
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
            className={`tool-glass-inset min-h-[88px] px-4 py-3 text-base leading-relaxed sm:min-h-[100px] sm:text-[1.1rem] ${
              output ? "text-ink" : "text-ink-mute/70"
            }`}
            aria-live="polite"
          >
            {!output && "Converted title will appear here…"}
            {output && highlightChanges && diff ? (
              <span className="whitespace-pre-wrap break-words">
                {diff.afterParts.map((p, i) =>
                  p.highlight ? (
                    <mark key={i} className="rounded-sm bg-brand/25 text-ink">
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
            <div className="mt-4 overflow-hidden border-2 border-navy-900">
              <div className="border-b-2 border-brand bg-navy-900 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
                Word-by-word explanations
              </div>
              <ul className="divide-y divide-navy-900/10 bg-white text-sm">
                {detailed.words.map((w, i) => (
                  <li
                    key={`${w.original}-${i}`}
                    className="flex flex-col gap-0.5 px-4 py-2.5 even:bg-paper sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <span className="shrink-0 font-semibold text-ink">
                      {w.result}
                      {w.changed && (
                        <span className="ml-2 text-xs font-normal text-brand">
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
