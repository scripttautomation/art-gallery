import { useEffect, useRef, type MutableRefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Magnetic from "./Magnetic";

/* ---------- ambient particle field (gold dust) ---------- */

interface Particle {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  phase: number;
  depth: number;
  gold: boolean;
}

function ParticleCanvas({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let particles: Particle[] = [];

    const seed = () => {
      const count = Math.max(40, Math.min(90, Math.floor(w / 16)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.7,
        speed: 0.12 + Math.random() * 0.4,
        drift: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        depth: 0.25 + Math.random() * 0.75,
        gold: Math.random() < 0.42,
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let t = 0;
    const draw = (animate: boolean) => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (animate) {
          p.y -= p.speed;
          p.drift += 0.003;
          if (p.y < -8) {
            p.y = h + 8;
            p.x = Math.random() * w;
          }
        }
        const sway = Math.sin(p.drift + p.phase) * 14;
        const px = p.x + sway + mouse.current.x * 34 * p.depth;
        const py = p.y + mouse.current.y * 22 * p.depth;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * 2 + p.phase));
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? `rgba(201,164,95,${0.5 * tw * p.depth})`
          : `rgba(236,233,226,${0.26 * tw * p.depth})`;
        ctx.fill();
      }
    };

    const loop = () => {
      draw(true);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      draw(false);
    } else {
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, mouse]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

/* ---------- rotating circular badge ---------- */

function OrbitBadge() {
  return (
    <a
      href="#works"
      aria-label="Scroll to selected works"
      className="group relative hidden h-36 w-36 items-center justify-center lg:flex"
    >
      <svg viewBox="0 0 200 200" className="animate-spin-slower absolute inset-0 h-full w-full">
        <defs>
          <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-fog font-mono text-[11.5px] uppercase" style={{ letterSpacing: "0.42em" }}>
          <textPath href="#badge-circle">Selected works — 2019 · 2026 —&nbsp;</textPath>
        </text>
      </svg>
      <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink group-hover:shadow-glow">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M7 1v11M2.5 8L7 12.5 11.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}

/* ---------- 3D composition (CSS transforms, no WebGL) ---------- */

function DepthSculpture({ rx, ry }: { rx: MotionValue<number>; ry: MotionValue<number> }) {
  return (
    <motion.div
      className="relative h-[380px] w-[380px] md:h-[480px] md:w-[480px]"
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      aria-hidden
    >
      {/* orbit rings */}
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        <div className="animate-orbit-a absolute inset-4 rounded-full border border-gold/25" />
        <div className="animate-orbit-b absolute inset-14 rounded-full border border-bone/15" />
        <div className="animate-orbit-a absolute inset-24 rounded-full border border-gold/10" style={{ animationDuration: "34s" }} />
      </div>

      {/* glass shards at different Z depths */}
      <div
        className="absolute left-1/2 top-1/2 h-56 w-40 -translate-x-1/2 -translate-y-1/2 border border-bone/10 bg-bone/[0.035] backdrop-blur-md"
        style={{ transform: "translate(-50%, -50%) translateZ(70px) rotate(8deg)", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-40 w-56 border border-gold/20 bg-gold/[0.05] backdrop-blur-sm"
        style={{ transform: "translate(-50%, -50%) translateZ(120px) rotate(-6deg)", boxShadow: "0 30px 60px -20px rgba(0,0,0,0.6)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-24 w-24 border border-bone/10 bg-bone/[0.03] backdrop-blur-md"
        style={{ transform: "translate(-22%, -140%) translateZ(170px) rotate(14deg)" }}
      />

      {/* gold orb */}
      <div className="animate-float-y absolute left-1/2 top-1/2" style={{ transform: "translate(-50%, -50%) translateZ(150px)" }}>
        <div
          className="h-24 w-24 rounded-full md:h-28 md:w-28"
          style={{
            background:
              "radial-gradient(circle at 32% 28%, #f0d9a8 0%, #c9a45f 38%, #6d5527 72%, #241c0d 100%)",
            boxShadow: "0 0 60px rgba(201,164,95,0.45), inset -8px -10px 24px rgba(0,0,0,0.55)",
          }}
        />
      </div>

      {/* tiny satellite */}
      <div className="absolute right-10 top-8 h-2.5 w-2.5 rounded-full bg-gold/80 shadow-glow-soft" style={{ transform: "translateZ(90px)" }} />
      <div className="absolute bottom-12 left-8 h-1.5 w-1.5 rounded-full bg-bone/50" style={{ transform: "translateZ(60px)" }} />
    </motion.div>
  );
}

/* ---------- hero ---------- */

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });
  const rotX = useTransform(sy, [-1, 1], [12, -12]);
  const rotY = useTransform(sx, [-1, 1], [-14, 14]);

  const reduced = useReducedMotion();
  const maskIn = (delay: number) => ({
    initial: reduced ? false : ({ y: "112%" } as const),
    animate: { y: 0 },
    transition: { duration: 1.15, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
        const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
        mouse.current = { x: nx, y: ny };
        mx.set(nx);
        my.set(ny);
      }}
    >
      {/* layered ambience */}
      <div className="bg-hairlines absolute inset-0" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(58% 48% at 74% 30%, rgba(201,164,95,0.09) 0%, rgba(10,10,12,0) 65%), radial-gradient(50% 60% at 12% 88%, rgba(23,23,27,0.9) 0%, rgba(10,10,12,0) 70%), linear-gradient(180deg, rgba(10,10,12,0) 55%, #0a0a0c 96%)",
        }}
      />
      <ParticleCanvas mouse={mouse} />

      {/* vertical side label */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 items-center gap-4 xl:flex" aria-hidden>
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
        <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-fog [writing-mode:vertical-rl]">
          Sculpting light &amp; void — since 2014
        </span>
      </div>

      {/* main grid */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-center px-6 pb-28 pt-32 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 1 }}
              className="mb-7 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold"
            >
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-gold" />
              Mara Vesper — Visual Explorer
            </motion.p>

            <h1 className="font-display font-extrabold leading-[0.92] tracking-[-0.02em] text-bone">
              <span className="block overflow-hidden pb-1">
                <motion.span className="block text-[19vw] sm:text-[13vw] lg:text-[8.6rem] xl:text-[10rem]" {...maskIn(0.25)}>
                  MARA
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span className="block text-[19vw] sm:text-[13vw] lg:text-[8.6rem] xl:text-[10rem]" {...maskIn(0.4)}>
                  VESPER<span className="text-gold">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-md text-base leading-relaxed text-fog md:text-lg"
            >
              Light sculptures, spatial installations and digital materiality —
              works that borrow weight from shadow and give it back as
              <span className="text-bone"> atmosphere</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Magnetic>
                <a
                  href="#works"
                  className="group flex items-center gap-3 bg-gold px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink transition-colors duration-300 hover:bg-goldbright hover:shadow-glow"
                >
                  Explore works
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden>
                    <path d="M7 1v11M2.5 8L7 12.5 11.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="#about"
                  className="group flex items-center gap-3 border border-bone/15 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.24em] text-bone transition-all duration-300 hover:border-gold/60 hover:text-gold"
                >
                  The artist
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                    <path d="M1 7h11M8 2.5L12.5 7 8 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </Magnetic>
            </motion.div>
          </div>

          <div className="hidden justify-center lg:col-span-5 lg:flex">
            <DepthSculpture rx={rotX} ry={rotY} />
          </div>
        </div>
      </div>

      {/* bottom meta bar */}
      <div className="relative z-10 border-t border-bone/[0.06]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.24em] text-fog lg:px-12">
          <span className="hidden sm:block">Portfolio — 2019 / 2026</span>
          <span className="hidden md:block">Sculpture · Light · Digital</span>
          <div className="flex items-center gap-3">
            <span className="relative h-8 w-px overflow-hidden bg-bone/15" aria-hidden>
              <span className="animate-scroll-line absolute inset-0 bg-gold" />
            </span>
            Scroll
          </div>
          <span className="hidden sm:block">52.5200° N — 13.4050° E</span>
          <OrbitBadge />
        </div>
      </div>
    </section>
  );
}
