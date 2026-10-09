// -----------------------------------------------------------------------------
// Central site configuration. Every product fact on the site comes from here
// or lib/content.ts, and each one is taken from the app's code (supersudoku
// repo) or its Google Play listing. No ratings, download counts, testimonials
// or player statistics are shown: they change, and invented ones mislead.
// -----------------------------------------------------------------------------

export const SITE = {
  name: "Super Sudoku",
  /** The Google Play listing title. */
  storeTitle: "Super Sudoku: Classic Puzzle",
  tagline: "Daily Sudoku, Monthly League & Themes",
  description:
    "Super Sudoku for Android: Easy to Expert puzzles, a Daily Challenge, a Monthly League with a Top 100, nine themes and offline play. Free on Google Play.",
  url: "https://elixir-7482e.web.app",
  locale: "en_US",
  email: "elixirinfotechindia@gmail.com",
  developer: "Elixir Infotech",
  /** Publisher's office (shown on Support, About and the legal pages). */
  address: {
    street: "Office No. 317, One Way, Sadguru Arcade, Dhebar Rd, near Jivan Commercial Complex, Raghuveer Para, Lohana Para",
    city: "Rajkot",
    region: "Gujarat",
    postalCode: "360001",
    country: "IN",
  },
  phone: "+91 90168 81593",
  playPackage: "com.elixir.sudoku.puzzlegame",
  playUrl:
    "https://play.google.com/store/apps/details?id=com.elixir.sudoku.puzzlegame",
  ogImage: "/images/og-image.png",
};

/** One-line postal address, e.g. for the Contact page. */
export const ADDRESS_LINE = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}, India`;

/** `tel:` link for SITE.phone. */
export const PHONE_HREF = `tel:${SITE.phone.replace(/\s/g, "")}`;

/** Main navigation (header). */
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/features/", label: "Features" },
  { href: "/monthly-league/", label: "Monthly League" },
  { href: "/daily-challenge/", label: "Daily Challenge" },
  { href: "/themes/", label: "Themes" },
  { href: "/how-to-play/", label: "How to Play" },
  { href: "/faq/", label: "FAQ" },
];

/** Footer groups. */
export const FOOTER_LINKS = [
  {
    title: "The app",
    links: [
      { href: "/features/", label: "Features" },
      { href: "/monthly-league/", label: "Monthly League" },
      { href: "/daily-challenge/", label: "Daily Challenge" },
      { href: "/themes/", label: "Themes" },
    ],
  },
  {
    title: "Learn & play",
    links: [
      { href: "/how-to-play/", label: "How to Play" },
      { href: "/play/", label: "Play Online" },
      { href: "/blog/", label: "Blog" },
      { href: "/faq/", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about/", label: "About" },
      { href: "/contact/", label: "Support" },
      { href: "/privacy-policy/", label: "Privacy Policy" },
      { href: "/terms/", label: "Terms of Service" },
    ],
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
    title: "Sudoku as a Daily Habit: What It Does (and Doesn't) Do",
    excerpt:
      "What a daily Sudoku really practises, what it can't promise, and how to make it a habit you enjoy.",
    date: "2026-06-01",
    readMins: 4,
    category: "Daily Habit",
    body: [
      {
        paragraphs: [
          "Sudoku is often sold as 'brain training'. We prefer to be plain about it: Sudoku is a logic puzzle, and solving one practises the skills the puzzle itself uses. It is not a medical treatment and we make no health claims for it.",
        ],
      },
      {
        heading: "What you practise",
        paragraphs: [
          "Every grid asks you to scan rows, columns and boxes, keep a few candidate numbers in mind and rule options out step by step. Doing that regularly makes you faster and more systematic at Sudoku — the same way any game gets easier with practice.",
        ],
      },
      {
        heading: "Make it a habit",
        paragraphs: [
          "A short puzzle every day is easier to keep up than a long session once a week. That is the idea behind the Daily Challenge in the Super Sudoku app: one puzzle a day, the same for everyone, with a streak that grows when you come back tomorrow.",
        ],
      },
    ],
  },
];
