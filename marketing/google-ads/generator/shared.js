// Browser-side building blocks shared by ad.html (static) and video.html.
// Everything returns HTML strings; layout pages compose them.

const ICON = {
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="1.2" fill="currentColor"/><circle cx="17.5" cy="10.5" r="1.2" fill="currentColor"/><circle cx="8.5" cy="7.5" r="1.2" fill="currentColor"/><circle cx="6.5" cy="12.5" r="1.2" fill="currentColor"/><path d="M12 2a10 10 0 1 0 0 20c.9 0 1.6-.7 1.6-1.6 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.9.7-1.6 1.6-1.6H16a6 6 0 0 0 6-6c0-4.9-4.5-8.6-10-8.6z"/></svg>',
  pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>',
  timer: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M10 2h4"/></svg>',
  undo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>',
  erase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 21L3 17a2 2 0 0 1 0-2.8L13.2 4a2 2 0 0 1 2.8 0l4 4a2 2 0 0 1 0 2.8L10 21z"/><path d="M22 21H7M5 11l9 9"/></svg>',
  notes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
  hint: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6M10 22h4"/><path d="M15.1 14c.2-1 .7-1.7 1.4-2.5A6 6 0 1 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.2 1.5 1.4 2.5"/></svg>',
  cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2.5"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M8 15l2.5 2.5L16 12"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 21l1.6-7L2 9.2l7.1-.6z"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.7V17c0 .6-.5 1-1 1.2C7.8 18.8 7 20.2 7 22M14 14.7V17c0 .6.5 1 1 1.2 1.2.5 2 2 2 3.8"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z" fill="currentColor" fill-opacity=".25"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>',
  wifi: '<svg viewBox="0 0 24 18" fill="currentColor"><path d="M12 17.5l3.2-4a5.2 5.2 0 0 0-6.4 0z"/><path d="M12 9a9 9 0 0 1 5.9 2.2l1.6-2A11.6 11.6 0 0 0 12 6.4 11.6 11.6 0 0 0 4.5 9.2l1.6 2A9 9 0 0 1 12 9z" opacity=".95"/><path d="M12 3.6c3.7 0 7 1.3 9.5 3.6L23 5.3A16.6 16.6 0 0 0 12 1 16.6 16.6 0 0 0 1 5.3l1.5 1.9A14 14 0 0 1 12 3.6z" opacity=".95"/></svg>',
  signal: '<svg viewBox="0 0 20 16" fill="currentColor"><rect x="0" y="11" width="3.4" height="5" rx="1"/><rect x="5.5" y="7.5" width="3.4" height="8.5" rx="1"/><rect x="11" y="4" width="3.4" height="12" rx="1"/><rect x="16.5" y="0" width="3.4" height="16" rx="1"/></svg>',
  battery: '<svg viewBox="0 0 28 14" fill="none"><rect x="1" y="1" width="23" height="12" rx="3" stroke="currentColor" stroke-width="1.6"/><rect x="3.2" y="3.2" width="16" height="7.6" rx="1.6" fill="currentColor"/><rect x="25.3" y="4.5" width="2" height="5" rx="1" fill="currentColor"/></svg>',
};

/**
 * Game screen. `st` = {
 *   title, titleIcon, chip, time, mistakes,
 *   puzzle[81], values[81] (current board), selected, notes{idx:[n]},
 *   notesOn, keyOn, win{a,b,show,time}, hideSame, extra (html) }
 */
function gameScreen(st) {
  const sel = st.selected;
  const sr = sel != null ? Math.floor(sel / 9) : -1, sc = sel != null ? sel % 9 : -1;
  const sv = sel != null ? st.values[sel] : 0;
  let cells = "";
  for (let i = 0; i < 81; i++) {
    const r = Math.floor(i / 9), c = i % 9, v = st.values[i];
    const cls = ["cell", "r" + r, "c" + c];
    if (st.puzzle[i] === 0 && v) cls.push("user");
    if (i === sel) cls.push("sel");
    else if (sv && v === sv && !st.hideSame) cls.push("same");
    else if (sel != null && (r === sr || c === sc || (Math.floor(r / 3) === Math.floor(sr / 3) && Math.floor(c / 3) === Math.floor(sc / 3)))) cls.push("peer");
    let inner = v || "";
    let style = "";
    if (st.pop && st.pop[i] != null) style += `transform:scale(${st.pop[i]});`;
    if (st.wave && st.wave[i]) style += `background:rgba(255,190,61,${st.wave[i] * 0.55});color:${st.wave[i] > 0.5 ? "#fff" : ""};`;
    if (!v && st.notes && st.notes[i]) inner = `<div class="notes">${[1,2,3,4,5,6,7,8,9].map((n) => `<i>${st.notes[i].includes(n) ? n : ""}</i>`).join("")}</div>`;
    cells += `<div class="${cls.join(" ")}" data-i="${i}"${style ? ` style="${style}"` : ""}>${inner}</div>`;
  }
  const counts = [1,2,3,4,5,6,7,8,9].map((n) => 9 - st.values.filter((v) => v === n).length);
  const keys = counts.map((left, k) => `<div class="key${st.keyOn === k + 1 ? " on" : ""}${left === 0 ? " done" : ""}" data-k="${k + 1}"><b>${k + 1}</b><s>${left}</s></div>`).join("");
  const tool = (ic, label, extra = "") => `<div class="tool${extra}"><div class="ti">${ICON[ic]}</div><div class="tl">${label}</div></div>`;
  const win = st.win && st.win.show ? `<div class="win" style="--wb:${st.win.b ?? 0.55}"><div class="card" style="transform:scale(${st.win.s ?? 1});opacity:${st.win.o ?? 1}">
      <div class="trophy">${ICON.trophy}</div><div class="time">${st.win.time || st.time}</div>
      <div class="row"><div>${ICON.check} 0 / 3</div><div>${ICON.timer} ${st.chip || ""}</div></div></div></div>` : "";
  return `<div class="app">
    <div class="sb"><span>9:41</span><div class="ic">${ICON.signal}${ICON.wifi}${ICON.battery}</div></div>
    <div class="ab">${ICON.back}<div class="t">${st.titleIcon ? `<span style="display:flex;width:1.1em;height:1.1em;color:var(--brand)">${ICON[st.titleIcon]}</span>` : ""}${st.title}</div>${ICON.palette}</div>
    <div class="info"><div><div class="k">Mistakes</div><div class="v">${st.mistakes ?? 0}/3</div></div>
      <div class="timer"><span style="display:flex;width:4.6em;height:4.6em;color:var(--brand)">${ICON.timer}</span><span class="v">${st.time}</span></div>
      <span class="chip">${st.chip}</span></div>
    <div class="boardWrap"><div class="board">${cells}${GRID_LINES}</div></div>
    <div class="sp"></div>
    <div class="tools">${tool("undo", "Undo")}${tool("erase", "Erase")}${tool("notes", "Notes", st.notesOn ? " on" : "")}${tool("hint", "Hint")}</div>
    <div class="sp"></div>
    <div class="pad">${keys}</div>
    <div class="sp" style="flex:0.7"></div>
    <div class="navbar"><i></i></div>
    ${win}${st.extra || ""}
  </div>`;
}

const GRID_LINES = (() => {
  let l = "";
  for (let k = 1; k < 9; k++) {
    const thick = k % 3 === 0;
    const a = `stroke="${thick ? "rgba(139,231,255,0.7)" : "rgba(52,96,150,0.75)"}" stroke-width="${thick ? 0.05 : 0.02}"`;
    l += `<line x1="${k}" y1="0" x2="${k}" y2="9" ${a}/><line x1="0" y1="${k}" x2="9" y2="${k}" ${a}/>`;
  }
  return `<svg class="lines" viewBox="0 0 9 9" preserveAspectRatio="none">${l}</svg>`;
})();

function phone(screenHtml, { pw, x, y, rot = 0, extraStyle = "", id = "" } = {}) {
  return `<div class="phone" dir="ltr"${id ? ` id="${id}"` : ""} style="--pw:${pw}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg);${extraStyle}">
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
  return `<div class="lockup" style="--ls:${sizePx}px" dir="ltr"><img src="assets/app-icon.png" alt=""><div class="wm">Super <span>Sudoku</span></div></div>`;
}

function cta(text, sizePx) {
  return `<div class="cta" style="font-size:${sizePx}px"><span class="ctaT">${text}</span><span class="go">${ICON.arrow}</span></div>`;
}

function calendar(today, cwPx, x, y, rot = 0) {
  const g = [0, 1, 0, 0, 0, 1, 1, 0, 0];
  const nums = [7, "", 3, "", 9, "", "", 1, 5];
  return `<div class="cal" style="--cw:${cwPx}px;left:${x}px;top:${y}px;transform:rotate(${rot}deg)">
    <div class="top"><div class="rings"><i></i><i></i></div><span class="calT">${today}</span></div>
    <div class="bd"><div class="mini">${g.map((v, k) => `<i class="${v ? "g" : ""}">${nums[k]}</i>`).join("")}<span class="star">${ICON.star}</span></div></div>
  </div>`;
}

function levelCard(name, puzzle, n, fontPx, top) {
  return `<div class="lvl glass${top ? " top" : ""}" style="--lf:${fontPx}px">
    <div class="mb">${puzzle.map((v) => `<i>${v || ""}</i>`).join("")}</div>
    <div class="nm">${name}</div>
    <div class="bars">${[1, 2, 3, 4].map((k) => `<i class="${k <= n ? "on" : ""}"></i>`).join("")}</div>
  </div>`;
}

function levelRow(names, puzzles, fontPx) {
  const keys = ["easy", "medium", "hard", "expert"];
  return `<div class="lvlRow" style="font-size:${fontPx}px">${keys.map((k, i) =>
    (i ? `<span class="arr">${ICON.chev}</span>` : "") + levelCard(names[i], puzzles[k].puzzle, i + 1, fontPx, i === 3)).join("")}</div>`;
}

function bigGrid(sizePx, x, y, rot) {
  let l = "";
  for (let k = 0; k <= 9; k++) {
    const p = (k / 9) * 100, w = k % 3 === 0 ? 0.55 : 0.18;
    l += `<line x1="${p}" y1="0" x2="${p}" y2="100" stroke-width="${w}"/><line x1="0" y1="${p}" x2="100" y2="${p}" stroke-width="${w}"/>`;
  }
  return `<svg class="bigGrid" viewBox="-1 -1 102 102" style="left:${x}px;top:${y}px;width:${sizePx}px;height:${sizePx}px;transform:rotate(${rot}deg)">${l}</svg>`;
}

/** Shrink an element's font-size until it fits maxH and no line overflows. */
function fitText(el, startPx, maxH, minPx) {
  let s = startPx;
  el.style.fontSize = s + "px";
  while (s > minPx && (el.scrollHeight > maxH + 1 || el.scrollWidth > el.clientWidth + 1)) {
    s -= 1;
    el.style.fontSize = s + "px";
  }
  return s;
}

/** Fit a single-line element (CTA etc.) inside maxW by shrinking font-size. */
function fitWidth(el, startPx, maxW, minPx) {
  let s = startPx;
  el.style.fontSize = s + "px";
  while (s > minPx && el.getBoundingClientRect().width > maxW) {
    s -= 1;
    el.style.fontSize = s + "px";
  }
  return s;
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
