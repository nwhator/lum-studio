import React from "react";
import { Metadata } from "next";
import Script from "next/script";
import FaqMain from "@/pages/faq/faq-main";
import { faq_data } from "@/components/faq/faq-area";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | LUM Studios Nigeria",
  description: "Find answers to frequently asked questions about booking photoshoots, wedding packages, pricing, location in Ile-Ife, deposit policies, and turnaround times at LUM Studios.",
  keywords: [
    "LUM Studios FAQ",
    "photoshoot questions Nigeria",
    "wedding photography prices FAQ",
    "studio photoshoot turnaround time",
    "photography booking help Ile-Ife",
  ],
  alternates: {
    canonical: "https://www.thelumstudios.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions | LUM Studios",
    description: "Everything you need to know about booking photography sessions, wedding coverage, and studio shoots at LUM Studios.",
    url: "https://www.thelumstudios.com/faq",
    images: [
      {
        url: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
        width: 1200,
        height: 630,
        alt: "LUM Studios FAQ",
      },
    ],
  },
};

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq_data.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-page-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqMain />
    </>
  );
}
