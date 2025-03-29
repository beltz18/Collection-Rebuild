const { heroui } = require("@heroui/react")

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
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