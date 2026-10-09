import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";

export const metadata = pageMeta({
  title: "Blog — Sudoku Tips and Strategies",
  description:
    "Sudoku tips for beginners, advanced strategies like X-Wing and Swordfish, and how to build a daily puzzle habit, from the Super Sudoku team.",
  path: "/blog/",
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero eyebrow="Blog" title="Sudoku tips and strategies" lede="Guides from beginner basics to expert techniques." />
      <section className="section">
        <ul className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}/`} className="card group flex h-full flex-col p-6 transition-shadow hover:shadow-lift">
                <span className="self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{post.category}</span>
                <h2 className="mt-4 text-xl font-bold">{post.title}</h2>
                <p className="mt-2 flex-1 text-sm text-slate">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between text-xs text-slate">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} aria-hidden="true" /> {post.readMins} min read
                  </span>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-700 group-hover:underline">
                  Read article <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
