import { useState, type FormEvent, type ReactElement } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { EMAIL, SOCIALS } from "../data/works";

/* ---------- hand-drawn social glyphs ---------- */

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
function BehanceIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3.5 12h4a2.6 2.6 0 1 0 0-5.2h-4V17h4.3a2.9 2.9 0 1 0 0-5.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.8 14.3a3.4 3.4 0 1 0 6.6-1.2h-6.6m0 0a3.3 3.3 0 0 1 6.4.4M15.2 7.3h4.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
function VimeoIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3.5 9.2c1.8-1.6 3.2-2.6 4.1-2.4 1.5.3 1.7 3.1 2.5 6.4.5 2 .9 3 1.5 3 .8 0 2.5-2.6 3.3-4.5.7-1.7.2-2.9-1.3-2.6l-1-.9c1.5-2 3.2-2.9 4.9-2.5 2 .5 1.7 3.3-.3 7-2.2 4.2-4.3 6.9-5.9 6.9-1.4 0-2.4-2.1-3.2-5.6-.7-2.8-1-4.2-1.9-4.2-.3 0-.8.3-1.5.9L3.5 9.2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS: Record<string, () => ReactElement> = {
  Instagram: InstagramIcon,
  Behance: BehanceIcon,
  "X / Twitter": XIcon,
  Vimeo: VimeoIcon,
};

const PROJECT_TYPES = ["Commission", "Exhibition", "Collaboration", "Press", "Something else"];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  const inputCls =
    "w-full rounded-lg border border-bone/15 bg-ink/60 px-4 py-3.5 text-sm text-bone placeholder:text-fog/40 outline-none transition-colors duration-300 focus:border-gold/70";

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(52% 44% at 18% 20%, rgba(201,164,95,0.08) 0%, rgba(10,10,12,0) 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* left — the invitation */}
          <div>
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-8 bg-gold/60" /> 04 — Contact
              </p>
              <h2 className="font-display text-6xl font-bold leading-[0.9] text-bone md:text-8xl">
                Let's make
                <br />
                something quiet<span className="text-gold">.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-fog md:text-base">
                Commissions, exhibitions, press or a strange idea at 2 a.m. —
                the studio answers every letter personally, usually within two
                days.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                  Write directly
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="group mt-3 inline-flex flex-wrap items-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-6 py-4 transition-all duration-400 hover:bg-gold/20 hover:shadow-glow"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gold" aria-hidden>
                    <rect x="1" y="2.5" width="14" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M1.5 4l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="font-display text-2xl font-semibold tracking-tight text-bone transition-colors duration-300 group-hover:text-gold md:text-3xl">
                    {EMAIL}
                  </span>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                  Elsewhere
                </p>
                <div className="mt-4 flex flex-wrap gap-3.5">
                  {SOCIALS.map((s) => {
                    const Icon = ICONS[s.label];
                    return (
                      <Magnetic key={s.label} strength={0.4}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${s.label} — ${s.handle}`}
                          title={`${s.label} — ${s.handle}`}
                          className="grid h-12 w-12 place-items-center rounded-full border border-bone/15 text-bone transition-all duration-400 hover:-translate-y-1 hover:border-gold hover:text-gold hover:shadow-glow"
                        >
                          <Icon />
                        </a>
                      </Magnetic>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-12 flex items-center gap-3 border-t border-bone/[0.07] pt-6">
                <span className="animate-pulse-dot h-2 w-2 rounded-full bg-gold" />
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog">
                  Artist — taking on two new spatial commissions for late 2026
                </p>
              </div>
            </Reveal>
          </div>

          {/* right — the form */}
          <Reveal from="right" delay={0.15}>
            <div className="relative rounded-xl border border-bone/10 bg-coal/60 p-6 shadow-card backdrop-blur-md md:p-9">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
                aria-hidden
              />

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[430px] flex-col items-center justify-center text-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/50 bg-gold/10 text-gold shadow-glow-soft">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                        <path d="M3.5 11.5L9 17 18.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <h3 className="mt-7 font-display text-5xl font-bold text-bone">Sent into the quiet.</h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-fog">
                      Your note is on its way to the studio. Expect a reply
                      within two days — sooner if the light is good.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-8 rounded-full border border-bone/15 px-6 py-3 font-mono text-[10px] uppercase tracking-[0.24em] text-fog transition-all duration-300 hover:border-gold/60 hover:text-gold"
                    >
                      Write another
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45 }}
                    onSubmit={handleSubmit}
                    className="grid gap-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                          Name
                        </span>
                        <input required name="name" placeholder="Your name" className={`mt-2 ${inputCls}`} />
                      </label>
                      <label className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                          Email
                        </span>
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="you@studio.com"
                          className={`mt-2 ${inputCls}`}
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                        Project type
                      </span>
                      <span className="relative mt-2 block">
                        <select name="type" defaultValue={PROJECT_TYPES[0]} className={`${inputCls} appearance-none pr-9`}>
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t} className="bg-coal text-bone">
                              {t}
                            </option>
                          ))}
                        </select>
                        <svg
                          width="11"
                          height="7"
                          viewBox="0 0 11 7"
                          fill="none"
                          aria-hidden
                          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/80"
                        >
                          <path d="M1 1.5L5.5 6 10 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </label>

                    <label className="block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                        Message
                      </span>
                      <textarea
                        required
                        name="message"
                        rows={5}
                        placeholder="Tell me about the space, the light, the feeling…"
                        className={`mt-2 resize-none ${inputCls}`}
                      />
                    </label>

                    <Magnetic strength={0.12}>
                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-gold px-7 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink transition-all duration-300 hover:bg-goldbright hover:shadow-glow"
                      >
                        Send the note
                        <svg width="13" height="11" viewBox="0 0 15 12" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                          <path d="M1 6h12M9 1.5L13.5 6 9 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </Magnetic>

                    <p className="text-center font-mono text-[9.5px] uppercase tracking-[0.2em] text-fog/50">
                      No lists, no noise — a letter, answered by hand
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
