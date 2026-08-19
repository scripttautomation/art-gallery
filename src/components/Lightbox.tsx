import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Work } from "../data/works";

interface Props {
  work: Work;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ work, index, total, onClose, onPrev, onNext }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-label={work.title}
    >
      <motion.div
        className="absolute inset-0 bg-ink/85 backdrop-blur-xl"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        className="relative grid max-h-full w-full max-w-6xl overflow-y-auto border border-bone/10 bg-coal/80 shadow-deep backdrop-blur-2xl lg:grid-cols-[1.45fr_1fr]"
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* image */}
        <div className="relative min-h-[42vh] overflow-hidden bg-ink lg:min-h-[70vh]">
          <motion.img
            key={work.id}
            src={work.image}
            alt={work.title}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/80">
            {work.category} — {work.year}
          </span>
        </div>

        {/* details */}
        <div className="flex flex-col justify-between gap-10 p-7 md:p-10">
          <div>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.28em] text-gold">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <button
                onClick={onClose}
                aria-label="Close artwork view"
                className="grid h-10 w-10 place-items-center border border-bone/15 text-bone transition-all duration-300 hover:rotate-90 hover:border-gold/60 hover:text-gold"
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
                  <path d="M1.5 1.5l10 10M11.5 1.5l-10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <h3 className="font-display text-3xl font-extrabold tracking-tight text-bone md:text-4xl">
              {work.title}
            </h3>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
              {work.medium}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-fog md:text-[15px]">
              {work.description}
            </p>

            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-bone/[0.08] pt-6">
              {[
                ["Dimensions", work.dimensions],
                ["Edition", work.edition],
                ["Year", String(work.year)],
                ["Category", work.category],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                    {k}
                  </dt>
                  <dd className="mt-1 text-sm text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onPrev}
              aria-label="Previous work"
              className="grid h-12 w-12 place-items-center border border-bone/15 text-bone transition-all duration-300 hover:border-gold/70 hover:bg-gold/10 hover:text-gold"
            >
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden>
                <path d="M6 1L1 6l5 5M1 6h13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={onNext}
              aria-label="Next work"
              className="grid h-12 w-12 place-items-center border border-bone/15 text-bone transition-all duration-300 hover:border-gold/70 hover:bg-gold/10 hover:text-gold"
            >
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" aria-hidden>
                <path d="M9 1l5 5-5 5M14 6H1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="ml-auto border border-gold/50 bg-gold/10 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-gold transition-all duration-300 hover:bg-gold hover:text-ink hover:shadow-glow"
            >
              Inquire ↗
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
