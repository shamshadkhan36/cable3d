/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#06080c',
        foreground: '#e9edf3',
        copper: '#e8843a',
        'copper-light': '#ffb46b',
        volt: '#3d8bff',
        graphite: '#0b0e13',
        silver: '#c9d0d8',
        'surface-card': '#0b0e13',
        'surface-elevated': '#12171f',
        'border-subtle': 'rgba(255, 255, 255, 0.08)',
        'border-light': 'rgba(255, 255, 255, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Barlow Condensed"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        widest: '0.25em',
        ultra: '0.35em',
      }
    },
  },
  plugins: [],
}
