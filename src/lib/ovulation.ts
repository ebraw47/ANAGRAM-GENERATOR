/** Calendar-based ovulation estimates (luteal phase ≈ 14 days). */

export type CycleResult = {
  periodStart: Date;
  cycleLength: number;
  ovulationDate: Date;
  nextPeriodDate: Date;
  fertileStart: Date;
  fertileEnd: Date;
  fertileDays: Date[];
  cycleDayOfOvulation: number;
};

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function addDays(d: Date, days: number): Date {
  const x = startOfDay(d);
  x.setDate(x.getDate() + days);
  return x;
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatLong(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatShort(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Estimate ovulation and fertile window from LMP + average cycle length.
 * Ovulation ≈ cycleLength - 14 (luteal phase).
 * Fertile window ≈ 5 days before ovulation through ovulation day (6 days).
 */
export function calculateCycle(periodStart: Date, cycleLength: number): CycleResult {
  const start = startOfDay(periodStart);
  const length = Math.min(45, Math.max(21, Math.round(cycleLength)));
  const luteal = 14;
  const cycleDayOfOvulation = Math.max(8, length - luteal);
  const ovulationDate = addDays(start, cycleDayOfOvulation - 1);
  const nextPeriodDate = addDays(start, length);
  const fertileStart = addDays(ovulationDate, -5);
  const fertileEnd = ovulationDate;
  const fertileDays: Date[] = [];
  for (let i = 0; i <= 5; i++) {
    fertileDays.push(addDays(fertileStart, i));
  }

  return {
    periodStart: start,
    cycleLength: length,
    ovulationDate,
    nextPeriodDate,
    fertileStart,
    fertileEnd,
    fertileDays,
    cycleDayOfOvulation,
  };
}

export type DayKind = "period" | "fertile" | "ovulation" | "luteal" | "other";

export function classifyDay(date: Date, result: CycleResult): DayKind {
  const d = startOfDay(date);
  if (sameDay(d, result.ovulationDate)) return "ovulation";
  if (result.fertileDays.some((f) => sameDay(f, d))) return "fertile";
  // Approximate period: first 5 days of cycle
  const dayIndex = Math.round((d.getTime() - result.periodStart.getTime()) / 86400000);
  if (dayIndex >= 0 && dayIndex < 5) return "period";
  if (d > result.ovulationDate && d < result.nextPeriodDate) return "luteal";
  return "other";
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
