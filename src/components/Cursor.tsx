import { useEffect, useRef, useState } from "react";

type Mode = "default" | "link" | "view";

/**
 * A bespoke two-layer cursor: a fast gold dot and a lagging ring that
 * swells over interactive elements and becomes a "VIEW" lens on artworks.
 * Disabled automatically on touch devices and for prefers-reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const modeRef = useRef<Mode>("default");
  modeRef.current = mode;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor");

    let raf = 0;
    const loop = () => {
      const m = modeRef.current;
      const ease = m === "view" ? 0.14 : 0.18;
      ring.current.x += (pos.current.x - ring.current.x) * ease;
      ring.current.y += (pos.current.y - ring.current.y) * ease;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      const t = e.target as HTMLElement | null;
      if (t?.closest('[data-cursor="view"]')) setMode("view");
      else if (t?.closest("a, button, select, [data-cursor='hover']")) setMode("link");
      else setMode("default");
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  const ringScale = pressed ? 0.8 : mode === "view" ? 2.6 : mode === "link" ? 1.7 : 1;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
            mode === "view"
              ? "h-16 w-16 border border-gold/70 bg-ink/50 shadow-glow backdrop-blur-sm"
              : "h-10 w-10 border border-gold/40 bg-transparent"
          }`}
          style={{ transform: `scale(${ringScale})` }}
        >
          <span
            className={`font-mono text-[9px] tracking-[0.25em] text-gold transition-opacity duration-200 ${
              mode === "view" ? "opacity-100" : "opacity-0"
            }`}
          >
            VIEW
          </span>
        </div>
      </div>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101]"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            mode === "view" ? "h-1 w-1 bg-gold" : "h-1.5 w-1.5 bg-gold"
          }`}
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
    </>
  );
}
