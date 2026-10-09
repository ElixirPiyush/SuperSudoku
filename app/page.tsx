import Link from "next/link";
import { ArrowRight, CalendarDays, Trophy, Palette, Gauge, Flame, WifiOff, Check } from "lucide-react";
import { SITE } from "@/lib/site";
import { DIFFICULTIES, FAQS, GAME_TOOLS, REWARD_TIERS } from "@/lib/content";
import AppShot from "@/components/AppShot";
import GooglePlayBadge from "@/components/GooglePlayBadge";
import SectionHeading from "@/components/SectionHeading";
import LeaderboardSample from "@/components/LeaderboardSample";
import ThemeGallery from "@/components/ThemeGallery";
import FaqList from "@/components/FaqList";
import CtaBand from "@/components/CtaBand";
import { GridPattern } from "@/components/PageHero";

export const metadata = {
  title: { absolute: "Super Sudoku — Daily Sudoku, Monthly League & Themes for Android" },
  description: SITE.description,
  alternates: { canonical: "/" },
};

const HIGHLIGHTS = [
  { icon: CalendarDays, title: "Daily Challenge", body: "One new puzzle every day, the same for every player, with a score and star rating.", href: "/daily-challenge/" },
  { icon: Trophy, title: "Monthly League", body: "Your daily scores build a monthly rank. The Top 100 win ad-free days.", href: "/monthly-league/" },
  { icon: Palette, title: "Nine themes", body: "From royal Super Sudoku to Sakura and Midnight, light and dark.", href: "/themes/" },
  { icon: Gauge, title: "Four difficulty levels", body: "Easy, Medium, Hard and Expert, with notes, hints and undo.", href: "/features/" },
  { icon: Flame, title: "Streaks & awards", body: "Day streaks, a monthly calendar, scores, statistics and achievements.", href: "/features/" },
  { icon: WifiOff, title: "Plays offline", body: "Regular puzzles work anywhere, no connection needed.", href: "/faq/#offline" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <GridPattern />
        <div className="container-page relative grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_0.7fr] lg:py-24">
          <div>
            <span className="eyebrow-dark">Free Sudoku for Android</span>
            <h1 className="text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.3rem] xl:text-6xl">
              Challenge Your Mind.
              <br />
              <span className="text-gold">Master Every Puzzle.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">
              Enjoy Sudoku your way with multiple difficulty levels, daily challenges, customizable themes, and
              competitive monthly leaderboards.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GooglePlayBadge />
              <Link href="/features/" className="btn-ghost-dark">
                See all features <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-brand-100">
              {["Easy to Expert", "New puzzle every day", "Monthly Top 100", "Plays offline"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check size={16} className="text-gold" aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[320px]">
            <AppShot shot="home" priority sizes="(min-width: 1024px) 320px, 300px" />
            <div className="absolute -bottom-6 -left-24 hidden w-40 rotate-[-6deg] xl:block">
              <AppShot shot="game" sizes="160px" />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            center
            eyebrow="Why Super Sudoku"
            title="Classic Sudoku, with a reason to come back every day"
            lede="Everything below is in the app today."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <li key={h.title}>
                <Link href={h.href} className="card group flex h-full flex-col p-6 transition-shadow hover:shadow-lift">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <h.icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{h.title}</h3>
                  <p className="mt-2 flex-1 text-slate">{h.body}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700 group-hover:underline">
                    Learn more <ArrowRight size={15} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Daily Challenge */}
      <section className="section bg-white">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 mx-auto w-full max-w-[280px] lg:order-1">
            <AppShot shot="daily_complete" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Daily Challenge"
              title="A new puzzle every day"
              lede="Everyone plays the same Daily Challenge. Finish it to earn a score for speed and accuracy, a 1–5 star rating and one more day on your streak."
            />
            <ul className="mt-6 space-y-3 text-brand-900">
              {["The score shows exactly how it was earned", "Counts toward your Monthly League rank", "Share your result with friends"].map((t) => (
                <li key={t} className="flex gap-3">
                  <Check className="mt-0.5 shrink-0 text-brand-600" size={20} aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
            <Link href="/daily-challenge/" className="btn-primary mt-8">
              How the Daily Challenge works <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Monthly League */}
      <section className="section">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <SectionHeading
              eyebrow="Monthly League"
              title="Climb the monthly leaderboard"
              lede="Every Daily Challenge you finish adds to your Monthly Score: your 20 best days plus 30 points for each day you play. A new league starts on the 1st."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <LeaderboardSample compact />
              <div className="card p-5">
                <p className="font-bold text-brand-900">Monthly rewards</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {REWARD_TIERS.map((t) => (
                    <li key={t.rank} className="flex justify-between gap-3">
                      <span className="font-semibold text-brand-900">{t.rank}</span>
                      <span className="text-right text-slate">{t.reward}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link href="/monthly-league/" className="btn-primary mt-8">
              League rules and scoring <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mx-auto w-full max-w-[280px]">
            <AppShot shot="league" />
          </div>
        </div>
      </section>

      {/* Themes */}
      <section className="section bg-white">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading eyebrow="Themes" title="Make the board yours" lede="Nine themes for the whole app, each with its own board colours. Here are five of them." />
            <Link href="/themes/" className="btn-ghost shrink-0">
              See all themes <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-10">
            <ThemeGallery limit={5} />
          </div>
        </div>
      </section>

      {/* Gameplay */}
      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-[280px]">
            <AppShot shot="game" />
          </div>
          <div>
            <SectionHeading eyebrow="Gameplay" title="A clean board and the tools you need" lede="Large numbers, clear highlights and a number pad that shows how many of each digit are left." />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {GAME_TOOLS.map((t) => (
                <li key={t.title} className="card p-4">
                  <p className="font-bold text-brand-900">{t.title}</p>
                  <p className="mt-1 text-sm text-slate">{t.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Difficulty */}
      <section className="section bg-white">
        <div className="container-page">
          <SectionHeading center eyebrow="Difficulty levels" title="From your first puzzle to Expert" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFICULTIES.map((d) => (
              <li key={d.name} className="card overflow-hidden">
                <div className="h-1.5" style={{ background: d.color }} />
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate">{d.tag}</p>
                  <h3 className="mt-1 text-2xl font-extrabold">{d.name}</h3>
                  <p className="mt-2 text-slate">{d.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-slate">
            New to Sudoku?{" "}
            <Link href="/how-to-play/" className="font-bold text-brand-700 underline">
              Read the beginner&apos;s guide
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-page max-w-3xl">
          <SectionHeading center eyebrow="FAQ" title="Questions, answered" />
          <div className="mt-10">
            <FaqList items={FAQS.filter((f) => ["download", "daily", "league", "offline", "rewards", "ads"].includes(f.id))} />
          </div>
          <p className="mt-6 text-center">
            <Link href="/faq/" className="font-bold text-brand-700 underline">
              All questions
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
