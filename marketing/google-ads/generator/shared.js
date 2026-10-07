// Browser-side building blocks shared by ad.html (static) and video.html.
// The game screen is recreated 1:1 from the app screenshot (assets/app/game.png);
// all coordinates are in screenshot pixels (the .screen sets 1em = 1px of it).

const ICON = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12H4M10 5l-7 7 7 7"/></svg>',
  sound: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 12A4.5 4.5 0 0 0 14 8v8a4.5 4.5 0 0 0 2.5-4z"/><path d="M14 3.2v2.1a7 7 0 0 1 0 13.4v2.1a9 9 0 0 0 0-17.6z"/></svg>',
  undo: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62A7.95 7.95 0 0 1 12.5 10.5c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>',
  erase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 5H9L2 12l7 7h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1z"/><path d="M12 9l6 6M18 9l-6 6" stroke-linecap="round"/></svg>',
  hint: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21h6M10 18h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z"/></svg>',
  notes: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" fill="#17a348"><path d="M12 21.5c-4.6 0-8.3-3.2-9.3-7.6 3.7.1 7 1.9 9.3 5 2.3-3.1 5.6-4.9 9.3-5-1 4.4-4.7 7.6-9.3 7.6z"/><path d="M12 16.8C10 15 9 12.6 9 10s1-5 3-7.2c2 2.2 3 4.6 3 7.2s-1 5-3 6.8z"/></svg>',
  bars: (c) => `<svg viewBox="0 0 24 24" fill="${c}"><rect x="3" y="12" width="5" height="9" rx="1.6"/><rect x="9.5" y="7" width="5" height="14" rx="1.6"/><rect x="16" y="2.5" width="5" height="18.5" rx="1.6"/></svg>`,
  timer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M10 2h4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  android: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 9.5l1.8-3.1a.4.4 0 0 0-.7-.4l-1.8 3.1a11 11 0 0 0-9.8 0L5.3 6a.4.4 0 0 0-.7.4l1.8 3.1A10.4 10.4 0 0 0 1 18h22a10.4 10.4 0 0 0-5.4-8.5zM7 15.3a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2zm10 0a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2z"/></svg>',
  wifi: '<svg viewBox="0 0 24 18" fill="currentColor"><path d="M12 17.5l3.2-4a5.2 5.2 0 0 0-6.4 0z"/><path d="M12 9a9 9 0 0 1 5.9 2.2l1.6-2A11.6 11.6 0 0 0 12 6.4 11.6 11.6 0 0 0 4.5 9.2l1.6 2A9 9 0 0 1 12 9z"/><path d="M12 3.6c3.7 0 7 1.3 9.5 3.6L23 5.3A16.6 16.6 0 0 0 12 1 16.6 16.6 0 0 0 1 5.3l1.5 1.9A14 14 0 0 1 12 3.6z"/></svg>',
  signal: '<svg viewBox="0 0 20 16" fill="currentColor"><rect x="0" y="11" width="3.4" height="5" rx="1"/><rect x="5.5" y="7.5" width="3.4" height="8.5" rx="1"/><rect x="11" y="4" width="3.4" height="12" rx="1"/><rect x="16.5" y="0" width="3.4" height="16" rx="1"/></svg>',
  battery: '<svg viewBox="0 0 28 14" fill="none"><rect x="1" y="1" width="23" height="12" rx="3" stroke="currentColor" stroke-width="1.6"/><rect x="3.2" y="3.2" width="16" height="7.6" rx="1.6" fill="currentColor"/><rect x="25.3" y="4.5" width="2" height="5" rx="1" fill="currentColor"/></svg>',
};
const LEVEL_ICON = { Easy: ICON.leaf, Medium: ICON.bars("#1f5be6"), Hard: ICON.bars("#f5a300"), Expert: ICON.bars("#e0282e") };

// Geometry of the real game screen (screenshot px, page coordinates).
const GEO = {
  cell: (i) => [22 + 5 + ((i % 9) + 0.5) * (941 / 9), 256 + 5 + (Math.floor(i / 9) + 0.5) * (941 / 9)],
  key: (k) => [68 + (k - 1) * 107.25, 1735],
  tool: { undo: [155, 1487], erase: [383, 1487], hint: [611, 1487], notes: [840, 1487] },
};

const GRID_LINES = (() => {
  let l = "";
  for (let k = 1; k < 9; k++) {
    const thick = k % 3 === 0;
    const a = `stroke="${thick ? "#1f2e66" : "#d1d7e0"}" stroke-width="${thick ? 0.045 : 0.016}"`;
    l += `<line x1="${k}" y1="0" x2="${k}" y2="9" ${a}/><line x1="0" y1="${k}" x2="9" y2="${k}" ${a}/>`;
  }
  return `<svg class="lines" viewBox="0 0 9 9" preserveAspectRatio="none">${l}</svg>`;
})();

const statusBar = () => `<div class="sb"><span>9:41</span><div class="ic">${ICON.signal}${ICON.wifi}${ICON.battery}</div></div>`;

/**
 * Game screen. st = { level, mistakes, time, puzzle[81], values[81], selected,
 *   notes{idx:[n]}, notesOn, keyOn, pop{idx:scale}, wave{idx:0..1}, overlay(html) }
 */
function gameScreen(st) {
  const sel = st.selected;
  const sr = sel != null ? Math.floor(sel / 9) : -1, sc = sel != null ? sel % 9 : -1;
  const sv = sel != null ? st.values[sel] : 0;
  let cells = "";
  for (let i = 0; i < 81; i++) {
    const r = Math.floor(i / 9), c = i % 9, v = st.values[i];
    const cls = ["cell"];
    if (st.puzzle[i] === 0 && v) cls.push("user");
    if (i === sel) cls.push("sel");
    else if (sv && v === sv) cls.push("same");
    else if (sel != null && (r === sr || c === sc || (Math.floor(r / 3) === Math.floor(sr / 3) && Math.floor(c / 3) === Math.floor(sc / 3)))) cls.push("peer");
    let style = "";
    if (st.wave && st.wave[i]) style = `background:rgba(255,194,26,${(st.wave[i] * 0.85).toFixed(3)})`;
    let inner = v ? `<b${st.pop && st.pop[i] ? ` style="display:inline-block;transform:scale(${st.pop[i]})"` : ""}>${v}</b>` : "";
    if (!v && st.notes && st.notes[i]) inner = `<div class="notes">${[1,2,3,4,5,6,7,8,9].map((n) => `<i>${st.notes[i].includes(n) ? n : ""}</i>`).join("")}</div>`;
    cells += `<div class="${cls.join(" ")}"${style ? ` style="${style}"` : ""}>${inner}</div>`;
  }
  const counts = [1,2,3,4,5,6,7,8,9].map((n) => 9 - st.values.filter((v) => v === n).length);
  const keys = counts.map((left, k) => `<div class="key${st.keyOn === k + 1 ? " on" : ""}${left === 0 ? " done" : ""}" style="left:${GEO.key(k + 1)[0]}em"><b>${k + 1}</b><s>${left}</s></div>`).join("");
  const active = sel != null;
  const tool = (name, label, x, cls = "", extra = "") => `<div class="tool ${cls}" style="left:${x}em">${ICON[name]}<div class="tl">${label}</div>${extra}</div>`;
  return `<div class="app${active ? " active" : ""}">${statusBar()}<div class="page">
    <div class="abs g-back">${ICON.back}</div><div class="abs g-title"><span>Sudoku</span></div><div class="abs g-sound">${ICON.sound}</div>
    <div class="abs g-info"><div class="g-lvl">${LEVEL_ICON[st.level]}<span>${st.level}</span></div><span>Mistakes: ${st.mistakes ?? 0}/3</span><span>${st.time}</span></div>
    <div class="abs board">${cells}${GRID_LINES}</div>
    ${tool("undo", "Undo", 155)}${tool("erase", "Erase", 383, active ? "" : "off")}${tool("hint", "Hint", 611, active ? "" : "off", `<div class="badge"><span>2</span></div>`)}${tool("notes", "Notes", 840, st.notesOn ? "on" : "")}
    ${keys}${st.overlay || ""}</div></div>`;
}

/** A real app screenshot (assets/app/<name>.png) with optional overlays. */
function shotScreen(name, overlay = "") {
  return `<div class="app">${statusBar()}<div class="page"><img class="shot" src="assets/app/${name}.png">${overlay}</div></div>`;
}

const PHONE_RATIO = 2.007;
function phone(screenHtml, { pw, x, y, rot = 0 } = {}) {
  return `<div class="phone" dir="ltr" style="--pw:${pw}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">
    <div class="body"></div>
    <div class="btn" style="top:calc(var(--pw)*0.42);height:calc(var(--pw)*0.2)"></div>
    <div class="btn" style="top:calc(var(--pw)*0.7);height:calc(var(--pw)*0.12)"></div>
    <div class="screen">${screenHtml}<div class="cam"></div><div class="glare"></div></div>
  </div>`;
}

function tile(n, { x, y, s, kind = "", rot = 0 }) {
  return `<div class="tile ${kind}" style="--s:${s}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">${n}</div>`;
}
function lockup(sizePx) {
  return `<div class="lockup" style="--ls:${sizePx}px" dir="ltr"><img src="assets/app/icon.png" alt=""><div class="wm">Super Sudoku</div></div>`;
}
function cta(text, sizePx) {
  return `<div class="cta" style="font-size:${sizePx}px"><span class="ctaT">${text}</span><span class="go">${ICON.arrow}</span></div>`;
}
function avail(text, sizePx) {
  return `<div class="avail" style="font-size:${sizePx}px">${ICON.android}<span>${text}</span></div>`;
}
function bigGrid(sizePx, x, y, rot) {
  let l = "";
  for (let k = 0; k <= 9; k++) {
    const p = (k / 9) * 100, w = k % 3 === 0 ? 0.55 : 0.18;
    l += `<line x1="${p}" y1="0" x2="${p}" y2="100" stroke-width="${w}"/><line x1="0" y1="${p}" x2="100" y2="${p}" stroke-width="${w}"/>`;
  }
  return `<svg class="bigGrid" viewBox="-1 -1 102 102" style="left:${x}px;top:${y}px;width:${sizePx}px;height:${sizePx}px;transform:rotate(${rot}deg)">${l}</svg>`;
}
/** Real Quick Play cards from the home screen, in progression order. */
function levelRow(cardPx) {
  return `<div class="lvRow" dir="ltr" style="font-size:${cardPx * 0.28}px">${[0, 1, 2, 3].map((i) =>
    (i ? `<span class="arr">${ICON.chev}</span>` : "") + `<img class="lvCard" style="--cw:${cardPx}px" src="assets/app/qp_${i}.png">`).join("")}</div>`;
}

function fitText(el, startPx, maxH, minPx) {
  let s = startPx;
  el.style.fontSize = s + "px";
  while (s > minPx && (el.scrollHeight > maxH + 1 || el.scrollWidth > el.clientWidth + 1)) { s -= 1; el.style.fontSize = s + "px"; }
  return s;
}
function fitWidth(el, startPx, maxW, minPx) {
  let s = startPx;
  el.style.fontSize = s + "px";
  while (s > minPx && el.getBoundingClientRect().width > maxW) { s -= 1; el.style.fontSize = s + "px"; }
  return s;
}
function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
