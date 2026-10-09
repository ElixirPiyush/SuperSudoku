import type { Metadata } from "next";
import { SITE } from "@/lib/site";

/** Per-page metadata: unique title + description, canonical URL, Open Graph. */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string; // e.g. "/monthly-league/"
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${SITE.url}${path}`,
      siteName: SITE.name,
      title: `${title} | ${SITE.name}`,
      description,
      images: [{ url: SITE.ogImage, width: 1024, height: 500, alt: "Super Sudoku: Daily Sudoku Challenge" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE.name}`,
      description,
      images: [SITE.ogImage],
    },
  };
}
