module.exports = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      tight: ["Mont", "sans-serif"],
      body: ["Roboto", "sans-serif"],
      display: ["Mont", "sans-serif"],
    },

    extend: {
      colors: {
        dark: "#121213",
        light: "#E17CFD",
        primary: "#6DBFFF",
      },
    },
  },
  plugins: [],
};
