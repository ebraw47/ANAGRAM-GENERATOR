/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E6FFF",
          dark: "#0B4FD6",
          soft: "#123056",
        },
        navy: {
          950: "#02060D",
          900: "#050B16",
          800: "#0B1F3A",
          700: "#123056",
          600: "#1E6FFF",
          500: "#4DA3FF",
          200: "#9EC5FF",
          100: "#C9DEFF",
          50: "#E8F1FF",
        },
        teal: {
          950: "#02060D",
          900: "#050B16",
          800: "#0B1F3A",
          700: "#123056",
          600: "#1E6FFF",
          500: "#4DA3FF",
          100: "#123056",
        },
        /** Light text for dark black/blue surfaces */
        ink: {
          DEFAULT: "#F2F6FF",
          soft: "#C5D4EC",
          mute: "#8FA6C9",
        },
        /** Page background = near-black blue */
        paper: {
          DEFAULT: "#050B16",
          card: "#0B1F3A",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        game: ["var(--font-game)", "var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(30, 111, 255, 0.28)",
        lift: "0 18px 50px -18px rgba(2, 6, 13, 0.55)",
        tablet: "0 40px 80px -28px rgba(2, 6, 13, 0.65), 0 0 0 1px rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};
