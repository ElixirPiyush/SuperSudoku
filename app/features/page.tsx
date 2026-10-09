import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { DIFFICULTIES, GAME_TOOLS } from "@/lib/content";
import type { Shot } from "@/lib/content";
import PageHero from "@/components/PageHero";
import AppShot from "@/components/AppShot";
import LeaderboardSample from "@/components/LeaderboardSample";
import GooglePlayBadge from "@/components/GooglePlayBadge";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Features — Difficulty Levels, Daily Challenge, League & Themes",
  description:
    "Everything in Super Sudoku for Android: Easy to Expert puzzles, notes and hints, the Daily Challenge, the Monthly League and Top 100, nine themes, streaks, awards and offline play.",
  path: "/features/",
});

interface Feature {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  shot?: Shot;
  visual?: "leaderboard";
  link?: { href: string; label: string };
}

const FEATURES: Feature[] = [
  {
    id: "difficulty",
    eyebrow: "Puzzles",
    title: "Easy, Medium, Hard and Expert",
    body: "Pick a level from the Play sheet, or continue the game you left. Every level has the same tools; harder ones give fewer starting numbers.",
    points: DIFFICULTIES.map((d) => `${d.name}: ${d.body}`),
    shot: "play_sheet",
    link: { href: "/how-to-play/", label: "Learn to play" },
  },
  {
    id: "daily",
    eyebrow: "Daily Challenge",
    title: "One new puzzle every day",
    body: "The same puzzle for every player, scored for speed and accuracy with a 1–5 star rating. Finish it to grow your day streak.",
    points: ["Easy, Medium or Hard depending on the day", "Score breakdown after every solve", "Needs an internet connection to start"],
    shot: "daily_complete",
    link: { href: "/daily-challenge/", label: "About the Daily Challenge" },
  },
  {
    id: "league",
    eyebrow: "Monthly League",
    title: "A new competition every month",
    body: "Your Daily Challenge scores build a Monthly Score: your 20 best days plus 30 points per day played. The league screen shows your rank, streak and a calendar of the month.",
    points: ["Starts on the 1st of every month", "Free Streak Shield once a month", "Ad-free days for the Top 100"],
    shot: "league",
    link: { href: "/monthly-league/", label: "League rules" },
  },
  {
    id: "rankings",
    eyebrow: "Rankings",
    title: "Player rankings and the Top 100",
    body: "See your live rank and the players just above and below you, with how many points you need to pass the next one. The full Top 100 shows names, country flags and scores.",
    points: ["Choose your display name", "Show or hide your country flag", "Ties go to whoever reached the score first"],
    visual: "leaderboard",
    link: { href: "/monthly-league/#ranking", label: "How ranking works" },
  },
  {
    id: "themes",
    eyebrow: "Themes",
    title: "Nine themes for the whole app",
    body: "Super Sudoku, Neon Pulse, Glow Light, Classic, Ocean, Sakura, Midnight, Lavender and Monochrome. Preview a theme before you apply it.",
    points: ["Default theme follows light and dark mode", "Changes the board, keypad and every screen", "Saved on your phone"],
    shot: "themes",
    link: { href: "/themes/", label: "See every theme" },
  },
  {
    id: "progress",
    eyebrow: "Progress",
    title: "Streaks, scores and awards",
    body: "The Awards screen adds up your Sudoku Score and Daily Challenge Score and shows games played, games won, win rate, daily puzzles done and your current streak.",
    points: ["10 achievements, from First Puzzle to Sudoku Legend", "Google Play Games sign-in (optional) for achievements", "Streak badges at 7, 14 and 30 days"],
    shot: "awards",
  },
  {
    id: "offline",
    eyebrow: "Offline",
    title: "Play anywhere",
    body: "Regular puzzles at every level work without an internet connection, and your game saves automatically.",
    points: GAME_TOOLS.map((t) => `${t.title}: ${t.body}`),
    shot: "game",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title={
          <>
            Everything in <span className="text-gold">Super Sudoku</span>
          </>
        }
        lede="A classic Sudoku game with daily puzzles, a monthly competition and themes. Free on Android, in 12 languages from version 1.0.23."
      >
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-2">
            {FEATURES.map((f) => (
              <li key={f.id}>
                <a href={`#${f.id}`} className="inline-block rounded-full border border-white/25 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/10">
                  {f.eyebrow}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {FEATURES.map((f, i) => (
        <section key={f.id} id={f.id} className={`section scroll-mt-16 ${i % 2 ? "bg-white" : ""}`} aria-labelledby={`${f.id}-title`}>
          <div className="container-page grid items-center gap-12 lg:grid-cols-2">
            <div className={`min-w-0 ${i % 2 ? "lg:order-2" : ""}`}>
              <span className="eyebrow">{f.eyebrow}</span>
              <h2 id={`${f.id}-title`} className="text-3xl font-extrabold leading-tight sm:text-4xl">{f.title}</h2>
              <p className="lede mt-4">{f.body}</p>
              <ul className="mt-6 space-y-2.5">
                {f.points.map((p) => (
                  <li key={p} className="flex gap-3 text-brand-900">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                {f.link && (
                  <Link href={f.link.href} className="btn-primary">
                    {f.link.label} <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                )}
                <GooglePlayBadge />
              </div>
            </div>
            <div className={`mx-auto w-full min-w-0 ${f.visual ? "max-w-md" : "max-w-[280px]"} ${i % 2 ? "lg:order-1" : ""}`}>
              {f.shot && <AppShot shot={f.shot} />}
              {f.visual === "leaderboard" && <LeaderboardSample />}
            </div>
          </div>
        </section>
      ))}

      <CtaBand />
    </>
  );
}
