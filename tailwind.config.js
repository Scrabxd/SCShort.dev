import plugin from 'tailwindcss/plugin';
import textFillStroke from 'tailwindcss-text-fill-stroke';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      fontFamily:{
        'inter-bold':['Inter-bold','Serif'],
        'inter':['Inter','Serif'],
        'Firma':['Firma','Serif'],
      },
      colors:{
        main:'#0B101B',
        secondary:'#0E131E',
        third:"#1C283F",
        border:"#181E29",
        button:"#144EE3",
        fondoCaja:"#181e2938"
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          'color': 'transparent',
        },
      });
    }),
    textFillStroke,
  ],
};

