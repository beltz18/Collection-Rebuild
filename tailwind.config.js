import { heroui } from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,js,jx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
				'primary': 'var(--primary)',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config