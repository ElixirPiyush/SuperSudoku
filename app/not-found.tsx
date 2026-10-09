import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid min-h-[60vh] place-items-center py-20">
      <div className="container-page text-center">
        <p className="text-7xl font-extrabold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold">Puzzle not found</h1>
        <p className="mx-auto mt-2 max-w-md text-slate">
          This page has wandered off the grid. Let&apos;s get you back to solving.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            Go to the home page
          </Link>
          <Link href="/how-to-play/" className="btn-ghost">
            How to play
          </Link>
          <Link href="/faq/" className="btn-ghost">
            FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
