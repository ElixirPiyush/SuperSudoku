// Shared Node helpers: static file server, Playwright loader, puzzle data.
const http = require("http");
const fs = require("fs");
const path = require("path");
const { buildPuzzles } = require("./sudoku");

const ROOT = __dirname;
const OUT = path.resolve(ROOT, "..", "output");

function loadPlaywright() {
  try {
    return require("playwright");
  } catch {
    // Fall back to a globally installed copy (e.g. CI images).
    const { execSync } = require("child_process");
    const g = execSync("npm root -g").toString().trim();
    return require(path.join(g, "playwright"));
  }
}

const MIME = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".png": "image/png" };

function serve() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const p = path.join(ROOT, decodeURIComponent(req.url.split("?")[0]));
      if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) {
        res.writeHead(404).end();
        return;
      }
      res.writeHead(200, { "content-type": MIME[path.extname(p)] || "application/octet-stream" });
      fs.createReadStream(p).pipe(res);
    });
    srv.listen(0, "127.0.0.1", () => resolve({ srv, base: `http://127.0.0.1:${srv.address().port}` }));
  });
}

// Deterministic "player progress": which empty cells the player has already
// solved on each board. Values always come from the verified solution.
function seeded(seed) {
  let a = seed;
  return () => ((a = (a * 1664525 + 1013904223) >>> 0) / 4294967296);
}
function puzzleData() {
  const puzzles = buildPuzzles();
  const counts = { main: 12, daily: 10, hard: 8, expert: 9, medium: 14, easy: 0 };
  const fills = {};
  fills.real = [1];
  for (const [name, n] of Object.entries(counts)) {
    const rand = seeded(name.length * 7919 + 17);
    const empties = puzzles[name].puzzle.map((v, i) => (v ? -1 : i)).filter((i) => i >= 0);
    for (let i = empties.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [empties[i], empties[j]] = [empties[j], empties[i]];
    }
    fills[name] = empties.slice(0, n);
  }
  return { puzzles, fills };
}

const ALLOWED_FONTS = /^(Poppins|Noto Sans Devanagari|Noto Sans Gujarati|Noto Sans Tamil|Noto Sans Telugu|Cairo)( (Thin|Light|Regular|Medium|SemiBold|Bold|ExtraBold|Black))?$/;

module.exports = { ROOT, OUT, loadPlaywright, serve, puzzleData, ALLOWED_FONTS };
