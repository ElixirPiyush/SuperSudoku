import Link from "next/link";
import { CalendarDays, Wifi, Share2, Star, Flame, Trophy, ArrowRight } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import AppShot from "@/components/AppShot";
import GooglePlayBadge from "@/components/GooglePlayBadge";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Daily Sudoku Challenge — One New Puzzle Every Day",
  description:
    "Play the Super Sudoku Daily Challenge: one new puzzle every day for every player, scored for speed and accuracy, with a 1–5 star rating, day streaks and the Monthly League.",
  path: "/daily-challenge/",
});

const FLOW = [
  { icon: CalendarDays, title: "Open today's puzzle", body: "The Daily Challenge card on the home screen shows today's date. Tap it to start; you can pause and continue later the same day." },
  { icon: Wifi, title: "Be online to start", body: "Starting the Daily Challenge needs an internet connection so your result can count for the Monthly League." },
  { icon: Star, title: "Finish and get your score", body: "You see your score, 1–5 stars, time, mistakes and hints, and exactly how the score was earned." },
  { icon: Flame, title: "Keep your streak", body: "Every day you finish adds to your day streak. Miss a day and the streak starts again (a monthly Streak Shield can cover one gap)." },
  { icon: Trophy, title: "Climb the league", body: "Your Daily Score goes into this month's Monthly League right away." },
  { icon: Share2, title: "Share your result", body: "Share a result card with your score and stars from the completion screen." },
];

export default function DailyChallengePage() {
  return (
    <>
      <PageHero
        eyebrow="Daily Challenge"
        title={
          <>
            One new puzzle. <span className="text-gold">Every single day.</span>
          </>
        }
        lede="Every day there is one Daily Challenge, the same puzzle for every Super Sudoku player. Solve it to earn a score, stars and another day on your streak."
      >
        <GooglePlayBadge />
      </PageHero>

      <section className="section">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="The idea"
              title="Same puzzle for everyone, scored fairly"
              lede="Daily puzzles are Easy, Medium or Hard depending on the day, so some days are quick wins and some take real thought. Harder days are worth more points."
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {FLOW.map((f) => (
                <li key={f.title} className="card p-5">
                  <f.icon className="text-brand-600" size={22} aria-hidden="true" />
                  <h3 className="mt-3 font-bold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate">{f.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[280px]">
            <AppShot shot="home" />
          </div>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="complete">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 mx-auto grid w-full max-w-[560px] grid-cols-2 gap-4 lg:order-1">
            <AppShot shot="daily_complete" sizes="(min-width: 1024px) 260px, 45vw" />
            <AppShot shot="daily_result" sizes="(min-width: 1024px) 260px, 45vw" className="mt-10" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              id="complete"
              eyebrow="When you finish"
              title="See how your score was earned"
              lede="The completion screen breaks the score down into completion, time, accuracy and difficulty, so you know what to improve tomorrow."
            />
            <ul className="mt-6 space-y-3 text-slate">
              <li>• Only your <strong className="text-brand-900">first completion</strong> of the day counts. You can try again, but a retry is marked &quot;not counted&quot;.</li>
              <li>• Each Daily Challenge belongs to its day: past puzzles cannot be played later for points.</li>
              <li>• Completed days show their stars on the league calendar.</li>
            </ul>
            <Link href="/monthly-league/#daily-score" className="btn-primary mt-8">
              Scoring rules <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl text-center">
          <SectionHeading center eyebrow="Good to know" title="The Daily Challenge is in the app" />
          <p className="lede mx-auto mt-4">
            This website does not host the Daily Challenge, and results can only be recorded by the Android app. Want to
            warm up in your browser first? Try the free{" "}
            <Link href="/play/" className="font-bold text-brand-700 underline">online Sudoku</Link> or read{" "}
            <Link href="/how-to-play/" className="font-bold text-brand-700 underline">How to Play</Link>.
          </p>
        </div>
      </section>

      <CtaBand title="Today's puzzle is waiting" />
    </>
  );
}
