import { THEMES } from "@/lib/content";

/** Real board captures of every theme (public/images/themes). */
export default function ThemeGallery({ limit }: { limit?: number }) {
  const items = limit ? THEMES.slice(0, limit) : THEMES;
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((t) => (
        <li key={t.id} className="card overflow-hidden">
          <img
            src={`/images/themes/${t.id}-320.webp`}
            srcSet={`/images/themes/${t.id}-320.webp 320w, /images/themes/${t.id}-640.webp 640w`}
            sizes="(min-width: 1024px) 200px, (min-width: 640px) 30vw, 45vw"
            width={320}
            height={329}
            loading="lazy"
            decoding="async"
            alt={`Sudoku board in the ${t.name} theme`}
            className="block aspect-square w-full object-cover"
          />
          <div className="p-3">
            <p className="font-bold text-brand-900">{t.name}</p>
            <p className="mt-0.5 text-xs leading-snug text-slate">{t.note}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
