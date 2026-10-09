/**
 * Static Sudoku diagrams for the How to Play guide (SVG, no JavaScript).
 * All examples come from one valid solved grid, so every number is correct.
 */

export const SOLUTION = [
  "534678912",
  "672195348",
  "198342567",
  "859761423",
  "426853791",
  "713924856",
  "961537284",
  "287419635",
  "345286179",
];

type Cell = [row: number, col: number];

interface Props {
  /** 9 strings of 9 chars; "." = empty cell. Defaults to a partly filled grid. */
  grid?: string[];
  rows?: number[];
  cols?: number[];
  boxes?: number[]; // 0-8, left to right, top to bottom
  target?: Cell; // the cell being solved (gold)
  answer?: string; // digit shown in the target cell
  errors?: Cell[]; // cells shown in red
  title: string;
  className?: string;
}

const C = 40; // cell size
const ROYAL = "#003BDF";
const NAVY = "#0B1446";

export default function SudokuDiagram({
  grid = PUZZLE,
  rows = [],
  cols = [],
  boxes = [],
  target,
  answer,
  errors = [],
  title,
  className = "",
}: Props) {
  const isError = (r: number, c: number) => errors.some(([er, ec]) => er === r && ec === c);
  const shaded = (r: number, c: number) =>
    rows.includes(r) || cols.includes(c) || boxes.includes(Math.floor(r / 3) * 3 + Math.floor(c / 3));

  return (
    <svg viewBox={`0 0 ${C * 9 + 4} ${C * 9 + 4}`} role="img" aria-label={title} className={`h-auto w-full ${className}`}>
      <title>{title}</title>
      <g transform="translate(2 2)">
        <rect width={C * 9} height={C * 9} fill="#fff" />
        {grid.map((line, r) =>
          [...line].map((ch, c) => {
            const isTarget = target && target[0] === r && target[1] === c;
            const fill = isTarget ? "#FFEFAD" : isError(r, c) ? "#FDE2E2" : shaded(r, c) ? "#D6E2FB" : "transparent";
            const digit = isTarget ? answer ?? "?" : ch === "." ? "" : ch;
            return (
              <g key={`${r}-${c}`}>
                <rect x={c * C} y={r * C} width={C} height={C} fill={fill} />
                {digit && (
                  <text
                    x={c * C + C / 2}
                    y={r * C + C / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="21"
                    fontWeight={isTarget ? 800 : 600}
                    fill={isError(r, c) ? "#C62828" : isTarget ? "#8A6500" : NAVY}
                  >
                    {digit}
                  </text>
                )}
              </g>
            );
          }),
        )}
        {Array.from({ length: 10 }, (_, i) => (
          <g key={i} stroke={i % 3 === 0 ? NAVY : "#B8C4E0"} strokeWidth={i % 3 === 0 ? 2.5 : 1}>
            <line x1={i * C} y1={0} x2={i * C} y2={C * 9} />
            <line x1={0} y1={i * C} x2={C * 9} y2={i * C} />
          </g>
        ))}
        {target && (
          <rect x={target[1] * C + 1.5} y={target[0] * C + 1.5} width={C - 3} height={C - 3} fill="none" stroke={ROYAL} strokeWidth="3" rx="3" />
        )}
      </g>
    </svg>
  );
}

/**
 * Our own example puzzle: SOLUTION with a fixed pattern of cells hidden
 * (39 givens). For illustration only; it is not a published puzzle.
 */
export const PUZZLE = SOLUTION.map((line, r) =>
  [...line].map((ch, c) => ((r * 7 + c * 5 + r * c) % 9 < 4 ? ch : ".")).join(""),
);

/** SOLUTION with only the given cells hidden. */
export function hide(cells: Cell[]): string[] {
  return SOLUTION.map((line, r) =>
    [...line].map((ch, c) => (cells.some(([hr, hc]) => hr === r && hc === c) ? "." : ch)).join(""),
  );
}
