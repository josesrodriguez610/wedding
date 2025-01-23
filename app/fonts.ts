import localFont from "next/font/local";

import { Roboto } from "next/font/google";

export const roboto = Roboto({
  subsets: ["latin"], // Use subsets like 'latin' for optimal performance
  weight: ["400", "700"], // Specify font weights you need
  variable: "--roboto",
});

export const canopee = localFont({
  src: "./assets/fonts/Canopee_Regular.otf", // Path relative to the `public` folder
  display: "swap",
  variable: "--font-canopee", // Define a CSS variable for the font
});

export const editorialNew = localFont({
  src: "./assets/fonts/Editorial-New-Regular-400.otf", // Path relative to the `public` folder
  display: "swap",
  variable: "--font-editorial-new", // Define a CSS variable for the font
});
