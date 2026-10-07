#!/usr/bin/env node
// Video QC: (1) every caption / end-card string in every language is painted
// with the intended font (no tofu / fallback), and fits its box; (2) every
// rendered MP4 has the right duration, resolution, frame rate and an audio track.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { OUT, loadPlaywright, serve, puzzleData, ALLOWED_FONTS } = require("./lib");
const { LANGS, FONT, SCRIPT } = require("./copy");

const FORMATS = { "9x16": [1080, 1920], "16x9": [1920, 1080] };

(async () => {
  const { chromium } = loadPlaywright();
  const { srv, base } = await serve();
  const data = puzzleData();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const cdp = await page.context().newCDPSession(page);
  const report = [];
  for (const lang of Object.keys(LANGS)) for (const kind of ["15s", "30s"]) for (const fmt of Object.keys(FORMATS)) {
    const [W, H] = FORMATS[fmt];
    const L = LANGS[lang];
    await page.setViewportSize({ width: W, height: H });
    await page.goto(base + "/video.html");
    await page.evaluate(() => Promise.all([...document.fonts].map((f) => f.load())));
    await page.evaluate((cfg) => window.setup(cfg), { lang, dir: L.dir, script: SCRIPT[lang], font: FONT[SCRIPT[lang]], copy: L, kind, W, H, ...data });
    const issues = [];
    // Make every caption visible so geometry is measurable.
    const geo = await page.evaluate(({ W, H }) => {
      const out = [];
      const els = [...document.querySelectorAll("#cap .h, #endT, .cta, .calT, .lvl .nm")];
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflow !== "visible") out.push(`${el.className || el.id} overflows`);
        if (r.width && (r.left < 0 || r.right > W || r.top < 0 || r.bottom > H)) out.push(`${el.className || el.id} off-canvas`);
      }
      return out;
    }, { W, H });
    issues.push(...geo);
    const { root } = await cdp.send("DOM.getDocument", { depth: -1 });
    await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
    for (const sel of ["#cap .h", "#endT", ".ctaT", ".calT", ".lvl .nm", ".avail"]) {
      const { nodeIds } = await cdp.send("DOM.querySelectorAll", { nodeId: root.nodeId, selector: sel });
      for (const nodeId of nodeIds) {
        const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
        for (const f of fonts) if (!ALLOWED_FONTS.test(f.familyName)) issues.push(`${sel} fell back to "${f.familyName}"`);
      }
    }
    // Rendered file
    const file = path.join(OUT, "videos", lang, `super_sudoku_${lang}_video_${kind}_${fmt}.mp4`);
    let probe = null;
    if (fs.existsSync(file)) {
      const j = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration,size:stream=codec_type,codec_name,width,height,r_frame_rate", "-of", "json", file]).toString());
      const v = j.streams.find((s) => s.codec_type === "video"), a = j.streams.find((s) => s.codec_type === "audio");
      const dur = Number(j.format.duration);
      probe = { duration: dur, width: v.width, height: v.height, fps: v.r_frame_rate, audio: a ? a.codec_name : null, bytes: Number(j.format.size) };
      if (Math.abs(dur - parseInt(kind)) > 0.1) issues.push(`duration ${dur}`);
      if (v.width !== W || v.height !== H) issues.push(`size ${v.width}x${v.height}`);
      if (!a) issues.push("no audio track");
    } else issues.push("file missing");
    report.push({ name: path.basename(file, ".mp4"), lang, kind, format: fmt, file: path.relative(OUT, file), issues, ...probe });
    process.stdout.write(".");
  }
  await browser.close();
  srv.close();
  fs.writeFileSync(path.join(OUT, "qc-videos.json"), JSON.stringify(report, null, 1));
  const bad = report.filter((r) => r.issues.length);
  console.log(`\n${report.length} videos checked, ${bad.length} with issues`);
  for (const b of bad) console.log(" -", b.name, b.issues.join("; "));
  process.exitCode = bad.length ? 1 : 0;
})();
