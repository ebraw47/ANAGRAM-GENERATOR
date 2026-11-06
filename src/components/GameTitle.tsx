export default function GameTitle({ className = "" }: { className?: string }) {
  return (
    <h2
      className={`font-display text-xl font-semibold tracking-tight text-white sm:text-2xl ${className}`}
      aria-label="Wordle Word Finder"
    >
      <span className="text-[#7BE88A]">Wordle</span>
      <span className="mx-1.5 text-white/35">·</span>
      <span className="text-[#FFE14D]">Word Finder</span>
    </h2>
  );
}
