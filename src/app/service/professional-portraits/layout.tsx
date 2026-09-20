import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Professional Portraits & Corporate Headshots | LUM Studios Nigeria",
  description: "High-end portrait photography, executive headshots, fashion portfolios, and family portraits at LUM Studios in Ile-Ife, Nigeria.",
  keywords: [
    "professional portrait photography Nigeria",
    "corporate headshots Nigeria",
    "studio portraits Ile-Ife",
    "birthday photoshoot Nigeria",
    "fashion model portfolio",
    "family portraits studio",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/service/professional-portraits",
  },
  openGraph: {
    title: "Professional Portraits & Corporate Headshots | LUM Studios",
    description: "Executive headshots and creative studio portraits crafted with master lighting and retouching.",
    url: "https://www.thelumstudios.com/service/professional-portraits",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "Professional Portraits - LUM Studios",
      },
    ],
  },
};

export default function PortraitsServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
