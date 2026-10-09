import { SAMPLE_LEADERBOARD } from "@/lib/content";

const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

/**
 * A Top 100 preview in the app's style. The rows are invented sample data and
 * labelled as such; the site never shows real players.
 */
export default function LeaderboardSample({ compact = false }: { compact?: boolean }) {
  const rows = compact ? SAMPLE_LEADERBOARD.slice(0, 3) : SAMPLE_LEADERBOARD;
  return (
    <figure className="card overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-brand-100 bg-brand-50 px-5 py-3">
        <p className="font-bold text-brand-900">Monthly League · Top 100</p>
        <span className="rounded-full bg-gold-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-700">
          Sample data
        </span>
      </div>
      <ol className="divide-y divide-brand-100" aria-label="Sample leaderboard">
        {rows.map((r) => (
          <li
            key={r.rank}
            className={`flex items-center gap-3 px-5 py-3 ${r.rank <= 3 ? "bg-gold-50/60" : ""}`}
          >
            <span className="w-12 font-extrabold text-brand-900">
              <span aria-hidden="true">{MEDALS[r.rank] ?? ""}</span>#{r.rank}
            </span>
            <span aria-hidden="true" className="text-lg">{r.flag}</span>
            <span className="min-w-0 flex-1 truncate font-semibold text-brand-900">{r.name}</span>
            <span className="font-extrabold tabular-nums text-brand-700">{r.score.toLocaleString("en-US")}</span>
          </li>
        ))}
      </ol>
      <figcaption className="border-t border-brand-100 px-5 py-3 text-xs text-slate">
        Example only: names and scores are made up to show the layout. The real Top 100 is in the app.
      </figcaption>
    </figure>
  );
}
