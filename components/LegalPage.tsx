import PageHero from "@/components/PageHero";

/** Shared layout for the Privacy Policy and Terms of Service. */
export default function LegalPage({
  title,
  updated,
  intro,
  toc,
  children,
}: {
  title: string;
  updated: string;
  intro: React.ReactNode;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow="Legal" title={title} lede={<>Last updated: {updated}</>} />
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[220px_1fr]">
        <nav aria-label="Contents" className="lg:sticky lg:top-24 lg:self-start">
          <p className="text-xs font-bold uppercase tracking-widest text-slate">Contents</p>
          <ol className="mt-3 space-y-1.5 text-sm">
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-brand-700 hover:underline">
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="prose-legal max-w-3xl">
          <div className="text-lg">{intro}</div>
          {children}
        </article>
      </div>
    </>
  );
}

export function LegalSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2>{title}</h2>
      {children}
    </section>
  );
}
