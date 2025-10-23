/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",       // App Router pages
    "./src/components/**/*.{js,ts,jsx,tsx}", // Components
    "./src/pages/**/*.{js,ts,jsx,tsx}",      // Optional: If you also have Pages Router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
