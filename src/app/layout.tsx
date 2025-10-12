import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Syne, Marcellus } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";

// Optimized font loading with display swap and preload
const gellery = localFont({
  src: "../../public/assets/fonts/gallerymodern-webfont.woff2",
  weight: "400",
  style: "normal",
  variable: "--tp-ff-gallery",
  display: "swap",
  preload: true,
});

// Consolidated Syne font (was imported 5 times!)
const syne = Syne({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-syne",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Marcellus for elegant headings
const marcellus = Marcellus({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--tp-ff-marcellus",
  display: "swap",
  fallback: ["georgia", "serif"],
});

export const metadata: Metadata = {
  title: "Lum Studios - We illuminate you",
  description: "Professional photography studio specializing in weddings, portraits, maternity, baby shoots, and special events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        id="body"
        suppressHydrationWarning={true}
        className={`${gellery.variable} ${syne.variable} ${marcellus.variable}`}
      >
      {children}
      <Analytics mode="production" />
      <SpeedInsights />
      </body>
    </html>
  );
}
