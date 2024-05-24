const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#3498DB',
          200: '#007cbd',
          300: '#004079',
        },
        accent: {
          100: '#E74C3C',
          200: '#ffe6c7',
        },
        text: {
          100: '#333333',
          200: '#5c5c5c',
        },
        bg: {
          100: '#F4F4F4',
          200: '#eaeaea',
          300: '#c1c1c1',
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
