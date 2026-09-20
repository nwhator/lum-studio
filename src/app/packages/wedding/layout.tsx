import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Photography Packages & Pricing | LUM Studios Nigeria",
  description: "Explore LUM Studios wedding photography & videography packages in Nigeria. Standard, Classic, and Luxury packages with full-day coverage, photo albums, and drone cinematography.",
  keywords: [
    "wedding photography packages Nigeria",
    "wedding photographer prices Osun",
    "wedding photography cost Nigeria",
    "traditional wedding packages",
    "luxury wedding photobook Nigeria",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/packages/wedding",
  },
  openGraph: {
    title: "Wedding Photography Packages & Pricing | LUM Studios",
    description: "Transparent wedding coverage packages tailored to your dream wedding in Nigeria.",
    url: "https://www.thelumstudios.com/packages/wedding",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Wedding Packages - LUM Studios",
      },
    ],
  },
};

export default function WeddingPackageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
