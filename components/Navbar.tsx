"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Play } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-ink shadow-glow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
          <span className="text-lg font-bold tracking-tight">
            Super<span className="gradient-text">Sudoku</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(l.href)
                    ? "bg-white/10 text-white"
                    : "text-brand-50/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/play/" className="btn-secondary !px-4 !py-2">
            <Play size={16} /> Play
          </Link>
          <a
            href={SITE.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !px-4 !py-2"
          >
            Download App
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-ink/95 backdrop-blur-lg md:hidden">
          <ul className="container-page flex flex-col py-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`block rounded-lg px-3 py-3 text-base font-medium ${
                    isActive(l.href) ? "bg-white/10 text-white" : "text-brand-50/80"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-3 flex gap-3 px-3">
              <Link href="/play/" className="btn-secondary flex-1">
                Play Online
              </Link>
              <a
                href={SITE.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1"
              >
                Download
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
