import Link from "next/link";
import { Mail } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import GooglePlayBadge from "./GooglePlayBadge";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-ink/60">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-ink">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <span className="text-lg font-bold">
              Super<span className="gradient-text">Sudoku</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-brand-50/60">
            {SITE.description}
          </p>
          <div className="mt-6">
            <GooglePlayBadge />
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-brand-50/70 hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-300">
            Legal & Support
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/privacy-policy/" className="text-brand-50/70 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms/" className="text-brand-50/70 hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="/contact/" className="text-brand-50/70 hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 text-brand-50/70 hover:text-white"
              >
                <Mail size={14} /> {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-brand-50/50 sm:flex-row">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p>Made for puzzle lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );
}
