#!/usr/bin/env node
// Builds output/index.html: a local review gallery of every asset per language
// (open it straight from disk), plus QC status and text assets.
const fs = require("fs");
const path = require("path");
const { OUT } = require("./lib");
const { LANGS } = require("./copy");
const { T } = require("./text-assets");

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const readJson = (f) => (fs.existsSync(path.join(OUT, f)) ? JSON.parse(fs.readFileSync(path.join(OUT, f), "utf8")) : []);
const qi = readJson("qc-images.json"), qv = readJson("qc-videos.json");
const CONCEPTS = [["main", "Main install"], ["daily_challenge", "Daily Challenge"], ["brain_challenge", "Brain / puzzle"], ["difficulty", "Difficulty"], ["minimal", "Minimal premium"]];
const FMTS = ["16x9", "1x1", "9x16", "191x1", "4x5"];

let body = "";
const DONE = Object.entries(LANGS).filter(([l]) => fs.existsSync(path.join(OUT, "images", l)));
for (const [lang, L] of DONE) {
  body += `<section id="${lang}"><h2>${esc(L.name)} <small>${lang}</small></h2>`;
  for (const [c, label] of CONCEPTS) {
    body += `<h3>${label}</h3><div class="row">`;
    for (const f of FMTS) {
      const n = `super_sudoku_${lang}_${c}_${f}`;
      const q = qi.find((r) => r.name === n);
      const ok = q && !q.issues.length;
      body += `<figure class="f${f}"><a href="images/${lang}/${n}.jpg"><img loading="lazy" src="images/${lang}/${n}.jpg"></a><figcaption>${f} <b class="${ok ? "ok" : "bad"}">${q ? (ok ? "QC ✓" : "QC ✗") : "–"}</b></figcaption></figure>`;
    }
    body += `</div>`;
  }
  body += `<h3>Videos</h3><div class="row">`;
  for (const k of ["15s", "30s"]) for (const f of ["9x16", "16x9"]) {
    const n = `super_sudoku_${lang}_video_${k}_${f}`;
    const q = qv.find((r) => r.name === n);
    const ok = q && !q.issues.length;
    body += `<figure class="v${f}"><video controls preload="none" poster="" src="videos/${lang}/${n}.mp4"></video><figcaption>${k} · ${f} <b class="${ok ? "ok" : "bad"}">${q ? (ok ? "QC ✓" : "QC ✗") : "–"}</b></figcaption></figure>`;
  }
  body += `</div><h3>Text assets</h3><table dir="${L.dir}"><tr><th>Headlines (≤30)</th><th>Descriptions (≤90)</th></tr>`;
  for (let i = 0; i < 5; i++) body += `<tr><td>${esc(T[lang].h[i])} <i>${[...T[lang].h[i]].length}</i></td><td>${esc(T[lang].d[i])} <i>${[...T[lang].d[i]].length}</i></td></tr>`;
  body += `</table></section>`;
}

const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Super Sudoku — Google Ads assets</title>
<style>
:root{--bg:#f5f7fb;--fg:#0b1830;--muted:#5b6b85;--card:#fff;--line:#dde3ee}
@media (prefers-color-scheme:dark){:root{--bg:#07142c;--fg:#e3f7ff;--muted:#8fa6c4;--card:#0d1c34;--line:#1b3354}}
body{margin:0;font:15px/1.5 system-ui,sans-serif;background:var(--bg);color:var(--fg)}
header{position:sticky;top:0;background:var(--card);border-bottom:1px solid var(--line);padding:12px 16px;z-index:2}
header h1{margin:0 0 6px;font-size:18px} nav a{margin-right:10px;color:inherit}
main{padding:0 16px 40px;max-width:1500px;margin:auto} h2{margin-top:36px} h2 small{color:var(--muted);font-weight:400}
.row{display:flex;gap:12px;overflow-x:auto;align-items:flex-start;padding-bottom:6px}
figure{margin:0;background:var(--card);border:1px solid var(--line);border-radius:10px;padding:6px;flex:none}
figure img,figure video{display:block;height:200px;border-radius:6px} .f9x16 img{height:260px} .v9x16 video{height:320px} .v16x9 video{height:200px}
figcaption{font-size:12px;color:var(--muted);margin-top:4px} .ok{color:#16a34a} .bad{color:#dc2626}
table{border-collapse:collapse;width:100%;background:var(--card)} td,th{border:1px solid var(--line);padding:6px 8px;text-align:start;vertical-align:top} td i{color:var(--muted);font-size:11px}
</style></head><body><header><h1>Super Sudoku — Google Ads creative package</h1><nav>${DONE.map(([l, L]) => `<a href="#${l}">${esc(L.name)}</a>`).join("")}</nav></header><main>${body}</main></body></html>`;
fs.writeFileSync(path.join(OUT, "index.html"), html);
console.log("gallery -> " + path.join(OUT, "index.html"));
