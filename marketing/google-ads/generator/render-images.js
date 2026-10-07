#!/usr/bin/env node
// Renders every static ad: 12 languages x 5 concepts x formats, then QC-checks
// each one (fonts actually used, text overflow, safe area, overlaps).
//
//   node render-images.js                 # everything
//   node render-images.js --lang en,ar    # subset of languages
//   node render-images.js --concept main  # subset of concepts
//   node render-images.js --format 16x9   # subset of formats

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { OUT, loadPlaywright, serve, puzzleData, ALLOWED_FONTS } = require("./lib");
const { LANGS, FONT, SCRIPT } = require("./copy");

const CONCEPTS = { main: "main", daily: "daily_challenge", brain: "brain_challenge", levels: "difficulty", minimal: "minimal" };
const FORMATS = {
  "16x9": [1920, 1080],
  "1x1": [1200, 1200],
  "9x16": [1080, 1920],
  "191x1": [1200, 628], // Google Ads native landscape (1.91:1)
  "4x5": [1200, 1500], //  Google Ads native portrait (4:5)
};

function arg(name) {
  const i = process.argv.indexOf("--" + name);
  return i > -1 ? process.argv[i + 1].split(",") : null;
}

async function qc(page, cdp, W, H) {
  const issues = [];
  // 1) Geometry: overflow, canvas bounds, safe area, overlaps.
  const geo = await page.evaluate(({ W, H }) => {
    const out = [];
    const safe = Math.min(W, H) * 0.03;
    const sel = ["#h", "#s", ".cta", ".avail", ".lockup", ".calT", ".lvl .nm", ".timerPill"];
    const boxes = [];
    for (const s of sel) {
      for (const el of document.querySelectorAll(s)) {
        const r = el.getBoundingClientRect();
        if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== "visible") out.push(`${s} overflows horizontally`);
        if (r.left < safe || r.top < safe || r.right > W - safe || r.bottom > H - safe) out.push(`${s} outside safe area (${Math.round(r.left)},${Math.round(r.top)},${Math.round(r.right)},${Math.round(r.bottom)})`);
        if (["#h", "#s", ".cta", ".avail", ".lockup"].includes(s)) boxes.push([s, r]);
      }
    }
    // Text lines wider than their box (word that cannot wrap).
    for (const s of ["#h", "#s"]) {
      const el = document.querySelector(s);
      if (!el) continue;
      const range = document.createRange();
      range.selectNodeContents(el);
      const box = el.getBoundingClientRect();
      for (const rr of range.getClientRects()) if (rr.right > box.right + 2 || rr.left < box.left - 2) out.push(`${s} line exceeds its box`);
    }
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) {
        const [a, ra] = boxes[i], [b, rb] = boxes[j];
        if (ra.left < rb.right - 1 && rb.left < ra.right - 1 && ra.top < rb.bottom - 1 && rb.top < ra.bottom - 1) out.push(`${a} overlaps ${b}`);
      }
    // Landscape: copy must not overlap the phone.
    const ph = document.querySelector(".phone").getBoundingClientRect();
    for (const [n, r] of boxes) {
      const ov = r.left < ph.right && ph.left < r.right && r.top < ph.bottom && ph.top < r.bottom;
      if (ov && n !== ".cta" && W > H) out.push(`${n} overlaps phone`);
      if (ov && (n === "#h" || n === "#s")) out.push(`${n} overlaps phone`);
    }
    const hs = parseFloat(getComputedStyle(document.querySelector("#h")).fontSize);
    return { out, headlinePx: hs };
  }, { W, H });
  issues.push(...geo.out);

  // 2) Fonts actually used to paint each text run (catches tofu / fallback).
  const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
  const fonts = new Set();
  for (const s of ["#h", "#s", ".ctaT", ".avail", ".calT", ".lvl .nm", ".wm"]) {
    const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: s });
    for (const nodeId of nodeIds) {
      const { fonts: f } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
      for (const x of f) {
        fonts.add(x.familyName);
        if (!ALLOWED_FONTS.test(x.familyName)) issues.push(`${s} fell back to font "${x.familyName}" (${x.glyphCount} glyphs)`);
      }
    }
  }
  return { issues, fonts: [...fonts], headlinePx: geo.headlinePx };
}

(async () => {
  const { chromium } = loadPlaywright();
  const { srv, base } = await serve();
  const data = puzzleData();
  const langs = arg("lang") || Object.keys(LANGS);
  const concepts = arg("concept") || Object.keys(CONCEPTS);
  const formats = arg("format") || Object.keys(FORMATS);
  const browser = await chromium.launch();
  const report = [];
  let n = 0;
  for (const fmt of formats) {
    const [W, H] = FORMATS[fmt];
    const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
    await page.goto(`${base}/ad.html`);
    // Load every font face up-front so text fitting measures real glyphs.
    await page.evaluate(() => Promise.all([...document.fonts].map((f) => f.load())));
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("DOM.enable");
    await cdp.send("CSS.enable");
    for (const lang of langs) {
      const L = LANGS[lang];
      for (const concept of concepts) {
        await page.evaluate((cfg) => window.renderAd(cfg), {
          lang, dir: L.dir, script: SCRIPT[lang], font: FONT[SCRIPT[lang]], copy: L, concept, format: fmt, W, H, ...data,
        });
        await page.evaluate(() => document.fonts.ready);
        await page.evaluate(() => Promise.all([...document.images].map((i) => i.complete || new Promise((r) => (i.onload = r)))));
        const name = `super_sudoku_${lang}_${CONCEPTS[concept]}_${fmt}`;
        const dir = path.join(OUT, "images", lang);
        fs.mkdirSync(dir, { recursive: true });
        const file = path.join(dir, name + ".jpg");
        // High-quality JPEG with full-resolution chroma keeps digits and text crisp.
        const png = await page.screenshot({ clip: { x: 0, y: 0, width: W, height: H } });
        execFileSync("convert", ["png:-", "-sampling-factor", "4:4:4", "-quality", "92", "-strip", file], { input: png });
        const q = await qc(page, cdp, W, H);
        report.push({ name, lang, concept, format: fmt, file: path.relative(OUT, file), bytes: fs.statSync(file).size, ...q });
        n++;
        process.stdout.write(`\r${n} rendered  ${name}            `);
      }
    }
    await page.close();
  }
  await browser.close();
  srv.close();
  fs.mkdirSync(OUT, { recursive: true });
  const reportFile = path.join(OUT, "qc-images.json");
  let prev = [];
  if (fs.existsSync(reportFile) && (arg("lang") || arg("concept") || arg("format"))) prev = JSON.parse(fs.readFileSync(reportFile, "utf8"));
  const merged = [...prev.filter((p) => !report.some((r) => r.name === p.name)), ...report].sort((a, b) => a.name.localeCompare(b.name));
  fs.writeFileSync(reportFile, JSON.stringify(merged, null, 1));
  const bad = report.filter((r) => r.issues.length);
  console.log(`\n${report.length} images, ${bad.length} with QC issues`);
  for (const b of bad) console.log(" -", b.name, "\n     " + b.issues.join("\n     "));
  process.exitCode = bad.length ? 1 : 0;
})();
