// tailwind.config.cjs

/** @type {import('tailwindcss').Config} */
module.exports = {
  // ← Enable toggling dark mode via the `.dark` class
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryLight: '#f5f7fa',
        headerGradient: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
        accent: {
          400: '#34d399',
          600: '#059669',
        },
      },
    },
  },
  plugins: [
    // (any other plugins you use, e.g. forms, aspect-ratio)
  ],
};