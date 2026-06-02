// -----------------------------------------------------------------------------
// Central site configuration: brand, links, marketing content, SEO defaults.
// Edit content here once and it propagates across every page/component.
// -----------------------------------------------------------------------------

export const SITE = {
  name: "Super Sudoku",
  tagline: "Play Free Sudoku Online & On Mobile",
  description:
    "Play free Sudoku online in your browser — easy, medium, hard & expert puzzles with notes, hints, undo and a daily challenge. Or download the Super Sudoku app for Android.",
  url: "https://elixir-7482e.web.app",
  locale: "en_US",
  twitter: "@supersudoku",
  email: "piyushglsict@gmail.com",
  playPackage: "com.elixir.sudoku.puzzlegame",
  playUrl:
    "https://play.google.com/store/apps/details?id=com.elixir.sudoku.puzzlegame",
  rating: 4.7,
  ratingCount: "12,000+",
  ogImage: "/images/feature_graphic.png",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/play/", label: "Play Online" },
  { href: "/features/", label: "Features" },
  { href: "/blog/", label: "Blog" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export const STATS = [
  { value: 100000, suffix: "+", label: "Downloads" },
  { value: 5000, suffix: "+", label: "Daily Players" },
  { value: 4, suffix: "", label: "Difficulty Levels" },
  { value: 100, suffix: "%", label: "Offline Capable" },
];

export const WHY_CHOOSE = [
  {
    icon: "Sparkles",
    title: "Premium Game Design",
    body: "The same polished board, themes and animations as our top-rated Android app — now in your browser.",
  },
  {
    icon: "Gauge",
    title: "Blazing Fast",
    body: "Built for performance with instant load times, smooth interactions and a 95+ Lighthouse score.",
  },
  {
    icon: "WifiOff",
    title: "Play Offline",
    body: "Install the app and solve puzzles anywhere — no connection required, ever.",
  },
  {
    icon: "Brain",
    title: "Train Your Brain",
    body: "Daily logic practice that sharpens focus, memory and problem-solving skills.",
  },
  {
    icon: "Palette",
    title: "Beautiful Themes",
    body: "Eight hand-crafted themes from Neon Pulse to Sakura — match your mood.",
  },
  {
    icon: "Trophy",
    title: "Compete & Achieve",
    body: "Google Play Games leaderboards, achievements and streaks keep you coming back.",
  },
];

export const FEATURES = [
  { icon: "CalendarDays", title: "Daily Challenge", body: "A fresh hand-picked puzzle every single day with global leaderboards." },
  { icon: "BarChart3", title: "Statistics Tracking", body: "Track win rate, best times, streaks and progress across every difficulty." },
  { icon: "Palette", title: "Multiple Themes", body: "Eight premium themes with light and dark variants for comfortable play." },
  { icon: "Save", title: "Auto Save", body: "Never lose progress — every move is saved instantly and restored on return." },
  { icon: "PencilLine", title: "Notes Mode", body: "Pencil in candidates just like on paper to plan your toughest moves." },
  { icon: "Lightbulb", title: "Smart Hints", body: "Stuck? Reveal a logical next step without spoiling the whole board." },
  { icon: "Award", title: "Achievements", body: "Unlock 14+ achievements from First Puzzle to Sudoku Legend." },
  { icon: "Gamepad2", title: "Play Games Integration", body: "Sign in with Google Play Games to sync scores and climb leaderboards." },
  { icon: "WifiOff", title: "Offline Play", body: "The full game works with zero internet connection." },
  { icon: "TrendingUp", title: "Progress Tracking", body: "Watch your solving speed and accuracy improve over time." },
];

export const TESTIMONIALS = [
  { name: "Aarav M.", role: "Daily player", quote: "The cleanest Sudoku I've played. The daily challenge is now part of my morning routine.", stars: 5 },
  { name: "Sophie L.", role: "Puzzle enthusiast", quote: "Love the themes and how smooth everything feels. Notes mode is exactly like pen and paper.", stars: 5 },
  { name: "Daniel K.", role: "Commuter", quote: "Offline play is a lifesaver on the subway. Hints are genuinely helpful, not cheaty.", stars: 5 },
  { name: "Priya S.", role: "Brain-training fan", quote: "My solve times have dropped noticeably. The stats tracking keeps me motivated.", stars: 5 },
];

export const FAQS = [
  {
    q: "Is Super Sudoku free to play?",
    a: "Yes. You can play unlimited Sudoku puzzles for free online in your browser, and the Android app is a free download.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is needed to play online. In the app you can optionally sign in with Google Play Games to sync leaderboards and achievements.",
  },
  {
    q: "Can I play Sudoku offline?",
    a: "The Android app works fully offline. The web version runs entirely in your browser and generates puzzles locally.",
  },
  {
    q: "What difficulty levels are available?",
    a: "Four levels: Easy, Medium, Hard and Expert. Every puzzle is generated with a guaranteed unique solution.",
  },
  {
    q: "Is there a daily challenge?",
    a: "Yes — the app features a new daily challenge puzzle each day with global leaderboards and streak tracking.",
  },
  {
    q: "Does the web version save my progress?",
    a: "Yes, your current game is auto-saved in your browser so you can pick up where you left off.",
  },
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  readMins: number;
  category: string;
  // Body is an array of {heading?, paragraphs[]} blocks for simple SSG rendering.
  body: { heading?: string; paragraphs: string[] }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "sudoku-tips-for-beginners",
    title: "10 Sudoku Tips Every Beginner Should Know",
    excerpt:
      "New to Sudoku? These ten beginner-friendly techniques will take you from frustrated to confident in no time.",
    date: "2026-05-20",
    readMins: 6,
    category: "Sudoku Tips",
    body: [
      {
        paragraphs: [
          "Sudoku looks intimidating at first, but it is built on a handful of simple, repeatable techniques. Master these and you will solve most easy and medium puzzles without ever guessing.",
        ],
      },
      {
        heading: "1. Scan rows, columns and boxes",
        paragraphs: [
          "Start by scanning each number 1-9 and looking for rows, columns or 3x3 boxes where it can only go in one place. This 'cross-hatching' technique alone cracks most easy puzzles.",
        ],
      },
      {
        heading: "2. Use pencil marks (notes)",
        paragraphs: [
          "When a cell could hold more than one number, jot down all the candidates. In Super Sudoku, tap Notes mode to do this digitally. As you eliminate options, the answer often becomes obvious.",
        ],
      },
      {
        heading: "3. Look for naked singles",
        paragraphs: [
          "A naked single is a cell with only one possible candidate left. Fill these in immediately — they frequently trigger a chain reaction of further solves.",
        ],
      },
      {
        heading: "4. Don't guess — deduce",
        paragraphs: [
          "Good Sudoku is never about luck. Every move should be backed by logic. If you find yourself guessing, slow down and re-scan; the clue is always there.",
        ],
      },
    ],
  },
  {
    slug: "advanced-sudoku-strategies",
    title: "Advanced Sudoku Strategies: X-Wing and Swordfish",
    excerpt:
      "Ready to conquer expert puzzles? Learn the X-Wing and Swordfish techniques that separate casual solvers from masters.",
    date: "2026-05-28",
    readMins: 8,
    category: "Strategies",
    body: [
      {
        paragraphs: [
          "Once basic scanning stops working on hard and expert puzzles, it's time to add pattern-based techniques to your toolkit. Two of the most powerful are the X-Wing and the Swordfish.",
        ],
      },
      {
        heading: "The X-Wing",
        paragraphs: [
          "An X-Wing forms when a candidate appears in exactly two cells in two different rows, and those cells share the same two columns. That candidate can then be eliminated from the rest of those columns.",
        ],
      },
      {
        heading: "The Swordfish",
        paragraphs: [
          "The Swordfish is the X-Wing's bigger sibling, extending the pattern across three rows and three columns. It's rarer but devastatingly effective on expert-level grids.",
        ],
      },
    ],
  },
  {
    slug: "sudoku-brain-training-benefits",
    title: "Can Sudoku Really Train Your Brain? The Science",
    excerpt:
      "Does solving Sudoku actually make you smarter? We look at what research says about puzzles and cognitive health.",
    date: "2026-06-01",
    readMins: 5,
    category: "Brain Training",
    body: [
      {
        paragraphs: [
          "Sudoku is often marketed as 'brain training', but what does the evidence actually show? The honest answer: it's a genuinely good workout for specific skills.",
        ],
      },
      {
        heading: "What Sudoku improves",
        paragraphs: [
          "Regular puzzle solving is associated with better working memory, sustained attention and logical reasoning. The act of holding candidates in mind while scanning the grid exercises the same circuits used in planning and focus.",
        ],
      },
      {
        heading: "Make it a habit",
        paragraphs: [
          "Like any training, consistency matters more than intensity. A single daily puzzle — exactly what our Daily Challenge provides — is a sustainable way to keep your mind sharp.",
        ],
      },
    ],
  },
];
