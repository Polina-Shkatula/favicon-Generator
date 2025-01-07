/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dev: '#EEE',
        staging: '#f0e68c',
        'gray-50': '#EEE',
        'gray-100': '#E7E9F0',
        'gray-700': '#374151',
        'blue-50': '#f0f9ff',
        'blue-200': '#6495ED',
        'violet-600': '#7C3AED',
        'yellow-50': '#FFF9C4',
        'yellow-500': '#D79E3A',
      },
    },
  },
  plugins: [],
}
