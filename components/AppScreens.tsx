"use client";

import { motion } from "framer-motion";
import PhoneFrame from "./PhoneFrame";

// Mini board renderer with a per-theme palette to simulate app screenshots.
function MiniBoard({
  accent,
  bg,
  text,
}: {
  accent: string;
  bg: string;
  text: string;
}) {
  const cells = [
    5, 3, 0, 0, 7, 0, 6, 0, 0, 1, 9, 5, 0, 9, 8, 0, 0, 6, 8, 0, 0, 0, 6, 0, 4,
    0, 0, 8, 0, 3, 7, 0, 0, 0, 2, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 4, 1, 9, 0, 0,
    8, 0, 0, 7, 5, 3, 0, 0, 7, 0, 6, 0, 0, 1, 9, 5, 0, 9, 8, 0, 0, 6, 8, 0, 0,
    0, 6, 0, 4, 0, 0,
  ];
  return (
    <div className="p-3" style={{ background: bg }}>
      <div className="mb-2 flex items-center justify-between text-[10px]" style={{ color: text }}>
        <span>⏱ 02:14</span>
        <span style={{ color: accent }}>Daily Challenge</span>
      </div>
      <div
        className="grid grid-cols-9 overflow-hidden rounded-md border"
        style={{ borderColor: accent }}
      >
        {cells.slice(0, 81).map((v, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center text-[9px] font-semibold"
            style={{
              borderWidth: "0.5px",
              borderColor: `${accent}33`,
              color: v ? text : "transparent",
              background: i % 9 === i % 9 ? "transparent" : "transparent",
            }}
          >
            {v || "."}
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1">
        {["Undo", "Erase", "Notes", "Hint", "New"].map((t) => (
          <div
            key={t}
            className="rounded py-1 text-center text-[8px]"
            style={{ background: `${accent}22`, color: text }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

const SCREENS = [
  { accent: "#4FC3F7", bg: "#061229", text: "#E3F7FF" }, // Neon Pulse
  { accent: "#FFD700", bg: "#1A1A2E", text: "#FFD700" }, // Midnight
  { accent: "#E91E63", bg: "#FFF0F3", text: "#C2185B" }, // Sakura
  { accent: "#4CAF50", bg: "#FAFAFA", text: "#2E7D32" }, // Classic
];

export default function AppScreens() {
  return (
    <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:justify-center">
      {SCREENS.map((s, i) => (
        <motion.div
          key={i}
          className="snap-center shrink-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <PhoneFrame className={i % 2 ? "lg:translate-y-6" : ""}>
            <MiniBoard {...s} />
          </PhoneFrame>
        </motion.div>
      ))}
    </div>
  );
}
