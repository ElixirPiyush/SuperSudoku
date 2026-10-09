import Link from "next/link";
import { Pencil, Lightbulb, Undo2, Save, Pause, Brain, XCircle, UserX } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { SITE } from "@/lib/site";
import SudokuBoard from "@/components/SudokuBoard";
import InstallPromptModal from "@/components/InstallPromptModal";
import GooglePlayBadge from "@/components/GooglePlayBadge";
import { GridPattern } from "@/components/PageHero";

export const metadata = pageMeta({
  title: "Play Sudoku Online Free — Easy to Expert",
  description:
    "Play free Sudoku in your browser: Easy to Expert puzzles graded by the logic they need, with notes, hints, undo, pause, a timer and auto-save. No sign-up.",
  path: "/play/",
});

const TOOLS = [
  { icon: Brain, label: "Graded by logic" },
  { icon: Pencil, label: "Smart notes" },
  { icon: Lightbulb, label: "Hints" },
  { icon: Undo2, label: "Undo" },
  { icon: Pause, label: "Pause" },
  { icon: XCircle, label: "Mistake limit" },
  { icon: Save, label: "Auto-save" },
  { icon: UserX, label: "No sign-up" },
];

const KEYS = [
  ["1–9", "Enter a number"],
  ["Shift + 1–9", "Add or remove a note"],
  ["N", "Notes on / off"],
  ["Arrows", "Move"],
  ["Backspace", "Erase"],
  ["Ctrl + Z", "Undo"],
  ["H", "Hint"],
  ["P", "Pause"],
];

export default function PlayPage() {
  return (
    <>
      <InstallPromptModal />
      <section className="relative overflow-hidden bg-hero-gradient pb-16 text-white">
        <GridPattern />
        <div className="container-page relative pt-14 text-center">
          <span className="eyebrow-dark">Play Online</span>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">Play Sudoku in your browser</h1>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Pick a difficulty and start solving. Use the number pad or your keyboard; your game saves in this browser.
          </p>
        </div>

        <div className="container-page relative mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,480px)_320px] lg:justify-center">
          <div className="glass p-3 sm:p-4">
            <SudokuBoard />
          </div>

          <aside className="space-y-6">
            <div className="glass p-6">
              <h2 className="text-lg font-bold text-white">How to play</h2>
              <ul className="mt-3 space-y-2 text-sm text-brand-100">
                <li>Fill every row, column and 3×3 box with digits 1–9.</li>
                <li>Tap a cell, then tap a number, or use your keyboard.</li>
                <li>Turn on <strong>Notes</strong> to pencil in candidates; they clear themselves as you solve.</li>
                <li>Stuck? A <strong>Hint</strong> fills in a correct number.</li>
                <li>
                  Every puzzle has one solution and can be solved by logic alone. The level depends on the techniques it
                  needs, not just on the number of clues.
                </li>
              </ul>
              <Link href="/how-to-play/" className="mt-3 inline-flex min-h-11 items-center text-sm font-bold text-gold underline">
                Full beginner&apos;s guide
              </Link>
            </div>

            <div className="glass p-6">
              <h2 className="text-lg font-bold text-white">Included tools</h2>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {TOOLS.map((f) => (
                  <li key={f.label} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-brand-100">
                    <f.icon size={16} className="text-gold" aria-hidden="true" />
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass hidden p-6 lg:block">
              <h2 className="text-lg font-bold text-white">Keyboard</h2>
              <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm text-brand-100">
                {KEYS.map(([k, v]) => (
                  <div key={k} className="contents">
                    <dt>
                      <kbd className="rounded-md border border-white/20 bg-white/10 px-1.5 py-0.5 font-sans text-xs font-bold text-white">{k}</kbd>
                    </dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="glass p-6 text-center">
              <h2 className="text-lg font-bold text-white">Want more?</h2>
              <p className="mt-2 text-sm text-brand-100">
                The {SITE.name} app adds the Daily Challenge, the Monthly League, nine themes and offline play.
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
