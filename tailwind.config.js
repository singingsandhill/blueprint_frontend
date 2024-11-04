/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: "#002842",
        midBlue: "#0E429D",
        lightBlue: "#C1D5F9",
      },
    },
  },
  plugins: [],
};
