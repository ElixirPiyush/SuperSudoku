import type { Config } from "tailwindcss";

/**
 * Brand tokens are sourced directly from the Super Sudoku Android app's default
 * "Neon Pulse" theme (lib/core/app_themes.dart) so web + app stay consistent.
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
        // Core brand palette (Neon Pulse)
        brand: {
          DEFAULT: "#4FC3F7",
          50: "#E3F7FF",
          100: "#C7EEFF",
          200: "#97D9FF",
          300: "#8BE7FF",
          400: "#4FC3F7",
          500: "#0AB6FF",
          600: "#0891D6",
          700: "#0670A8",
          800: "#054F75",
          900: "#053352",
        },
        ink: {
          DEFAULT: "#061229",
          800: "#0C2B4F",
          700: "#0D2748",
          600: "#102040",
          500: "#1B3354",
          400: "#264D7D",
        },
        surface: {
          DEFAULT: "#0D1C34",
          card: "#102040",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #4FC3F7 0%, #0AB6FF 100%)",
        "ink-gradient": "linear-gradient(160deg, #061229 0%, #0C2B4F 100%)",
        "glow-radial":
          "radial-gradient(circle at 50% 0%, rgba(79,195,247,0.25), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(79,195,247,0.35)",
        "glow-sm": "0 0 20px rgba(79,195,247,0.25)",
        card: "0 10px 40px -10px rgba(0,0,0,0.5)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
