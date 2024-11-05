/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            playWrite: ["Playwrite GB S", "serif"],
         },
         colors: {
            logoGreen: "#b7d118",
            logoLightGreen: "#e4f57d",
            logoDarkGreen: "#85990d",
            primaryDark: "#0f172a",
            textDark: "white",
            textLight: "black",
         },
      },
   },
   plugins: [],
};
