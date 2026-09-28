import type { Config } from "tailwindcss";

// Every color points at a CSS variable in globals.css, so hex codes live in one place only.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // rgb(var(...) / <alpha-value>) is Tailwind's documented pattern for CSS-variable colors
        // that still support opacity modifiers like bg-primary/50 or text-dark/80.
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        background: "rgb(var(--color-background) / <alpha-value>)",
        dark: "rgb(var(--color-dark) / <alpha-value>)",
        light: "rgb(var(--color-light) / <alpha-value>)",
        ink: "rgb(var(--color-text) / <alpha-value>)",
        muted: "rgb(var(--color-muted) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
