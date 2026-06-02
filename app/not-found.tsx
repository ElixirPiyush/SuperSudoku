import Link from "next/link";
import { Home, Play } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center pt-20">
      <div className="container-page text-center">
        <p className="text-7xl font-extrabold gradient-text">404</p>
        <h1 className="mt-4 text-2xl font-bold text-white">Puzzle not found</h1>
        <p className="mx-auto mt-2 max-w-md text-brand-50/60">
          The page you&apos;re looking for has wandered off the grid. Let&apos;s
          get you back to solving.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-primary">
            <Home size={16} /> Go Home
          </Link>
          <Link href="/play/" className="btn-secondary">
            <Play size={16} /> Play Sudoku
          </Link>
        </div>
      </div>
    </section>
  );
}
