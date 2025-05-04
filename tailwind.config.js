/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"], // Added Montserrat font
      },
      backgroundImage: {
        "gray-gradient":
          "linear-gradient(0deg, rgba(249, 251, 252, 1) 0%, rgba(249, 251, 252, 0.6) 10%, rgba(134, 135, 136, 0) 50%)",
      },
      fontSize: {
        "fs-61": "clamp(3.0625rem, 2.8653rem + 0.986vw, 3.8125rem)",
        "fs-49": "clamp(2.4375rem, 2.2732rem + 0.8217vw, 3.0625rem)",
        "fs-39": "clamp(1.9375rem, 1.806rem + 0.6574vw, 2.4375rem)",
        "fs-31": "clamp(1.5625rem, 1.4639rem + 0.493vw, 1.9375rem)",
        "fs-25": "clamp(1.25rem, 1.1678rem + 0.4108vw, 1.5625rem)",
        "fs-20": "clamp(1rem, 0.9343rem + 0.3287vw, 1.25rem)",
        "fs-16": "clamp(0.8125rem, 0.7632rem + 0.2465vw, 1rem)",
        "fs-13": "clamp(0.625rem, 0.5757rem + 0.2465vw, 0.8125rem)",
        "fs-10": "clamp(0.5rem, 0.4671rem + 0.1643vw, 0.625rem)",
        "fs-8": "clamp(0.4375rem, 0.4211rem + 0.0822vw, 0.5rem)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
