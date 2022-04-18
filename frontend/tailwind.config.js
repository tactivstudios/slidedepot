module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      font: ["Inter", "sans-serif"],
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
