/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./templates/**/*.html", "./static/**/*.js", "./static/**/*.css"],
  theme: {
    extend: {
      colors: {
        primary: "var(--main-color)",
        "site-bg": "var(--main-site-background)",
        "site-card": "var(--main-card-background)",
        "site-card-alt": "var(--main-card-second-background)",
        "text-primary": "var(--main-font-color)",
        "text-secondary": "var(--main-font-second-color)",
        "border-card": "var(--main-card-border)",
      },
      backgroundColor: {
        "site-card-80": "rgba(var(--main-card-background-rgb), 0.8)",
        "site-card-95": "rgba(var(--main-card-background-rgb), 0.95)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
