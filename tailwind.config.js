/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glass: '0 8px 32px 0 rgba(15, 23, 42, 0.37)',
      },
      colors: {
        electric: '#38bdf8',
        emeraldsoft: '#34d399',
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
