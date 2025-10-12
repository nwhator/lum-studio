import { Metadata } from "next";
import HomeLum from "@/pages/homes/home";

export const metadata: Metadata = {
  title: "LUM Studios - Professional Photography & Videography in Nigeria",
  description: "Premium photography and videography services in Ile-Ife, Nigeria. Specializing in weddings, maternity, baby shoots, portraits, convocation, call to bar, and special events. 5+ years of experience, 500+ happy clients. Book your session today!",
  keywords: [
    "professional photography Nigeria",
    "wedding photographer Ile-Ife",
    "maternity photography Nigeria",
    "baby photography Osun",
    "family portraits Nigeria",
    "convocation photography",
    "call to bar photography",
    "event photography Nigeria",
    "photography studio Ile-Ife",
    "videography services Nigeria",
    "drone photography Nigeria",
    "LUM Studios"
  ],
  openGraph: {
    title: "LUM Studios - Professional Photography & Videography",
    description: "Capturing moments, creating stories. Premium photography services in Ile-Ife, Nigeria.",
    url: "https://www.thelumstudios.com",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.jpg",
        width: 1200,
        height: 630,
        alt: "LUM Studios - Professional Photography",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LUM Studios - Professional Photography & Videography",
    description: "Capturing moments, creating stories. Premium photography services in Ile-Ife, Nigeria.",
    images: ["https://www.thelumstudios.com/assets/img/logo/logo-bg.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <HomeLum />
    </>
  );
}