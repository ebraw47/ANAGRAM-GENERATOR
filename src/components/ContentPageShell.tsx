import type { ReactNode } from "react";
import { PageBannerPattern } from "@/components/BoxPattern";
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
    <div className="text-[#20242C]">
      <header className="page-banner relative overflow-hidden border-b border-navy-900/10">
        <PageBannerPattern opacity={0.2} />
        <div className={`relative mx-auto px-4 py-12 md:px-6 md:py-16 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-mute">
            {BRAND.name}
          </p>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-[#20242C] md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {description}
            </p>
          ) : null}
        </div>
      </header>

      <div className={`mx-auto px-4 py-10 md:px-6 md:py-14 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        {children}
      </div>
    </div>
  );
}
