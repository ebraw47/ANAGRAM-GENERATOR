/** Shared static box-grid pattern for page banners (cool blue tint, no animation). */
export const BOX_PATTERN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect x='1' y='1' width='30' height='30' rx='3' fill='none' stroke='%23ffffff' stroke-opacity='0.28' stroke-width='1'/%3E%3Crect x='33' y='33' width='30' height='30' rx='3' fill='none' stroke='%23FFB86B' stroke-opacity='0.22' stroke-width='1'/%3E%3C/svg%3E\")";

/** Lightweight overlay for page headers (Blog, About, articles, etc.) */
export function PageBannerPattern({ opacity = 0.55 }: { opacity?: number }) {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: BOX_PATTERN,
        backgroundSize: "64px 64px",
        backgroundPosition: "center top",
        opacity,
      }}
      aria-hidden
    />
  );
}
