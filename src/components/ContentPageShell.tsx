import type { ReactNode } from "react";
import { BRAND } from "@/lib/siteConfig";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  wide?: boolean;
};

/** Shared chrome for About / Contact / Privacy / Disclaimer */
export default function ContentPageShell({
  title,
  description,
  children,
  wide = false,
}: Props) {
  return (
    <div className="text-ink">
      <header className="relative overflow-hidden border-b border-black/5 bg-[#1a1d1a]">
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 85% 20%, rgba(63,107,75,0.45), transparent 55%)",
          }}
        />
        <div className={`relative mx-auto px-4 py-12 md:px-8 md:py-16 ${wide ? "max-w-7xl" : "max-w-3xl"}`}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {BRAND.name}
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </header>

      <div className={`mx-auto w-full min-w-0 max-w-full px-3 py-8 sm:px-4 md:px-8 md:py-14 ${wide ? "md:max-w-7xl" : "md:max-w-3xl"}`}>
        <div className="min-w-0 max-w-full overflow-x-hidden rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:rounded-[1.75rem] sm:bg-white/80 sm:p-6 sm:backdrop-blur-sm md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
