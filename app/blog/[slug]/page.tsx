import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { BLOG_POSTS, SITE } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import GooglePlayBadge from "@/components/GooglePlayBadge";
import JsonLd from "@/components/JsonLd";

// Required for `output: export`: pre-render every post at build time.
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return pageMeta({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}/` });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.developer },
    publisher: { "@type": "Organization", name: SITE.developer },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}/`,
  };

  return (
    <article className="container-page max-w-3xl py-14">
      <JsonLd data={articleLd} />
      <Link href="/blog/" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-brand-700 hover:underline">
        <ArrowLeft size={14} aria-hidden="true" /> Back to blog
      </Link>
      <p className="mt-6">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700">{post.category}</span>
      </p>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">{post.title}</h1>
      <div className="mt-3 flex items-center gap-4 text-sm text-slate">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} aria-hidden="true" /> {post.readMins} min read
        </span>
      </div>
      <div className="mt-10 space-y-8">
        {post.body.map((block, i) => (
          <section key={i}>
            {block.heading && <h2 className="mb-3 text-xl font-bold">{block.heading}</h2>}
            {block.paragraphs.map((p, j) => (
              <p key={j} className="text-lg leading-relaxed text-slate">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
      <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-brand-50 p-8 text-center">
        <h2 className="text-xl font-bold">Put these tips into practice</h2>
        <p className="text-slate">Play free in your browser, or get the {SITE.name} app for Android.</p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/play/" className="btn-primary">
            Play online
          </Link>
          <GooglePlayBadge />
        </div>
      </div>
    </article>
  );
}
