import { pageMeta } from "@/lib/seo";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import AppShot from "@/components/AppShot";
import ThemeGallery from "@/components/ThemeGallery";
import GooglePlayBadge from "@/components/GooglePlayBadge";
import CtaBand from "@/components/CtaBand";

export const metadata = pageMeta({
  title: "Sudoku Themes — Nine Looks for the Board",
  description:
    "See all nine Super Sudoku themes on a real board: Super Sudoku (light and dark), Neon Pulse, Glow Light, Classic, Ocean, Sakura, Midnight, Lavender and Monochrome.",
  path: "/themes/",
});

export default function ThemesPage() {
  return (
    <>
      <PageHero
        eyebrow="Themes"
        title={
          <>
            Nine themes. <span className="text-gold">One board that feels like yours.</span>
          </>
        }
        lede="A theme changes the whole app: the board, the number pad, highlights and screens. These are real boards from the app, one per theme."
      >
        <GooglePlayBadge />
      </PageHero>

      <section className="section" aria-labelledby="gallery">
        <div className="container-page">
          <SectionHeading id="gallery" eyebrow="Gallery" title="Every theme on the same puzzle" />
          <div className="mt-10">
            <ThemeGallery />
          </div>
          <p className="mt-6 text-sm text-slate">
            Super Sudoku is shown twice because it follows your phone: light in light mode, navy in dark mode.
          </p>
        </div>
      </section>

      <section className="section bg-white" aria-labelledby="choose">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 mx-auto w-full max-w-[280px] lg:order-1">
            <AppShot shot="themes" />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading id="choose" eyebrow="Choosing a theme" title="Preview first, then apply" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-slate marker:font-bold marker:text-brand-700">
              <li>Open <strong className="text-brand-900">Themes</strong> from the home screen.</li>
              <li>Tap a card to preview it; the check mark shows your current theme.</li>
              <li>
                Tap <strong className="text-brand-900">Apply</strong>. In the latest version (1.0.23) applying a new theme asks you
                to watch a short video first; there is no video while you have league ad-free time.
              </li>
            </ol>
            <p className="mt-6 text-slate">Your theme is saved on the phone and stays after you close the app.</p>
          </div>
        </div>
      </section>

      <CtaBand title="Find your favourite theme" />
    </>
  );
}
