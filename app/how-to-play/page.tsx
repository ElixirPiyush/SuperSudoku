import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { DIFFICULTIES } from "@/lib/content";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import SudokuDiagram, { PUZZLE, SOLUTION } from "@/components/SudokuDiagram";
import JsonLd from "@/components/JsonLd";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "How to Play Sudoku — Rules and Tips for Beginners",
  description:
    "Learn Sudoku step by step: the rules for rows, columns and 3×3 boxes, how to place numbers, beginner tips, common mistakes and how difficulty levels progress.",
  path: "/how-to-play/",
});

const EMPTY = Array(9).fill(".........");

/** PUZZLE with one row taken from the solution except the target cell. */
const ROW_EXAMPLE = PUZZLE.map((line, r) => (r === 0 ? SOLUTION[0].slice(0, 5) + "." + SOLUTION[0].slice(6) : line));

/** PUZZLE with the centre box taken from the solution except the target cell. */
const BOX_EXAMPLE = PUZZLE.map((line, r) =>
  r >= 3 && r <= 5
    ? [...line].map((ch, c) => (c >= 3 && c <= 5 ? (r === 4 && c === 4 ? "." : SOLUTION[r][c]) : ch)).join("")
    : line,
);

/** Only the 1s that rule out the rest of the top-left box (all from SOLUTION). */
const SCAN_EXAMPLE = EMPTY.map((line, r) =>
  [...line]
    .map((_, c) => ((r === 0 && c === 7) || (r === 1 && c === 3) || (r === 5 && c === 1) || (r === 6 && c === 2) ? "1" : "."))
    .join(""),
);

/** A row with the 7 written twice (a mistake). */
const ERROR_EXAMPLE = EMPTY.map((line, r) => (r === 3 ? "8597..7.." : line));

const TIPS = [
  { title: "Start where it's crowded", body: "Rows, columns and boxes with the most numbers have the fewest options left." },
  { title: "Go number by number", body: "Pick a digit, say 1, and look for every box where it can only go in one cell." },
  { title: "Use notes", body: "When a cell could hold two or three numbers, write them as notes and cross them out as you go." },
  { title: "Check all three", body: "Before placing a number, check its row, its column and its 3×3 box." },
  { title: "Don't guess", body: "Every puzzle can be solved by logic. If you are stuck, scan again or use a hint." },
  { title: "Undo freely", body: "Undo takes back a move, so trying an idea from your notes costs nothing." },
];

const MISTAKES = [
  { title: "Forgetting the box", body: "A number can be fine in its row and column and still repeat inside its 3×3 box." },
  { title: "Stale notes", body: "After placing a number, remove it from the notes in the same row, column and box." },
  { title: "Rushing on Hard and Expert", body: "In the app the fourth mistake ends the game: slow down when the board gets tight." },
];

const HOWTO_LD = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to play Sudoku",
  step: [
    { "@type": "HowToStep", text: "Look at the 9×9 grid: 9 rows, 9 columns and 9 boxes of 3×3 cells, with some numbers already given." },
    { "@type": "HowToStep", text: "Fill the empty cells with numbers 1 to 9." },
    { "@type": "HowToStep", text: "Each row, each column and each 3×3 box must contain every number from 1 to 9 exactly once." },
    { "@type": "HowToStep", text: "Use logic to find cells where only one number fits, and continue until the grid is full." },
  ],
};

function Figure({ children, caption }: { children: React.ReactNode; caption: React.ReactNode }) {
  return (
    <figure className="card p-4">
      {children}
      <figcaption className="mt-3 text-sm leading-relaxed text-slate">{caption}</figcaption>
    </figure>
  );
}

export default function HowToPlayPage() {
  return (
    <>
      <JsonLd data={HOWTO_LD} />
      <PageHero
        eyebrow="How to Play"
        title={
          <>
            Sudoku in five minutes. <span className="text-gold">No maths needed.</span>
          </>
        }
        lede="Sudoku uses numbers, but it is a logic puzzle: you never add anything up. Here are the rules, the first techniques and the mistakes to avoid."
      />

      <section className="section" aria-labelledby="rules">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="rules" eyebrow="The rule" title="Every row, column and box holds 1 to 9 once" />
            <div className="lede mt-4 space-y-4">
              <p>The grid has 81 cells: 9 rows, 9 columns and nine 3×3 boxes (outlined in bold). Some numbers are given at the start.</p>
              <p>
                Fill every empty cell with a number from 1 to 9 so that no number repeats in any <strong className="text-brand-900">row</strong>,
                any <strong className="text-brand-900">column</strong> or any <strong className="text-brand-900">box</strong>. A correct
                puzzle has exactly one solution.
              </p>
            </div>
          </div>
          <Figure caption="One row (left to right), one column (top to bottom) and one 3×3 box, each shaded. Each must end up with 1–9 exactly once.">
            <SudokuDiagram rows={[1]} cols={[6]} boxes={[6]} title="Sudoku grid with row 2, column 7 and the bottom-left box shaded" />
          </Figure>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="placing">
        <div className="container-page">
          <SectionHeading id="placing" eyebrow="Placing numbers" title="Three ways to find a number" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Figure
              caption={
                <>
                  <strong className="text-brand-900">The last gap in a row.</strong> The top row has 1–7 and 9; only 8 is missing, so the gold cell is 8.
                </>
              }
            >
              <SudokuDiagram grid={ROW_EXAMPLE} rows={[0]} target={[0, 5]} answer="8" title="Top row with one empty cell that must be 8" />
            </Figure>
            <Figure
              caption={
                <>
                  <strong className="text-brand-900">The last gap in a box.</strong> The centre box has every number except 5, so its empty cell is 5.
                </>
              }
            >
              <SudokuDiagram grid={BOX_EXAMPLE} boxes={[4]} target={[4, 4]} answer="5" title="Centre box with one empty cell that must be 5" />
            </Figure>
            <Figure
              caption={
                <>
                  <strong className="text-brand-900">Scanning (cross-hatching).</strong> Where can 1 go in the top-left box? The 1s in rows 1–2 and
                  columns 2–3 rule out every cell but one.
                </>
              }
            >
              <SudokuDiagram grid={SCAN_EXAMPLE} rows={[0, 1]} cols={[1, 2]} target={[2, 0]} answer="1" title="Scanning example: the only place for 1 in the top-left box" />
            </Figure>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tips">
        <div className="container-page">
          <SectionHeading id="tips" eyebrow="Beginner tips" title="Habits that make every puzzle easier" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TIPS.map((t, i) => (
              <li key={t.title} className="card p-5">
                <span className="text-sm font-extrabold text-brand-600">0{i + 1}</span>
                <h3 className="mt-1 font-bold">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="mistakes">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="mistakes" eyebrow="Common mistakes" title="What trips beginners up" />
            <ul className="mt-6 space-y-4">
              {MISTAKES.map((m) => (
                <li key={m.title} className="rounded-2xl border border-brand-100 p-4">
                  <p className="font-bold text-brand-900">{m.title}</p>
                  <p className="mt-1 text-slate">{m.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <Figure caption="A mistake: 7 appears twice in the same row. In the app a wrong number is marked and counts as one of your three allowed mistakes.">
            <SudokuDiagram grid={ERROR_EXAMPLE} rows={[3]} errors={[[3, 3], [3, 6]]} title="Row with the number 7 written twice, marked in red" />
          </Figure>
        </div>
      </section>

      <section className="section" aria-labelledby="levels">
        <div className="container-page">
          <SectionHeading id="levels" eyebrow="Difficulty" title="How the levels progress" lede="Harder levels give fewer starting numbers, so the simple techniques above run out sooner and you need notes and longer chains of logic." />
          <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFICULTIES.map((d, i) => (
              <li key={d.name} className="card p-5">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: d.color }}>Step {i + 1}</p>
                <h3 className="mt-1 text-xl font-extrabold">{d.name}</h3>
                <p className="mt-2 text-sm text-slate">{d.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-slate">
            Ready to try?{" "}
            <Link href="/play/" className="font-bold text-brand-700 underline">Play a puzzle in your browser</Link> or read{" "}
            <Link href="/blog/advanced-sudoku-strategies/" className="font-bold text-brand-700 underline">advanced strategies</Link>.
          </p>
        </div>
      </section>

      <CtaBand title="Practise every day in the app" body="Four difficulty levels, notes, hints and a new Daily Challenge every day." />
    </>
  );
}
