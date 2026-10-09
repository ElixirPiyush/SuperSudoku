import Link from "next/link";
import { ShieldCheck, CalendarCheck2, Server, Medal, History, Gift } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { REWARD_TIERS, SCORE_PARTS } from "@/lib/content";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import AppShot from "@/components/AppShot";
import LeaderboardSample from "@/components/LeaderboardSample";
import GooglePlayBadge from "@/components/GooglePlayBadge";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Monthly League — Monthly Sudoku Leaderboard & Rewards",
  description:
    "How the Super Sudoku Monthly League works: daily scores, your Monthly Score, ranking and tie rules, the Top 100, Streak Shields and the ad-free rewards for the top 100 players.",
  path: "/monthly-league/",
});

const STEPS = [
  { n: "1", title: "Play the Daily Challenge", body: "Finishing your first Daily Challenge of the month puts you on that month's board. No sign-up; an internet connection is needed so the result can count." },
  { n: "2", title: "Earn a Daily Score", body: "Our server scores the solve from your time, mistakes and hints. Only your first completion of each day counts." },
  { n: "3", title: "Build your Monthly Score", body: "Your 20 best Daily Scores plus 30 points for every day you played. A bad day never lowers it." },
  { n: "4", title: "Climb the ranks", body: "See your rank and the players just above and below you in the app, and open the full Top 100." },
  { n: "5", title: "Collect your reward", body: "When the month is over, the Top 100 can claim ad-free days in the app. Everyone else gets a monthly badge." },
];

const STARS = [
  { stars: "★★★★★", min: "900+" },
  { stars: "★★★★", min: "780 – 899" },
  { stars: "★★★", min: "650 – 779" },
  { stars: "★★", min: "500 – 649" },
  { stars: "★", min: "below 500" },
];

export default function MonthlyLeaguePage() {
  return (
    <>
      <PageHero
        eyebrow="Monthly League"
        title={
          <>
            Compete every month. <span className="text-gold">Every daily puzzle counts.</span>
          </>
        }
        lede="The Monthly League turns the Daily Challenge into a month-long competition: steady daily play beats one lucky solve, and a fresh league starts on the 1st of every month."
      >
        <GooglePlayBadge />
      </PageHero>

      {/* How it works */}
      <section className="section">
        <div className="container-page">
          <SectionHeading center eyebrow="How it works" title="Five steps, every month" />
          <ol className="mt-12 grid gap-5 md:grid-cols-5">
            {STEPS.map((s) => (
              <li key={s.n} className="card p-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-royal-gradient text-lg font-extrabold text-white" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="mt-4 font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Daily Score */}
      <section className="section bg-white" aria-labelledby="daily-score">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeading
              id="daily-score"
              eyebrow="Daily Score"
              title="How a day is scored"
              lede="The app never sends a score: it sends your solved board, time, mistakes and hints, and the server works out the score with these rules."
            />
            <div className="mt-8 overflow-hidden rounded-2xl border border-brand-100">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Parts of the Daily Score</caption>
                <thead className="bg-brand-50 text-brand-900">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Part</th>
                    <th scope="col" className="px-4 py-3 font-bold">Points</th>
                    <th scope="col" className="hidden px-4 py-3 font-bold sm:table-cell">How</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {SCORE_PARTS.map((p) => (
                    <tr key={p.label}>
                      <th scope="row" className="px-4 py-3 font-bold text-brand-900">{p.label}</th>
                      <td className="whitespace-nowrap px-4 py-3 font-bold tabular-nums text-brand-700">{p.value}</td>
                      <td className="hidden px-4 py-3 text-slate sm:table-cell">{p.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate">
              The total before the difficulty multiplier is never below 100, so a Daily Score is between 100 and 1,300.
            </p>
            <div className="mt-8 rounded-2xl bg-brand-50 p-5">
              <p className="font-bold text-brand-900">Example from the app (right)</p>
              <p className="mt-2 text-slate">
                A Medium puzzle in 1:07 with 2 mistakes and no hints: 500 + 180 (speed) + 70 (accuracy) = 750,
                × 1.15 for Medium = <strong className="text-brand-900">863 points</strong>, 3 stars.
              </p>
            </div>
            <h3 className="mt-10 text-xl font-bold">Star rating</h3>
            <p className="mt-2 text-slate">Each day also gets 1 to 5 stars from the score before the difficulty multiplier:</p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {STARS.map((s) => (
                <li key={s.stars} className="rounded-xl border border-brand-100 bg-white p-3 text-center">
                  <span className="block text-gold-700" aria-label={`${s.stars.length} stars`}>{s.stars}</span>
                  <span className="mt-1 block text-xs font-semibold text-slate">{s.min}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[280px] lg:sticky lg:top-24">
            <AppShot shot="daily_result" />
          </div>
        </div>
      </section>

      {/* Ranking */}
      <section className="section" aria-labelledby="ranking">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="ranking" eyebrow="Ranking" title="Who ranks higher" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-brand-900 marker:font-bold marker:text-brand-700">
              <li>The higher <strong>Monthly Score</strong> (20 best Daily Scores + 30 per day played).</li>
              <li>On equal scores, the player who <strong>reached that score earlier</strong>.</li>
            </ol>
            <ul className="mt-8 space-y-4">
              <li className="flex gap-3">
                <Server className="mt-0.5 shrink-0 text-brand-600" size={22} aria-hidden="true" />
                <p className="text-slate"><strong className="text-brand-900">Checked on the server.</strong> The solved board must match the day&apos;s solution, and only the first completion of a day counts.</p>
              </li>
              <li className="flex gap-3">
                <CalendarCheck2 className="mt-0.5 shrink-0 text-brand-600" size={22} aria-hidden="true" />
                <p className="text-slate"><strong className="text-brand-900">Today&apos;s puzzle only.</strong> Days follow your local calendar; a puzzle finished up to an hour after midnight still counts for the day before. Your time zone is fixed for the month at your first play.</p>
              </li>
              <li className="flex gap-3">
                <Medal className="mt-0.5 shrink-0 text-brand-600" size={22} aria-hidden="true" />
                <p className="text-slate"><strong className="text-brand-900">The Top 100.</strong> The app shows your rank and the players around you; the full Top 100 opens from the league screen (in the latest version after a short video, or straight away while you have ad-free time).</p>
              </li>
            </ul>
          </div>
          <LeaderboardSample />
        </div>
      </section>

      {/* Progress */}
      <section className="section bg-white" aria-labelledby="progress">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 mx-auto w-full max-w-[280px] lg:order-1">
            <AppShot shot="league" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              id="progress"
              eyebrow="Your month"
              title="Calendar, streak and Streak Shield"
              lede="The league screen shows your Monthly Score, rank, days completed and day streak, and a calendar with the stars you earned each day."
            />
            <div className="mt-8 flex gap-4 rounded-2xl border border-brand-100 bg-page p-5">
              <ShieldCheck className="shrink-0 text-cyan-600" size={28} aria-hidden="true" />
              <p className="text-slate">
                <strong className="text-brand-900">Streak Shield:</strong> once a month you can use a free shield to cover one
                missed day, so your streak carries on. It is never used automatically and does not add points.
              </p>
            </div>
            <p className="mt-4 text-slate">Longest streaks of 7, 14 and 30 days earn streak badges.</p>
          </div>
        </div>
      </section>

      {/* Rewards */}
      <section className="section" aria-labelledby="rewards">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading id="rewards" eyebrow="Rewards" title="Ad-free days for the Top 100" />
            <div className="mt-8 overflow-hidden rounded-2xl border border-brand-100 bg-white">
              <table className="w-full text-left">
                <caption className="sr-only">Monthly League rewards by final rank</caption>
                <thead className="bg-gold-50">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-sm font-bold text-brand-900">Final rank</th>
                    <th scope="col" className="px-5 py-3 text-sm font-bold text-brand-900">Reward</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {REWARD_TIERS.map((t) => (
                    <tr key={t.rank}>
                      <th scope="row" className="px-5 py-3 font-extrabold text-brand-900">{t.rank}</th>
                      <td className="px-5 py-3 text-slate">{t.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-slate">
              Ad-free means no ads in the app, and features that normally ask for a short video open straight away.
              A new reward is added on top of any ad-free time you still have. Rewards have no cash value.
            </p>
          </div>
          <div className="space-y-5">
            <div className="card p-6">
              <Gift className="text-gold-700" size={26} aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold">Claiming a reward</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate">
                <li>The month is closed once it has ended in every time zone, normally on the 1st (evening in India).</li>
                <li>Open the Monthly League in the app: a &quot;League Complete&quot; card shows your final rank and reward.</li>
                <li>Tap <strong className="text-brand-900">Claim Reward</strong>. From version 1.0.23 a short video plays first (none while you already have ad-free time).</li>
                <li>Your ad-free time starts straight away. A reward can be claimed once, by its owner, in the app only.</li>
              </ol>
            </div>
            <div className="card p-6">
              <History className="text-brand-600" size={26} aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold">Previous months</h3>
              <p className="mt-2 text-slate">
                Finished months appear under My League History with your final rank, score and reward. Every month you
                take part in also earns a league badge, plus a Perfect Month badge if you played every day.
              </p>
            </div>
            <p className="text-sm text-slate">
              From version 1.0.23 your league progress is linked to your Google Play Games account, so it comes back after
              a reinstall or on a new phone. Questions? See the <Link href="/faq/#league" className="font-bold text-brand-700 underline">FAQ</Link>.
            </p>
          </div>
        </div>
      </section>

      <CtaBand title="Join this month's league" body="Finish today's Daily Challenge in the app and you are on the board." />
    </>
  );
}
