"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND, ROUTES, SITE_ORIGIN } from "@/lib/siteConfig";

export default function FixedSideActions() {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : SITE_ORIGIN;
    const shareTitle = BRAND.name;
    const shareText = `${BRAND.tagline} — free tool on ${BRAND.domain}`;

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

  const btnClass =
    "inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand/25 bg-white/90 text-brand shadow-[0_8px_24px_rgba(47,82,56,0.18)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-brand/50 hover:bg-white hover:text-brand-dark focus-ring";

  return (
    <aside
      className="pointer-events-none fixed right-3 top-1/2 z-[60] -translate-y-1/2 sm:right-4"
      aria-label="Quick actions"
    >
      <div className="pointer-events-auto flex flex-col gap-2.5">
        <button
          type="button"
          onClick={onShare}
          className={btnClass}
          aria-label={copied ? "Link copied" : `Share ${BRAND.name}`}
          title={copied ? "Link copied" : "Share"}
        >
          {copied ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <circle cx="18" cy="5" r="2.5" />
              <circle cx="6" cy="12" r="2.5" />
              <circle cx="18" cy="19" r="2.5" />
              <path strokeLinecap="round" d="M8.5 13.5l7 4M15.5 6.5l-7 4" />
            </svg>
          )}
        </button>

        <Link
          href={ROUTES.contact}
          className={btnClass}
          aria-label="Send feedback"
          title="Feedback"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            />
          </svg>
        </Link>
      </div>
    </aside>
  );
}
