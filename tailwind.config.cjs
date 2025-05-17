// tailwind.config.cjs
module.exports = {
  // use ONLY the "class" strategy—media will be handled in JS instead
  darkMode: 'class',

  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        primaryLight: '#f7f9fc',
        headerGradient: 'linear-gradient(90deg,#4f46e5,#3b82f6)',
        accent: {
          400: '#34d399',
          600: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};