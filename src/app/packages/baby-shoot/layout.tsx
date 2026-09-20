import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby & Newborn Photoshoot Packages | LUM Studios Nigeria",
  description: "Cherish your baby's milestones with LUM Studios baby photoshoot packages in Ile-Ife. Newborn shoots, sitter sessions, and 1st birthday cake smash celebrations.",
  keywords: [
    "baby photoshoot packages Nigeria",
    "newborn photography prices",
    "cake smash photoshoot Ile-Ife",
    "baby studio photos Osun",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/packages/baby-shoot",
  },
  openGraph: {
    title: "Baby & Newborn Photoshoot Packages | LUM Studios",
    description: "Capture precious smiles with our safe and comfortable baby photography packages.",
    url: "https://www.thelumstudios.com/packages/baby-shoot",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Baby Shoot Packages - LUM Studios",
      },
    ],
  },
};

export default function BabyShootPackageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
