import { SITE } from "@/lib/site";

/** Official-style "Get it on Google Play" badge rendered as inline SVG. */
export default function GooglePlayBadge({
  className = "",
}: {
  className?: string;
}) {
  return (
    <a
      href={SITE.playUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Download Super Sudoku on Google Play"
      className={`inline-flex items-center gap-3 rounded-xl border border-white/15 bg-black px-5 py-2.5 transition-transform duration-200 hover:-translate-y-0.5 hover:border-white/30 ${className}`}
    >
      <svg width="26" height="28" viewBox="0 0 512 512" aria-hidden="true">
        <path fill="#00D9FF" d="M48 32 304 256 48 480c-9-5-16-15-16-28V60c0-13 7-23 16-28z" />
        <path fill="#00F076" d="M48 32c4-2 9-3 14-3 6 0 12 2 18 5l254 146-66 76L48 32z" />
        <path fill="#FF3A44" d="M334 180l78 45c20 11 20 51 0 62l-78 45-66-76 66-76z" />
        <path fill="#FFC400" d="M48 480 268 332l66 76L80 478c-6 3-12 5-18 5-5 0-10-1-14-3z" />
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="text-[10px] uppercase tracking-wide text-white/70">
          Get it on
        </span>
        <span className="text-lg font-semibold text-white">Google Play</span>
      </span>
    </a>
  );
}
