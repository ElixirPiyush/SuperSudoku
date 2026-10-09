import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { pageMeta } from "@/lib/seo";
import { ADDRESS_LINE, PHONE_HREF, SITE } from "@/lib/site";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export const metadata = pageMeta({
  title: "Support & Contact",
  description:
    "Get help with Super Sudoku: troubleshooting for the Daily Challenge, Monthly League, rewards, ads and lost progress, and how to email support.",
  path: "/contact/",
});

const HELP = [
  {
    q: "The Daily Challenge says \"Internet Required\"",
    a: "Starting the Daily Challenge needs a working connection. Check Wi-Fi or mobile data, then tap Retry Connection. Regular puzzles still work offline.",
    link: { href: "/faq/#daily", label: "About the Daily Challenge" },
  },
  {
    q: "My score isn't on the league yet",
    a: "If your connection dropped before you finished, the result is sent when you are back online (at app start, when you open the league, or when the connection returns). Only the first completion of a day counts.",
    link: { href: "/monthly-league/#daily-score", label: "League scoring" },
  },
  {
    q: "I reinstalled and my league score is gone",
    a: "From version 1.0.23 the league is linked to your Google Play Games account: open Play Games in the app and sign in, then open the Monthly League again. In older versions the league account lived only on the phone, so a reinstall started a new entry.",
    link: { href: "/faq/#progress", label: "Progress after a reinstall" },
  },
  {
    q: "I can't see my reward",
    a: "Rewards appear after the month has ended in every time zone, normally on the evening of the 1st (India time). Open the Monthly League screen in the app to claim it.",
    link: { href: "/monthly-league/#rewards", label: "Rewards and claiming" },
  },
  {
    q: "A video didn't give me my reward",
    a: "Rewards from a video are given only when the video reports that it was watched to the end. If no video is available, try again in a few minutes.",
    link: { href: "/faq/#ads", label: "Ads and videos" },
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="How can we help?"
        lede="Most questions are answered below. For anything else, email us and include your phone model, Android version and app version (Settings → About)."
      >
        <a href={`mailto:${SITE.email}`} className="btn bg-white text-brand-800 hover:bg-brand-50">
          <Mail size={18} aria-hidden="true" /> {SITE.email}
        </a>
      </PageHero>

      <section className="section">
        <div className="container-page grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-2xl font-extrabold">Troubleshooting</h2>
            <ul className="mt-6 space-y-4">
              {HELP.map((h) => (
                <li key={h.q} className="card p-5">
                  <h3 className="font-bold">{h.q}</h3>
                  <p className="mt-2 text-slate">{h.a}</p>
                  <Link href={h.link.href} className="mt-2 inline-flex min-h-11 items-center text-sm font-bold text-brand-700 underline">
                    {h.link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:sticky lg:top-24">
            <h2 className="text-2xl font-extrabold">Email support</h2>
            <p className="mt-2 text-slate">
              We read every message. For privacy requests (access or deletion of your data), choose &quot;Privacy request&quot; and
              see our <Link href="/privacy-policy/" className="font-bold text-brand-700 underline">Privacy Policy</Link>.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
            <address className="card mt-6 space-y-3 p-5 not-italic">
              <p className="font-bold text-brand-900">{SITE.developer}</p>
              <p className="flex gap-3 text-slate">
                <MapPin size={18} className="mt-0.5 shrink-0 text-brand-700" aria-hidden="true" />
                <span>{ADDRESS_LINE}</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-brand-700" aria-hidden="true" />
                <a href={PHONE_HREF} className="inline-flex min-h-11 items-center font-bold text-brand-700 underline">{SITE.phone}</a>
              </p>
              <p className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-brand-700" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="inline-flex min-h-11 items-center font-bold text-brand-700 underline break-all">{SITE.email}</a>
              </p>
            </address>
          </div>
        </div>
      </section>
    </>
  );
}
