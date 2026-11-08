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
          DEFAULT: "#3F6B4B",
          dark: "#2F5238",
          soft: "#E7F0E9",
        },
        navy: {
          950: "#111311",
          900: "#1A1D1A",
          800: "#242824",
          700: "#333833",
          600: "#3F6B4B",
          500: "#5C8A66",
          200: "#C8D9CC",
          100: "#E7F0E9",
          50: "#F3F7F3",
        },
        teal: {
          950: "#111311",
          900: "#1A1D1A",
          800: "#242824",
          700: "#333833",
          600: "#3F6B4B",
          500: "#5C8A66",
          100: "#E7F0E9",
        },
        ink: {
          DEFAULT: "#161816",
          soft: "#3F4540",
          mute: "#6B726C",
        },
        paper: {
          DEFAULT: "#F4F1EA",
          card: "#FFFFFF",
          warm: "#FAF8F3",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 40px -24px rgba(63, 107, 75, 0.35)",
        lift: "0 24px 50px -28px rgba(22, 24, 22, 0.18)",
        tablet: "0 40px 80px -28px rgba(22, 24, 22, 0.35), 0 0 0 1px rgba(255,255,255,0.45) inset",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};
