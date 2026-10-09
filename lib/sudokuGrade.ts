// -----------------------------------------------------------------------------
// Human-style Sudoku grader. Solves with the logic techniques people use, from
// simplest to hardest, and reports the hardest technique the puzzle needed.
// Used offline by scripts/generate-puzzles.mjs to build the graded puzzle bank
// in public/puzzles/. Self-contained (no imports) so Node can run it directly.
// -----------------------------------------------------------------------------

/** 1 singles · 2 locked candidates · 3 pairs/triples · 4 X-Wing, Swordfish, XY-Wing. */
export type TechniqueLevel = 1 | 2 | 3 | 4;

export interface GradeResult {
  /** True when logic alone solved the puzzle (no guessing needed). */
  solved: boolean;
  /** Hardest technique level used (0 if nothing was needed). */
  level: number;
  /** How many times each level made progress, index 1-4. */
  uses: number[];
  /** The grid as far as logic got (0 = still empty). */
  values: number[];
}

const ALL = 0x1ff; // candidates 1-9 as bits 0-8

const ROWS: number[][] = [];
const COLS: number[][] = [];
const BOXES: number[][] = [];
for (let i = 0; i < 9; i++) {
  ROWS.push(Array.from({ length: 9 }, (_, j) => i * 9 + j));
  COLS.push(Array.from({ length: 9 }, (_, j) => j * 9 + i));
  const r0 = Math.floor(i / 3) * 3;
  const c0 = (i % 3) * 3;
  BOXES.push(Array.from({ length: 9 }, (_, j) => (r0 + Math.floor(j / 3)) * 9 + c0 + (j % 3)));
}
const UNITS = [...ROWS, ...COLS, ...BOXES];
const boxOf = (i: number) => Math.floor(Math.floor(i / 9) / 3) * 3 + Math.floor((i % 9) / 3);
const PEERS: number[][] = Array.from({ length: 81 }, (_, i) => {
  const set = new Set<number>([...ROWS[Math.floor(i / 9)], ...COLS[i % 9], ...BOXES[boxOf(i)]]);
  set.delete(i);
  return [...set];
});

function bitCount(m: number): number {
  let c = 0;
  while (m) {
    m &= m - 1;
    c++;
  }
  return c;
}
const digitOf = (bit: number) => 31 - Math.clz32(bit) + 1;
const bitsOf = (m: number) => {
  const out: number[] = [];
  for (let d = 0; d < 9; d++) if (m & (1 << d)) out.push(1 << d);
  return out;
};
function combos<T>(arr: T[], k: number): T[][] {
  if (k === 0) return [[]];
  const out: T[][] = [];
  arr.forEach((v, i) => combos(arr.slice(i + 1), k - 1).forEach((rest) => out.push([v, ...rest])));
  return out;
}

class Board {
  values: number[];
  cand: number[];
  constructor(grid: number[]) {
    this.values = Array(81).fill(0);
    this.cand = Array(81).fill(ALL);
    grid.forEach((v, i) => {
      if (v) this.place(i, v);
    });
  }
  place(i: number, v: number) {
    this.values[i] = v;
    this.cand[i] = 0;
    const bit = 1 << (v - 1);
    for (const p of PEERS[i]) this.cand[p] &= ~bit;
  }
  /** Remove `mask` from cell i; returns true if anything changed. */
  eliminate(i: number, mask: number): boolean {
    if (this.values[i] || !(this.cand[i] & mask)) return false;
    this.cand[i] &= ~mask;
    return true;
  }
  done() {
    return this.values.every((v) => v !== 0);
  }
  broken() {
    return this.cand.some((c, i) => !this.values[i] && c === 0);
  }
}

// --- Level 1: singles --------------------------------------------------------
function nakedSingle(b: Board): boolean {
  for (let i = 0; i < 81; i++) {
    if (!b.values[i] && bitCount(b.cand[i]) === 1) {
      b.place(i, digitOf(b.cand[i]));
      return true;
    }
  }
  return false;
}
function hiddenSingle(b: Board): boolean {
  for (const unit of UNITS) {
    for (let d = 0; d < 9; d++) {
      const bit = 1 << d;
      let spot = -1;
      let n = 0;
      for (const i of unit) {
        if (b.values[i] === d + 1) {
          n = -1;
          break;
        }
        if (b.cand[i] & bit) {
          spot = i;
          n++;
        }
      }
      if (n === 1) {
        b.place(spot, d + 1);
        return true;
      }
    }
  }
  return false;
}

// --- Level 2: locked candidates (pointing and claiming) ----------------------
function lockedCandidates(b: Board): boolean {
  for (let bx = 0; bx < 9; bx++) {
    for (let d = 0; d < 9; d++) {
      const bit = 1 << d;
      const spots = BOXES[bx].filter((i) => b.cand[i] & bit);
      if (spots.length < 2) continue;
      const rows = new Set(spots.map((i) => Math.floor(i / 9)));
      const cols = new Set(spots.map((i) => i % 9));
      let changed = false;
      if (rows.size === 1) for (const i of ROWS[[...rows][0]]) if (boxOf(i) !== bx) changed = b.eliminate(i, bit) || changed;
      if (cols.size === 1) for (const i of COLS[[...cols][0]]) if (boxOf(i) !== bx) changed = b.eliminate(i, bit) || changed;
      if (changed) return true;
    }
  }
  for (const line of [...ROWS, ...COLS]) {
    for (let d = 0; d < 9; d++) {
      const bit = 1 << d;
      const spots = line.filter((i) => b.cand[i] & bit);
      if (spots.length < 2) continue;
      const boxes = new Set(spots.map(boxOf));
      if (boxes.size !== 1) continue;
      let changed = false;
      for (const i of BOXES[[...boxes][0]]) if (!line.includes(i)) changed = b.eliminate(i, bit) || changed;
      if (changed) return true;
    }
  }
  return false;
}

// --- Level 3: naked and hidden pairs / triples -------------------------------
function nakedSubset(b: Board, k: number): boolean {
  for (const unit of UNITS) {
    const open = unit.filter((i) => !b.values[i] && bitCount(b.cand[i]) <= k);
    for (const set of combos(open, k)) {
      const union = set.reduce((m, i) => m | b.cand[i], 0);
      if (bitCount(union) !== k) continue;
      let changed = false;
      for (const i of unit) if (!set.includes(i)) changed = b.eliminate(i, union) || changed;
      if (changed) return true;
    }
  }
  return false;
}
function hiddenSubset(b: Board, k: number): boolean {
  for (const unit of UNITS) {
    const digits = [];
    for (let d = 0; d < 9; d++) {
      const n = unit.filter((i) => b.cand[i] & (1 << d)).length;
      if (n >= 2 && n <= k) digits.push(d);
    }
    for (const ds of combos(digits, k)) {
      const mask = ds.reduce((m, d) => m | (1 << d), 0);
      const cells = unit.filter((i) => b.cand[i] & mask);
      if (cells.length !== k) continue;
      let changed = false;
      for (const i of cells) changed = b.eliminate(i, ALL & ~mask) || changed;
      if (changed) return true;
    }
  }
  return false;
}

// --- Level 4: X-Wing, Swordfish, XY-Wing -------------------------------------
function fish(b: Board, size: number): boolean {
  for (const [base, cover] of [
    [ROWS, COLS],
    [COLS, ROWS],
  ] as const) {
    for (let d = 0; d < 9; d++) {
      const bit = 1 << d;
      // For each base line, the cover indices (0-8) that hold the candidate.
      const lines = base
        .map((line, li) => ({ li, pos: line.map((i, p) => (b.cand[i] & bit ? p : -1)).filter((p) => p >= 0) }))
        .filter((l) => l.pos.length >= 2 && l.pos.length <= size);
      for (const set of combos(lines, size)) {
        const coverIdx = new Set(set.flatMap((l) => l.pos));
        if (coverIdx.size !== size) continue;
        const baseIdx = new Set(set.map((l) => l.li));
        let changed = false;
        for (const ci of coverIdx) {
          cover[ci].forEach((i, pos) => {
            if (!baseIdx.has(pos)) changed = b.eliminate(i, bit) || changed;
          });
        }
        if (changed) return true;
      }
    }
  }
  return false;
}
function xyWing(b: Board): boolean {
  const bivalue = (i: number) => !b.values[i] && bitCount(b.cand[i]) === 2;
  for (let pivot = 0; pivot < 81; pivot++) {
    if (!bivalue(pivot)) continue;
    const [x, y] = bitsOf(b.cand[pivot]);
    const wings = PEERS[pivot].filter(bivalue);
    for (const w1 of wings) {
      const c1 = b.cand[w1];
      if (!(c1 & x) || c1 & y) continue; // w1 = x z
      const z = c1 & ~x;
      for (const w2 of wings) {
        if (b.cand[w2] !== (y | z)) continue; // w2 = y z
        let changed = false;
        for (const i of PEERS[w1]) if (i !== w2 && i !== pivot && PEERS[w2].includes(i)) changed = b.eliminate(i, z) || changed;
        if (changed) return true;
      }
    }
  }
  return false;
}

const STEPS: { level: TechniqueLevel; run: (b: Board) => boolean }[] = [
  { level: 1, run: nakedSingle },
  { level: 1, run: hiddenSingle },
  { level: 2, run: lockedCandidates },
  { level: 3, run: (b) => nakedSubset(b, 2) },
  { level: 3, run: (b) => hiddenSubset(b, 2) },
  { level: 3, run: (b) => nakedSubset(b, 3) },
  { level: 3, run: (b) => hiddenSubset(b, 3) },
  { level: 4, run: (b) => fish(b, 2) },
  { level: 4, run: xyWing },
  { level: 4, run: (b) => fish(b, 3) },
];

/** Grade a puzzle (81 numbers, 0 = empty) by the techniques a person would need. */
export function gradePuzzle(grid: number[]): GradeResult {
  const b = new Board(grid);
  const uses = [0, 0, 0, 0, 0];
  let level = 0;
  while (!b.done() && !b.broken()) {
    const step = STEPS.find((s) => s.run(b));
    if (!step) break;
    uses[step.level]++;
    level = Math.max(level, step.level);
  }
  return { solved: b.done(), level, uses, values: b.values };
}
