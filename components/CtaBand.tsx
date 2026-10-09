import GooglePlayBadge from "@/components/GooglePlayBadge";

/** Download call to action at the bottom of a page. */
export default function CtaBand({
  title = "Play today's Daily Challenge",
  body = "Super Sudoku is free on Google Play for Android phones and tablets.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="container-page pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-royal-gradient px-6 py-12 text-center text-white sm:px-12">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-xl text-brand-100">{body}</p>
        <div className="mt-8 flex justify-center">
          <GooglePlayBadge />
        </div>
      </div>
    </section>
  );
}
