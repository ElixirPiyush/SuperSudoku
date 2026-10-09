import Link from "next/link";
import { FOOTER_LINKS, SITE } from "@/lib/site";
import GooglePlayBadge from "@/components/GooglePlayBadge";

export default function SiteFooter() {
  return (
    <footer className="bg-brand-900 text-brand-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5 rounded-lg">
            <img src="/images/app-icon-96.webp" alt="" width={40} height={40} className="h-10 w-10 rounded-xl" loading="lazy" />
            <span className="text-lg font-extrabold text-white">{SITE.name}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-200">
            Daily Sudoku, a Monthly League and nine themes. Free for Android.
          </p>
          <GooglePlayBadge className="mt-6" />
        </div>
        {FOOTER_LINKS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gold">{group.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-brand-100 hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-brand-200 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white">
              <img src="/images/elixir-infotech-64.webp" alt="Elixir Infotech logo" width={53} height={64} className="h-6 w-auto" loading="lazy" />
            </span>
            <span>© {new Date().getFullYear()} {SITE.developer}. Super Sudoku and its logo belong to {SITE.developer}.</span>
          </p>
          <p>
            Support: <a href={`mailto:${SITE.email}`} className="text-white underline">{SITE.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
