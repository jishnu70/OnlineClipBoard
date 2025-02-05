/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Scan these files for Tailwind classes
  theme: {
    extend: {
      colors: {
        // New theme colors:
        darkGreenBg: "#1a2b1a",   // A dark greenish background
        neonGreen: "#8fd19e",     // A bright, neon-like green for text and buttons
        forestGreen: "#2e4730",   // A deep green for text areas and inputs
        limeGreen: "#a8e063",     // A light green used on hover
        slateBg: "#1e1e1e",    // Dark slate gray background
        neonGreen: "#8fd19e",  // Neon green accent
        accent: "#3a3a3a",     // For subtle borders or secondary elements
        deepPurpleBg: "#1a0f2a",     // Dark deep purple background
        neonBlue: "#00eaff",         // Neon blue for accents
        vibrantViolet: "#6e44ff",    // Additional accent color (optional)
        textLight: "#f0f0f0",        // Light text color for readability
        accent: "#2a2a2a",           // A neutral accent for containers/borders
        darkCharcoalBg: "#121212",   // Deep, dark charcoal background
        neonMagenta: "#ff3cff",       // Neon magenta for accents (buttons, borders, etc.)
        accent: "#2a2a2a",           // A neutral accent for containers or subtle borders
        textLight: "#f0f0f0",         // Light text color for readability
        warmOrangeBg: "#fff3e0",
        deepTeal: "#00897b",
        creamAccent: "#ffcc80",
        darkBrownText: "#4e342e",
        lightLavenderBg: "#f3e5f5",
        mintAccent: "#a5d6a7",
        paleGray: "#cfd8dc",
        mediumGrayText: "#424242",
        
      },
    },
  },
  plugins: [],
};
