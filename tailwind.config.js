import { heroui } from '@heroui/theme'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,js,jx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
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
        'theme-text-default': 'rgb(var(--color-theme-text-default) / <alpha-value>)',
        'theme-text-on-primary': 'rgb(var(--color-theme-text-on-primary) / <alpha-value>)',
        'theme-text-title': 'rgb(var(--color-theme-text-title) / <alpha-value>)',
        'theme-text-hover': 'rgb(var(--color-theme-text-hover) / <alpha-value>)',
        'bg-flow-color': 'var(--bg-flow-color)',
      }
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
}

module.exports = config