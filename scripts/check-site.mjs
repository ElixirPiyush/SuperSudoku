// Post-build checks for the static export in ./out (run: npm run check).
// Fails (exit 1) on: broken internal links or assets, missing SEO basics,
// a changed app-ads.txt, wrong Play Store links, rating claims, or secrets.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = fileURLToPath(new URL("../out/", import.meta.url));
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.elixir.sudoku.puzzlegame";
const APP_ADS_SHA256 = "a77e92a37838e4360e567fac56502ca60864845e29936b752b9b14b115f0ede3";
const REQUIRED_PAGES = [
  "/", "/features/", "/monthly-league/", "/daily-challenge/", "/themes/", "/how-to-play/", "/faq/",
  "/privacy-policy/", "/terms/", "/contact/", "/play/", "/about/", "/blog/",
  "/blog/sudoku-tips-for-beginners/", "/blog/advanced-sudoku-strategies/", "/blog/sudoku-brain-training-benefits/",
];

const errors = [];
const fail = (msg) => errors.push(msg);

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

/** Maps a site path to the exported file, like Firebase Hosting (cleanUrls + trailingSlash). */
function resolve(path) {
  const clean = decodeURIComponent(path.split("#")[0].split("?")[0]);
  const candidates = clean.endsWith("/")
    ? [join(OUT, clean, "index.html")]
    : [join(OUT, clean), join(OUT, `${clean}.html`), join(OUT, clean, "index.html")];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile());
}

const files = walk(OUT);
const pages = files.filter((f) => f.endsWith(".html"));

// 1. Every required page exists.
for (const p of REQUIRED_PAGES) if (!resolve(p)) fail(`missing page ${p}`);

for (const file of pages) {
  const rel = "/" + relative(OUT, file).replace(/\\/g, "/");
  const html = readFileSync(file, "utf8");
  const isPage = !rel.endsWith("404.html") && !rel.includes("_not-found");

  // 2. Internal links, images and scripts resolve.
  const refs = [...html.matchAll(/(?:href|src)="(\/[^"]*)"/g)].map((m) => m[1]);
  const srcsets = [...html.matchAll(/srcSet="([^"]+)"/gi)].flatMap((m) => m[1].split(",").map((s) => s.trim().split(/\s+/)[0]));
  for (const ref of [...refs, ...srcsets]) {
    if (ref.startsWith("//")) continue;
    if (!resolve(ref)) fail(`${rel}: broken link or asset ${ref}`);
  }

  if (!isPage) continue;
  // 3. SEO basics.
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) fail(`${rel}: expected 1 <h1>, found ${h1}`);
  if (!/<title>[^<]{10,}<\/title>/.test(html)) fail(`${rel}: missing <title>`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) fail(`${rel}: missing or short meta description`);
  if (!/<link rel="canonical" href="https:\/\/elixir-7482e\.web\.app\/[^"]*"/.test(html)) fail(`${rel}: missing canonical`);
  if (!/<meta property="og:title"/.test(html)) fail(`${rel}: missing Open Graph`);
  if (!/<html lang="en"/.test(html)) fail(`${rel}: missing lang`);
  // 4. Images need alt text (empty alt only for decorative images).
  for (const img of html.match(/<img\b[^>]*>/g) || []) if (!/\balt="/.test(img)) fail(`${rel}: <img> without alt: ${img.slice(0, 80)}`);
  // 5. No invented ratings or download counts.
  if (/aggregateRating|ratingValue|ratingCount/i.test(html)) fail(`${rel}: rating claim in markup`);
  if (/\b\d{1,3}(,\d{3})+\+?\s*(downloads|ratings|reviews)\b/i.test(html)) fail(`${rel}: download/rating count in text`);
  // 6. Play Store links point to the real listing.
  for (const m of html.matchAll(/href="(https:\/\/play\.google\.com[^"]*)"/g)) {
    const url = m[1].replace(/&amp;/g, "&");
    if (url !== PLAY_URL) fail(`${rel}: unexpected Play URL ${url}`);
  }
  // 7. External links opened in a new tab carry rel=noopener.
  for (const a of html.match(/<a\b[^>]*target="_blank"[^>]*>/g) || []) if (!/rel="[^"]*noopener/.test(a)) fail(`${rel}: target=_blank without noopener`);
}

// 8. app-ads.txt is byte-identical to the live file (owner's rule: never change it).
const ads = join(OUT, "app-ads.txt");
if (!existsSync(ads)) fail("app-ads.txt missing");
else {
  const sha = createHash("sha256").update(readFileSync(ads)).digest("hex");
  if (sha !== APP_ADS_SHA256) fail(`app-ads.txt changed (sha256 ${sha}); it must stay identical to the live file`);
}

// 9. Sitemap lists every required page, and every sitemap URL exists.
const sitemap = readFileSync(join(OUT, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>https:\/\/elixir-7482e\.web\.app([^<]*)<\/loc>/g)].map((m) => m[1]);
for (const p of REQUIRED_PAGES) if (!locs.includes(p)) fail(`sitemap misses ${p}`);
for (const l of locs) if (!resolve(l)) fail(`sitemap lists missing page ${l}`);
if (!/Sitemap: https:\/\/elixir-7482e\.web\.app\/sitemap\.xml/.test(readFileSync(join(OUT, "robots.txt"), "utf8"))) fail("robots.txt has no sitemap");

// 10. No secrets in the published files.
const SECRET = /(-----BEGIN [A-Z ]*PRIVATE KEY-----|"private_key"|AIza[0-9A-Za-z_-]{35}|ghp_[0-9A-Za-z]{36}|sk_live_[0-9A-Za-z]{20,})/;
for (const f of files.filter((f) => /\.(html|js|txt|json|xml|webmanifest)$/.test(f))) {
  if (SECRET.test(readFileSync(f, "utf8"))) fail(`possible secret in ${relative(OUT, f)}`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problem(s):\n` + errors.map((e) => "  - " + e).join("\n"));
  process.exit(1);
}
console.log(`✓ ${pages.length} HTML files, ${files.length} files checked: links, assets, SEO, app-ads.txt, Play URL, sitemap, secrets OK`);
