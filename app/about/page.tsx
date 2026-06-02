import type { Metadata } from "next";
import { Target, Eye, Heart, Brain } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Our Mission to Make Sudoku Delightful",
  description:
    "Learn about Super Sudoku: our mission, vision and why we build the most polished, brain-training Sudoku experience for players around the world.",
  alternates: { canonical: "/about/" },
};

const VALUES = [
  {
    icon: Target,
    title: "Our Mission",
    body: "To make the timeless game of Sudoku more delightful, accessible and beautiful than ever — for everyone, on every device.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    body: "A world where a few minutes of daily logic practice is a joy, not a chore — helping millions keep their minds sharp.",
  },
  {
    icon: Heart,
    title: "Why Super Sudoku",
    body: "We obsess over the details: buttery animations, thoughtful hints, gorgeous themes and a board that just feels right.",
  },
  {
    icon: Brain,
    title: "Brain Training",
    body: "Sudoku exercises working memory, focus and logical reasoning. Our daily challenge makes consistency effortless.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="pt-28 sm:pt-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="About Us"
            title="Crafting the world's most enjoyable Sudoku"
            subtitle={`${SITE.name} started with a simple belief: a classic puzzle deserves a modern, premium experience.`}
          />
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-page grid gap-6 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <div className="glass h-full p-8">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand-300">
                  <v.icon size={22} />
                </div>
                <h2 className="text-xl font-semibold text-white">{v.title}</h2>
                <p className="mt-2 text-brand-50/65">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <Reveal className="glass mx-auto max-w-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white">The Brain-Training Benefits</h2>
            <p className="mt-4 text-brand-50/70">
              Research links regular puzzle solving with improved working memory,
              sustained attention and logical reasoning. By holding candidate
              numbers in mind while scanning the grid, you exercise the same
              cognitive circuits used for planning and focus. {SITE.name} is built
              to make that practice a daily pleasure rather than a task.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
