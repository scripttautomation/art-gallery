import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  delay?: number;
  from?: "up" | "left" | "right" | "scale";
  className?: string;
  once?: boolean;
}

const hidden = {
  up: { opacity: 0, y: 44 },
  left: { opacity: 0, x: -48 },
  right: { opacity: 0, x: 48 },
  scale: { opacity: 0, scale: 0.94 },
};

/** Scroll-triggered entrance: fade + slide/scale into place. */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={hidden[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin: "-90px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
