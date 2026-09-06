/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        minecraft: {
          green: '#55FF55',
          darkGreen: '#00AA00',
          dirt: '#866043',
          grass: '#5c8e32',
          stone: '#737373',
          gold: '#FFAA00',
          diamond: '#55FFFF',
          emerald: '#00AA00',
          obsidian: '#12101a',
        },
        surface: {
          DEFAULT: '#0f1117',
          card: '#161922',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(56, 189, 248, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        pixel: ['"Minecraftia"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
      },
      keyframes: {
        'border-beam': {
          '100%': {
            'offset-distance': '100%',
          },
        },
      }
    },
  },
  plugins: [],
}
