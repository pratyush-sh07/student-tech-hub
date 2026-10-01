/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'float-slow':    'floatUp 7s ease-in-out infinite',
        'float-medium':  'floatUp 5s ease-in-out infinite',
        'float-fast':    'floatUp 3.5s ease-in-out infinite',
        'float-reverse': 'floatDown 6s ease-in-out infinite',
        'pulse-glow':    'pulseGlow 4s ease-in-out infinite',
        'spin-slow':     'spin 20s linear infinite',
        'blob':          'blob 9s infinite',
      },
      keyframes: {
        floatUp: {
          '0%,100%': { transform:'translateY(0px)' },
          '50%':     { transform:'translateY(-14px)' },
        },
        floatDown: {
          '0%,100%': { transform:'translateY(0px)' },
          '50%':     { transform:'translateY(14px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity:'0.4', transform:'scale(1)' },
          '50%':     { opacity:'0.85', transform:'scale(1.1)' },
        },
        blob: {
          '0%':   { transform:'translate(0,0) scale(1)' },
          '33%':  { transform:'translate(25px,-35px) scale(1.1)' },
          '66%':  { transform:'translate(-20px,20px) scale(0.95)' },
          '100%': { transform:'translate(0,0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
