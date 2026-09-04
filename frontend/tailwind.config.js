/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4B1FD6',   // 1Fi deep violet
          light:   '#EDE9FE',   // selected state bg
          dark:    '#3B0764',   // hover
          hero:    '#3B1FA8',   // hero banner bg
        },
        surface: '#FFFFFF',
        bg:      '#F5F3FF',     // app background — faint violet
        text: {
          primary:   '#18181B',
          secondary: '#71717A',
          muted:     '#A1A1AA',
        },
        border:  '#E4E4E7',
        success: '#16A34A',     // cashback green
        warning: '#EA580C',     // "0% EMI" badge — Snapmint orange
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
