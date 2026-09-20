import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maternity & Baby Photography Studio in Nigeria | LUM Studios",
  description: "Celebrate new beginnings with artistic maternity and newborn photography at LUM Studios in Ile-Ife. Safe, comfortable, and beautifully styled shoots.",
  keywords: [
    "maternity photography Nigeria",
    "baby photoshoot Ile-Ife",
    "newborn photography studio",
    "pregnancy photoshoot Nigeria",
    "cake smash photoshoot",
    "baby milestone photos",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/service/maternity-baby-shoots",
  },
  openGraph: {
    title: "Maternity & Baby Photography Studio | LUM Studios",
    description: "Heartwarming maternity and baby photoshoot sessions in a modern and comfortable studio.",
    url: "https://www.thelumstudios.com/service/maternity-baby-shoots",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Maternity and Baby Photography - LUM Studios",
      },
    ],
  },
};

export default function MaternityBabyServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
