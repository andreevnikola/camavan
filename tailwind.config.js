/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#AB5852",
        "dark-transparenty": "rgba(122, 122, 122, 0.3)",
        danger: "red",
        "base-100": "#EADAA0",
        "base-200": "#D49C47",
        secondary: "#838469",
        tertiary: "#4A6369",
        contrasty: "#1c1c1c",
      },
    },
  },
  plugins: [],
};
