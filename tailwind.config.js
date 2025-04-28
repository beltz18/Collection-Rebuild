import { heroui } from '@heroui/theme'

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,js,jx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  safelist: [
    'bg-red-200', 'text-red-800',
    'bg-orange-200', 'text-orange-800',
    'bg-blue-200', 'text-blue-800',
    'bg-yellow-200', 'text-yellow-800',
    'bg-green-200', 'text-green-800',
    'bg-purple-200', 'text-purple-800',
    'bg-cyan-200', 'text-cyan-800',
    'bg-gray-200', 'text-gray-800',
    'bg-slate-200', 'text-gray-800',
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