import localFont from "next/font/local";
import { Inter } from "next/font/google";

export const monolisa = localFont({
  src: [
    {
      path: "../public/fonts/MonoLisa-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/MonoLisa-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-monolisa",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
