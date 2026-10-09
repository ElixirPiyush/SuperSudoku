// -----------------------------------------------------------------------------
// Product content shared by several pages. Sources (supersudoku app repo):
// difficulties   lib/l10n/app_en.arb (play sheet texts)
// game rules     lib/core/constants.dart (3 mistakes allowed, 3 hints)
// themes         lib/core/app_themes.dart (9 themes; Super Sudoku has light + dark)
// league         functions/src/scoring.js, functions/src/league.js
// Versions: 1.0.22 is live on Google Play; 1.0.23 (league linked to Play
// Games, video before claiming a reward, Arabic) was sent for review on
// 2026-10-09. Anything that needs 1.0.23 says so.
// -----------------------------------------------------------------------------

export type Shot =
  | "home"
  | "game"
  | "league"
  | "themes"
  | "daily_result"
  | "daily_complete"
  | "awards"
  | "play_sheet";

export const SHOT_ALT: Record<Shot, string> = {
  home: "Super Sudoku home screen with the Daily Challenge card, Play Sudoku button, Monthly League rank, day streak and Quick Play difficulties",
  game: "Super Sudoku game screen on Easy: the 9×9 board, mistakes 0 of 3, timer, and Undo, Erase, Hint and Notes buttons",
  league: "Monthly League screen showing the October League monthly score, current rank, days completed, day streak and the month calendar",
  themes: "Themes screen with six theme cards: Super Sudoku, Neon Pulse, Glow Light, Classic, Ocean and Sakura",
  daily_result: "Daily result card: score 863 with three stars, time, mistakes, hints and how the score was earned",
  daily_complete: "Challenge Complete screen: today's score 1,150 with five stars, time, mistakes and hints, and the score breakdown",
  awards: "Awards screen with the total Sudoku Score, Daily Challenge Score and progress tiles",
  play_sheet: "Play Sudoku sheet: Continue a saved game or start Easy, Medium, Hard or Expert",
};

export const DIFFICULTIES = [
  { name: "Easy", tag: "Relaxed", body: "Perfect for beginners. Plenty of clues to get started.", color: "#16A34A" },
  { name: "Medium", tag: "Balanced", body: "A balanced challenge for casual players.", color: "#2563EB" },
  { name: "Hard", tag: "Challenging", body: "Fewer clues. Requires advanced techniques.", color: "#F59E0B" },
  { name: "Expert", tag: "For masters", body: "Minimal clues. Only for the brave.", color: "#D32F2F" },
];

export const GAME_TOOLS = [
  { title: "Notes", body: "Pencil in candidate numbers, just like on paper." },
  { title: "Undo & Erase", body: "Take back a move or clear a cell." },
  { title: "Hints", body: "Three hints per puzzle. Watch an optional short video for an extra one." },
  { title: "Mistake limit", body: "Three mistakes are allowed; a fourth ends the game." },
  { title: "Timer", body: "See how long each solve takes." },
  { title: "Auto-save", body: "Leave any time and continue where you left off." },
];

export interface ThemeInfo {
  id: string;
  name: string;
  note: string;
}

/** Image ids match public/images/themes/<id>-<w>.webp (real board captures). */
export const THEMES: ThemeInfo[] = [
  { id: "super-sudoku", name: "Super Sudoku", note: "The default look: royal blue and gold. Follows your phone's light mode…" },
  { id: "super-sudoku-dark", name: "Super Sudoku (dark)", note: "…and switches to deep navy when your phone is in dark mode." },
  { id: "neon-pulse", name: "Neon Pulse", note: "Dark navy with electric-blue lines." },
  { id: "glow-light", name: "Glow Light", note: "Bright and airy with sky-blue accents." },
  { id: "classic", name: "Classic", note: "Clean white with fresh green highlights." },
  { id: "ocean", name: "Ocean", note: "Calm sea teal." },
  { id: "sakura", name: "Sakura", note: "Soft cherry-blossom pink." },
  { id: "midnight", name: "Midnight", note: "Dark navy with gold lines." },
  { id: "lavender", name: "Lavender", note: "Gentle violet tones." },
  { id: "monochrome", name: "Monochrome", note: "Pure black and white, no distractions." },
];

// ---- Monthly League (functions/src/scoring.js) ------------------------------

export const SCORE_PARTS = [
  { label: "Completion", value: "+500", body: "Every finished Daily Challenge." },
  { label: "Speed", value: "up to +300", body: "Faster solves earn more, measured against the puzzle's difficulty." },
  { label: "Accuracy", value: "up to +200", body: "200 with no mistakes, then 130, 70 and 20. Mistakes also reduce the speed points." },
  { label: "Hints", value: "−80, −100, …", body: "The first hint costs 80 points, each further hint 20 more." },
  { label: "Difficulty", value: "×1.00 – ×1.30", body: "Easy ×1.00, Medium ×1.15, Hard ×1.30." },
];

export const REWARD_TIERS = [
  { rank: "#1", reward: "30 days ad-free" },
  { rank: "#2 – 3", reward: "14 days ad-free" },
  { rank: "#4 – 10", reward: "7 days ad-free" },
  { rank: "#11 – 25", reward: "3 days ad-free" },
  { rank: "#26 – 100", reward: "1 day ad-free" },
  { rank: "Everyone else", reward: "A monthly badge" },
];

/**
 * Example leaderboard for the Monthly League page. Invented names and
 * numbers, shaped like the app's Top 100 and always labelled "sample data".
 */
export const SAMPLE_LEADERBOARD = [
  { rank: 1, name: "Player 7KQ2X", flag: "🇮🇳", score: 21480 },
  { rank: 2, name: "SudokuFan", flag: "🇩🇪", score: 20915 },
  { rank: 3, name: "Player M4T9A", flag: "🇧🇷", score: 20640 },
  { rank: 4, name: "GridWalker", flag: "🇺🇸", score: 19870 },
  { rank: 5, name: "Player Q8ZL1", flag: "🇮🇩", score: 19310 },
];

// ---- FAQ ------------------------------------------------------------------------

export interface Faq {
  id: string;
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    id: "what-is",
    q: "What is Super Sudoku?",
    a: "Super Sudoku is a free Sudoku game for Android by Elixir Infotech. It has four difficulty levels, a Daily Challenge, a Monthly League with a Top 100, nine themes, statistics, achievements and streaks. It is available in English and 10 other languages, with Arabic added in version 1.0.23.",
  },
  {
    id: "download",
    q: "How do I download the game?",
    a: "Get it free on Google Play: search for \"Super Sudoku: Classic Puzzle\" or use the Download button on this site. The app is for Android; there is no iPhone version.",
  },
  {
    id: "difficulty",
    q: "What difficulty levels are available?",
    a: "Easy, Medium, Hard and Expert. Easy has plenty of clues for beginners; Expert has minimal clues. Daily Challenge puzzles are Easy, Medium or Hard, depending on the day.",
  },
  {
    id: "daily",
    q: "What is the Daily Challenge?",
    a: "One new puzzle every day, the same for every player. You get a score and a 1–5 star rating for it, and it counts toward your day streak and the Monthly League. Starting it needs an internet connection so the result can count.",
  },
  {
    id: "league",
    q: "How does the Monthly League work?",
    a: "Each completed Daily Challenge earns a Daily Score. Your Monthly Score is your 20 best Daily Scores plus 30 points for every day you played, so one bad day never lowers it. Everyone who plays the Daily Challenge that month is ranked, and the Top 100 is visible in the app. A new league starts on the 1st of every month.",
  },
  {
    id: "ranking",
    q: "How are player rankings calculated?",
    a: "Highest Monthly Score first. If two players have the same score, the one who reached it earlier ranks higher. Scores are calculated on our server from your time, mistakes and hints, and the app cannot send its own score.",
  },
  {
    id: "rewards",
    q: "What do the monthly rewards give me?",
    a: "Ad-free time in the app: 30 days for #1, 14 days for #2–3, 7 days for #4–10, 3 days for #11–25 and 1 day for #26–100. Everyone else gets a monthly badge. Rewards are claimed in the app after the month ends; there are no cash or physical prizes.",
  },
  {
    id: "offline",
    q: "Can I play offline?",
    a: "Yes. Regular Easy, Medium, Hard and Expert puzzles work without an internet connection. The Daily Challenge and the Monthly League need a connection.",
  },
  {
    id: "themes",
    q: "How do themes work?",
    a: "Open Themes in the app, tap a theme to preview it, then apply it. There are nine themes; the default Super Sudoku theme follows your phone's light or dark mode. In the latest version, applying a new theme asks you to watch a short video first (no video while you have league ad-free time).",
  },
  {
    id: "progress",
    q: "Will I lose my league score if I reinstall the app?",
    a: "From version 1.0.23, your Monthly League progress is tied to your Google Play Games account: sign in to Play Games on the new install and your score, rank and rewards come back. Statistics and settings stored only on the phone are not restored.",
  },
  {
    id: "ads",
    q: "Is Super Sudoku free? Are there ads?",
    a: "The game is free and supported by ads. Some extras — a bonus hint, a new theme, the Top 100 list — are unlocked by a short video that you choose to watch. League ad-free rewards switch ads off for their duration.",
  },
  {
    id: "web",
    q: "Can I play on this website?",
    a: "Yes, there is a free browser version on the Play Online page with all four difficulty levels. The Daily Challenge, Monthly League, themes and achievements are in the Android app only.",
  },
  {
    id: "support",
    q: "How do I contact support?",
    a: "Email elixirinfotechindia@gmail.com. Please include your phone model, Android version and the app version (Settings → About in the app).",
  },
];
