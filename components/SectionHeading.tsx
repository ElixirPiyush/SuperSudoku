export default function SectionHeading({
  eyebrow,
  title,
  lede,
  center = false,
  id,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id} className="text-3xl font-extrabold leading-tight sm:text-4xl">
        {title}
      </h2>
      {lede && <p className="lede mt-4">{lede}</p>}
    </div>
  );
}
