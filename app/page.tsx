import Link from "next/link";
import { Play, Download, Star, ArrowRight, CalendarDays, Check } from "lucide-react";
import {
  SITE,
  STATS,
  WHY_CHOOSE,
  FEATURES,
  TESTIMONIALS,
} from "@/lib/site";
import { DIFFICULTIES } from "@/lib/sudoku";
import HeroBoard from "@/components/HeroBoard";
import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import GooglePlayBadge from "@/components/GooglePlayBadge";
import AppScreens from "@/components/AppScreens";
import FaqAccordion from "@/components/FaqAccordion";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-28 sm:pt-36">
        <div className="container-page grid items-center gap-12 pb-16 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-brand-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </span>
              <span className="text-sm text-brand-50/70">
                {SITE.rating} · {SITE.ratingCount} ratings on Google Play
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              The Premium <span className="gradient-text">Sudoku</span> Experience
            </h1>
            <p className="mt-5 max-w-xl text-lg text-brand-50/70">
              Play free Sudoku online — Easy to Expert — with notes, smart hints,
              undo and a daily challenge. Beautiful, fast and fully offline on the
              Super Sudoku Android app.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/play/" className="btn-primary text-base">
                <Play size={18} /> Play Online Free
              </Link>
              <a
                href={SITE.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-base"
              >
                <Download size={18} /> Download App
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:max-w-md sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-white sm:text-3xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-brand-50/50">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="animate-float">
            <HeroBoard />
          </div>
        </div>
      </section>

      {/* 2. PLAY ONLINE TEASER */}
      <section className="section">
        <div className="container-page">
          <div className="glass flex flex-col items-center gap-6 p-8 text-center sm:p-12 lg:flex-row lg:text-left">
            <div className="flex-1">
              <span className="eyebrow">Play Sudoku Online</span>
              <h2 className="text-3xl font-bold sm:text-4xl">
                No download. No sign-up. Just play.
              </h2>
              <p className="mt-3 max-w-xl text-brand-50/70">
                Jump straight into a puzzle right in your browser. Your game is
                auto-saved so you can always pick up where you left off.
              </p>
            </div>
            <Link href="/play/" className="btn-primary shrink-0 text-base">
              Start Playing <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Super Sudoku"
            title="Designed like a premium game"
            subtitle="Every detail — from the board to the animations — is crafted for a delightful, focused solving experience."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="glass h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand-300">
                    <Icon name={f.icon} />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm text-brand-50/60">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DIFFICULTY LEVELS */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="For every skill level"
            title="Four difficulty levels"
            subtitle="From a relaxed warm-up to a true brain-bending challenge — every puzzle has a guaranteed unique solution."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFICULTIES.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.06}>
                <Link
                  href="/play/"
                  className="glass group block h-full p-6 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="text-sm font-semibold uppercase tracking-widest text-brand-300">
                    Level {i + 1}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-white">{d.label}</h3>
                  <p className="mt-2 text-sm text-brand-50/60">{d.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand-300 opacity-0 transition-opacity group-hover:opacity-100">
                    Play now <ArrowRight size={14} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DAILY CHALLENGE */}
      <section className="section">
        <div className="container-page">
          <div className="glass grid items-center gap-8 overflow-hidden p-8 sm:p-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow">Daily Challenges</span>
              <h2 className="text-3xl font-bold sm:text-4xl">
                A fresh puzzle every single day
              </h2>
              <p className="mt-4 text-brand-50/70">
                Keep your streak alive with a new hand-picked challenge each day.
                Compete on global leaderboards and unlock the Daily Master
                achievement.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "New puzzle every 24 hours",
                  "Global leaderboards via Google Play Games",
                  "Streak tracking & achievements",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-brand-50/80">
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-brand/20 text-brand-300">
                      <Check size={14} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href={SITE.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-8"
              >
                <CalendarDays size={18} /> Get the Daily Challenge
              </a>
            </Reveal>
            <Reveal delay={0.1} className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 -z-10 rounded-full bg-glow-radial blur-2xl" />
                <div className="grid h-44 w-44 place-items-center rounded-3xl bg-brand-gradient text-ink shadow-glow sm:h-52 sm:w-52">
                  <div className="text-center">
                    <CalendarDays size={48} className="mx-auto" />
                    <div className="mt-2 text-4xl font-extrabold">365</div>
                    <div className="text-sm font-medium">puzzles a year</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. APP SCREENSHOTS */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="App Screenshots"
            title="Eight beautiful themes"
            subtitle="Match your mood with hand-crafted light and dark themes — Neon Pulse, Midnight, Sakura, Classic and more."
          />
        </div>
        <div className="mt-12 px-4">
          <AppScreens />
        </div>
      </section>

      {/* 7. FEATURES OVERVIEW */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Features Overview"
            title="Everything a Sudoku fan needs"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.slice(0, 6).map((f, i) => (
              <Reveal key={f.title} delay={i * 0.04}>
                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand-300">
                    <Icon name={f.icon} size={20} />
                  </span>
                  <div>
                    <h3 className="font-semibold text-white">{f.title}</h3>
                    <p className="mt-1 text-sm text-brand-50/60">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/features/" className="btn-secondary">
              See all features <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="Loved by players"
            title="What our community says"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <figure className="glass h-full p-6">
                  <div className="flex gap-1 text-brand-300">
                    {Array.from({ length: t.stars }).map((_, s) => (
                      <Star key={s} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm text-brand-50/80">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="block text-brand-50/50">{t.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
          />
          <FaqAccordion />
        </div>
      </section>

      {/* 10. DOWNLOAD CTA */}
      <section className="section">
        <div className="container-page">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-brand-gradient p-10 text-center text-ink sm:p-16">
              <div className="relative z-10">
                <h2 className="text-3xl font-extrabold sm:text-4xl">
                  Download Super Sudoku
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-ink/80">
                  Join 100,000+ players. Free, offline-ready, and packed with
                  daily challenges, themes and achievements.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <GooglePlayBadge />
                  <Link
                    href="/play/"
                    className="btn inline-flex bg-ink text-white hover:-translate-y-0.5"
                  >
                    Play Online Free <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
