import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "./Reveal";

/* ---------- count-up number ---------- */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setValue(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {String(value).padStart(2, "0")}
      {suffix}
    </span>
  );
}

const STATS = [
  { to: 12, label: "Years of practice" },
  { to: 46, label: "Exhibitions", suffix: "+" },
  { to: 18, label: "Public collections" },
  { to: 7, label: "Light awards" },
];

const FACTS: [string, string][] = [
  ["Based", "Berlin — Prenzlauer Berg studio"],
  ["Practice", "Light & spatial installation"],
  ["Materials", "Steel, glass, resin, photon"],
  ["Status", "Open for commissions 2026"],
];

const PROCESS = [
  {
    n: "01",
    title: "Listen",
    text: "Every commission begins in silence — walking the site, measuring its quiet.",
  },
  {
    n: "02",
    title: "Study",
    text: "Material sketches and wavelength tests until the idea has weight.",
  },
  {
    n: "03",
    title: "Fabricate",
    text: "Steel folded, glass blown, renders resolved — by hand and by code.",
  },
  {
    n: "04",
    title: "Install",
    text: "Light is tuned on site at dusk, when the room tells the truth.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      {/* ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(46% 42% at 85% 12%, rgba(201,164,95,0.07) 0%, rgba(10,10,12,0) 62%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="max-w-3xl">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" /> 02 — The artist
            </p>
            <h2 className="font-display text-6xl font-bold leading-[0.9] text-bone md:text-8xl">
              Between
              <br />
              matter <span className="text-gold">&amp;</span> light
              <span className="text-gold">.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-9 text-[15px] leading-relaxed text-fog md:text-base">
              Artist builds rooms that breathe. Trained as a sculptor and
              self-taught in photonics, the practice lives at the seam where
              heavy materials — steel, glass, resin — dissolve into atmosphere.
              The installations do not illuminate a space; they{" "}
              <span className="text-bone">listen to it</span>, then answer in
              gradients, fog and slow-moving shadow.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-fog md:text-base">
              Since the first solo show in 2022, the work has entered eighteen
              public collections and earned a reputation for turning
              architecture into an instrument of stillness.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <dl className="mt-10 grid grid-cols-1 gap-x-10 gap-y-4 border-t border-bone/[0.08] pt-7 sm:grid-cols-2">
              {FACTS.map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-baseline justify-between gap-6 border-b border-bone/[0.05] pb-3 sm:block"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-5xl font-bold text-bone md:text-6xl">
                    <Counter to={s.to} suffix={s.suffix ?? ""} />
                  </p>
                  <p className="mt-2 font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.2em] text-fog">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* process strip */}
        <Reveal delay={0.1} className="mt-24 md:mt-28">
          <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            <span className="h-px w-8 bg-gold/60" /> Process — how a piece arrives
          </p>
        </Reveal>
        <div className="grid gap-px overflow-hidden rounded-xl border border-bone/[0.07] bg-bone/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="h-full">
              <div className="group h-full bg-coal px-7 py-9 transition-colors duration-500 hover:bg-carbon">
                <span className="font-mono text-[11px] tracking-[0.3em] text-gold/70 transition-colors duration-500 group-hover:text-gold">
                  {p.n}
                </span>
                <h3 className="mt-5 font-display text-3xl font-bold text-bone">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-fog">{p.text}</p>
                <span className="mt-6 block h-px w-8 bg-gold/30 transition-all duration-500 group-hover:w-full group-hover:bg-gold/60" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
