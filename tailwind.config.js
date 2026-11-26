/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class', 'html:not(.light)'],
  theme: {
    extend: {
      colors: {
        lime: { DEFAULT: 'rgb(var(--acc) / <alpha-value>)' },
        ink: 'rgb(var(--ink) / <alpha-value>)',
        mut: 'rgb(var(--mut) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
