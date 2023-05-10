/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: '#343a5e',
        blue: '#1E40AF',
        'light-blue': '#3B82F6',
        brown: '#AC8B54',
        'light-brown': '#4C453C'
      }
    }
  },
  plugins: []
};
