import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { PORTRAIT } from "../data/works";

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

/* ---------- tilt-framed portrait ---------- */

function TiltPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 90, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 90, damping: 16 });

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      style={{ perspective: "1100px" }}
      onMouseMove={(e) => {
        if (reduced) return;
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {/* offset gold frame */}
      <div className="absolute -right-4 -top-4 h-full w-full border border-gold/30" aria-hidden />
      <div className="absolute -left-4 -bottom-4 h-full w-full border border-bone/10" aria-hidden />

      <motion.div
        className="relative border border-bone/10 bg-bone/[0.03] p-3 backdrop-blur-sm"
        style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry, transformStyle: "preserve-3d" }}
      >
        <div className="relative overflow-hidden" style={{ transform: "translateZ(30px)" }}>
          <img
            src={PORTRAIT}
            alt="Portrait of Mara Vesper"
            className="aspect-[4/5] w-full object-cover"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
        </div>

        {/* floating caption card */}
        <div
          className="absolute -bottom-6 -left-6 border border-bone/10 bg-coal/85 px-5 py-4 shadow-card backdrop-blur-md"
          style={{ transform: "translateZ(60px)" }}
        >
          <p className="font-display text-sm font-bold tracking-tight text-bone">Mara Vesper</p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-fog">
            b. 1989 — Berlin, DE
          </p>
        </div>

        {/* status chip */}
        <div
          className="absolute -right-5 top-8 flex items-center gap-2 border border-gold/40 bg-ink/80 px-4 py-2.5 shadow-glow-soft backdrop-blur-md"
          style={{ transform: "translateZ(70px)" }}
        >
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-gold">
            Open for commissions
          </span>
        </div>
      </motion.div>
    </div>
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
            "radial-gradient(46% 42% at 85% 18%, rgba(201,164,95,0.07) 0%, rgba(10,10,12,0) 62%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
          {/* text side */}
          <div>
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-8 bg-gold/60" /> 03 — The artist
              </p>
              <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone md:text-7xl">
                Between
                <br />
                matter <span className="text-gold">&amp;</span> light
                <span className="text-gold">.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-9 max-w-xl text-[15px] leading-relaxed text-fog md:text-base">
                Mara Vesper builds rooms that breathe. Trained as a sculptor and
                self-taught in photonics, she works at the seam where heavy
                materials — steel, glass, resin — dissolve into atmosphere. Her
                installations do not illuminate a space; they{" "}
                <span className="text-bone">listen to it</span>, then answer in
                gradients, fog and slow-moving shadow.
              </p>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fog md:text-base">
                Since her debut <em className="not-italic text-bone">First Light</em>{" "}
                (Copenhagen, 2022), her work has entered eighteen public
                collections and earned a reputation for turning architecture
                into an instrument of stillness.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-10 grid max-w-xl grid-cols-1 gap-x-10 gap-y-4 border-t border-bone/[0.08] pt-7 sm:grid-cols-2">
                {FACTS.map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-6 border-b border-bone/[0.05] pb-3 sm:block">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">{k}</dt>
                    <dd className="mt-1 text-sm text-bone">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 grid max-w-xl grid-cols-2 gap-8 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-4xl font-extrabold tracking-tight text-bone md:text-5xl">
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

          {/* portrait side */}
          <Reveal from="right" delay={0.15}>
            <TiltPortrait />
          </Reveal>
        </div>

        {/* process strip */}
        <Reveal delay={0.1} className="mt-24 md:mt-32">
          <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-fog">
            <span className="h-px w-8 bg-gold/60" /> Process — how a piece arrives
          </p>
        </Reveal>
        <div className="grid gap-px overflow-hidden border border-bone/[0.07] bg-bone/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.08} className="h-full">
              <div className="group h-full bg-coal px-7 py-9 transition-colors duration-500 hover:bg-carbon">
                <span className="font-mono text-[11px] tracking-[0.3em] text-gold/70 transition-colors duration-500 group-hover:text-gold">
                  {p.n}
                </span>
                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-bone">
                  {p.title}
                </h3>
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
