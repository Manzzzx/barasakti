// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Colors
        bara: {
          50: '#FEF7F0',
          100: '#FEEEE0',
          200: '#FDD5B8',
          300: '#FCBC90',
          400: '#FA8A40',
          500: '#FF6B35', // Primary
          600: '#E55A2B',
          700: '#CC4A21',
          800: '#B33A17',
          900: '#992A0D',
        },
        eco: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#16A34A', // Primary
          600: '#15803D',
          700: '#166534',
          800: '#14532D',
          900: '#0F3B26',
        },
        premium: {
          50: '#F8F8F8',
          100: '#F0F0F0',
          200: '#E8E8E8',
          300: '#D1D1D1',
          400: '#B4B4B4',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#1F1F1F',
          900: '#0F0F0F', // Primary
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config