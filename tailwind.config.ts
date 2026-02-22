import animatePlugin from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // ← needed for App Router
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // ← if you have a src/ folder
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        main: "var(--main-color)",
        background: "var(--background-color)",
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
      borderRadius: {
        global: "var(--global-radius)",
        DEFAULT: "var(--radius)", // now "rounded" without anything = your 0.625rem
      },
    },
  },
  plugins: [animatePlugin],
};
