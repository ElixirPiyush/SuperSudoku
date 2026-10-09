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
  Pause,
  Play,
  Trophy,
} from "lucide-react";
import {
  DIFFICULTIES,
  findConflicts,
  loadPuzzle,
  type Difficulty,
  type Grid,
} from "@/lib/sudoku";

const STORAGE_KEY = "supersudoku.web.save.v2";
const LEGACY_STORAGE_KEY = "supersudoku.web.save.v1";
const SETTINGS_KEY = "supersudoku.web.settings.v1";
const STATS_KEY = "supersudoku.web.stats.v1";
const WINS_KEY = "supersudoku.web.wins";

/** Same rule as the app: 3 mistakes are allowed, the 4th ends the game. */
const MAX_MISTAKES = 3;

type Status = "playing" | "paused" | "won" | "lost";

interface SaveState {
  difficulty: Difficulty;
  puzzle: Grid;
  solution: Grid;
  current: Grid;
  givens: boolean[];
  /** Candidate bitmask per cell (bit n-1 = note n). */
  notes: number[];
  mistakes: number;
  hints: number;
  seconds: number;
  status: Status;
}

interface Settings {
  mistakeLimit: boolean;
}

type Stats = Partial<Record<Difficulty, { won: number; best: number }>>;

type Snapshot = { current: Grid; notes: number[] };

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const rowOf = (i: number) => Math.floor(i / 9);
const colOf = (i: number) => i % 9;
const boxOf = (i: number) => Math.floor(rowOf(i) / 3) * 3 + Math.floor(colOf(i) / 3);
const isPeer = (a: number, b: number) =>
  rowOf(a) === rowOf(b) || colOf(a) === colOf(b) || boxOf(a) === boxOf(b);

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full / blocked */
  }
}

/** Read the v2 save, or convert a v1 save (notes as lists, no status). */
function loadSave(): SaveState | null {
  const s = readJson<SaveState | null>(STORAGE_KEY, null);
  if (s?.puzzle?.length === 81 && s.notes?.length === 81) return s;
  const old = readJson<(Omit<SaveState, "notes" | "status" | "hints"> & { notes?: Record<number, number[]> }) | null>(
    LEGACY_STORAGE_KEY,
    null
  );
  if (old?.puzzle?.length !== 81) return null;
  const notes = Array.from({ length: 81 }, (_, i) =>
    (old.notes?.[i] ?? []).reduce((m, n) => m | (1 << (n - 1)), 0)
  );
  const won = old.current.every((v, i) => v === old.solution[i]);
  return { ...old, notes, hints: 0, status: won ? "won" : "playing" };
}

export default function SudokuBoard() {
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [puzzle, setPuzzle] = useState<Grid>([]);
  const [solution, setSolution] = useState<Grid>([]);
  const [givens, setGivens] = useState<boolean[]>([]);
  const [current, setCurrent] = useState<Grid>([]);
  const [notes, setNotes] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [noteMode, setNoteMode] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [hints, setHints] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState<Status>("playing");
  const [settings, setSettings] = useState<Settings>({ mistakeLimit: true });
  const [stats, setStats] = useState<Stats>({});
  const [newBest, setNewBest] = useState(false);
  /** Difficulty waiting for "start a new game?" confirmation. */
  const [confirmNew, setConfirmNew] = useState<Difficulty | null>(null);
  const [loading, setLoading] = useState(false);
  const history = useRef<Snapshot[]>([]);

  const startNew = useCallback(async (diff: Difficulty) => {
    setConfirmNew(null);
    setLoading(true);
    const { puzzle, solution, givens } = await loadPuzzle(diff);
    setDifficulty(diff);
    setPuzzle(puzzle);
    setSolution(solution);
    setGivens(givens);
    setCurrent([...puzzle]);
    setNotes(Array(81).fill(0));
    setSelected(null);
    setNoteMode(false);
    setMistakes(0);
    setHints(0);
    setSeconds(0);
    setNewBest(false);
    setStatus("playing");
    setLoading(false);
    history.current = [];
  }, []);

  // Load settings, stats and the saved game (or a fresh one) on first mount.
  useEffect(() => {
    setSettings(readJson<Settings>(SETTINGS_KEY, { mistakeLimit: true }));
    setStats(readJson<Stats>(STATS_KEY, {}));
    const s = loadSave();
    if (!s) {
      void startNew("medium");
      return;
    }
    setDifficulty(s.difficulty);
    setPuzzle(s.puzzle);
    setSolution(s.solution);
    setGivens(s.givens);
    setCurrent(s.current);
    setNotes(s.notes);
    setMistakes(s.mistakes ?? 0);
    setHints(s.hints ?? 0);
    setSeconds(s.seconds ?? 0);
    // Closing the tab pauses the game, so an unfinished game always continues.
    setStatus(s.status === "won" || s.status === "lost" ? s.status : "playing");
  }, [startNew]);

  // Timer
  useEffect(() => {
    if (status !== "playing" || puzzle.length !== 81) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [status, puzzle.length]);

  // Pause when the tab is hidden.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) setStatus((s) => (s === "playing" ? "paused" : s));
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Auto-save
  useEffect(() => {
    if (puzzle.length !== 81) return;
    writeJson(STORAGE_KEY, {
      difficulty, puzzle, solution, current, givens, notes, mistakes, hints, seconds, status,
    } satisfies SaveState);
  }, [difficulty, puzzle, solution, current, givens, notes, mistakes, hints, seconds, status]);

  const conflicts = useMemo(() => findConflicts([...current]), [current]);
  const selectedValue = selected != null ? current[selected] : 0;
  const isSolvedCell = useCallback(
    (i: number) => current[i] !== 0 && current[i] === solution[i],
    [current, solution]
  );

  const snapshot = useCallback(() => {
    history.current.push({ current: [...current], notes: [...notes] });
    if (history.current.length > 300) history.current.shift();
  }, [current, notes]);

  /** Put a correct value in cell i and drop that digit from its peers' notes. */
  const fillCorrect = useCallback(
    (i: number, value: number) => {
      const bit = 1 << (value - 1);
      setCurrent((prev) => {
        const next = [...prev];
        next[i] = value;
        return next;
      });
      setNotes((prev) => prev.map((m, k) => (k === i ? 0 : isPeer(i, k) ? m & ~bit : m)));
    },
    []
  );

  const winIfDone = useCallback(
    (next: Grid) => {
      if (!next.every((v, i) => v === solution[i])) return;
      setStatus("won");
      setSelected(null);
      const entry = stats[difficulty] ?? { won: 0, best: 0 };
      const best = entry.best === 0 || seconds < entry.best ? seconds : entry.best;
      setNewBest(entry.best !== 0 && seconds < entry.best);
      const nextStats = { ...stats, [difficulty]: { won: entry.won + 1, best } };
      setStats(nextStats);
      writeJson(STATS_KEY, nextStats);
      const wins = readJson<number>(WINS_KEY, 0) + 1;
      writeJson(WINS_KEY, wins);
      window.dispatchEvent(new CustomEvent("supersudoku:win", { detail: wins }));
    },
    [solution, stats, difficulty, seconds]
  );

  const place = useCallback(
    (value: number, asNote = noteMode) => {
      if (selected == null || status !== "playing") return;
      if (givens[selected] || isSolvedCell(selected)) return;

      if (asNote) {
        if (current[selected] !== 0) return;
        snapshot();
        const bit = 1 << (value - 1);
        setNotes((prev) => prev.map((m, k) => (k === selected ? m ^ bit : m)));
        return;
      }
      if (current[selected] === value) return;

      snapshot();
      if (value === solution[selected]) {
        fillCorrect(selected, value);
        const next = [...current];
        next[selected] = value;
        winIfDone(next);
        return;
      }
      setCurrent((prev) => {
        const next = [...prev];
        next[selected] = value;
        return next;
      });
      const m = mistakes + 1;
      setMistakes(m);
      if (settings.mistakeLimit && m > MAX_MISTAKES) setStatus("lost");
    },
    [selected, status, givens, isSolvedCell, noteMode, current, snapshot, solution, fillCorrect, winIfDone, mistakes, settings.mistakeLimit]
  );

  const erase = useCallback(() => {
    if (selected == null || status !== "playing") return;
    if (givens[selected] || isSolvedCell(selected)) return;
    if (current[selected] === 0 && notes[selected] === 0) return;
    snapshot();
    setCurrent((prev) => prev.map((v, k) => (k === selected ? 0 : v)));
    setNotes((prev) => prev.map((m, k) => (k === selected ? 0 : m)));
  }, [selected, status, givens, isSolvedCell, current, notes, snapshot]);

  const undo = useCallback(() => {
    if (status !== "playing") return;
    const last = history.current.pop();
    if (!last) return;
    setCurrent(last.current);
    setNotes(last.notes);
  }, [status]);

  const hint = useCallback(() => {
    if (status !== "playing") return;
    // The selected cell if it still needs its answer, otherwise the first that does.
    const open = (i: number) => !givens[i] && current[i] !== solution[i];
    const target = selected != null && open(selected) ? selected : current.findIndex((_, i) => open(i));
    if (target === -1) return;
    snapshot();
    fillCorrect(target, solution[target]);
    setHints((h) => h + 1);
    setSelected(target);
    const next = [...current];
    next[target] = solution[target];
    winIfDone(next);
  }, [status, givens, current, solution, selected, snapshot, fillCorrect, winIfDone]);

  /** After the 4th mistake: take the last move back and keep playing at 3/3. */
  const secondChance = useCallback(() => {
    const last = history.current.pop();
    if (last) {
      setCurrent(last.current);
      setNotes(last.notes);
    }
    setMistakes(MAX_MISTAKES);
    setStatus("playing");
  }, []);

  const togglePause = useCallback(() => {
    setStatus((s) => (s === "playing" ? "paused" : s === "paused" ? "playing" : s));
  }, []);

  const toggleMistakeLimit = useCallback(() => {
    setSettings((prev) => {
      const next = { ...prev, mistakeLimit: !prev.mistakeLimit };
      writeJson(SETTINGS_KEY, next);
      return next;
    });
  }, []);

  /** Ask first when a game is under way; otherwise start right away. */
  const requestNew = useCallback(
    (diff: Difficulty) => {
      const underway = status !== "won" && status !== "lost" && current.some((v, i) => v !== puzzle[i]);
      if (underway) setConfirmNew(diff);
      else void startNew(diff);
    },
    [status, current, puzzle, startNew]
  );

  // Keyboard: digits (Shift = note), Backspace/Delete/0 erase, arrows move,
  // N notes, Ctrl+Z / U undo, H hint, P pause.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof Element && e.target.closest("input, textarea, select, [contenteditable]")) return;
      if (e.altKey) return;
      const key = e.key.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && key === "z") {
        e.preventDefault();
        undo();
        return;
      }
      if (e.ctrlKey || e.metaKey) return;
      const digit = /^Digit([1-9])$/.exec(e.code)?.[1] ?? /^Numpad([1-9])$/.exec(e.code)?.[1];
      if (digit) {
        e.preventDefault();
        place(Number(digit), e.shiftKey ? !noteMode : noteMode);
      } else if (key === "backspace" || key === "delete" || key === "0") erase();
      else if (key === "n") setNoteMode((v) => !v);
      else if (key === "u") undo();
      else if (key === "h") hint();
      else if (key === "p") togglePause();
      else if (key === "escape") setSelected(null);
      else if (key.startsWith("arrow")) {
        e.preventDefault();
        setSelected((s) => {
          if (s == null) return 40;
          const r = rowOf(s);
          const c = colOf(s);
          if (key === "arrowleft") return r * 9 + ((c + 8) % 9);
          if (key === "arrowright") return r * 9 + ((c + 1) % 9);
          if (key === "arrowup") return ((r + 8) % 9) * 9 + c;
          return ((r + 1) % 9) * 9 + c;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [place, erase, undo, hint, togglePause, noteMode]);

  // How many of each digit are still to be placed correctly.
  const remaining = useMemo(
    () => DIGITS.map((n) => 9 - current.filter((v, i) => v === n && v === solution[i]).length),
    [current, solution]
  );

  if (puzzle.length !== 81) {
    return (
      <div className="grid aspect-square w-full max-w-[480px] place-items-center rounded-xl bg-surface">
        <span className="animate-pulse text-brand-50/70">Loading puzzle…</span>
      </div>
    );
  }

  const hidden = status === "paused";
  const best = stats[difficulty]?.best ?? 0;

  return (
    <div className="mx-auto w-full max-w-[480px]">
      {/* Difficulty */}
      <div role="group" aria-label="Difficulty" className="mb-3 grid grid-cols-4 gap-1 rounded-xl bg-white/5 p-1">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.id}
            type="button"
            title={d.blurb}
            aria-pressed={d.id === difficulty}
            onClick={() => requestNew(d.id)}
            className={`min-h-11 rounded-lg text-sm font-bold transition-colors ${
              d.id === difficulty ? "bg-white text-brand-900" : "text-brand-50/80 hover:bg-white/10"
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {confirmNew && (
        <div role="alert" className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-gold/15 px-3 py-2 text-sm text-white">
          <span>Start a new {DIFFICULTIES.find((d) => d.id === confirmNew)?.label} game? This one will be lost.</span>
          <span className="flex gap-2">
            <button type="button" onClick={() => void startNew(confirmNew)} className="min-h-11 rounded-lg bg-white px-3 font-bold text-brand-900">
              New game
            </button>
            <button type="button" onClick={() => setConfirmNew(null)} className="min-h-11 rounded-lg px-3 font-bold text-white hover:bg-white/10">
              Keep playing
            </button>
          </span>
        </div>
      )}

      {/* Status bar */}
      <div className="mb-2 flex items-center justify-between gap-2 text-sm">
        <span className={`inline-flex items-center gap-1.5 ${mistakes > 0 ? "text-red-300" : "text-brand-50/80"}`}>
          <XCircle size={16} aria-hidden="true" />
          Mistakes {settings.mistakeLimit ? `${Math.min(mistakes, MAX_MISTAKES)}/${MAX_MISTAKES}` : mistakes}
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-flex items-center gap-1.5 tabular-nums text-brand-50/90" aria-label={`Time ${fmt(seconds)}`}>
            <Timer size={16} className="text-brand-300" aria-hidden="true" /> {fmt(seconds)}
          </span>
          <button
            type="button"
            onClick={togglePause}
            disabled={status === "won" || status === "lost"}
            aria-label={status === "paused" ? "Resume" : "Pause"}
            className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10 disabled:opacity-40"
          >
            {status === "paused" ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
          </button>
        </span>
      </div>

      {/* Board */}
      <div className="relative">
        <div
          className={`grid grid-cols-9 overflow-hidden rounded-xl border-2 border-brand-300/70 bg-surface shadow-glow-sm ${loading ? "opacity-60" : ""}`}
        >
          {current.map((value, i) => {
            const r = rowOf(i);
            const c = colOf(i);
            const isGiven = givens[i];
            const isSelected = selected === i;
            const peer = selected != null && !isSelected && isPeer(selected, i);
            const sameNumber = selectedValue !== 0 && value === selectedValue && !isSelected;
            const wrong = value !== 0 && !isGiven && value !== solution[i];
            const bad = wrong || (conflicts.has(i) && value !== 0);
            const cellNotes = notes[i];

            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(i)}
                disabled={hidden}
                aria-label={hidden ? "Hidden while paused" : `Row ${r + 1}, column ${c + 1}${value ? `, ${value}${wrong ? ", wrong" : ""}` : ", empty"}`}
                className={[
                  "relative flex aspect-square items-center justify-center text-xl font-semibold transition-colors sm:text-2xl",
                  "border-[0.5px] border-ink-400/40",
                  c % 3 === 2 && c !== 8 ? "border-r-2 border-r-brand-300/60" : "",
                  r % 3 === 2 && r !== 8 ? "border-b-2 border-b-brand-300/60" : "",
                  hidden
                    ? "bg-transparent"
                    : isSelected
                    ? "bg-brand/45"
                    : bad && sameNumber
                    ? "bg-red-500/25"
                    : sameNumber
                    ? "bg-brand/25"
                    : peer
                    ? "bg-white/[0.08]"
                    : "bg-transparent",
                  bad ? "text-red-400" : isGiven ? "text-brand-50" : "text-brand-300",
                ].join(" ")}
              >
                {hidden ? null : value !== 0 ? (
                  value
                ) : cellNotes ? (
                  <span className="grid h-full w-full grid-cols-3 grid-rows-3 p-0.5 text-[9px] font-medium leading-none text-brand-200 sm:text-[11px]">
                    {DIGITS.map((n) => (
                      <span
                        key={n}
                        className={`grid place-items-center rounded-sm ${
                          cellNotes & (1 << (n - 1)) && n === selectedValue ? "bg-brand/50 font-bold text-white" : ""
                        }`}
                      >
                        {cellNotes & (1 << (n - 1)) ? n : ""}
                      </span>
                    ))}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {status === "paused" && (
          <div className="absolute inset-0 grid place-items-center rounded-xl bg-ink/80 backdrop-blur-sm">
            <div className="px-6 text-center">
              <p className="text-2xl font-bold text-white">Paused</p>
              <p className="mt-1 text-brand-50/80">
                {DIFFICULTIES.find((d) => d.id === difficulty)?.label} · {fmt(seconds)}
              </p>
              <button type="button" onClick={togglePause} className="btn-primary mt-5 gap-2">
                <Play size={18} aria-hidden="true" /> Resume
              </button>
            </div>
          </div>
        )}

        {status === "lost" && (
          <div role="alert" className="absolute inset-0 grid place-items-center rounded-xl bg-ink/85 backdrop-blur-sm">
            <div className="px-6 text-center">
              <XCircle className="mx-auto mb-3 text-red-400" size={44} aria-hidden="true" />
              <p className="text-2xl font-bold text-white">Game over</p>
              <p className="mt-1 text-brand-50/80">That was mistake number {MAX_MISTAKES + 1}.</p>
              <div className="mt-5 flex flex-col items-center gap-2">
                <button type="button" onClick={secondChance} className="btn-primary">
                  Second chance
                </button>
                <button type="button" onClick={() => void startNew(difficulty)} className="min-h-11 px-4 text-sm font-bold text-white underline">
                  New game
                </button>
              </div>
            </div>
          </div>
        )}

        {status === "won" && (
          <div role="alert" className="absolute inset-0 grid place-items-center rounded-xl bg-ink/85 backdrop-blur-sm">
            <div className="px-6 text-center">
              <PartyPopper className="mx-auto mb-3 text-gold" size={44} aria-hidden="true" />
              <p className="text-2xl font-bold text-white">Puzzle solved!</p>
              <p className="mt-1 text-brand-50/80">
                {DIFFICULTIES.find((d) => d.id === difficulty)?.label} · {fmt(seconds)} · {mistakes}{" "}
                {mistakes === 1 ? "mistake" : "mistakes"} · {hints} {hints === 1 ? "hint" : "hints"}
              </p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-gold">
                <Trophy size={16} aria-hidden="true" />
                {newBest ? "New best time!" : best ? `Best time ${fmt(best)}` : ""}
                {stats[difficulty]?.won ? ` · ${stats[difficulty]!.won} solved` : ""}
              </p>
              <div className="mt-5">
                <button type="button" onClick={() => void startNew(difficulty)} className="btn-primary">
                  Play again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tools */}
      <div className="mt-4 grid grid-cols-5 gap-2">
        <ToolButton onClick={undo} label="Undo" icon={<Undo2 size={18} />} />
        <ToolButton onClick={erase} label="Erase" icon={<Eraser size={18} />} />
        <ToolButton
          onClick={() => setNoteMode((v) => !v)}
          label={noteMode ? "Notes on" : "Notes"}
          active={noteMode}
          icon={<Pencil size={18} />}
        />
        <ToolButton onClick={hint} label="Hint" icon={<Lightbulb size={18} />} />
        <ToolButton onClick={() => requestNew(difficulty)} label="New" icon={<RotateCcw size={18} />} />
      </div>

      {/* Number pad */}
      <div className="mt-3 grid grid-cols-9 gap-1 sm:gap-1.5">
        {DIGITS.map((n) => {
          const left = Math.max(0, remaining[n - 1]);
          return (
            <button
              key={n}
              type="button"
              onClick={() => place(n)}
              disabled={left === 0 || hidden}
              aria-label={`${n}${noteMode ? " as a note" : ""}, ${left} left`}
              className={`flex flex-col items-center justify-center rounded-lg py-1.5 font-semibold transition-colors disabled:opacity-25 ${
                noteMode ? "bg-gold/15 text-gold hover:bg-gold/25" : "bg-surface-card text-brand-50 hover:bg-brand/25"
              }`}
            >
              <span className="text-2xl leading-tight">{n}</span>
              <span className="text-xs font-medium text-brand-50/60">{left}</span>
            </button>
          );
        })}
      </div>

      {/* Settings */}
      <label className="mt-4 flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl bg-white/5 px-4 text-sm text-brand-50/90">
        <span>Mistake limit (game over after {MAX_MISTAKES})</span>
        <input type="checkbox" checked={settings.mistakeLimit} onChange={toggleMistakeLimit} className="h-5 w-5 accent-gold" />
      </label>
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
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl border px-1 py-2 text-xs font-medium transition-colors ${
        active
          ? "border-gold/60 bg-gold/20 text-white"
          : "border-white/10 bg-surface-card text-brand-50/80 hover:bg-white/10"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}
