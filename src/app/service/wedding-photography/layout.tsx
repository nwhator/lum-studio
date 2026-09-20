import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Photography & Videography Services in Nigeria | LUM Studios",
  description: "Capture the magic of your special day with LUM Studios. Luxury full-day wedding coverage, pre-wedding sessions, cinematic videography, and drone photography across Nigeria.",
  keywords: [
    "wedding photography Nigeria",
    "wedding photographer Ile-Ife",
    "wedding videography Nigeria",
    "pre-wedding photoshoot Nigeria",
    "traditional wedding photographer",
    "luxury wedding photography",
    "drone wedding photography",
    "cinematic wedding film",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/service/wedding-photography",
  },
  openGraph: {
    title: "Wedding Photography & Videography Services | LUM Studios",
    description: "Luxury wedding photography and cinematic videography in Nigeria. Capturing timeless love stories.",
    url: "https://www.thelumstudios.com/service/wedding-photography",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Wedding Photography - LUM Studios",
      },
    ],
  },
};

export default function WeddingServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
