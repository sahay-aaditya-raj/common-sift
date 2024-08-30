/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':"#222222",
        'primaryHover':"#121212",
        'secondary':"#00ff00",
        'tertiary':"#0000ff",
        'background':"#222222",
        'error':"#fff000"
      },
    },
  },
  plugins: [],
};
