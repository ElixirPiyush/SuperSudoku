"use client";

import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { SITE } from "@/lib/site";
import AppIcon from "./AppIcon";

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
          <AppIcon size={44} className="shrink-0" />
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
