import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Maternity Photoshoot Packages & Pricing | LUM Studios Nigeria",
  description: "Affordable and luxury maternity photoshoot packages in Ile-Ife, Nigeria. Includes styling assistance, retouched digital images, gown choices, and canvas wall prints.",
  keywords: [
    "maternity photoshoot packages Nigeria",
    "maternity shoot price Ile-Ife",
    "pregnancy photography packages",
    "maternity studio shoot Osun",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/packages/maternity",
  },
  openGraph: {
    title: "Maternity Photoshoot Packages & Pricing | LUM Studios",
    description: "Celebrate motherhood with beautiful, timeless maternity portraits at LUM Studios.",
    url: "https://www.thelumstudios.com/packages/maternity",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Maternity Packages - LUM Studios",
      },
    ],
  },
};

export default function MaternityPackageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
