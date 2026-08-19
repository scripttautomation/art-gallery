import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";
import { WORKS, type Category, type Work } from "../data/works";

const FILTERS = ["All", "Light", "Sculpture", "Digital"] as const;
type Filter = (typeof FILTERS)[number];

/* asymmetric layout pattern — cycles as the filtered list changes */
const PATTERN: { span: string; ratio: string }[] = [
  { span: "lg:col-span-7", ratio: "aspect-[4/3]" },
  { span: "lg:col-span-5", ratio: "aspect-[3/4]" },
  { span: "lg:col-span-5", ratio: "aspect-square" },
  { span: "lg:col-span-7", ratio: "aspect-[16/10]" },
  { span: "lg:col-span-4", ratio: "aspect-[3/4]" },
  { span: "lg:col-span-8", ratio: "aspect-[21/10]" },
];

function WorkCard({
  work,
  index,
  onOpen,
}: {
  work: Work;
  index: number;
  onOpen: () => void;
}) {
  const layout = PATTERN[index % PATTERN.length];
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      data-cursor="view"
      className={`work-card group col-span-12 block w-full border border-bone/[0.07] bg-bone/[0.03] p-2.5 text-left backdrop-blur-sm sm:p-3 ${layout.span}`}
      style={{ boxShadow: "0 24px 60px -24px rgba(0,0,0,0.7)" }}
      aria-label={`View ${work.title}`}
    >
      <div className={`relative overflow-hidden ${layout.ratio}`}>
        <img
          src={work.image}
          alt={work.title}
          loading="lazy"
          className="work-img absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />
        <span className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.3em] text-bone/80">
          {String(work.id).padStart(2, "0")}
        </span>
        <span className="work-plus absolute right-4 top-4 grid h-9 w-9 place-items-center border border-gold/60 bg-ink/50 text-gold backdrop-blur-sm">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </span>
        <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/70">
          {work.category}
        </span>
      </div>
      <div className="flex items-baseline justify-between gap-4 px-1.5 pb-1 pt-3.5">
        <div>
          <h3 className="font-display text-base font-bold tracking-tight text-bone transition-colors duration-300 group-hover:text-gold md:text-lg">
            {work.title}
          </h3>
          <p className="mt-0.5 text-xs text-fog">{work.medium}</p>
        </div>
        <span className="font-mono text-[11px] tracking-[0.2em] text-fog">{work.year}</span>
      </div>
    </motion.button>
  );
}

export default function Works() {
  const [filter, setFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const works = useMemo<Work[]>(
    () => (filter === "All" ? WORKS : WORKS.filter((w) => w.category === filter)),
    [filter],
  );

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { All: WORKS.length, Light: 0, Sculpture: 0, Digital: 0 };
    WORKS.forEach((w) => (c[w.category] += 1));
    return c;
  }, []);

  return (
    <section id="works" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* header */}
        <div className="mb-14 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold/60" /> 01 — Selected works
            </p>
            <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone md:text-7xl">
              Works in
              <br />
              <span className="text-outline-faint">depth</span>{" "}
              <span className="text-gold">/</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="max-w-xs">
            <p className="text-sm leading-relaxed text-fog">
              Nine pieces from six years of practice — hover to focus a piece,
              click to enter it. Each work ships with its own silence.
            </p>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal delay={0.1} className="mb-10 flex flex-wrap items-center gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-2 border px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.22em] transition-all duration-300 ${
                filter === f
                  ? "border-gold/70 bg-gold/10 text-gold shadow-glow-soft"
                  : "border-bone/10 text-fog hover:border-bone/30 hover:text-bone"
              }`}
              aria-pressed={filter === f}
            >
              {f}
              <span className={`text-[9px] ${filter === f ? "text-gold/70" : "text-fog/60"}`}>
                {counts[f]}
              </span>
            </button>
          ))}
        </Reveal>

        {/* mosaic */}
        <motion.div layout className="works-mosaic grid grid-cols-12 gap-4 md:gap-5">
          <AnimatePresence mode="popLayout">
            {works.map((w, i) => (
              <WorkCard key={w.id} work={w} index={i} onOpen={() => setLightbox(i)} />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1} className="mt-12 flex items-center justify-between gap-6 border-t border-bone/[0.06] pt-6">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-fog">
            {String(works.length).padStart(2, "0")} pieces shown — full archive on request
          </p>
          <a href="#contact" className="link-underline font-mono text-[10.5px] uppercase tracking-[0.24em] text-bone transition-colors hover:text-gold">
            Request archive ↗
          </a>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightbox !== null && works[lightbox] && (
          <Lightbox
            work={works[lightbox]}
            index={lightbox}
            total={works.length}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox((i) => (i! - 1 + works.length) % works.length)}
            onNext={() => setLightbox((i) => (i! + 1) % works.length)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
