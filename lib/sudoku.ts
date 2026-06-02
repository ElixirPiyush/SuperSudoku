// -----------------------------------------------------------------------------
// Sudoku engine: generation, solving, validation.
// Pure TypeScript, no DOM dependencies, safe for SSG and the browser.
// -----------------------------------------------------------------------------

export type Grid = number[]; // length 81, 0 == empty
export type Difficulty = "easy" | "medium" | "hard" | "expert";

// Number of cells to remove per difficulty (out of 81).
export const DIFFICULTY_CLUES: Record<Difficulty, number> = {
  easy: 40,
  medium: 49,
  hard: 54,
  expert: 58,
};

export const DIFFICULTIES: { id: Difficulty; label: string; blurb: string }[] = [
  { id: "easy", label: "Easy", blurb: "Relaxed solving with plenty of clues." },
  { id: "medium", label: "Medium", blurb: "A balanced everyday brain workout." },
  { id: "hard", label: "Hard", blurb: "Fewer clues, sharper logic required." },
  { id: "expert", label: "Expert", blurb: "For seasoned Sudoku masters only." },
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
