import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        primary: "#89CFF0",
        secondary: "#FF6F61",
        primaryLight: "#B0E0E6",
        secondaryLight: "#FFA07A",
        accent: "#FDF6EC"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
