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
          soft: "#D6E8FF",
        },
        navy: {
          950: "#07111F",
          900: "#0B1F3A",
          800: "#123056",
          700: "#1A3F6B",
          600: "#1E6FFF",
          500: "#3B8EFF",
          200: "#9EC5FF",
          100: "#D6E8FF",
          50: "#EEF5FF",
        },
        teal: {
          950: "#07111F",
          900: "#0B1F3A",
          800: "#123056",
          700: "#1A3F6B",
          600: "#1E6FFF",
          500: "#3B8EFF",
          100: "#D6E8FF",
        },
        /** Body copy on light surfaces */
        ink: {
          DEFAULT: "#20242C",
          soft: "#3A3F4A",
          mute: "#6B7280",
        },
        /** Page / card surfaces */
        paper: {
          DEFAULT: "#F7F5F0",
          card: "#E8E5DD",
          warm: "#F7F5F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 12px 36px -16px rgba(30, 111, 255, 0.28)",
        lift: "0 20px 48px -24px rgba(11, 31, 58, 0.22)",
        tablet: "0 28px 60px -28px rgba(11, 31, 58, 0.18), 0 0 0 1px rgba(18, 48, 86, 0.06)",
      },
    },
  },
  plugins: [],
};
