# Super Sudoku: Google Ads Creative Package

Global Google Ads **App campaign** creative for Super Sudoku (Android,
`com.elixir.sudoku.puzzlegame`). It is one campaign identity with 12 localized
variants.

**Open `output/index.html` in a browser** to review every asset, side by side, with its QC status.

| | Count | Location |
|---|---|---|
| Static images (5 concepts × 5 formats × 12 languages) | 300 | `output/images/<lang>/` |
| Video ads (15s + 30s × 9:16 + 16:9 × 12 languages) | 48 | `output/videos/<lang>/` |
| Text assets (5 headlines + 5 descriptions × 12 languages) | 120 | `output/text_assets.csv` |
| QC reports | 2 | `output/qc-images.json`, `output/qc-videos.json` |
| Generator (re-render everything from source) | | `generator/` |

> ⚠️ **Before launch, please read [Things to verify](#things-to-verify-before-launch).**
> The in-phone game screen is a high-fidelity *recreation*, not a capture of
> the real app. Google's policies require that ads represent the app accurately.

---

## 1. Creative strategy

**Message:** *Easy to start, challenging to master*, plus a reason to come back
every day (the **Daily Challenge**).

**Visual system** (one campaign, not twelve):

- **The Sudoku board is the hero.** Every asset centres on a realistic Android
  phone running Super Sudoku, with large, sharp digits, a highlighted selected
  cell, row/column/box highlighting, same-number highlighting and the number pad.
- **Colours:** the app's own *Neon Pulse* theme (`#061229` navy, `#4FC3F7`
  cyan) on a bright, deep-blue gradient with a luminous glow behind the device.
  **Gold** (taken from the launcher icon) is used only for the CTA and a few
  accent tiles, so the CTA is always the warmest thing on screen.
- **Decoration** is restrained: 2–5 floating number tiles, a calendar for
  Daily Challenge, a faint oversized grid for the brain concept. There are no
  coins, gems, characters, casino effects, ratings, reviews or download counts.
- **Typography:** Poppins (the brand font, as used on the website) for Latin
  scripts, the brand name and every digit. Each Indic script and Arabic uses a
  dedicated, highly legible face (see §6).
- **Every grid shown is a real, valid Sudoku.** Puzzles are generated with
  fixed seeds and verified at build time: the solution is valid, the givens
  agree with it, and the puzzle has exactly one solution. Every digit the
  "player" enters (in images and videos) comes from that solution, and
  pencil-mark notes are the cell's true candidates.

## 2. Image concepts

| # | Concept (file key) | Headline (EN) | Supporting (EN) | CTA (EN) | Visual |
|---|---|---|---|---|---|
| 1 | Main install (`main`) | Challenge Your Mind | Play Sudoku anytime | Play Now | Phone mid-game, cell selected, same-number highlight |
| 2 | Daily Challenge (`daily_challenge`) | New Challenge Every Day | Can you solve today's puzzle? | Play Today's Challenge | Daily Challenge screen + "Today" calendar |
| 3 | Brain / puzzle (`brain_challenge`) | Train Your Brain | Think. Solve. Master Sudoku. | Start Playing | Notes mode with real candidates, oversized grid, number tiles |
| 4 | Difficulty (`difficulty`) | Choose Your Challenge | From beginner to expert | Start Solving | Easy → Medium → Hard → Expert cards (fewer givens per level) + Expert game |
| 5 | Minimal premium (`minimal`) | How Fast Can You Solve It? | – | Play Now | Large phone, halo ring, timer chip |

"Train Your Brain" is framed as entertainment. No medical or scientific
benefit is claimed anywhere.

### Formats

| Format | Size | Layout |
|---|---|---|
| `16x9` landscape | 1920×1080 | Copy column on one side, phone on the other (mirrored for Arabic) |
| `1x1` square | 1200×1200 | Centred: brand → headline → phone → CTA; legible as a thumbnail |
| `9x16` portrait | 1080×1920 | Recomposed for mobile: headline top, large phone centre, CTA bottom |
| `191x1` *(bonus)* | 1200×628 | Google Ads' native landscape ratio (1.91:1) |
| `4x5` *(bonus)* | 1200×1500 | Google Ads' native portrait ratio (4:5) |

> App campaigns accept image ratios of **1.91:1, 1:1 and 4:5**. The requested
> 16:9 and 9:16 images also work, for example in Demand Gen and YouTube companion
> placements, but upload the `191x1`, `1x1` and `4x5` files to App campaigns.

All copy sits within a 3% safe margin (checked automatically). Phones are
never distorted: some layouts crop the bottom of the device, but they never
stretch it. In stacked layouts the phone is sized so the **whole board** stays
visible above the CTA.

## 3. Video ads

Each video is 1080×1920 (9:16) or 1920×1080 (16:9), H.264 High, 30 fps,
CRF 21, AAC 192 kbps, with fast-start enabled. They are ready to upload to YouTube for App campaigns.
The audio is original procedural sound design (a soft music bed, tap clicks
synced to every tap, a chime when the puzzle is completed), so there are no
music-licensing issues.

### Video A: 15 seconds (`video_15s`)

| Time | Picture | On-screen text (EN) |
|---|---|---|
| 0–3s | Phone eases in on a clean, in-progress board | Love Sudoku? |
| 3–6s | 3 real moves: tap cell → tap number → digit pops in; subtle push-in | Challenge Your Mind |
| 6–10s | Cut to the Daily Challenge screen, "Today" calendar pops; 2 moves | A New Challenge Every Day |
| 10–13s | Near-complete daily board → last 3 moves → gold wave across the grid → trophy card | Can You Solve It? |
| 13–15s | End card: app icon, title, CTA (gentle pulse), availability line | Play Super Sudoku · **Install Now** |

### Video B: 30 seconds (`video_30s`)

| Time | Picture | On-screen text (EN) |
|---|---|---|
| 0–4s | Hook: macro close-up on an Expert board, slow push | Think You Can Solve This? |
| 4–9s | Pull out to the full phone; 4 moves of real gameplay | (brand lockup only) |
| 9–14s | Close-up on board + number pad: Notes on → 2–3 true candidates pencilled → Notes off → cell solved → another move | – |
| 14–19s | Easy → Medium → Hard → Expert: level cards highlight in turn while the phone's board changes density | Easy • Medium • Hard • Expert (active word lights up gold) |
| 19–24s | Daily Challenge screen + calendar; 2 moves | New Challenge Every Day |
| 24–27s | Final moves → gold completion wave → trophy card | Solved! |
| 27–30s | End card | Play Super Sudoku · **Install Now** |

The motion is smooth eased camera moves, short dips between screens and
subtle floating tiles. There are no flashes or aggressive transitions. Every
interaction is a legal move you could make in the game.

## 4. Localization

| Code | Language | Script / font | Direction |
|---|---|---|---|
| en | English | Poppins | LTR |
| hi | हिन्दी | Noto Sans Devanagari | LTR |
| gu | ગુજરાતી | Noto Sans Gujarati | LTR |
| mr | मराठी | Noto Sans Devanagari | LTR |
| ta | தமிழ் | Noto Sans Tamil | LTR |
| te | తెలుగు | Noto Sans Telugu | LTR |
| es | Español | Poppins | LTR |
| pt | Português | Poppins | LTR |
| fr | Français | Poppins | LTR |
| de | Deutsch | Poppins | LTR |
| id | Bahasa Indonesia | Poppins | LTR |
| ar | العربية | Cairo | **RTL** |

- **Only marketing text is localized:** the headline, supporting line, CTA,
  calendar label, level names and video captions. The brand name *Super
  Sudoku*, the layout, the phone and the in-phone app UI are identical everywhere.
- **The copy is transcreated, not machine-translated.** It uses natural
  advertising idiom for each market: Hindi "दिमाग की कसरत करें" ("give your
  brain a workout"), German "Trainiere deinen Kopf", French "Faites travailler
  vos neurones", and so on. The meaning stays fixed across languages.
  French uses a no-break space before `?` and `!`.
- **Arabic:** the whole composition is mirrored (copy on the right, phone on
  the left, CTA arrow pointing left, level order right to left). The app UI
  inside the phone deliberately stays left-to-right, as it is in the real
  app, so the number pad still reads 1→9.
- **Indic scripts:** the fonts are tuned for legibility, with no letter-spacing
  (which breaks shaping) and taller line height so matras and conjuncts never
  clip. Script-only font files carry no Latin glyphs, so the brand name and
  digits always render in Poppins, keeping the brand consistent.
- The full copy deck lives in `generator/copy.js` (image and video text) and
  `generator/text-assets.js` (Google Ads text assets).

### Google Ads text assets

`output/text_assets.csv` (UTF-8 with BOM, so it opens correctly in Excel)
contains 5 headlines (≤ 30 characters) and 5 descriptions (≤ 90 characters)
per language. Lengths are validated automatically. Every claim maps to a
feature documented on the Super Sudoku website: the Daily Challenge, 4
difficulty levels, notes/hints/undo, offline play, themes, statistics and
unique-solution puzzles.

## 5. Naming

`super_sudoku_[language]_[asset]_[format]`

```
super_sudoku_en_main_16x9.jpg
super_sudoku_hi_daily_challenge_1x1.jpg
super_sudoku_es_brain_challenge_9x16.jpg
super_sudoku_gu_difficulty_191x1.jpg
super_sudoku_ar_minimal_4x5.jpg
super_sudoku_en_video_15s_9x16.mp4
super_sudoku_hi_video_30s_16x9.mp4
```

Images are high-quality JPEG (quality 92, full 4:4:4 chroma so text and digits stay
crisp), about 150–350 KB each, well under Google's 5 MB limit.

## 6. Quality control

QC runs automatically on every render. The results are stored in
`output/qc-images.json` and `output/qc-videos.json`, and shown in the gallery.

| Check | How |
|---|---|
| Correct font for every text run, so no missing-glyph boxes and no fallback fonts | Chrome DevTools `CSS.getPlatformFontsForNode` on every headline, sub-line, CTA, label and caption: anything not in the approved font list fails |
| No overflowing or cropped text | Per-element overflow check, per-line bounds check, auto-fit font sizing |
| No overlapping text | Pairwise bounding-box test between all copy blocks, and between copy and phone |
| Safe margins | All copy ≥ 3% from every edge |
| Valid Sudoku | Solution validity, givens ⊂ solution, unique solution (build fails otherwise) |
| Legal gameplay | Every placed digit = solution value; notes = true candidates |
| Video specs | ffprobe: duration, resolution, frame rate and audio track for all 48 files |
| Text asset limits | ≤ 30 / ≤ 90 characters, validated per string |
| No misleading claims | No ratings, reviews, download counts, prices or "#1" claims anywhere |

Latest run: **300/300 images and 48/48 videos pass** (see the JSON reports).

## 7. Suggested Google Ads setup

1. Create one **App campaign (Installs)** per language market (or per language
   group within a region), targeting the matching language. For example, a
   Hindi campaign targets Hindi speakers in India.
2. In each campaign's ad group, upload:
   - **Images:** that language's `191x1`, `1x1` and `4x5` files for all 5
     concepts. Add `16x9` and `9x16` where the placement accepts them.
   - **Videos:** upload the 4 MP4s to YouTube (unlisted is fine) and add the
     links. Supply both 9:16 and 16:9 so Google can serve the best fit.
   - **Text:** the 5 headlines and 5 descriptions from `text_assets.csv`.
3. Keep the **Daily Challenge** concept and the **15s** video in every asset group.
   They carry the "play every day" retention message. After 2–3 weeks, use the
   asset report to retire "Low" performers.
4. Consider a later **App engagement** campaign for existing users, reusing the
   Daily Challenge assets.

## 8. Things to verify before launch

1. **In-app UI fidelity.** The source screenshots at
   `D:\Projects\Backup\sudoku backup\...\screenshots_source\` and
   `...\screenshots\phone\` are on your local machine and were **not
   reachable** from the cloud environment where this package was produced. The
   phone screen is instead a pixel-precise recreation built from this repo:
   the *Neon Pulse* theme tokens (`tailwind.config.ts`), the web board
   (`components/SudokuBoard.tsx`), the launcher icon and the documented
   features. Compare it with the real app: if labels, icons or layout differ
   (for example the tool row, the "Mistakes" counter, or the "Daily Challenge"
   header), adjust `gameScreen()` in `generator/shared.js` and re-render.
   Everything regenerates in one command.
2. **Native-speaker review.** The copy was written natively per language, but
   have a native speaker in each market proofread the 12 copy decks
   (`generator/copy.js`, `generator/text-assets.js`) before spending. Pay particular
   attention to the Indic languages and Arabic.
3. **Feature claims.** The text assets mention offline play, themes, notes,
   hints, undo and statistics, which are taken from the website's feature list.
   Remove any line that doesn't match the current app build.

## 9. Regenerating

Requirements: Node 18+, ffmpeg and ImageMagick (`convert`) on PATH.

```bash
cd marketing/google-ads/generator
npm install
npx playwright install chromium

npm run text      # validate + export text assets
npm run images    # 300 images + QC   (≈ 3 min)
npm run videos    # 48 videos         (≈ 60–70 min on 4 cores; --workers N)
npm run qc        # video QC + rebuild the gallery
```

Useful flags: `--lang en,hi`, `--concept daily`, `--format 1x1`, `--kind 15s`,
and `node render-videos.js --preview 1.5,8,12.6` (PNG stills for quick review).

| File | Role |
|---|---|
| `copy.js` | Localized marketing copy + font stacks per script |
| `text-assets.js` | Google Ads headlines/descriptions + length validation |
| `sudoku.js` | Seeded puzzle generator + validity/uniqueness verification |
| `shared.css` / `shared.js` | Design system: background, phone, game UI, CTA, cards |
| `ad.html` + `render-images.js` | Static compositions + render/QC loop |
| `video.html` + `render-videos.js` | Frame-accurate video timelines + H.264 encode |
| `audio.js` | Procedural music bed and UI sounds synced to the timeline |
| `qc-videos.js` / `gallery.js` | Video QC and the review gallery |
| `fonts/` | Bundled OFL fonts (offline, deterministic rendering) |
