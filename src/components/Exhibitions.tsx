import Reveal from "./Reveal";
import { EXHIBITIONS } from "../data/works";

export default function Exhibitions() {
  return (
    <section id="exhibitions" className="relative scroll-mt-24 border-t border-bone/[0.06] bg-coal/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" /> 02 — Selected exhibitions
            </p>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone md:text-7xl">
              Shown in <span className="text-outline-faint">public</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-xs text-sm leading-relaxed text-fog">
              A decade of rooms, corridors and darkened halls — selected
              presentations from Copenhagen to Brescia.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-bone/[0.07]">
          {EXHIBITIONS.map((e, i) => (
            <Reveal key={`${e.year}-${e.title}`} delay={i * 0.05}>
              <div className="expo-row group grid grid-cols-2 items-baseline gap-x-4 gap-y-1 border-b border-bone/[0.07] px-2 py-6 md:grid-cols-[90px_1.3fr_1fr_auto_40px] md:gap-6 md:px-4">
                <span className="font-mono text-sm tracking-[0.2em] text-gold">{e.year}</span>
                <h3 className="expo-title font-display text-xl font-bold tracking-tight text-bone md:text-2xl">
                  {e.title}
                </h3>
                <p className="text-sm text-fog">
                  {e.venue}
                  <span className="text-fog/50"> — {e.location}</span>
                </p>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-fog/70 md:block">
                  {e.type}
                </span>
                <span className="expo-arrow hidden text-fog md:block" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M4.5 2H12v7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* pull quote */}
        <Reveal from="scale" className="mx-auto mt-20 max-w-4xl md:mt-28">
          <blockquote className="relative text-center">
            <span className="font-display text-7xl leading-none text-gold/30" aria-hidden>
              “
            </span>
            <p className="-mt-8 font-display text-2xl font-bold leading-snug tracking-tight text-bone md:text-[2.6rem] md:leading-[1.15]">
              I don&rsquo;t shape objects — I arrange the{" "}
              <span className="text-gold">silence</span> around them.
            </p>
            <footer className="mt-7 font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
              — M. Vesper, Nocturne Cycle catalogue
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
