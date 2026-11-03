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
          DEFAULT: "#C2185B",
          dark: "#880E4F",
          soft: "#FCE4EC",
        },
        navy: {
          950: "#4A0E2E",
          900: "#880E4F",
          800: "#AD1457",
          700: "#C2185B",
          600: "#D81B60",
          500: "#EC407A",
          200: "#F8BBD0",
          100: "#FCE4EC",
          50: "#FFF5F8",
        },
        teal: {
          950: "#4A0E2E",
          900: "#880E4F",
          800: "#AD1457",
          700: "#C2185B",
          600: "#D81B60",
          500: "#EC407A",
          100: "#FCE4EC",
        },
        coral: {
          DEFAULT: "#EC407A",
          dark: "#C2185B",
        },
        blush: {
          DEFAULT: "#F48FB1",
          soft: "#FCE4EC",
        },
        ink: {
          DEFAULT: "#2A1520",
          soft: "#4A3040",
          mute: "#7A5A68",
        },
        paper: {
          DEFAULT: "#FFF7FA",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(194, 24, 91, 0.28)",
        lift: "0 18px 50px -18px rgba(42, 21, 32, 0.28)",
        tablet: "0 40px 80px -28px rgba(42, 21, 32, 0.45), 0 0 0 1px rgba(255,255,255,0.08)",
      },
    },
  },
  plugins: [],
};
