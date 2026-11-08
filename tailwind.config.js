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
          DEFAULT: "#E85D04",
          dark: "#C44D03",
          soft: "#FFE8D6",
        },
        navy: {
          950: "#0C0E12",
          900: "#151820",
          800: "#1E2330",
          700: "#2A3142",
          600: "#E85D04",
          500: "#F48C3C",
          200: "#FFD4B0",
          100: "#FFE8D6",
          50: "#FFF6EF",
        },
        teal: {
          950: "#0C0E12",
          900: "#151820",
          800: "#1E2330",
          700: "#2A3142",
          600: "#E85D04",
          500: "#F48C3C",
          100: "#FFE8D6",
        },
        ink: {
          DEFAULT: "#14161C",
          soft: "#3A3F4A",
          mute: "#6B7280",
        },
        paper: {
          DEFAULT: "#D8DFE9",
          card: "#FFFFFF",
          warm: "#E8EEF5",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 36px -16px rgba(232, 93, 4, 0.28)",
        lift: "0 20px 48px -24px rgba(20, 22, 28, 0.22)",
        tablet: "0 28px 60px -28px rgba(20, 22, 28, 0.16), 0 0 0 1px rgba(20, 22, 28, 0.06)",
      },
    },
  },
  plugins: [],
};
