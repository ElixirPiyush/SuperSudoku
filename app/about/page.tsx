import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { ADDRESS_LINE, SITE } from "@/lib/site";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "About Super Sudoku",
  description:
    "Super Sudoku is a free Sudoku game for Android by Elixir Infotech: a clean classic puzzle with a Daily Challenge, a Monthly League and themes.",
  path: "/about/",
});

const VALUES = [
  { title: "A clean classic", body: "Sudoku needs a clear board, readable numbers and tools that stay out of the way. Everything else is optional." },
  { title: "A reason to return", body: "One shared puzzle a day and a fresh league every month give the habit a shape, without pressure." },
  { title: "Fair and honest", body: "Scores are calculated on our server, rewards are ad-free time with no cash value, and we publish how ranking works." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A classic puzzle, made for every day"
        lede={`${SITE.name} is a free Sudoku game for Android, made by ${SITE.developer} in India.`}
      />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="lede space-y-4">
            <p>
              We started {SITE.name} because we wanted a Sudoku that looks good, plays fast and respects your time. Since then the
              app has grown a Daily Challenge, a Monthly League with a Top 100, nine themes and support for 12 languages (from
              version 1.0.23).
            </p>
            <p>
              The game is free and supported by ads. We keep ads to formats you can expect: an ad when the app opens, and short
              videos that you choose to watch in return for something useful. League winners can switch ads off entirely.
            </p>
            <div className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4">
              <img src="/images/elixir-infotech-128.webp" alt="Elixir Infotech logo" width={105} height={128} className="h-14 w-auto" />
              <p className="text-base">
                <span className="block font-bold text-brand-900">{SITE.developer}</span>
                <span className="block text-slate">Developer of {SITE.name}</span>
                <span className="mt-1 block text-sm text-slate">{ADDRESS_LINE}</span>
              </p>
            </div>
            <p>
              Questions or ideas? <Link href="/contact/" className="font-bold text-brand-700 underline">Write to us</Link>.
            </p>
          </div>
          <ul className="grid gap-5">
            {VALUES.map((v) => (
              <li key={v.title} className="card p-6">
                <h2 className="text-xl font-bold">{v.title}</h2>
                <p className="mt-2 text-slate">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
