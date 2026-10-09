import type { Faq } from "@/lib/content";

/** Native <details> accordion: works without JavaScript and with the keyboard. */
export default function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-brand-100 overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card">
      {items.map((f) => (
        <details key={f.id} id={f.id} className="group scroll-mt-24">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-bold text-brand-900 hover:bg-brand-50 [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <svg
              aria-hidden="true"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="shrink-0 text-brand-600 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </summary>
          <p className="px-5 pb-5 leading-relaxed text-slate">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
