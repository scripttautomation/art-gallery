import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINKS = [
  { id: "works", label: "Works" },
  { id: "exhibitions", label: "Exhibitions" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

function useBerlinClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Europe/Berlin",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const clock = useBerlinClock();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scrollspy */
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
          scrolled
            ? "border-b border-bone/[0.06] bg-ink/75 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* wordmark */}
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center border border-gold/50 bg-gold/10 font-display text-sm font-bold text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink group-hover:shadow-glow">
              V
            </span>
            <span className="font-display text-sm font-bold tracking-[0.35em] text-bone">
              VESPER
            </span>
          </a>

          {/* desktop links */}
          <nav className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`link-underline font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                  active === l.id ? "active text-gold" : "text-fog hover:text-bone"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-fog lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-dot" />
              BER&nbsp;{clock}
            </span>

            {/* burger */}
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-10 w-10 items-center justify-center border border-bone/10 text-bone transition-colors duration-300 hover:border-gold/60 hover:text-gold md:hidden"
            >
              <span
                className={`absolute h-px w-4 bg-current transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-[3px]"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-current transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-[3px]"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] flex flex-col justify-between bg-ink/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex items-baseline gap-4 border-b border-bone/[0.06] py-5"
                >
                  <span className="font-mono text-[11px] text-gold">0{i + 1}</span>
                  <span className="font-display text-4xl font-bold tracking-tight text-bone transition-colors group-hover:text-gold">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
              <span>Berlin — 52.52°N</span>
              <span>{clock}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
