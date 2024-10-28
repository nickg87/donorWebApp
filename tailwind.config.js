/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        md: '10px', // Define the blur amount you want
      },
      colors: {
        lightBorder: 'rgba(225, 231, 246, 0.5)',  // Light mode border color
        darkBorder: 'rgba(17, 26, 81, 0.95)',    // Dark mode border color
      },
      boxShadow: {
        lightTheme: '0px 4px 6px rgba(75, 86, 112, 0.2)', // Adjust for light theme
        darkTheme: '0px 6px 8px rgba(0, 0, 0, 0.8)',      // Adjust for dark theme
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
