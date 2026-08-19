import Reveal from "./Reveal";
import { EXHIBITIONS } from "../data/works";

export default function Exhibitions() {
  return (
    <section id="exhibitions" className="relative scroll-mt-24 py-24 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" /> 02 — Exhibitions
            </p>
            <h2 className="font-display text-6xl font-bold leading-[0.9] text-bone md:text-8xl">
              Where the
              <br />
              art has lived<span className="text-gold">.</span>
            </h2>
            <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-fog">
              Selected exhibitions &amp; shows — a slow map of rooms that
              agreed to go dark for a while.
            </p>
            <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-bone/10 bg-coal/60 px-5 py-3">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-gold" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-fog">
                Next — Berlin, spring 2026
              </span>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <div className="border-t border-bone/[0.07]">
              {EXHIBITIONS.map((e, i) => (
                <Reveal key={`${e.year}-${e.title}`} delay={i * 0.05}>
                  <div className="expo-row group grid grid-cols-[auto_1fr_auto] items-baseline gap-5 rounded-lg border-b border-bone/[0.07] px-2 py-6 md:grid-cols-[88px_1fr_auto_auto] md:gap-8">
                    <span className="font-mono text-xs tracking-[0.18em] text-gold">{e.year}</span>
                    <div>
                      <h3 className="expo-title font-display text-3xl font-semibold leading-none text-bone md:text-4xl">
                        {e.title}
                      </h3>
                      <p className="mt-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-fog">
                        {e.type}
                      </p>
                    </div>
                    <span className="hidden text-sm text-fog md:block">
                      {e.venue} — {e.location}
                    </span>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      className="expo-arrow self-center text-fog/40"
                      aria-hidden
                    >
                      <path d="M3 12L12 3M5 3h7v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.1} className="mt-20 text-center">
          <p className="mx-auto max-w-3xl font-display text-4xl font-medium leading-snug text-bone/85 md:text-5xl">
            “Art is not what you see —{" "}
            <span className="text-gold">it's the pause</span> the room takes
            when the light changes.”
          </p>
        </Reveal>
      </div>
    </section>
  );
}
