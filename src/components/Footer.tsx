import Logo from "./Logo";
import Magnetic from "./Magnetic";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-bone/[0.06]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* top row */}
        <div className="flex items-center justify-between gap-6 py-10">
          <a href="#top" className="group" aria-label="Back to top">
            <Logo size={40} withWordmark />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {["Art", "Exhibitions", "About", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="link-underline font-mono text-[10.5px] uppercase tracking-[0.22em] text-fog transition-colors hover:text-bone"
              >
                {l}
              </a>
            ))}
          </nav>

          <Magnetic strength={0.45}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="grid h-12 w-12 place-items-center rounded-full border border-bone/15 text-bone transition-all duration-400 hover:border-gold hover:bg-gold/10 hover:text-gold hover:shadow-glow"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M7 13V1M2.5 5L7 0.5 11.5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </Magnetic>
        </div>

        {/* giant wordmark */}
        <div className="group pointer-events-none select-none overflow-hidden" aria-hidden>
          <p className="text-outline-word -mb-[0.2em] text-center font-display text-[23vw] font-bold leading-none">
            Artist
          </p>
        </div>

        {/* bottom row */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-bone/[0.06] py-6 font-mono text-[9.5px] uppercase tracking-[0.22em] text-fog/60 md:flex-row">
          <span>© 2026 Artist — all works under copyright</span>
          <span className="hidden md:block">Berlin — 52.52°N 13.40°E</span>
          <span>Design &amp; light by the studio</span>
        </div>
      </div>
    </footer>
  );
}
