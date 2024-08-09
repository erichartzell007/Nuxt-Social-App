/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./views/**/*.vue",
    "./forms/**/*.vue",
    // "./pages/auth/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#130F1F",
        secondary: "#436BF3",
        "gray-1": "#34303E",
        "gray-2": "#0F0D15",
        "primary-2": "#1C1F58",
        "secondary-2": "#BBBCCC",
        "purple-new": "#1C1F58",
        "light-primary": "#000037",
        "gray-900": "#26272E",
      },
    },
  },
  plugins: [],
};
