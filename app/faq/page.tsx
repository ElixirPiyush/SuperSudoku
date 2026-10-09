import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { FAQS } from "@/lib/content";
import PageHero from "@/components/PageHero";
import FaqList from "@/components/FaqList";
import JsonLd from "@/components/JsonLd";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "FAQ — Super Sudoku Questions Answered",
  description:
    "Answers about Super Sudoku: downloading, difficulty levels, the Daily Challenge, how the Monthly League and rankings work, rewards, offline play, themes, ads and support.",
  path: "/faq/",
});

const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={FAQ_LD} />
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        lede="Short, accurate answers about the app. Can't find yours? Email us from the support page."
      />
      <section className="section">
        <div className="container-page max-w-3xl">
          <FaqList items={FAQS} />
          <p className="mt-8 text-center text-slate">
            Still stuck?{" "}
            <Link href="/contact/" className="font-bold text-brand-700 underline">Contact support</Link>.
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
