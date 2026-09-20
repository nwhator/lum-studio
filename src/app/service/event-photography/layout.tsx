import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Photography & Cinematography in Nigeria | LUM Studios",
  description: "Professional event coverage for corporate conferences, inaugurations, burials, convocations, anniversaries, and concerts across Osun State and Nigeria.",
  keywords: [
    "event photography Nigeria",
    "corporate event photographer",
    "burial photography Osun",
    "inauguration photographer",
    "convocation ceremony photography",
    "conference videography Nigeria",
    "LUM Studios events",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/service/event-photography",
  },
  openGraph: {
    title: "Event Photography & Cinematography Services | LUM Studios",
    description: "High-impact event photography and videography for corporate and social celebrations in Nigeria.",
    url: "https://www.thelumstudios.com/service/event-photography",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Event Photography - LUM Studios",
      },
    ],
  },
};

export default function EventServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
