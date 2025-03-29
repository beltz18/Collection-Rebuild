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
        'secondary': 'var(--secondary)',
        'white': 'var(--white)',
        'dark': 'var(--dark)',
        'gray': 'var(--gray)',
        'theme-primary': 'rgb(var(--color-theme-primary) / <alpha-value>)',
        'theme-secondary': 'rgb(var(--color-theme-secondary) / <alpha-value>)',
        'theme-background': 'rgb(var(--color-theme-background) / <alpha-value>)',
        'theme-text': 'rgb(var(--color-theme-text) / <alpha-value>)',
        'theme-hover': 'rgb(var(--color-theme-hover) / <alpha-value>)',
        'theme-hover-text': 'rgb(var(--color-theme-hover-text) / <alpha-value>)',
        'theme-popover': 'rgb(var(--color-theme-popover) / <alpha-value>)',
        'theme-popover-text': 'rgb(var(--color-theme-popover-text) / <alpha-value>)',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

module.exports = config