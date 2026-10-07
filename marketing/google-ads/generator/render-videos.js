#!/usr/bin/env node
// Renders the 15s and 30s video ads for every language in 9:16 and 16:9.
//
//   node render-videos.js                          # everything
//   node render-videos.js --lang en --kind 15s --format 9x16
//   node render-videos.js --preview 0,4,8,12,14    # PNG stills only (QC)
//   node render-videos.js --workers 3              # parallel browser pages

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { OUT, loadPlaywright, serve, puzzleData } = require("./lib");
const { LANGS, FONT, SCRIPT } = require("./copy");
const { buildAudio } = require("./audio");

const FPS = 30;
const FORMATS = { "9x16": [1080, 1920], "16x9": [1920, 1080] };

function arg(name, def) {
  const i = process.argv.indexOf("--" + name);
  return i > -1 ? process.argv[i + 1] : def;
}

async function renderOne(page, job, data, preview) {
  const { lang, kind, fmt } = job;
  const [W, H] = FORMATS[fmt];
  const L = LANGS[lang];
  await page.setViewportSize({ width: W, height: H });
  await page.goto(job.base + "/video.html");
  await page.evaluate(() => Promise.all([...document.fonts].map((f) => f.load())));
  const info = await page.evaluate(async (cfg) => window.setup(cfg), {
    lang, dir: L.dir, script: SCRIPT[lang], font: FONT[SCRIPT[lang]], copy: L, kind, W, H, ...data,
  });
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.complete || new Promise((r) => (i.onload = r)))));
  const name = `super_sudoku_${lang}_video_${kind}_${fmt}`;
  if (preview) {
    const dir = path.join(OUT, "preview");
    fs.mkdirSync(dir, { recursive: true });
    for (const t of preview) {
      await page.evaluate((t) => window.frame(t), t);
      await page.screenshot({ path: path.join(dir, `${name}_t${String(t).replace(".", "_")}.png`) });
    }
    return info;
  }
  const dir = path.join(OUT, "videos", lang);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, name + ".mp4");
  const audio = path.join(OUT, "audio", `track_${kind}.wav`);
  const ff = spawn("ffmpeg", [
    "-y", "-loglevel", "error",
    "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "mjpeg", "-i", "-",
    "-i", audio,
    "-c:v", "libx264", "-preset", "slow", "-crf", "21", "-pix_fmt", "yuv420p", "-profile:v", "high", "-r", String(FPS),
    "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart",
    file,
  ], { stdio: ["pipe", "inherit", "inherit"] });
  const frames = Math.round(info.dur * FPS);
  for (let f = 0; f < frames; f++) {
    await page.evaluate((t) => window.frame(t), f / FPS);
    const buf = await page.screenshot({ type: "jpeg", quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
  }
  ff.stdin.end();
  await new Promise((r, j) => ff.on("close", (c) => (c ? j(new Error("ffmpeg " + c)) : r())));
  return info;
}

(async () => {
  const { chromium } = loadPlaywright();
  const { srv, base } = await serve();
  const data = puzzleData();
  const langs = arg("lang", Object.keys(LANGS).join(",")).split(",");
  const kinds = arg("kind", "15s,30s").split(",");
  const fmts = arg("format", "9x16,16x9").split(",");
  const preview = arg("preview") ? arg("preview").split(",").map(Number) : null;
  const workers = Number(arg("workers", 3));
  const jobs = [];
  for (const lang of langs) for (const kind of kinds) for (const fmt of fmts) jobs.push({ lang, kind, fmt, base });

  const browser = await chromium.launch();
  if (!preview) {
    // Sound design is identical across languages: build each track once from
    // the timeline's event list.
    const page = await browser.newPage();
    for (const kind of kinds) {
      await page.goto(base + "/video.html");
      const info = await page.evaluate((cfg) => window.setup(cfg), {
        lang: "en", dir: "ltr", script: "latin", font: FONT.latin, copy: LANGS.en, kind, W: 1080, H: 1920, ...data,
      });
      fs.mkdirSync(path.join(OUT, "audio"), { recursive: true });
      buildAudio(path.join(OUT, "audio", `track_${kind}.wav`), info.dur, info.events);
    }
    await page.close();
  }
  let done = 0;
  const t0 = Date.now();
  await Promise.all(Array.from({ length: Math.min(workers, jobs.length) }, async () => {
    const page = await browser.newPage({ deviceScaleFactor: 1 });
    while (jobs.length) {
      const job = jobs.shift();
      await renderOne(page, job, data, preview);
      done++;
      console.log(`[${done}] ${job.lang} ${job.kind} ${job.fmt}  (${Math.round((Date.now() - t0) / 1000)}s)`);
    }
    await page.close();
  }));
  await browser.close();
  srv.close();
})().catch((e) => { console.error(e); process.exit(1); });
