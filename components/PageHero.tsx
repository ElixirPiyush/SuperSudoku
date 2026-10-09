/** Navy hero band used at the top of every inner page. */
export default function PageHero({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-hero-gradient text-white">
      <GridPattern />
      <div className="container-page relative py-16 sm:py-20">
        <span className="eyebrow-dark">{eyebrow}</span>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl">{title}</h1>
        {lede && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-100">{lede}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

/** Faint 9×9 grid in the hero background (decorative). */
export function GridPattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute -right-24 -top-24 h-[520px] w-[520px] opacity-[0.09]"
      viewBox="0 0 90 90"
    >
      {Array.from({ length: 10 }, (_, i) => (
        <g key={i} stroke="white" strokeWidth={i % 3 === 0 ? 0.9 : 0.3}>
          <line x1={i * 10} y1="0" x2={i * 10} y2="90" />
          <line x1="0" y1={i * 10} x2="90" y2={i * 10} />
        </g>
      ))}
    </svg>
  );
}
