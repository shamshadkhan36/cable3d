/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#07090B',
        'surface-card': '#0D1117',
        'surface-elevated': '#12171F',
        'border-subtle': '#1B222C',
        'border-light': '#2A3644',
        'primary-text': '#F5F5F5',
        'secondary-text': '#9CA3AF',
        'accent-blue': '#168CFF',
        'accent-orange': '#FF7A18',
        'accent-blue-glow': 'rgba(22, 140, 255, 0.15)',
        'accent-orange-glow': 'rgba(255, 122, 24, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Syne', 'Inter', 'sans-serif'],
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
