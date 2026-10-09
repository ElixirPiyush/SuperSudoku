// Builds the graded puzzle bank for /play/ in public/puzzles/<difficulty>.json.
//
//   node scripts/generate-puzzles.mjs [countPerLevel=300]
//
// Every puzzle has exactly one solution, symmetric clues, and is solvable by
// logic alone. Difficulty comes from the hardest technique needed
// (lib/sudokuGrade.ts), not just from the number of clues:
//   easy    singles only, 36-40 clues
//   medium  singles with at most 32 clues, or locked candidates
//   hard    pairs / triples
//   expert  X-Wing, Swordfish or XY-Wing
// The browser shuffles digits, rows and columns of each puzzle, which keeps
// its difficulty, so a few hundred per level give endless distinct games.
import { mkdirSync, writeFileSync } from "node:fs";
import { gradePuzzle } from "../lib/sudokuGrade.ts";

const COUNT = Number(process.argv[2] ?? 300);
const OUT = new URL("../public/puzzles/", import.meta.url);

const ROW = (i) => Math.floor(i / 9);
const COL = (i) => i % 9;
const BOX = (i) => Math.floor(ROW(i) / 3) * 3 + Math.floor(COL(i) / 3);

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Count solutions up to `limit` with bitmask constraint propagation. */
function countSolutions(grid, limit = 2) {
  const rows = new Array(9).fill(0), cols = new Array(9).fill(0), boxes = new Array(9).fill(0);
  const g = [...grid];
  for (let i = 0; i < 81; i++) {
    if (!g[i]) continue;
    const bit = 1 << g[i];
    if ((rows[ROW(i)] | cols[COL(i)] | boxes[BOX(i)]) & bit) return 0;
    rows[ROW(i)] |= bit; cols[COL(i)] |= bit; boxes[BOX(i)] |= bit;
  }
  let count = 0;
  const search = () => {
    let best = -1, bestMask = 0, bestN = 10;
    for (let i = 0; i < 81; i++) {
      if (g[i]) continue;
      const mask = ~(rows[ROW(i)] | cols[COL(i)] | boxes[BOX(i)]) & 0x3fe;
      let n = 0;
      for (let m = mask; m; m &= m - 1) n++;
      if (n < bestN) { best = i; bestMask = mask; bestN = n; if (n <= 1) break; }
    }
    if (best === -1) { count++; return; }
    for (let v = 1; v <= 9 && count < limit; v++) {
      const bit = 1 << v;
      if (!(bestMask & bit)) continue;
      g[best] = v; rows[ROW(best)] |= bit; cols[COL(best)] |= bit; boxes[BOX(best)] |= bit;
      search();
      g[best] = 0; rows[ROW(best)] &= ~bit; cols[COL(best)] &= ~bit; boxes[BOX(best)] &= ~bit;
    }
  };
  search();
  return count;
}

function randomSolution() {
  const g = new Array(81).fill(0);
  const fill = (i) => {
    if (i === 81) return true;
    for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
      let ok = true;
      for (let k = 0; k < 81 && ok; k++) {
        if (g[k] === v && (ROW(k) === ROW(i) || COL(k) === COL(i) || BOX(k) === BOX(i))) ok = false;
      }
      if (!ok) continue;
      g[i] = v;
      if (fill(i + 1)) return true;
      g[i] = 0;
    }
    return false;
  };
  fill(0);
  return g;
}

/** Remove clues in 180°-symmetric pairs while the solution stays unique. */
function carve(solution, minClues) {
  const p = [...solution];
  let clues = 81;
  for (const i of shuffle(Array.from({ length: 41 }, (_, k) => k))) {
    const pair = i === 40 ? [40] : [i, 80 - i];
    if (clues - pair.length < minClues) continue;
    pair.forEach((k) => (p[k] = 0));
    if (countSolutions(p) === 1) clues -= pair.length;
    else pair.forEach((k) => (p[k] = solution[k]));
  }
  return { puzzle: p, clues };
}

function classify(grade, clues) {
  if (!grade.solved) return null;
  if (grade.level <= 1) return clues >= 36 && clues <= 40 ? "easy" : clues <= 32 ? "medium" : null;
  return ["", "", "medium", "hard", "expert"][grade.level];
}

const bank = { easy: [], medium: [], hard: [], expert: [] };
const seen = new Set();
const started = Date.now();
let tries = 0;
while (Object.values(bank).some((l) => l.length < COUNT)) {
  tries++;
  const solution = randomSolution();
  // Easy wants many clues; the others are carved down to a minimal puzzle.
  const wantEasy = bank.easy.length < COUNT && Math.random() < 0.3;
  const { puzzle, clues } = carve(solution, wantEasy ? 36 + Math.floor(Math.random() * 5) : 17);
  const grade = gradePuzzle(puzzle);
  if (grade.solved && grade.values.join("") !== solution.join("")) {
    throw new Error(`grader reached a wrong solution for ${puzzle.join("")}`);
  }
  const level = classify(grade, clues);
  const key = puzzle.join("");
  if (!level || bank[level].length >= COUNT || seen.has(key)) continue;
  seen.add(key);
  bank[level].push(`${key}:${solution.join("")}`);
  if (tries % 200 === 0) {
    const s = Object.entries(bank).map(([k, v]) => `${k} ${v.length}`).join(", ");
    console.log(`${tries} tries, ${((Date.now() - started) / 1000).toFixed(0)} s: ${s}`);
  }
}

mkdirSync(OUT, { recursive: true });
for (const [level, list] of Object.entries(bank)) {
  writeFileSync(new URL(`${level}.json`, OUT), JSON.stringify(list) + "\n");
}
console.log(`done in ${((Date.now() - started) / 1000).toFixed(0)} s after ${tries} tries`);
