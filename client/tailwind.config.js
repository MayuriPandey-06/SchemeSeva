/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#3b82f6',
          DEFAULT: '#1e40af',
          dark: '#1e3a8a',
        },
        navy: {
          light: '#1e293b',
          DEFAULT: '#0f172a',
          dark: '#020617',
        },
        gov: {
          blue: '#002e5b',
          accent: '#0056b3',
          light: '#f8fafc',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gov-gradient': 'linear-gradient(135deg, #002e5b 0%, #0056b3 100%)',
      }
    },
  },
  plugins: [],
}
