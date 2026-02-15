/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#061523',
        'dark-bg-accent': '#071827',
        'dark-card': 'rgba(255, 255, 255, 0.02)',
        'dark-text': '#e8f2f7',
        'dark-muted': '#98acb7',
        'dark-input-bg': 'rgba(255, 255, 255, 0.03)',
        'dark-input-border': 'rgba(255, 255, 255, 0.04)',
        'accent-cyan': '#7dd3fc',
        'accent-contrast': '#012028',
        'error-red': '#ff6b6b',
      },
      backgroundImage: {
        'dark-gradient': 'linear-gradient(180deg, #061523 0%, #071827 100%)',
      },
      boxShadow: {
        'dark-card': '0 12px 40px rgba(3, 8, 18, 0.6)',
        'dark-button': '0 6px 18px rgba(4, 10, 16, 0.45)',
      },
      borderRadius: {
        'soft': '8px',
      },
    },
  },
  plugins: [],
}
