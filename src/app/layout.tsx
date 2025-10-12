import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Syne, Marcellus } from "next/font/google";
import localFont from "next/font/local";
import "./globals.scss";

// Optimized font loading with display swap and preload
const gellery = localFont({
  src: "../../public/assets/fonts/gallerymodern-webfont.woff2",
  weight: "400",
  style: "normal",
  variable: "--tp-ff-gallery",
  display: "swap",
  preload: true,
});

// Consolidated Syne font (was imported 5 times!)
const syne = Syne({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--tp-ff-syne",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Marcellus for elegant headings
const marcellus = Marcellus({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--tp-ff-marcellus",
  display: "swap",
  fallback: ["georgia", "serif"],
});

// Site Configuration
const siteConfig = {
  name: "LUM Studios",
  title: "LUM Studios - Professional Photography & Videography",
  description: "Founded in 2020, LUM Studio is a creative photography and videography brand in Ile-Ife, Nigeria. We specialize in weddings, portraits, maternity, baby shoots, convocation, call to bar, and special events. Capturing moments, creating stories.",
  url: "https://www.thelumstudios.com",
  ogImage: "https://www.thelumstudios.com/assets/img/logo/logo-bg.jpg",
  keywords: [
    "photography studio Nigeria",
    "wedding photography Ile-Ife",
    "professional photographer Nigeria",
    "maternity photography",
    "baby photoshoot",
    "portrait photography",
    "convocation photography",
    "call to bar photography",
    "event photography Nigeria",
    "LUM Studios",
    "photography services Osun",
    "professional videography Nigeria",
    "drone photography Nigeria"
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "LUM Studios", url: siteConfig.url }],
  creator: "LUM Studios",
  publisher: "LUM Studios",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "LUM Studios - Professional Photography & Videography",
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@lumphotographystudios",
  },
  
  // Additional Meta
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
  
  // Icons
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  
  // Manifest
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "LUM Studios",
    "alternateName": "LUM Photography Studios",
    "description": siteConfig.description,
    "url": siteConfig.url,
    "logo": "https://www.thelumstudios.com/assets/img/logo/logo.png",
    "image": siteConfig.ogImage,
    "telephone": "+2349022292514",
    "email": "contact@thelumstudios.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ile-Ife",
      "addressRegion": "Osun State",
      "addressCountry": "Nigeria"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "7.4905",
      "longitude": "4.5521"
    },
    "priceRange": "₦₦-₦₦₦",
    "openingHours": "Mo-Sa 09:00-18:00",
    "sameAs": [
      "https://www.facebook.com/share/1VahucgBSv/?mibextid=wwXIfr",
      "https://www.instagram.com/lumphotographystudios/",
      "https://www.tiktok.com/@lumphotographystudios",
      "https://wa.me/2349022292514"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photography Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding Photography",
            "description": "Professional wedding photography and videography services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Maternity Photography",
            "description": "Beautiful maternity and pregnancy photography"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Baby Photography",
            "description": "Newborn and baby photography sessions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Portrait Photography",
            "description": "Professional portrait and family photography"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Photography",
            "description": "Convocation, call to bar, and event photography"
          }
        }
      ]
    }
  };

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        id="body"
        suppressHydrationWarning={true}
        className={`${gellery.variable} ${syne.variable} ${marcellus.variable}`}
      >
      {children}
      <Analytics mode="production" />
      <SpeedInsights />
      </body>
    </html>
  );
}
