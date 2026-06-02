"use client";

import { motion } from "framer-motion";

// A fixed, attractive partially-filled grid for decorative hero display.
const PREVIEW = [
  5, 3, 0, 0, 7, 0, 0, 0, 0,
  6, 0, 0, 1, 9, 5, 0, 0, 0,
  0, 9, 8, 0, 0, 0, 0, 6, 0,
  8, 0, 0, 0, 6, 0, 0, 0, 3,
  4, 0, 0, 8, 0, 3, 0, 0, 1,
  7, 0, 0, 0, 2, 0, 0, 0, 6,
  0, 6, 0, 0, 0, 0, 2, 8, 0,
  0, 0, 0, 4, 1, 9, 0, 0, 5,
  0, 0, 0, 0, 8, 0, 0, 7, 9,
];

export default function HeroBoard() {
  return (
    <motion.div
      className="relative mx-auto w-full max-w-[420px]"
      initial={{ opacity: 0, scale: 0.9, rotateX: 8 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-glow-radial blur-2xl" />
      <div className="glass overflow-hidden rounded-3xl p-3 shadow-glow">
        <div className="grid grid-cols-9 overflow-hidden rounded-xl border-2 border-brand-300/60 bg-surface">
          {PREVIEW.map((v, i) => {
            const r = Math.floor(i / 9);
            const c = i % 9;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.006 }}
                className={[
                  "flex aspect-square items-center justify-center text-sm font-semibold sm:text-base",
                  "border-[0.5px] border-ink-400/40",
                  c % 3 === 2 && c !== 8 ? "border-r-2 border-r-brand-300/50" : "",
                  r % 3 === 2 && r !== 8 ? "border-b-2 border-b-brand-300/50" : "",
                  v ? "text-brand-50" : "text-transparent",
                ].join(" ")}
              >
                {v || "."}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
