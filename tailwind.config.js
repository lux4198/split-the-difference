/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-mantine-color-scheme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        text: "#081516",
        background: "#f1f9fa",
        primary: "#0e99ac",
        secondary: "#9fcbd1",
        accent: "#6c70c7",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
