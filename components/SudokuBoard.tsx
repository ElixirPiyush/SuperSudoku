"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Pencil,
  Eraser,
  Lightbulb,
  Undo2,
  RotateCcw,
  Timer,
  XCircle,
  PartyPopper,
} from "lucide-react";
import {
  DIFFICULTIES,
  findConflicts,
  generatePuzzle,
  type Difficulty,
  type Grid,
} from "@/lib/sudoku";

const STORAGE_KEY = "supersudoku.web.save.v1";

interface SaveState {
  difficulty: Difficulty;
  puzzle: Grid;
  solution: Grid;
  current: Grid;
  givens: boolean[];
  notes: Record<number, number[]>;
  mistakes: number;
  seconds: number;
}

type HistoryEntry = { index: number; prev: number; prevNotes: number[] };

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

export default function SudokuBoard() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [puzzle, setPuzzle] = useState<Grid>([]);
  const [solution, setSolution] = useState<Grid>([]);
  const [givens, setGivens] = useState<boolean[]>([]);
  const [current, setCurrent] = useState<Grid>([]);
  const [notes, setNotes] = useState<Record<number, number[]>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [noteMode, setNoteMode] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [won, setWon] = useState(false);
  const history = useRef<HistoryEntry[]>([]);

  const startNew = useCallback(
    (diff: Difficulty) => {
      const { puzzle, solution, givens } = generatePuzzle(diff);
      setDifficulty(diff);
      setPuzzle(puzzle);
      setSolution(solution);
      setGivens(givens);
      setCurrent([...puzzle]);
      setNotes({});
      setSelected(null);
      setMistakes(0);
      setSeconds(0);
      setWon(false);
      setRunning(true);
      history.current = [];
    },
    []
  );

  // Load saved game or generate a fresh one on first mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as SaveState;
        if (s.puzzle?.length === 81) {
          setDifficulty(s.difficulty);
          setPuzzle(s.puzzle);
          setSolution(s.solution);
          setGivens(s.givens);
          setCurrent(s.current);
          setNotes(s.notes ?? {});
          setMistakes(s.mistakes ?? 0);
          setSeconds(s.seconds ?? 0);
          setRunning(true);
          return;
        }
      }
    } catch {
      /* ignore corrupt save */
    }
    startNew("medium");
  }, [startNew]);

  // Timer
  useEffect(() => {
    if (!running || won) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running, won]);

  // Auto-save
  useEffect(() => {
    if (puzzle.length !== 81) return;
    const state: SaveState = {
      difficulty,
      puzzle,
      solution,
      current,
      givens,
      notes,
      mistakes,
      seconds,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full / blocked */
    }
  }, [difficulty, puzzle, solution, current, givens, notes, mistakes, seconds]);

  const conflicts = useMemo(() => findConflicts(current), [current]);
  const selectedValue = selected != null ? current[selected] : 0;

  const place = useCallback(
    (value: number) => {
      if (selected == null || won) return;
      if (givens[selected]) return;

      if (noteMode && value !== 0) {
        setNotes((prev) => {
          const cellNotes = prev[selected] ?? [];
          const next = cellNotes.includes(value)
            ? cellNotes.filter((n) => n !== value)
            : [...cellNotes, value].sort();
          return { ...prev, [selected]: next };
        });
        return;
      }

      history.current.push({
        index: selected,
        prev: current[selected],
        prevNotes: notes[selected] ?? [],
      });

      setCurrent((prev) => {
        const next = [...prev];
        next[selected] = value;
        return next;
      });
      setNotes((prev) => ({ ...prev, [selected]: [] }));

      if (value !== 0 && value !== solution[selected]) {
        setMistakes((m) => m + 1);
      }
    },
    [selected, won, givens, noteMode, current, notes, solution]
  );

  const undo = useCallback(() => {
    const last = history.current.pop();
    if (!last) return;
    setCurrent((prev) => {
      const next = [...prev];
      next[last.index] = last.prev;
      return next;
    });
    setNotes((prev) => ({ ...prev, [last.index]: last.prevNotes }));
  }, []);

  const hint = useCallback(() => {
    // Fill the selected empty cell, or the first empty cell, with the answer.
    const target =
      selected != null && current[selected] === 0
        ? selected
        : current.indexOf(0);
    if (target === -1) return;
    history.current.push({
      index: target,
      prev: current[target],
      prevNotes: notes[target] ?? [],
    });
    setCurrent((prev) => {
      const next = [...prev];
      next[target] = solution[target];
      return next;
    });
    setSelected(target);
  }, [selected, current, solution, notes]);

  // Win detection
  useEffect(() => {
    if (current.length === 81 && current.every((v, i) => v === solution[i])) {
      setWon(true);
      setRunning(false);
      try {
        const games = Number(localStorage.getItem("supersudoku.web.wins") ?? 0) + 1;
        localStorage.setItem("supersudoku.web.wins", String(games));
        window.dispatchEvent(new CustomEvent("supersudoku:win", { detail: games }));
      } catch {
        /* ignore */
      }
    }
  }, [current, solution]);

  // Keyboard support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (selected == null) return;
      if (e.key >= "1" && e.key <= "9") place(Number(e.key));
      else if (e.key === "0" || e.key === "Backspace" || e.key === "Delete")
        place(0);
      else if (e.key === "ArrowLeft") setSelected((s) => (s! % 9 ? s! - 1 : s));
      else if (e.key === "ArrowRight")
        setSelected((s) => (s! % 9 < 8 ? s! + 1 : s));
      else if (e.key === "ArrowUp") setSelected((s) => (s! >= 9 ? s! - 9 : s));
      else if (e.key === "ArrowDown") setSelected((s) => (s! < 72 ? s! + 9 : s));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, place]);

  const remaining = useMemo(
    () =>
      [1, 2, 3, 4, 5, 6, 7, 8, 9].map(
        (n) => 9 - current.filter((v) => v === n).length
      ),
    [current]
  );

  if (puzzle.length !== 81) {
    return (
      <div className="glass grid aspect-square w-full max-w-[390px] place-items-center">
        <span className="animate-pulse text-brand-50/50">Loading puzzle…</span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[420px]">
      {/* Status bar */}
      <div className="mb-3 flex items-center justify-between gap-2 text-sm">
        <select
          value={difficulty}
          onChange={(e) => startNew(e.target.value as Difficulty)}
          className="rounded-lg border border-white/10 bg-surface-card px-3 py-1.5 font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="Select difficulty"
        >
          {DIFFICULTIES.map((d) => (
            <option key={d.id} value={d.id}>
              {d.label}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-brand-50/70">
            <XCircle size={16} className="text-red-400" /> {mistakes}
          </span>
          <span className="inline-flex items-center gap-1.5 tabular-nums text-brand-50/90">
            <Timer size={16} className="text-brand-300" /> {fmt(seconds)}
          </span>
        </div>
      </div>

      {/* Board */}
      <div className="relative">
        <div className="grid grid-cols-9 overflow-hidden rounded-xl border-2 border-brand-300/70 bg-surface shadow-glow-sm">
          {current.map((value, i) => {
            const r = Math.floor(i / 9);
            const c = i % 9;
            const isGiven = givens[i];
            const isSelected = selected === i;
            const sameRowCol =
              selected != null &&
              (Math.floor(selected / 9) === r ||
                selected % 9 === c ||
                (Math.floor(selected / 9 / 3) === Math.floor(r / 3) &&
                  Math.floor((selected % 9) / 3) === Math.floor(c / 3)));
            const sameNumber =
              selectedValue !== 0 && value === selectedValue;
            const isConflict = conflicts.has(i);
            const wrong = value !== 0 && !isGiven && value !== solution[i];

            return (
              <button
                key={i}
                onClick={() => setSelected(i)}
                aria-label={`Row ${r + 1}, column ${c + 1}${value ? `, value ${value}` : ", empty"}`}
                className={[
                  "relative flex aspect-square items-center justify-center text-lg font-semibold transition-colors sm:text-xl",
                  "border-[0.5px] border-ink-400/40",
                  c % 3 === 2 && c !== 8 ? "border-r-2 border-r-brand-300/60" : "",
                  r % 3 === 2 && r !== 8 ? "border-b-2 border-b-brand-300/60" : "",
                  isSelected
                    ? "bg-brand/30"
                    : sameNumber
                    ? "bg-brand/15"
                    : sameRowCol
                    ? "bg-white/[0.04]"
                    : "bg-transparent",
                  wrong || isConflict
                    ? "text-red-400"
                    : isGiven
                    ? "text-brand-50"
                    : "text-brand-300",
                ].join(" ")}
              >
                {value !== 0 ? (
                  value
                ) : notes[i]?.length ? (
                  <div className="grid h-full w-full grid-cols-3 grid-rows-3 p-0.5 text-[8px] leading-none text-brand-200 sm:text-[10px]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                      <span key={n} className="grid place-items-center">
                        {notes[i].includes(n) ? n : ""}
                      </span>
                    ))}
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        {won && (
          <div className="absolute inset-0 grid place-items-center rounded-xl bg-ink/85 backdrop-blur-sm">
            <div className="px-6 text-center">
              <PartyPopper className="mx-auto mb-3 text-brand-300" size={48} />
              <h3 className="text-2xl font-bold text-white">Puzzle Solved!</h3>
              <p className="mt-1 text-brand-50/70">
                {fmt(seconds)} • {mistakes} mistakes
              </p>
              <button
                onClick={() => startNew(difficulty)}
                className="btn-primary mt-5"
              >
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Number pad */}
      <div className="mt-4 grid grid-cols-9 gap-1.5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button
            key={n}
            onClick={() => place(n)}
            disabled={remaining[n - 1] <= 0}
            className="relative flex aspect-square items-center justify-center rounded-lg bg-surface-card text-lg font-semibold text-brand-50 transition-colors hover:bg-brand/20 disabled:opacity-30 sm:text-xl"
          >
            {n}
            <span className="absolute bottom-0.5 right-1 text-[9px] text-brand-50/40">
              {Math.max(0, remaining[n - 1])}
            </span>
          </button>
        ))}
      </div>

      {/* Tools */}
      <div className="mt-3 grid grid-cols-5 gap-2">
        <ToolButton onClick={undo} label="Undo" icon={<Undo2 size={18} />} />
        <ToolButton onClick={() => place(0)} label="Erase" icon={<Eraser size={18} />} />
        <ToolButton
          onClick={() => setNoteMode((v) => !v)}
          label="Notes"
          active={noteMode}
          icon={<Pencil size={18} />}
        />
        <ToolButton onClick={hint} label="Hint" icon={<Lightbulb size={18} />} />
        <ToolButton
          onClick={() => startNew(difficulty)}
          label="New"
          icon={<RotateCcw size={18} />}
        />
      </div>
    </div>
  );
}

function ToolButton({
  onClick,
  label,
  icon,
  active,
}: {
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 text-xs font-medium transition-colors ${
        active
          ? "border-brand/50 bg-brand/20 text-white"
          : "border-white/10 bg-surface-card text-brand-50/80 hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
