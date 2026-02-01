/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/**/*.css"
  ],
  
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        text: "var(--text)",
        grape: "var(--grape)",
        oak: "var(--oak)",
        cork: "var(--cork)",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      boxShadow: {
        vin: '0 4px 12px rgba(120, 40, 60, 0.4)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
    },
  },
safelist: [
  {
    pattern: /hover:scale-\[1\.05\]/,
  },
  "bg-background",
  "bg-accent",
  "bg-muted",
  "bg-text",
  "bg-grape",
  "bg-oak",
  "bg-cork",
  "text-text",
  "text-accent",
  "hover:text-accent",
  "hover:text-text",
  "shadow-vin",
  "animate-fade-in-up",
  "hover:shadow-vin",
  "w-[100px]",
  "max-h-[120px]",
  "opacity-0",
  "delay-75",
  "delay-100",
  "delay-150",
  "delay-200",
  "delay-300",
],
  plugins: [],
}

