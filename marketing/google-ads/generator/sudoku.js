// Deterministic Sudoku generator + validators for the ad creatives.
// Every grid that appears in an ad is generated here and verified: the solution
// is a valid Sudoku, the givens match it, and the puzzle has exactly one
// solution. Seeds are fixed so every language shows the identical board.

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function canPlace(g, i, v) {
  const r = Math.floor(i / 9), c = i % 9;
  const br = r - (r % 3), bc = c - (c % 3);
  for (let k = 0; k < 9; k++) {
    if (g[r * 9 + k] === v || g[k * 9 + c] === v) return false;
    if (g[(br + Math.floor(k / 3)) * 9 + bc + (k % 3)] === v) return false;
  }
  return true;
}

function fill(g, rand) {
  const i = g.indexOf(0);
  if (i === -1) return true;
  for (const v of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rand)) {
    if (canPlace(g, i, v)) {
      g[i] = v;
      if (fill(g, rand)) return true;
      g[i] = 0;
    }
  }
  return false;
}

function countSolutions(g, limit = 2) {
  // Pick the empty cell with the fewest candidates (keeps this fast).
  let best = -1, bestCands = null;
  for (let i = 0; i < 81; i++) {
    if (g[i]) continue;
    const cands = [];
    for (let v = 1; v <= 9; v++) if (canPlace(g, i, v)) cands.push(v);
    if (!cands.length) return 0;
    if (!bestCands || cands.length < bestCands.length) { best = i; bestCands = cands; }
  }
  if (best === -1) return 1;
  let n = 0;
  for (const v of bestCands) {
    g[best] = v;
    n += countSolutions(g, limit - n);
    g[best] = 0;
    if (n >= limit) break;
  }
  return n;
}

function generate(seed, givens) {
  const rand = rng(seed);
  const solution = new Array(81).fill(0);
  fill(solution, rand);
  const puzzle = [...solution];
  let filled = 81;
  for (const i of shuffle([...Array(81).keys()], rand)) {
    if (filled <= givens) break;
    const keep = puzzle[i];
    puzzle[i] = 0;
    if (countSolutions([...puzzle]) !== 1) puzzle[i] = keep;
    else filled--;
  }
  return { puzzle, solution };
}

function isValidSolution(s) {
  for (let k = 0; k < 9; k++) {
    const row = new Set(), col = new Set(), box = new Set();
    for (let j = 0; j < 9; j++) {
      row.add(s[k * 9 + j]);
      col.add(s[j * 9 + k]);
      box.add(s[(Math.floor(k / 3) * 3 + Math.floor(j / 3)) * 9 + (k % 3) * 3 + (j % 3)]);
    }
    if (row.size !== 9 || col.size !== 9 || box.size !== 9) return false;
  }
  return s.every((v) => v >= 1 && v <= 9);
}

function verify({ puzzle, solution }, name) {
  if (!isValidSolution(solution)) throw new Error(`${name}: invalid solution`);
  if (puzzle.some((v, i) => v && v !== solution[i])) throw new Error(`${name}: givens disagree with solution`);
  if (countSolutions([...puzzle]) !== 1) throw new Error(`${name}: puzzle is not uniquely solvable`);
}

// Givens per difficulty mirror the app's levels (fewer givens = harder).
const SPEC = {
  main: { seed: 20261007, givens: 34 },
  daily: { seed: 7102026, givens: 30 },
  easy: { seed: 101, givens: 44 },
  medium: { seed: 202, givens: 34 },
  hard: { seed: 303, givens: 28 },
  expert: { seed: 404, givens: 24 },
};

function buildPuzzles() {
  const out = {};
  for (const [name, { seed, givens }] of Object.entries(SPEC)) {
    out[name] = generate(seed, givens);
    verify(out[name], name);
  }
  return out;
}

module.exports = { buildPuzzles, verify, isValidSolution, countSolutions };

if (require.main === module) {
  const p = buildPuzzles();
  for (const [k, v] of Object.entries(p)) {
    console.log(k, "givens:", v.puzzle.filter(Boolean).length, "unique: yes");
  }
}
