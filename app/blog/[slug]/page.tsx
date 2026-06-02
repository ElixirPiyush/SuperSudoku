import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { BLOG_POSTS, SITE } from "@/lib/site";
import GooglePlayBadge from "@/components/GooglePlayBadge";

// Required for `output: export` — pre-render every blog slug at build time.
export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
    mainEntityOfPage: `${SITE.url}/blog/${post.slug}/`,
  };

  return (
    <article className="pt-28 sm:pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <div className="container-page max-w-3xl">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1 text-sm text-brand-300 hover:text-white"
        >
          <ArrowLeft size={14} /> Back to blog
        </Link>

        <div className="mt-6">
          <span className="rounded-full bg-brand/15 px-3 py-1 text-xs font-semibold text-brand-300">
            {post.category}
          </span>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-4 text-sm text-brand-50/50">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={12} /> {post.readMins} min read
          </span>
        </div>

        <div className="mt-10 space-y-8">
          {post.body.map((block, i) => (
            <section key={i}>
              {block.heading && (
                <h2 className="mb-3 text-xl font-semibold text-white">
                  {block.heading}
                </h2>
              )}
              {block.paragraphs.map((p, j) => (
                <p key={j} className="leading-relaxed text-brand-50/75">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="glass mt-14 flex flex-col items-center gap-4 p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            Put these tips into practice
          </h2>
          <p className="text-sm text-brand-50/60">
            Play free online or download the {SITE.name} app for Android.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/play/" className="btn-primary">
              Play Online Free
            </Link>
            <GooglePlayBadge />
          </div>
        </div>
      </div>
      <div className="h-24" />
    </article>
  );
}
