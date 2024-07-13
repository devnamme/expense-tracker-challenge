/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.sky["200"],
          DEFAULT: colors.sky["500"],
          dark: colors.sky["700"],
        },
        gray: {
          light: colors.gray["200"],
          DEFAULT: colors.gray["400"],
          dark: colors.gray["700"],
        },
        error: colors.red["500"],
      },
    },
  },
  plugins: [],
};
