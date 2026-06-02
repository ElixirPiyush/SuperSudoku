"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { SITE } from "@/lib/site";

/** Sticky bottom bar shown on mobile to drive app installs. */
export default function StickyMobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="border-t border-white/10 bg-ink/90 px-4 py-3 backdrop-blur-lg">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-gradient text-ink">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
              <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{SITE.name}</p>
            <p className="truncate text-xs text-brand-50/60">
              Free • ⭐ {SITE.rating} on Google Play
            </p>
          </div>
          <a
            href={SITE.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary shrink-0 !px-4 !py-2"
          >
            <Download size={16} /> Install
          </a>
        </div>
      </div>
    </div>
  );
}
