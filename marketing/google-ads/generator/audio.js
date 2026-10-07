// Procedural sound design for the video ads (no third-party audio, so no
// licensing issues): a soft music bed plus UI sounds synced to the timeline.
const fs = require("fs");

const SR = 48000;
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);

function buildAudio(file, dur, events) {
  const N = Math.ceil(dur * SR);
  const L = new Float32Array(N), R = new Float32Array(N);
  const add = (t0, len, fn, gain = 1, pan = 0) => {
    const s0 = Math.floor(t0 * SR), n = Math.floor(len * SR);
    for (let k = 0; k < n; k++) {
      const i = s0 + k;
      if (i < 0 || i >= N) continue;
      const v = fn(k / SR) * gain;
      L[i] += v * (1 - pan) ; R[i] += v * (1 + pan);
    }
  };
  // Mallet: sine + soft overtone, exponential decay.
  const mallet = (f, decay = 0.6) => (t) => Math.exp(-t / decay) * (Math.sin(2 * Math.PI * f * t) + 0.25 * Math.sin(2 * Math.PI * f * 3.01 * t) * Math.exp(-t / 0.08)) * Math.min(1, t * 400);
  // Pad: detuned sines with slow attack/release.
  const pad = (fs, len) => (t) => {
    const env = Math.min(1, t / 0.8) * Math.min(1, (len - t) / 0.8);
    let v = 0;
    for (const f of fs) v += Math.sin(2 * Math.PI * f * t) + 0.6 * Math.sin(2 * Math.PI * f * 1.003 * t + 1);
    return (v / fs.length) * env;
  };

  // ---- music bed: 100 BPM, I–vi–IV–V in C, two bars per chord
  const beat = 60 / 100, bar = beat * 4;
  const chords = [[48, 55, 60, 64, 71], [45, 52, 57, 60, 67], [41, 48, 57, 60, 64], [43, 50, 55, 59, 62]];
  for (let b = 0, ci = 0; b * bar < dur; b += 2, ci++) {
    const ch = chords[ci % 4];
    const len = Math.min(2 * bar + 0.8, dur - b * bar);
    add(b * bar, len, pad(ch.slice(1).map((n) => midi(n)), len), 0.05);
    add(b * bar, len, pad([midi(ch[0] - 12)], len), 0.07);
    // gentle arpeggio, eighth notes
    for (let e = 0; e < 16; e++) {
      const t = b * bar + e * beat / 2;
      if (t >= dur) break;
      const n = ch[1 + ((e * 3) % 4)] + 12;
      add(t, 0.6, mallet(midi(n), 0.25), 0.045, e % 2 ? 0.3 : -0.3);
    }
    // soft kick on beats 1 and 3
    for (let q = 0; q < 8; q += 2) add(b * bar + q * beat, 0.25, (t) => Math.sin(2 * Math.PI * (50 + 70 * Math.exp(-t / 0.04)) * t) * Math.exp(-t / 0.12), 0.12);
  }

  // ---- UI sounds
  let rnd = 1;
  const noise = () => ((rnd = (rnd * 16807) % 2147483647) / 2147483647) * 2 - 1;
  for (const e of events) {
    if (e.type === "tap") add(e.t, 0.05, (t) => (noise() * 0.5 + Math.sin(2 * Math.PI * 2200 * t)) * Math.exp(-t / 0.008), 0.08);
    if (e.type === "fill") add(e.t, 0.7, mallet(midi(79), 0.3), 0.16);
    if (e.type === "note") add(e.t, 0.4, mallet(midi(86), 0.15), 0.09);
    if (e.type === "pop" || e.type === "level") add(e.t, 0.5, mallet(midi(e.type === "pop" ? 84 : 76), 0.2), 0.12);
    if (e.type === "swoosh") add(e.t - 0.2, 0.45, (t) => { const x = t / 0.45; return noise() * Math.sin(Math.PI * x) * 0.6; }, 0.05);
    if (e.type === "win") [72, 76, 79, 84, 88].forEach((n, k) => add(e.t + k * 0.09, 1.6, mallet(midi(n), 0.7), 0.13, (k - 2) * 0.15));
    if (e.type === "end") { add(e.t, 2.5, pad([midi(60), midi(64), midi(67), midi(72)], 2.5), 0.1); add(e.t, 1.2, mallet(midi(84), 0.5), 0.1); }
  }

  // master: fade in/out, soft limit, normalize to -1 dBFS
  let peak = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR, g = Math.min(1, t / 0.3) * Math.min(1, (dur - t) / 0.9);
    L[i] = Math.tanh(L[i] * g * 1.2); R[i] = Math.tanh(R[i] * g * 1.2);
    peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  }
  const norm = 0.89 / (peak || 1);
  const buf = Buffer.alloc(44 + N * 4);
  buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVE", 8); buf.write("fmt ", 12);
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) {
    buf.writeInt16LE(Math.round(L[i] * norm * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(R[i] * norm * 32767), 46 + i * 4);
  }
  fs.writeFileSync(file, buf);
}

module.exports = { buildAudio };
