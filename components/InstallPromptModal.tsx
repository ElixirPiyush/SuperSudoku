"use client";

import { useEffect, useState } from "react";
import { X, Star } from "lucide-react";
import { SITE } from "@/lib/site";
import GooglePlayBadge from "./GooglePlayBadge";

const DISMISS_KEY = "supersudoku.web.installPromptDismissed";
const WIN_THRESHOLD = 2; // show after the 2nd completed game

/**
 * Listens for `supersudoku:win` events and, once the player has completed a
 * couple of puzzles, invites them to install the Android app. This pattern
 * reliably lifts Play Store conversion for web-playable puzzle games.
 */
export default function InstallPromptModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onWin = (e: Event) => {
      const wins = (e as CustomEvent<number>).detail ?? 0;
      const dismissed = localStorage.getItem(DISMISS_KEY) === "1";
      if (!dismissed && wins >= WIN_THRESHOLD) setOpen(true);
    };
    window.addEventListener("supersudoku:win", onWin as EventListener);
    return () =>
      window.removeEventListener("supersudoku:win", onWin as EventListener);
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-title"
    >
      <div className="glass relative w-full max-w-md p-8 text-center">
        <button
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-4 top-4 text-brand-50/50 hover:text-white"
        >
          <X size={20} />
        </button>
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-brand-gradient text-ink shadow-glow">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
            <path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </div>
        <h2 id="install-title" className="text-2xl font-bold text-white">
          Loving the puzzles?
        </h2>
        <p className="mt-2 text-brand-50/70">
          Take {SITE.name} everywhere. Get the daily challenge, achievements,
          themes and full offline play — free on Android.
        </p>
        <div className="mt-3 flex items-center justify-center gap-1 text-brand-300">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={16} fill="currentColor" />
          ))}
          <span className="ml-1 text-sm text-brand-50/70">
            {SITE.rating} • {SITE.ratingCount} ratings
          </span>
        </div>
        <div className="mt-6 flex flex-col items-center gap-3">
          <GooglePlayBadge />
          <button
            onClick={dismiss}
            className="text-sm text-brand-50/50 hover:text-white"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
