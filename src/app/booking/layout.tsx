import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Photography & Event Coverage | LUM Studios Nigeria",
  description: "Book your studio photoshoot or event photography session with LUM Studios in Ile-Ife, Nigeria. Instant booking for portraits, weddings, maternity, convocation, baby shoots, and events.",
  keywords: [
    "book photography session Nigeria",
    "photoshoot booking Ile-Ife",
    "wedding photography booking Nigeria",
    "studio session booking",
    "maternity shoot booking",
    "convocation photoshoot booking",
    "LUM Studios booking",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/booking",
  },
  openGraph: {
    title: "Book Photography & Event Coverage | LUM Studios",
    description: "Select your package, choose your date and time slot, and reserve your session instantly with LUM Studios.",
    url: "https://www.thelumstudios.com/booking",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Book a Photography Session - LUM Studios",
      },
    ],
  },
};

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
