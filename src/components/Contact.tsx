import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import { EMAIL, SOCIALS } from "../data/works";

/* custom inline social glyphs */
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
    </svg>
  );
}
function BehanceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 6.5h5.2c1.9 0 3.1 1 3.1 2.7 0 1.1-.6 1.9-1.5 2.3 1.2.4 1.9 1.4 1.9 2.8 0 1.9-1.4 3.2-3.4 3.2H3V6.5Zm2.3 4.5h2.5c.8 0 1.3-.5 1.3-1.2s-.5-1.2-1.3-1.2H5.3V11Zm0 4.4h2.8c.9 0 1.4-.5 1.4-1.3 0-.8-.5-1.3-1.4-1.3H5.3v2.6Z" fill="currentColor" />
      <path d="M14.5 13.9c0-2.6 1.7-4.4 4.2-4.4s4.1 1.7 4.1 4.3v.7h-6c.1 1 .8 1.6 1.9 1.6.8 0 1.4-.3 1.7-1h2.2c-.4 1.8-1.9 2.8-3.9 2.8-2.6 0-4.2-1.7-4.2-4Zm2.3-.9h3.7c-.1-.9-.7-1.5-1.8-1.5-1 0-1.7.6-1.9 1.5Z" fill="currentColor" />
      <path d="M15.2 6.8h5.4v1.4h-5.4V6.8Z" fill="currentColor" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 4l7.1 9.3L4.4 20h2.3l5.5-5.4L16.5 20H20l-7.4-9.7L18.9 4h-2.3l-4.9 4.9L8 4H4Z" fill="currentColor" />
    </svg>
  );
}
function VimeoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 8.2c-.1 1.9-1.5 4.6-4.2 8-2.8 3.5-5.1 5.3-7 5.3-1.2 0-2.2-1.1-3-3.3L5.2 12.5C4.6 10.3 4 9.2 3.3 9.2c-.1 0-.6.3-1.4.9L1 9c.9-.8 1.8-1.6 2.7-2.4C4.9 5.5 5.8 5 6.3 4.9c1.3-.1 2.1.8 2.4 2.7.3 2.1.6 3.4.7 3.9.4 1.7.8 2.5 1.3 2.5.4 0 1-.6 1.8-1.9.8-1.2 1.2-2.2 1.2-2.9.1-1.2-.3-1.8-1.3-1.8-.5 0-1 .1-1.5.3 1-3.2 2.9-4.8 5.7-4.7 2.1.1 3.1 1.4 3 4.2Z" fill="currentColor" />
    </svg>
  );
}

const ICONS = [InstagramIcon, BehanceIcon, XIcon, VimeoIcon];

const PROJECT_TYPES = ["Commission", "Collaboration", "Press / Interview", "Something else"];

const inputCls =
  "w-full border-b border-bone/12 bg-transparent py-3 text-[15px] text-bone placeholder:text-bone/25 outline-none transition-colors duration-300 focus:border-gold/70";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    /* simulated dispatch — replace with a real endpoint when ready */
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 900);
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-bone/[0.06] bg-coal/40 py-24 md:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(50% 46% at 16% 82%, rgba(201,164,95,0.08) 0%, rgba(10,10,12,0) 62%)",
        }}
      />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* left — direct lines */}
          <div>
            <Reveal>
              <p className="mb-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-8 bg-gold/60" /> 04 — Contact
              </p>
              <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-bone md:text-7xl">
                Let&rsquo;s make
                <br />
                something <span className="text-outline-faint">rare</span>
                <span className="text-gold">.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-fog">
                Commissions, exhibitions, press or a quiet conversation about
                light — the studio reads everything and answers personally.
              </p>

              <a
                href={`mailto:${EMAIL}`}
                className="group mt-8 inline-flex flex-wrap items-center gap-4"
              >
                <span className="font-display text-2xl font-bold tracking-tight text-bone transition-colors duration-300 group-hover:text-gold md:text-4xl">
                  {EMAIL}
                </span>
                <span className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 text-bone transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:text-gold group-hover:shadow-glow">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path d="M2 12L12 2M4.5 2H12v7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.24em] text-fog/70">
                Response within 48h — Berlin time
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12 flex items-center gap-4">
                {SOCIALS.map((s, i) => {
                  const Icon = ICONS[i];
                  return (
                    <Magnetic key={s.label} strength={0.4}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${s.label} — ${s.handle}`}
                        title={`${s.label} · ${s.handle}`}
                        className="grid h-13 w-13 place-items-center rounded-full border border-bone/12 p-3.5 text-fog transition-all duration-400 hover:border-gold/70 hover:bg-gold/10 hover:text-gold hover:shadow-glow"
                      >
                        <Icon />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">
                {SOCIALS.map((s) => (
                  <span key={s.label}>{s.handle}</span>
                ))}
              </div>
            </Reveal>
          </div>

          {/* right — inquiry form */}
          <Reveal from="right" delay={0.15}>
            <div className="relative border border-bone/[0.08] bg-ink/60 p-7 shadow-card backdrop-blur-xl md:p-10">
              <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-gold/60" aria-hidden />
              <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-gold/60" aria-hidden />

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/50 bg-gold/10 text-gold shadow-glow">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                        <path d="M4 11.5l4.5 4.5L18 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <h3 className="mt-7 font-display text-2xl font-bold tracking-tight text-bone">
                      Your note is in the studio.
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-relaxed text-fog">
                      Thank you — Mara replies personally within 48 hours,
                      Berlin time.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="link-underline mt-8 font-mono text-[10.5px] uppercase tracking-[0.24em] text-gold"
                    >
                      Send another inquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45 }}
                    onSubmit={onSubmit}
                    className="flex min-h-[420px] flex-col"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-fog">
                      Inquiry form
                    </p>

                    <div className="mt-8 grid gap-7 sm:grid-cols-2">
                      <label className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                          Name
                        </span>
                        <input required name="name" type="text" placeholder="Ada Lindgren" className={inputCls} />
                      </label>
                      <label className="block">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                          Email
                        </span>
                        <input required name="email" type="email" placeholder="ada@gallery.se" className={inputCls} />
                      </label>
                    </div>

                    <label className="mt-7 block">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                        Project type
                      </span>
                      <span className="relative block">
                        <select name="type" defaultValue={PROJECT_TYPES[0]} className={`${inputCls} appearance-none pr-8`}>
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
                          className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gold/80"
                        >
                          <path d="M1 1.5L5.5 6 10 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </label>

                    <label className="mt-7 block flex-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70">
                        Message
                      </span>
                      <textarea
                        required
                        name="message"
                        rows={4}
                        placeholder="Tell me about the space, the light, the silence…"
                        className={`${inputCls} h-full min-h-[96px] resize-none`}
                      />
                    </label>

                    <div className="mt-9 flex items-center justify-between gap-6">
                      <p className="hidden max-w-[200px] font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.18em] text-fog/60 sm:block">
                        No mailing lists. Ever. Just a reply.
                      </p>
                      <Magnetic className="ml-auto">
                        <button
                          type="submit"
                          disabled={sending}
                          className="flex items-center gap-3 bg-gold px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-ink transition-all duration-300 hover:bg-goldbright hover:shadow-glow disabled:opacity-60"
                        >
                          {sending ? "Sending…" : "Send inquiry"}
                          {!sending && (
                            <svg width="13" height="12" viewBox="0 0 14 12" fill="none" aria-hidden>
                              <path d="M1 6h11M8 1.5L12.5 6 8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                      </Magnetic>
                    </div>
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
