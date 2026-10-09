import type { Config } from "tailwindcss";

/**
 * Brand tokens come from the Super Sudoku app's default theme
 * (lib/core/design/app_colors.dart in the app): royal blue, navy, cyan and a
 * gold accent used for league, stars and rewards. `brand`, `ink` and
 * `surface` keep their old names so the online game (/play/) re-skins
 * without touching its logic.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#003BDF", // app royal
          50: "#EAF0FA", // app mist
          100: "#D6E2FB",
          200: "#AFC5F7",
          300: "#7FA2F2",
          400: "#4A7BEE",
          500: "#2563EB", // app royalBright
          600: "#003BDF",
          700: "#002AC2", // app royalDeep
          800: "#0B2A8F",
          900: "#0B1446", // app navy
        },
        ink: {
          DEFAULT: "#050B24", // app darkBackground
          800: "#0B1A45",
          700: "#0B1446",
          600: "#12245A",
          500: "#1A2E6B",
          400: "#2A3C78",
        },
        surface: {
          DEFAULT: "#0B1A45",
          card: "#12245A",
        },
        gold: {
          DEFAULT: "#FEC404",
          50: "#FFF8DB",
          100: "#FFEFAD",
          400: "#FED33F",
          500: "#FEC404",
          700: "#8A6500", // app goldDeep (text on light)
        },
        cyan: { DEFAULT: "#01BEFB", 600: "#0089B8" },
        page: "#F5F8FF", // app lightBackground
        slate: { DEFAULT: "#4A5785" },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(1200px 500px at 85% -10%, rgba(1,190,251,0.22), transparent 60%), linear-gradient(160deg, #0B1446 0%, #0B2A8F 55%, #003BDF 100%)",
        "royal-gradient": "linear-gradient(135deg, #2563EB 0%, #003BDF 55%, #002AC2 100%)",
        "gold-gradient": "linear-gradient(135deg, #FFE27A 0%, #FEC404 60%, #F5A300 100%)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,20,70,0.06), 0 8px 24px -12px rgba(11,20,70,0.18)",
        lift: "0 20px 50px -20px rgba(11,20,70,0.45)",
        glow: "0 0 40px rgba(37,99,235,0.35)",
      },
      borderRadius: { "2xl": "1.25rem", "3xl": "1.75rem" },
    },
  },
  plugins: [],
};

export default config;
