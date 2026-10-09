import type { MetadataRoute } from "next";
import { SITE, BLOG_POSTS } from "@/lib/site";

export const dynamic = "force-static";

/** Content dates (not build dates), so search engines only see real changes. */
const PAGES: { path: string; updated: string; priority: number }[] = [
  { path: "/", updated: "2026-10-09", priority: 1 },
  { path: "/features/", updated: "2026-10-09", priority: 0.8 },
  { path: "/monthly-league/", updated: "2026-10-09", priority: 0.9 },
  { path: "/daily-challenge/", updated: "2026-10-09", priority: 0.9 },
  { path: "/themes/", updated: "2026-10-09", priority: 0.7 },
  { path: "/how-to-play/", updated: "2026-10-09", priority: 0.8 },
  { path: "/faq/", updated: "2026-10-09", priority: 0.7 },
  { path: "/play/", updated: "2026-10-09", priority: 0.8 },
  { path: "/blog/", updated: "2026-10-09", priority: 0.5 },
  { path: "/about/", updated: "2026-10-09", priority: 0.4 },
  { path: "/contact/", updated: "2026-10-09", priority: 0.4 },
  { path: "/privacy-policy/", updated: "2026-10-09", priority: 0.3 },
  { path: "/terms/", updated: "2026-10-09", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...PAGES.map((p) => ({ url: `${SITE.url}${p.path}`, lastModified: p.updated, priority: p.priority })),
    ...BLOG_POSTS.map((p) => ({ url: `${SITE.url}/blog/${p.slug}/`, lastModified: p.date, priority: 0.5 })),
  ];
}
