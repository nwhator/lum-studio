import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Call to Bar Photography Packages in Nigeria | LUM Studios",
  description: "Distinguished legal attire and Call to Bar photoshoot packages at LUM Studios. Capture your proud induction to the Nigerian Bar with high-definition legal portraits and frames.",
  keywords: [
    "call to bar photography Nigeria",
    "call to bar photoshoot",
    "lawyer graduation photoshoot Nigeria",
    "nigerian bar photoshoot",
    "call to bar studio packages",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/packages/call-to-bar",
  },
  openGraph: {
    title: "Call to Bar Photography Packages | LUM Studios",
    description: "Honour your admission to the Nigerian Bar with prestigious legal portraits by LUM Studios.",
    url: "https://www.thelumstudios.com/packages/call-to-bar",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Call to Bar Packages - LUM Studios",
      },
    ],
  },
};

export default function CallToBarPackageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
