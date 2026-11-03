"use client";

import { useEffect, useState, useTransition } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ShareButton from "@/components/ShareButton";
import {
  MONTH_NAMES,
  calculateCycle,
  classifyDay,
  daysInMonth,
  formatLong,
  formatShort,
  sameDay,
  startOfDay,
  type CycleResult,
} from "@/lib/ovulation";

const CYCLE_MIN = 21;
const CYCLE_MAX = 40;

function FertilityRing({
  result,
  reduce,
}: {
  result: CycleResult;
  reduce: boolean | null;
}) {
  const size = 220;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const ovulationFrac = (result.cycleDayOfOvulation - 1) / result.cycleLength;
  const fertileStartFrac = Math.max(0, (result.cycleDayOfOvulation - 6) / result.cycleLength);
  const fertileLen = Math.min(6, result.cycleDayOfOvulation) / result.cycleLength;

  return (
    <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center">
      <svg width={size} height={size} className="-rotate-90" aria-hidden>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#F8BBD0"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * 0.18} ${c}`}
          initial={reduce ? false : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - 5 / result.cycleLength) }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          opacity={0.55}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#F48FB1"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c * fertileLen} ${c}`}
          initial={reduce ? false : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - fertileStartFrac - fertileLen) }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#EC407A"
          strokeWidth={stroke + 2}
          strokeLinecap="round"
          strokeDasharray={`${c * 0.02} ${c}`}
          initial={reduce ? false : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: c * (1 - ovulationFrac - 0.01) }}
          transition={{ duration: 1.05, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
          Ovulation
        </p>
        <p className="mt-1 font-display text-2xl font-bold text-white">
          {formatShort(result.ovulationDate)}
        </p>
        <p className="mt-1 text-xs text-white/55">Day {result.cycleDayOfOvulation}</p>
      </div>
    </div>
  );
}

function MiniCalendar({
  month,
  year,
  selected,
  onSelect,
  result,
}: {
  month: number;
  year: number;
  selected: Date | null;
  onSelect: (d: Date) => void;
  result: CycleResult | null;
}) {
  const firstDow = new Date(year, month, 1).getDay();
  const total = daysInMonth(year, month);
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDow }, () => null),
    ...Array.from({ length: total }, (_, i) => i + 1),
  ];

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[10px] font-semibold uppercase tracking-wider text-ink-mute">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={`${d}-${i}`}>{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <span key={`e-${i}`} />;
          const date = new Date(year, month, day);
          const isSelected = selected && sameDay(date, selected);
          const kind = result ? classifyDay(date, result) : null;
          const kindClass =
            kind === "ovulation"
              ? "bg-coral text-white"
              : kind === "fertile"
                ? "bg-blush text-ink"
                : kind === "period"
                  ? "bg-navy-100 text-navy-800"
                  : isSelected
                    ? "bg-brand text-white"
                    : "bg-white/80 text-ink hover:bg-brand-soft";

          return (
            <button
              key={day}
              type="button"
              onClick={() => onSelect(startOfDay(date))}
              className={`aspect-square rounded-lg text-xs font-semibold transition ${kindClass} ${
                isSelected && kind !== "ovulation" ? "ring-2 ring-brand ring-offset-1" : ""
              }`}
              aria-label={`Select ${MONTH_NAMES[month]} ${day}, ${year}`}
              aria-pressed={!!isSelected}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function OvulationCalculator() {
  // Fixed calendar seed avoids SSR/client timezone hydration mismatches
  const [viewMonth, setViewMonth] = useState(10); // November
  const [viewYear, setViewYear] = useState(2026);
  const [periodStart, setPeriodStart] = useState<Date | null>(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState<CycleResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isPending, startTransition] = useTransition();
  const reduce = useReducedMotion();

  useEffect(() => {
    const now = startOfDay(new Date());
    setViewMonth(now.getMonth());
    setViewYear(now.getFullYear());
  }, []);

  const shiftMonth = (dir: -1 | 1) => {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    } else if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewMonth(m);
    setViewYear(y);
  };

  const onCalculate = () => {
    if (!periodStart) return;
    startTransition(() => {
      const next = calculateCycle(periodStart, cycleLength);
      setResult(next);
      setShowResult(true);
    });
  };

  const onReset = () => {
    setShowResult(false);
    setResult(null);
  };

  return (
    <div className="mx-auto w-full max-w-[920px]">
      {/* Tablet chassis */}
      <div className="relative rounded-[2rem] bg-gradient-to-b from-[#4a1838] to-[#2a1520] p-3 shadow-tablet sm:rounded-[2.4rem] sm:p-4">
        <div className="pointer-events-none absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/15 sm:top-2.5 sm:h-2 sm:w-20" />

        <div className="overflow-hidden rounded-[1.5rem] bg-[#FFF7FA] sm:rounded-[1.85rem]">
          {/* Status bar */}
          <div className="flex items-center justify-between border-b border-navy-100/80 bg-white/70 px-4 py-2.5 backdrop-blur-sm sm:px-5">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand text-[10px] font-bold text-white">
                OC
              </span>
              <div>
                <p className="font-display text-sm font-bold leading-none text-ink">Cycle Studio</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-ink-mute">
                  Live estimate
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-3 text-[10px] font-semibold uppercase tracking-wide text-ink-mute sm:flex">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-navy-500" /> Period
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-blush" /> Fertile
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-coral" /> Ovulation
                </span>
              </div>
              <ShareButton tone="dark" label className="!py-1.5" />
            </div>
          </div>

          <div className="relative min-h-[420px] p-4 sm:min-h-[460px] sm:p-6">
            <AnimatePresence mode="wait" initial={false}>
              {!showResult || !result ? (
                <motion.div
                  key="input"
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]"
                >
                  <div>
                    <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                      First day of your last period
                    </h2>
                    <p className="mt-1 text-sm text-ink-mute">
                      Tap a date on the cycle pad — we&apos;ll map your fertile stretch.
                    </p>

                    <div className="mt-4 rounded-2xl border border-navy-100 bg-gradient-to-br from-white to-navy-50/80 p-4 shadow-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-display text-base font-bold text-navy-800">
                          {MONTH_NAMES[viewMonth]} {viewYear}
                        </p>
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => shiftMonth(-1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-200 bg-white text-ink transition hover:bg-navy-50"
                            aria-label="Previous month"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            onClick={() => shiftMonth(1)}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-navy-200 bg-white text-ink transition hover:bg-navy-50"
                            aria-label="Next month"
                          >
                            ›
                          </button>
                        </div>
                      </div>
                      <MiniCalendar
                        month={viewMonth}
                        year={viewYear}
                        selected={periodStart}
                        onSelect={setPeriodStart}
                        result={null}
                      />
                      {periodStart ? (
                        <p className="mt-3 rounded-xl bg-brand-soft px-3 py-2 text-sm font-medium text-navy-800">
                          Selected: {formatLong(periodStart)}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <h3 className="font-display text-lg font-bold text-ink">Average cycle length</h3>
                    <p className="mt-1 text-sm text-ink-mute">
                      Typical cycles run 21–35 days. Default is 28.
                    </p>

                    <div className="mt-5 rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                      <div className="flex items-end justify-between">
                        <span className="font-display text-4xl font-extrabold tracking-tight text-brand">
                          {cycleLength}
                        </span>
                        <span className="pb-1 text-sm font-semibold text-ink-mute">days</span>
                      </div>
                      <input
                        type="range"
                        min={CYCLE_MIN}
                        max={CYCLE_MAX}
                        value={cycleLength}
                        onChange={(e) => setCycleLength(Number(e.target.value))}
                        className="mt-4 w-full accent-brand"
                        aria-label="Average cycle length in days"
                      />
                      <div className="mt-1 flex justify-between text-[10px] font-semibold uppercase tracking-wide text-ink-mute">
                        <span>{CYCLE_MIN}</span>
                        <span>{CYCLE_MAX}</span>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl bg-gradient-to-br from-[#4a0e2e] to-[#C2185B] p-4 text-white shadow-soft">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                        Preview
                      </p>
                      <p className="mt-2 font-display text-lg font-bold leading-snug">
                        Fertile window lights up after you calculate
                      </p>
                      <p className="mt-1.5 text-sm text-white/70">
                        About six peak days · ovulation ~14 days before next period
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={!periodStart || isPending}
                      onClick={onCalculate}
                      className="mt-auto pt-5"
                    >
                      <span
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-2xl px-5 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition ${
                          periodStart
                            ? "bg-coral shadow-soft hover:bg-coral-dark"
                            : "cursor-not-allowed bg-ink-mute/40"
                        }`}
                      >
                        {isPending ? "Mapping cycle…" : "Calculate fertile window"}
                        <span aria-hidden>→</span>
                      </span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={reduce ? false : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-[#2a1520] via-[#4a0e2e] to-[#C2185B] p-5 text-white shadow-lift">
                    <FertilityRing result={result} reduce={reduce} />
                    <div className="mt-2 space-y-2.5">
                      <div className="rounded-xl bg-white/10 px-3 py-2.5 backdrop-blur-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                          Fertile window
                        </p>
                        <p className="font-display text-base font-bold">
                          {formatShort(result.fertileStart)} – {formatShort(result.fertileEnd)}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-xl bg-white/10 px-3 py-2.5">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                            Ovulation
                          </p>
                          <p className="text-sm font-bold">{formatShort(result.ovulationDate)}</p>
                        </div>
                        <div className="rounded-xl bg-white/10 px-3 py-2.5">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                            Next period
                          </p>
                          <p className="text-sm font-bold">{formatShort(result.nextPeriodDate)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                          Your cycle map
                        </h2>
                        <p className="mt-1 text-sm text-ink-mute">
                          Peak odds are usually 1–2 days before ovulation.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={onReset}
                        className="shrink-0 rounded-xl border border-navy-200 bg-white px-3 py-2 text-xs font-bold uppercase tracking-wide text-navy-800 transition hover:bg-navy-50"
                      >
                        Recalculate
                      </button>
                    </div>

                    <div className="mt-4 rounded-2xl border border-navy-100 bg-white p-4 shadow-sm">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="font-display text-base font-bold text-navy-800">
                          {MONTH_NAMES[result.ovulationDate.getMonth()]}{" "}
                          {result.ovulationDate.getFullYear()}
                        </p>
                      </div>
                      <MiniCalendar
                        month={result.ovulationDate.getMonth()}
                        year={result.ovulationDate.getFullYear()}
                        selected={result.periodStart}
                        onSelect={() => {}}
                        result={result}
                      />
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-mute">
                        Fertile days timeline
                      </p>
                      <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {result.fertileDays.map((d, i) => {
                          const isO = sameDay(d, result.ovulationDate);
                          return (
                            <motion.div
                              key={d.toISOString()}
                              initial={reduce ? false : { opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.08 * i }}
                              className={`min-w-[4.5rem] flex-1 rounded-xl px-2 py-2.5 text-center ${
                                isO ? "bg-coral text-white" : "bg-blush-soft text-ink"
                              }`}
                            >
                              <p className="text-[10px] font-bold uppercase opacity-70">
                                {isO ? "Peak" : `Day ${i + 1}`}
                              </p>
                              <p className="text-sm font-bold">{formatShort(d)}</p>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-ink-mute">
                      Estimates only — cycles vary. Do not use this tool alone to prevent pregnancy.
                      Talk with a clinician for pregnancy planning or contraception.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div className="flex justify-center bg-white/60 pb-2.5 pt-1">
            <span className="h-1 w-24 rounded-full bg-ink/15" />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-white/65 sm:text-sm">
        Tip: for irregular cycles, pair this estimate with ovulation tests or cervical mucus tracking.
      </p>
    </div>
  );
}
