import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#050505',
        surface: '#0a0a0a',
        card: '#0f0f0f',
        border: 'rgba(255,255,255,0.06)',
        cyan: '#00e5ff',
        purple: '#7c3aed',
        green: '#00ff41',
        muted: '#64748b',
        text: '#e2e8f0',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee-slow 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'availability': 'availability-pulse 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'breathe': 'breathe 3s ease-in-out infinite',
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
