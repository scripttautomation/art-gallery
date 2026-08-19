const WORDS = ["Light", "Matter", "Depth", "Silence", "Form", "Photon", "Shadow", "Motion"];

function Row({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-10 pr-10"
    >
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center gap-10">
          <span
            className={
              i % 2 === 0
                ? "font-display text-2xl font-bold uppercase tracking-[0.12em] text-bone/80 md:text-4xl"
                : "text-outline-faint font-display text-2xl font-bold uppercase tracking-[0.12em] md:text-4xl"
            }
          >
            {w}
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" className="text-gold/70" aria-hidden>
            <rect x="1.5" y="1.5" width="7" height="7" transform="rotate(45 5 5)" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Slow typographic conveyor between sections. */
export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-bone/[0.06] bg-coal/60 py-5">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row ariaHidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
