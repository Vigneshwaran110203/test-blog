 /** @type {import('tailwindcss').Config} */
 export default {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#303F9F",
        secondary: "#7986CB",
        tertiary: "#c5cae9",
        background: "#F4F6F8",
        black_color: "#333333",
        white_color: "#FFFFFF",
        gray_color: "#424242",
        download: "rgba(197, 202, 233, 0.18)",
      },
      screens: {
        large: "1600px",
      },
    },
  },
  plugins: [],
}