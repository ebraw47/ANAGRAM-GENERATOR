"use client";

import { useState } from "react";
import { BRAND, SITE_ORIGIN } from "@/lib/siteConfig";

type Props = {
  className?: string;
  /** light = for dark/transparent headers; dark = for light surfaces */
  tone?: "light" | "dark";
  label?: boolean;
};

export default function ShareButton({ className = "", tone = "dark", label = false }: Props) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : SITE_ORIGIN;
  const shareTitle = BRAND.name;
  const shareText = `${BRAND.tagline} — free tool on ${BRAND.domain}`;

  const onShare = async () => {
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // User cancelled share sheet — ignore
    }
  };

  const toneClass =
    tone === "light"
      ? "border-white/25 bg-white/10 text-white hover:bg-white/20"
      : "border-navy-200 bg-white text-brand hover:bg-brand-soft";

  return (
    <button
      type="button"
      onClick={onShare}
      className={`inline-flex items-center gap-1.5 rounded-xl border px-2.5 py-2 text-xs font-bold transition focus-ring ${toneClass} ${className}`}
      aria-label={copied ? "Link copied" : `Share ${BRAND.name}`}
      title={copied ? "Link copied" : "Share this tool"}
    >
      {copied ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="18" cy="5" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="19" r="2.5" />
          <path strokeLinecap="round" d="M8.5 13.5l7 4M15.5 6.5l-7 4" />
        </svg>
      )}
      {label ? <span>{copied ? "Copied" : "Share"}</span> : null}
    </button>
  );
}
