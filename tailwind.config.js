/** Tailwind v3.4 config (moved out of the HTML pages; same tokens as before). */
module.exports = {
  content: ["./*.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        brand: {
          dark: "#0B0D13",
          card: "#121622",
          border: "#1E2638",
          blue: "#2563EB",
          blueHover: "#1D4ED8",
          lightBlue: "#3B82F6",
        },
        // Section / card surfaces (were repeated as arbitrary hex values)
        surface: { 0: "#05070D", 1: "#070B14", 2: "#090F1C", 3: "#111B2D" },
      },
    },
  },
};
