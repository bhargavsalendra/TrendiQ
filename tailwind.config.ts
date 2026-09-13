import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#2b2a32",
        muted: "#746f7c",
        paper: "#f6f3ee",
        line: "#e7e1d8",
        lavender: {
          50: "#f4f0ff",
          200: "#d9cff5",
          400: "#a48ddc",
          500: "#7c64c8",
          600: "#654fb0"
        }
      },
      boxShadow: {
        card: "0 14px 40px rgba(43, 42, 50, 0.08)",
        soft: "0 5px 18px rgba(43, 42, 50, 0.06)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
