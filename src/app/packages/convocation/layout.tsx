import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convocation & Graduation Photography Packages | LUM Studios Ile-Ife",
  description: "Celebrate your academic victory with LUM Studios graduation and convocation photography in Ile-Ife (OAU). Solo graduation portraits, family photos, and gown sessions.",
  keywords: [
    "convocation photography Ile-Ife",
    "OAU convocation photoshoot",
    "graduation photoshoot Nigeria",
    "convocation packages prices",
    "OAU graduation studio",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/packages/convocation",
  },
  openGraph: {
    title: "Convocation & Graduation Photography Packages | LUM Studios",
    description: "Mark your graduation milestone with iconic convocation photos at LUM Studios.",
    url: "https://www.thelumstudios.com/packages/convocation",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Convocation Packages - LUM Studios",
      },
    ],
  },
};

export default function ConvocationPackageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
