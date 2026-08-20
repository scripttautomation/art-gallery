import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";
import Lightbox from "./Lightbox";
import { WORKS, type Work } from "../data/works";

/* ---------- persistence ---------- */

const LS_WORKS = "artist.customWorks.v1";
const LS_FILTERS = "artist.filters.v1";
const DEFAULT_FILTERS = ["Masterpiece", "Art"];

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full or unavailable — keep in memory */
  }
}

/* ---------- image helpers ---------- */

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 1400;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("could not read image"));
    };
    img.src = url;
  });
}

/* ---------- work card ---------- */

interface CardProps {
  work: Work;
  onOpen: () => void;
  onRemove?: () => void;
}

function WorkCard({ work, onOpen, onRemove }: CardProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.22 } }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onClick={onOpen}
      className="work-card group relative block w-full overflow-hidden rounded-lg border border-bone/[0.08] bg-carbon text-left"
      aria-label={`Open ${work.title}`}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={work.image}
          alt={work.title}
          loading="lazy"
          className="work-img absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
        {onRemove && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onRemove();
              }
            }}
            aria-label={`Remove ${work.title}`}
            className="absolute left-3 top-3 z-10 grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-bone/20 bg-ink/70 text-bone/80 opacity-0 backdrop-blur transition-all duration-300 hover:border-red-300/70 hover:text-red-300 group-hover:opacity-100"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </span>
        )}
        <span className="work-plus absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-gold/50 bg-ink/60 text-gold backdrop-blur-sm">
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
            <path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </span>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
            {work.category} · {work.year}
          </p>
          <h3 className="mt-1.5 font-display text-3xl font-semibold leading-none text-bone">
            {work.title}
          </h3>
          <p className="mt-2 line-clamp-1 text-xs text-fog">{work.medium}</p>
        </div>
      </div>
    </motion.button>
  );
}

/* ---------- filter bar ---------- */

interface FilterBarProps {
  filters: string[];
  active: string | null;
  counts: Record<string, number>;
  onToggle: (f: string) => void;
  onRemove: (f: string) => void;
  onAdd: (name: string) => void;
}

function FilterBar({ filters, active, counts, onToggle, onRemove, onAdd }: FilterBarProps) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (adding) inputRef.current?.focus();
  }, [adding]);

  const commit = () => {
    const n = name.trim();
    if (n) onAdd(n);
    setName("");
    setAdding(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {filters.map((f) => {
        const isActive = active === f;
        return (
          <span
            key={f}
            className={`group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-300 ${
              isActive
                ? "border-gold bg-gold text-ink shadow-glow-soft"
                : "border-bone/15 text-fog hover:border-gold/60 hover:text-bone"
            }`}
          >
            <button
              onClick={() => onToggle(f)}
              className="uppercase tracking-[0.18em]"
              aria-pressed={isActive}
            >
              {f}
              <span className={`ml-2 ${isActive ? "text-ink/60" : "text-fog/50"}`}>
                {counts[f] ?? 0}
              </span>
            </button>
            <button
              onClick={() => onRemove(f)}
              aria-label={`Remove filter ${f}`}
              className={`grid h-3.5 w-3.5 place-items-center rounded-full transition-all duration-300 ${
                isActive
                  ? "text-ink/60 hover:text-ink"
                  : "text-fog/40 hover:text-red-300"
              }`}
            >
              <svg width="7" height="7" viewBox="0 0 7 7" fill="none" aria-hidden>
                <path d="M1 1l5 5M6 1L1 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          </span>
        );
      })}

      {adding ? (
        <span className="inline-flex items-center gap-1 rounded-full border border-gold/60 bg-gold/10 py-1 pl-4 pr-1">
          <input
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") {
                setAdding(false);
                setName("");
              }
            }}
            maxLength={22}
            placeholder="new filter…"
            className="w-28 bg-transparent font-mono text-[11px] lowercase tracking-wide text-bone outline-none placeholder:text-fog/50"
          />
          <button
            onClick={commit}
            aria-label="Add filter"
            className="grid h-7 w-7 place-items-center rounded-full bg-gold text-ink transition-colors hover:bg-goldbright"
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
              <path d="M4.5 1v7M1 4.5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </span>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="inline-flex items-center gap-2 rounded-full border border-dashed border-bone/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fog transition-all duration-300 hover:border-gold/70 hover:text-gold"
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
            <path d="M4.5 1v7M1 4.5h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Add filter
        </button>
      )}
    </div>
  );
}

/* ---------- add-your-art modal ---------- */

interface AddModalProps {
  filters: string[];
  onClose: () => void;
  onSubmit: (work: Work) => void;
}

function AddWorkModal({ filters, onClose, onSubmit }: AddModalProps) {
  const [image, setImage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(filters[0] ?? "Art");
  const [newCategory, setNewCategory] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [dimensions, setDimensions] = useState("");
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const pickFile = async (file: File | undefined | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      setImage(await fileToDataUrl(file));
    } catch {
      setError("That image couldn't be read — try another one.");
    } finally {
      setBusy(false);
    }
  };

  const submit = () => {
    if (!image) return setError("Add an image first — it's the heart of the piece.");
    if (!title.trim()) return setError("Every piece needs a title.");
    const cat = category === "__new__" ? newCategory.trim() || "Art" : category;
    onSubmit({
      id: Date.now(),
      title: title.trim(),
      year: Number(year) || new Date().getFullYear(),
      medium: subtitle.trim() || "Mixed media",
      category: cat,
      dimensions: dimensions.trim() || "Variable",
      edition: "Artist proof",
      image,
      description: description.trim() || "A new piece, freshly added to the collection.",
      custom: true,
    });
  };

  const inputCls =
    "w-full rounded-md border border-bone/15 bg-ink/60 px-4 py-3 text-sm text-bone placeholder:text-fog/40 outline-none transition-colors duration-300 focus:border-gold/70";
  const labelCls = "font-mono text-[10px] uppercase tracking-[0.24em] text-fog/70";

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label="Add your art"
    >
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-xl" onClick={onClose} />
      <motion.div
        className="relative max-h-full w-full max-w-2xl overflow-y-auto rounded-xl border border-bone/10 bg-coal/90 p-7 shadow-deep backdrop-blur-2xl md:p-9"
        initial={{ opacity: 0, y: 36, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-7 flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
              Open studio
            </p>
            <h3 className="mt-2 font-display text-4xl font-bold text-bone">Add your art</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-10 w-10 place-items-center rounded-full border border-bone/15 text-bone transition-all duration-300 hover:rotate-90 hover:border-gold/60 hover:text-gold"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* image picker */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0])}
        />
        <button
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            pickFile(e.dataTransfer.files?.[0]);
          }}
          className="relative block w-full overflow-hidden rounded-lg border border-dashed border-bone/25 transition-colors duration-300 hover:border-gold/70"
        >
          {image ? (
            <img src={image} alt="Preview of your artwork" className="h-52 w-full object-cover" />
          ) : (
            <span className="grid h-52 place-items-center">
              <span className="text-center">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="mx-auto text-gold" aria-hidden>
                  <path d="M13 3v20M3 13h20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
                <span className="mt-3 block font-display text-2xl font-semibold text-bone">
                  {busy ? "Reading your image…" : "Drop an image here"}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                  or click to browse — jpg / png / webp
                </span>
              </span>
            </span>
          )}
          {image && (
            <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-gold backdrop-blur">
              click to replace
            </span>
          )}
        </button>

        {/* fields */}
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Title *</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Quiet Machine"
              className={`mt-2 ${inputCls}`}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Subtitle / medium</span>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="e.g. Neon & reclaimed oak"
              className={`mt-2 ${inputCls}`}
            />
          </label>
          <label className="block">
            <span className={labelCls}>Filter</span>
            <span className="relative mt-2 block">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`${inputCls} appearance-none pr-9`}
              >
                {filters.map((f) => (
                  <option key={f} value={f} className="bg-coal text-bone">
                    {f}
                  </option>
                ))}
                <option value="__new__" className="bg-coal text-bone">
                  ＋ new filter…
                </option>
              </select>
              <svg width="11" height="7" viewBox="0 0 11 7" fill="none" aria-hidden className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/80">
                <path d="M1 1.5L5.5 6 10 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </label>
          {category === "__new__" ? (
            <label className="block">
              <span className={labelCls}>New filter name</span>
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="e.g. Sketches"
                maxLength={22}
                className={`mt-2 ${inputCls}`}
              />
            </label>
          ) : (
            <label className="block">
              <span className={labelCls}>Year</span>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                inputMode="numeric"
                placeholder={String(new Date().getFullYear())}
                className={`mt-2 ${inputCls}`}
              />
            </label>
          )}
          {category === "__new__" && (
            <label className="block sm:col-span-2">
              <span className={labelCls}>Year</span>
              <input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                inputMode="numeric"
                className={`mt-2 ${inputCls}`}
              />
            </label>
          )}
          <label className="block sm:col-span-2">
            <span className={labelCls}>Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What is this piece about? A line or two is plenty."
              className={`mt-2 resize-none ${inputCls}`}
            />
          </label>
          <label className="block sm:col-span-2">
            <span className={labelCls}>Dimensions — optional</span>
            <input
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="e.g. 120 × 80 cm"
              className={`mt-2 ${inputCls}`}
            />
          </label>
        </div>

        {error && (
          <p className="mt-4 rounded-md border border-gold/30 bg-gold/10 px-4 py-2.5 font-mono text-[11px] tracking-wide text-goldbright">
            {error}
          </p>
        )}

        <div className="mt-7 flex items-center gap-3">
          <button
            onClick={submit}
            className="rounded-full bg-gold px-7 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:bg-goldbright hover:shadow-glow"
          >
            Hang it in the gallery
          </button>
          <button
            onClick={onClose}
            className="rounded-full border border-bone/15 px-6 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fog transition-all duration-300 hover:border-bone/40 hover:text-bone"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------- add tile ---------- */

function AddTile({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group relative block aspect-[4/5] w-full overflow-hidden rounded-lg border border-dashed border-bone/20 bg-bone/[0.02] text-left transition-all duration-500 hover:border-gold/70 hover:bg-gold/[0.05]"
      aria-label="Add your own artwork"
    >
      <span className="absolute inset-0 grid place-items-center">
        <span className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-ink group-hover:shadow-glow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
          <span className="mt-4 block font-display text-3xl font-semibold text-bone transition-colors duration-300 group-hover:text-gold">
            Add your art
          </span>
          <span className="mt-1.5 block px-6 font-mono text-[9.5px] uppercase tracking-[0.2em] text-fog">
            upload an image, give it a name — it hangs instantly
          </span>
        </span>
      </span>
      <span className="absolute right-4 top-4 font-mono text-[9px] uppercase tracking-[0.24em] text-fog/50">
        open studio
      </span>
    </button>
  );
}

/* ---------- section ---------- */

export default function Works() {
  const [customWorks, setCustomWorks] = useState<Work[]>(() => loadJSON<Work[]>(LS_WORKS, []));
  const [filters, setFilters] = useState<string[]>(() => loadJSON<string[]>(LS_FILTERS, DEFAULT_FILTERS));
  const [active, setActive] = useState<string | null>(null);
  const [openWork, setOpenWork] = useState<Work | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => saveJSON(LS_WORKS, customWorks), [customWorks]);
  useEffect(() => saveJSON(LS_FILTERS, filters), [filters]);

  const all: Work[] = [...customWorks, ...WORKS];
  const visible = active ? all.filter((w) => w.category === active) : all;
  const counts = all.reduce<Record<string, number>>((acc, w) => {
    acc[w.category] = (acc[w.category] ?? 0) + 1;
    return acc;
  }, {});

  const openIndex = openWork ? visible.findIndex((w) => w.id === openWork.id) : -1;

  const removeFilter = (f: string) => {
    setFilters((prev) => prev.filter((x) => x !== f));
    if (active === f) setActive(null);
  };

  const addFilter = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    setFilters((prev) =>
      prev.some((f) => f.toLowerCase() === clean.toLowerCase()) ? prev : [...prev, clean]
    );
    setActive(clean);
  };

  const addWork = (work: Work) => {
    if (!filters.some((f) => f.toLowerCase() === work.category.toLowerCase())) {
      setFilters((prev) => [...prev, work.category]);
    }
    setCustomWorks((prev) => [work, ...prev]);
    setModalOpen(false);
    setActive(null);
  };

  const removeWork = (id: number) => setCustomWorks((prev) => prev.filter((w) => w.id !== id));

  return (
    <section id="art" className="relative scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <h2 className="font-display text-[7rem] font-bold leading-[0.85] tracking-tight text-bone sm:text-[9rem] lg:text-[11rem]">
              Art<span className="text-gold">.</span>
            </h2>
            <p className="mb-4 hidden max-w-[220px] text-right font-mono text-[10px] uppercase leading-loose tracking-[0.24em] text-fog lg:block">
              {visible.length} piece{visible.length === 1 ? "" : "s"} on the wall
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 border-y border-bone/[0.07] py-5">
            <FilterBar
              filters={filters}
              active={active}
              counts={counts}
              onToggle={(f) => setActive((cur) => (cur === f ? null : f))}
              onRemove={removeFilter}
              onAdd={addFilter}
            />
          </div>
        </Reveal>

        <motion.div
          layout={!reduced}
          className="works-mosaic mt-12 grid grid-cols-12 gap-5"
        >
          <div className="col-span-12 sm:col-span-6 lg:col-span-4">
            <AddTile onOpen={() => setModalOpen(true)} />
          </div>
          <AnimatePresence mode="popLayout">
            {visible.map((work) => (
              <motion.div
                layout
                key={work.id}
                className={`col-span-12 sm:col-span-6 ${
                  work.id % 5 === 1 ? "lg:col-span-5" : work.id % 3 === 0 ? "lg:col-span-3" : "lg:col-span-4"
                }`}
              >
                <WorkCard
                  work={work}
                  onOpen={() => setOpenWork(work)}
                  onRemove={work.custom ? () => removeWork(work.id) : undefined}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <p className="max-w-xl font-display text-4xl font-bold leading-tight text-bone/90 md:text-5xl">
              {all.length === 0
                ? "A fresh wall, waiting for its first piece."
                : "Nothing hangs under this filter yet."}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-fog">
              {all.length === 0
                ? "Click “Add your art” to begin the collection"
                : "Add a piece above — or tap the filter again to see everything"}
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {openWork && openIndex !== -1 && (
          <Lightbox
            work={openWork}
            index={openIndex}
            total={visible.length}
            onClose={() => setOpenWork(null)}
            onPrev={() => setOpenWork(visible[(openIndex - 1 + visible.length) % visible.length])}
            onNext={() => setOpenWork(visible[(openIndex + 1) % visible.length])}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalOpen && (
          <AddWorkModal filters={filters} onClose={() => setModalOpen(false)} onSubmit={addWork} />
        )}
      </AnimatePresence>
    </section>
  );
}
