import type { Metadata } from "next";
import { Pencil, Lightbulb, Undo2, Save, Timer, WifiOff } from "lucide-react";
import SudokuBoard from "@/components/SudokuBoard";
import InstallPromptModal from "@/components/InstallPromptModal";
import GooglePlayBadge from "@/components/GooglePlayBadge";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Play Sudoku Online Free — Easy to Expert",
  description:
    "Play free Sudoku online in your browser. Four difficulty levels, notes mode, smart hints, undo, timer, mistake counter and auto-save. No download required.",
  alternates: { canonical: "/play/" },
};

const FEATURES = [
  { icon: Pencil, label: "Notes mode" },
  { icon: Lightbulb, label: "Smart hints" },
  { icon: Undo2, label: "Undo" },
  { icon: Timer, label: "Timer" },
  { icon: Save, label: "Auto-save" },
  { icon: WifiOff, label: "Works offline" },
];

export default function PlayPage() {
  return (
    <>
      <InstallPromptModal />
      <section className="pt-28 sm:pt-32">
        <div className="container-page text-center">
          <span className="eyebrow">Play Online</span>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Play <span className="gradient-text">Sudoku</span> Online
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-brand-50/70">
            Pick a difficulty and start solving. Use the number pad or your
            keyboard. Your progress saves automatically.
          </p>
        </div>
      </section>

      <section className="py-10">
        <div className="container-page grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="glass p-4 sm:p-6">
            <SudokuBoard />
          </div>

          <aside className="space-y-6">
            <div className="glass p-6">
              <h2 className="text-lg font-semibold text-white">How to play</h2>
              <ul className="mt-3 space-y-2 text-sm text-brand-50/70">
                <li>Fill every row, column and 3×3 box with digits 1–9.</li>
                <li>Tap a cell, then tap a number — or use your keyboard.</li>
                <li>Toggle <strong>Notes</strong> to pencil in candidates.</li>
                <li>Stuck? Use a <strong>Hint</strong> for a logical next step.</li>
              </ul>
            </div>

            <div className="glass p-6">
              <h2 className="text-lg font-semibold text-white">Included tools</h2>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {FEATURES.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-brand-50/80"
                  >
                    <f.icon size={16} className="text-brand-300" />
                    {f.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass p-6 text-center">
              <h2 className="text-lg font-semibold text-white">Prefer mobile?</h2>
              <p className="mt-2 text-sm text-brand-50/60">
                Get {SITE.name} free on Android for daily challenges and offline
                play.
              </p>
              <div className="mt-4 flex justify-center">
                <GooglePlayBadge />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
