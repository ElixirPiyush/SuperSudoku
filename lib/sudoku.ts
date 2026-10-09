// -----------------------------------------------------------------------------
// Sudoku engine: generation, solving, validation.
// Pure TypeScript, no DOM dependencies, safe for SSG and the browser.
// -----------------------------------------------------------------------------

export type Grid = number[]; // length 81, 0 == empty
export type Difficulty = "easy" | "medium" | "hard" | "expert";

// Number of cells to remove per difficulty (out of 81). Only used by the
// fallback generator; normal play draws graded puzzles from public/puzzles/.
export const DIFFICULTY_CLUES: Record<Difficulty, number> = {
  easy: 40,
  medium: 49,
  hard: 54,
  expert: 58,
};

export const DIFFICULTIES: { id: Difficulty; label: string; blurb: string }[] = [
  { id: "easy", label: "Easy", blurb: "Plenty of clues; every number can be found directly." },
  { id: "medium", label: "Medium", blurb: "Fewer clues; some numbers need a look at a whole box." },
  { id: "hard", label: "Hard", blurb: "Needs pairs and triples of candidates (use Notes)." },
  { id: "expert", label: "Expert", blurb: "Needs advanced patterns such as the X-Wing." },
];

function rowOf(i: number) {
  return Math.floor(i / 9);
}
function colOf(i: number) {
  return i % 9;
}

export function isSafe(grid: Grid, index: number, value: number): boolean {
  const r = rowOf(index);
  const c = colOf(index);
  for (let i = 0; i < 9; i++) {
    if (grid[r * 9 + i] === value) return false;
    if (grid[i * 9 + c] === value) return false;
  }
  const sr = r - (r % 3);
  const sc = c - (c % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[(sr + i) * 9 + (sc + j)] === value) return false;
    }
  }
  return true;
}

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Fill `grid` in place with a complete valid solution. Returns success. */
function fillSolution(grid: Grid): boolean {
  const empty = grid.indexOf(0);
  if (empty === -1) return true;
  for (const value of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    if (isSafe(grid, empty, value)) {
      grid[empty] = value;
      if (fillSolution(grid)) return true;
      grid[empty] = 0;
    }
  }
  return false;
}

/** Count solutions up to `limit` (used to guarantee a unique puzzle). */
function countSolutions(grid: Grid, limit = 2): number {
  const empty = grid.indexOf(0);
  if (empty === -1) return 1;
  let count = 0;
  for (let value = 1; value <= 9; value++) {
    if (isSafe(grid, empty, value)) {
      grid[empty] = value;
      count += countSolutions(grid, limit);
      grid[empty] = 0;
      if (count >= limit) break;
    }
  }
  return count;
}

/** Solve a (solvable) grid in place. Returns success. */
export function solve(grid: Grid): boolean {
  const empty = grid.indexOf(0);
  if (empty === -1) return true;
  for (let value = 1; value <= 9; value++) {
    if (isSafe(grid, empty, value)) {
      grid[empty] = value;
      if (solve(grid)) return true;
      grid[empty] = 0;
    }
  }
  return false;
}

export interface Puzzle {
  puzzle: Grid; // with blanks (0)
  solution: Grid; // fully solved
  givens: boolean[]; // true where the cell is a fixed clue
}

/**
 * Generate a puzzle with a unique solution for the given difficulty.
 * Cells are removed symmetrically-ish while keeping the solution unique.
 */
export function generatePuzzle(difficulty: Difficulty = "medium"): Puzzle {
  const solution: Grid = new Array(81).fill(0);
  fillSolution(solution);

  const puzzle = [...solution];
  const target = DIFFICULTY_CLUES[difficulty];
  let removed = 0;

  const order = shuffle(Array.from({ length: 81 }, (_, i) => i));
  for (const idx of order) {
    if (removed >= target) break;
    if (puzzle[idx] === 0) continue;
    const backup = puzzle[idx];
    puzzle[idx] = 0;
    // Ensure the puzzle still has exactly one solution.
    if (countSolutions([...puzzle], 2) !== 1) {
      puzzle[idx] = backup; // revert: removal broke uniqueness
    } else {
      removed++;
    }
  }

  return {
    puzzle,
    solution,
    givens: puzzle.map((v) => v !== 0),
  };
}

/** Indices (0-80) that conflict with another filled cell. */
export function findConflicts(grid: Grid): Set<number> {
  const conflicts = new Set<number>();
  for (let i = 0; i < 81; i++) {
    const v = grid[i];
    if (v === 0) continue;
    grid[i] = 0;
    if (!isSafe(grid, i, v)) conflicts.add(i);
    grid[i] = v;
  }
  return conflicts;
}

export function isComplete(grid: Grid, solution: Grid): boolean {
  for (let i = 0; i < 81; i++) {
    if (grid[i] !== solution[i]) return false;
  }
  return true;
}

/**
 * Shuffle digits, rows within bands, bands, columns within stacks and stacks,
 * and maybe transpose. The result is a different-looking puzzle with the same
 * logic, so its difficulty grade is unchanged.
 */
export function transformPuzzle(puzzle: Grid, solution: Grid): Puzzle {
  const digits = [0, ...shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])];
  const order = () => shuffle([0, 1, 2]).flatMap((band) => shuffle([0, 1, 2]).map((k) => band * 3 + k));
  const rows = order();
  const cols = order();
  const transpose = Math.random() < 0.5;
  const map = (g: Grid) =>
    Array.from({ length: 81 }, (_, i) => {
      let r = rows[rowOf(i)];
      let c = cols[colOf(i)];
      if (transpose) [r, c] = [c, r];
      return digits[g[r * 9 + c]];
    });
  const p = map(puzzle);
  return { puzzle: p, solution: map(solution), givens: p.map((v) => v !== 0) };
}

const bankCache = new Map<Difficulty, string[]>();

/**
 * A random graded puzzle from public/puzzles/<difficulty>.json (built by
 * scripts/generate-puzzles.mjs), shuffled. Falls back to the local generator
 * when the bank cannot be loaded.
 */
export async function loadPuzzle(difficulty: Difficulty): Promise<Puzzle> {
  try {
    let bank = bankCache.get(difficulty);
    if (!bank) {
      const res = await fetch(`/puzzles/${difficulty}.json`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      bank = (await res.json()) as string[];
      bankCache.set(difficulty, bank);
    }
    const [p, s] = bank[Math.floor(Math.random() * bank.length)].split(":");
    return transformPuzzle([...p].map(Number), [...s].map(Number));
  } catch {
    return generatePuzzle(difficulty);
  }
}
