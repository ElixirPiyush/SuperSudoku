import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Blog — Sudoku Tips, Strategies & Brain Training",
  description:
    "Sudoku tips, advanced strategies, brain-training science and puzzle guides from the Super Sudoku team. Improve your solving skills.",
  alternates: { canonical: "/blog/" },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <section className="pt-28 sm:pt-32">
        <div className="container-page">
          <SectionHeading
            eyebrow="Blog"
            title="Tips, strategies & brain training"
            subtitle="Level up your Sudoku game with guides from beginner basics to expert techniques."
          />
        </div>
      </section>

      <section className="section pt-12">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}/`}
                className="glass group flex h-full flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="self-start rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand-300">
                  {post.category}
                </span>
                <h2 className="mt-4 text-xl font-semibold text-white">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-brand-50/60">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between text-xs text-brand-50/50">
                  <span>{formatDate(post.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {post.readMins} min read
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm text-brand-300">
                  Read article <ArrowRight size={14} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
