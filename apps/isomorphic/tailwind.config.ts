import type { Config } from 'tailwindcss';
import sharedConfig from 'tailwind-config';

// Extend the type to include theme
const config: Config = {
  content: [
    './src/**/*.tsx',
    './node_modules/rizzui/dist/*.{js,ts,jsx,tsx}',
    '../../packages/isomorphic-core/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'rgb-gradient':
          '0 4px 15px rgba(255, 0, 0, 0.6), 0 4px 15px rgba(0, 255, 0, 0.6), 0 4px 15px rgba(0, 0, 255, 0.6)',
      },
      animation: {
        border: 'border 4s ease infinite',
      },
      keyframes: {
        border: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        custom: ['CustomFont', 'serif'],
        nunito: ['Nunito', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        openSans: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
  presets: [sharedConfig],
};

export default config;
