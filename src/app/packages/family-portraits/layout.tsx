import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Family Portrait Photography Packages | LUM Studios Nigeria",
  description: "Create enduring generational memories with LUM Studios family portrait packages in Ile-Ife. Group sessions, generational portraits, holiday photos, and customized wall art.",
  keywords: [
    "family portrait photography Nigeria",
    "family photoshoot Ile-Ife",
    "group portrait studio Osun",
    "family photoshoot packages Nigeria",
    "generational family photos",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/packages/family-portraits",
  },
  openGraph: {
    title: "Family Portrait Photography Packages | LUM Studios",
    description: "Capture the bonds of family with warm, luxury portraits at LUM Studios.",
    url: "https://www.thelumstudios.com/packages/family-portraits",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Family Portrait Packages - LUM Studios",
      },
    ],
  },
};

export default function FamilyPortraitsPackageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
