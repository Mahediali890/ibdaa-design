/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060D13',
          900: '#0C1821',
          800: '#152232',
          700: '#1E3044',
          600: '#274058',
          500: '#31516D',
        },
        accent: {
          DEFAULT: '#C9A96E',
          light: '#D9BE8E',
          dark: '#A88A50',
        },
        warm: '#F5F0EB',
        charcoal: {
          50: '#F5F5F5',
          100: '#E0E0E0',
          200: '#B0B0B0',
          300: '#808080',
          400: '#606060',
          500: '#404040',
          600: '#2C2C2C',
          700: '#1A1A1A',
          800: '#111111',
          900: '#0A0A0A',
        },
      },
      fontFamily: {
        display: ['"DM Sans"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        accent: ['"Playfair Display"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201,169,110,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201,169,110,0.6)' },
        },
      },
    },
  },
  plugins: [],
};
