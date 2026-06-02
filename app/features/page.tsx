import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FEATURES, SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";
import GooglePlayBadge from "@/components/GooglePlayBadge";

export const metadata: Metadata = {
  title: "Features — Daily Challenge, Themes, Stats & More",
  description:
    "Explore Super Sudoku features: daily challenge, statistics tracking, multiple themes, auto-save, notes mode, smart hints, achievements, Google Play Games integration and offline play.",
  alternates: { canonical: "/features/" },
};

export default function FeaturesPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Features"
            title="Everything that makes Super Sudoku great"
            subtitle="A complete, polished Sudoku experience for casual players and hardcore solvers alike."
          />
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.04}>
              <div className="glass h-full p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand-300">
                  <Icon name={f.icon} />
                </div>
                <h2 className="text-lg font-semibold text-white">{f.title}</h2>
                <p className="mt-2 text-sm text-brand-50/60">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <div className="glass flex flex-col items-center gap-6 p-10 text-center lg:flex-row lg:text-left">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Get the full experience on Android
              </h2>
              <p className="mt-2 text-brand-50/70">
                Daily challenges, achievements, leaderboards and offline play —
                all free in the {SITE.name} app.
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-center gap-3 sm:flex-row">
              <GooglePlayBadge />
              <Link href="/play/" className="btn-secondary">
                Play Online <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
