/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Complete zinc scale for neutrals
        zinc: {
          925: '#111113',
          950: '#09090b',
        },
        // Indigo accent (brand)
        indigo: {
          DEFAULT: '#6366f1',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in':    'fade-in 0.2s ease both',
        'fade-up':    'fade-up 0.25s ease both',
        'slide-in':   'slide-in 0.28s cubic-bezier(0.22, 1, 0.36, 1) both',
        'shimmer':    'shimmer 1.6s ease-in-out infinite',
        'pulse-dot':  'pulse-dot 2s ease-in-out infinite',
        'spin-slow':  'spin 0.7s linear infinite',
        'modal-in':   'modal-in 0.22s cubic-bezier(0.22, 1, 0.36, 1) both',
        'overlay-in': 'overlay-in 0.18s ease both',
        'toast-in':   'toast-in 0.25s cubic-bezier(0.22, 1, 0.36, 1) both',
        'toast-out':  'toast-out 0.2s ease forwards',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          from: { opacity: '0', transform: 'translateX(24px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-600px 0' },
          '100%': { backgroundPosition: '600px 0' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.75)' },
        },
        'modal-in': {
          from: { opacity: '0', transform: 'translateY(10px) scale(0.97)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'overlay-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'toast-in': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        'toast-out': {
          from: { opacity: '1', transform: 'translateX(0)' },
          to:   { opacity: '0', transform: 'translateX(16px)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        'soft-sm':  '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.24)',
        'soft-md':  '0 4px 16px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.2)',
        'soft-lg':  '0 12px 40px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)',
        'glow-indigo': '0 0 0 3px rgba(99,102,241,0.25)',
      },
    },
  },
  plugins: [],
};
