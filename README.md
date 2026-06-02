# Super Sudoku — Website

Premium online Sudoku platform and Google Play app promotion site for
**[Super Sudoku](https://play.google.com/store/apps/details?id=com.elixir.sudoku.puzzlegame)**.

🌐 **Live:** https://elixir-7482e.web.app

## Stack

- **Next.js 15** (App Router) with **static export** (`output: "export"`)
- **TypeScript** · **Tailwind CSS** · **Framer Motion**
- Deployed to **Firebase Hosting** (project `elixir-7482e`)

## Features

- Fully interactive browser Sudoku (unique-solution generator, notes, hints,
  undo, timer, mistake counter, auto-save)
- Marketing pages: Home, Features, About, Blog, Contact, Privacy, Terms
- App-install funnel: Google Play badges, sticky mobile CTA, post-game prompt
- SEO: per-page metadata, Open Graph/Twitter, JSON-LD, `sitemap.xml`, `robots.txt`
- Branding sourced from the app's "Neon Pulse" theme

## Development

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & Deploy

```bash
npm run build    # static export to ./out
npm run deploy   # build + firebase deploy --only hosting
```

Pushes to `main` auto-deploy to Firebase Hosting via GitHub Actions
(`.github/workflows/firebase-hosting-merge.yml`); pull requests get preview
channels.

## Project structure

```
app/         Routes (App Router) + sitemap/robots/metadata
components/  UI + the interactive SudokuBoard
lib/         Sudoku engine (sudoku.ts) and site content (site.ts)
public/      Static assets (images, app-ads.txt, manifest)
out/         Build output (git-ignored) — Firebase Hosting root
```

## Configuration

Site-wide content (URLs, stats, copy, blog posts, FAQs) lives in
[`lib/site.ts`](lib/site.ts). Update the production domain, Play Store stats and
screenshots there.
