/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "spotify-green": "#1DB954",
        "spotify-dark-gray": "#121212",
        "spotify-light-black": "#282828",
        "spotify-white": "#FFFFFF",
        "spotify-gray": "#B3B3B3",
      },
      fontFamily: {
        sans: ['"Circular Std"', "sans-serif"], // Example Spotify font - you might need to load this
      },
    },
  },
  plugins: [],
};
