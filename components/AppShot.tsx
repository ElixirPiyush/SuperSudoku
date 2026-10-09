import { SHOT_ALT, type Shot } from "@/lib/content";

/** Real app capture (1080 × 2178 after cropping the phone bars), framed like a phone. */
export default function AppShot({
  shot,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 300px, (min-width: 640px) 40vw, 70vw",
}: {
  shot: Shot;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-[2rem] border-[6px] border-brand-900 bg-brand-900 shadow-lift ${className}`}
    >
      <img
        src={`/images/app/${shot}-720.webp`}
        srcSet={`/images/app/${shot}-360.webp 360w, /images/app/${shot}-720.webp 720w`}
        sizes={sizes}
        width={720}
        height={1452}
        alt={SHOT_ALT[shot]}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}
