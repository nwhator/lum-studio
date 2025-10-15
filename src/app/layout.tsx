import type { Metadata } from "next";
import keywords from "@/data/seo-keywords.json";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Syne, Marcellus } from "next/font/google";
import localFont from "next/font/local";
import { ToastProvider } from "@/components/ui/toast";
import GlobalErrorHandler from "@/components/global-error-handler";
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
  keywords: Array.from(new Set([
    "photography studio Nigeria",
    "wedding photography Ile-Ife",
    "professional photographer Nigeria",
    "maternity photography",
    "baby photoshoot",
    "portrait photography",
    "convocation photography",
    "call to bar photography",
    "event photography Nigeria",
    ...keywords
  ]))
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
  // JSON-LD Schema for Organization (for Google logo)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LUM Studios",
    "alternateName": "LUM Photography Studios",
    "url": siteConfig.url,
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.thelumstudios.com/assets/img/logo/logo.png",
      "width": "600",
      "height": "600"
    },
    "image": "https://www.thelumstudios.com/assets/img/logo/logo.png",
    "sameAs": [
      "https://www.facebook.com/share/1VahucgBSv/?mibextid=wwXIfr",
      "https://www.instagram.com/lumphotographystudios/",
      "https://www.tiktok.com/@lumphotographystudios",
      "https://wa.me/2349022292514"
    ]
  };

  // JSON-LD Schema for Local Business
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "LUM Studios",
    "alternateName": "LUM Photography Studios",
    "description": siteConfig.description,
    "url": siteConfig.url,
    "logo": "https://www.thelumstudios.com/assets/img/logo/logo.png",
    "image": siteConfig.ogImage,
    "telephone": ["+2348145538164", "+2349022292514"],
    "email": "contact@thelumstudios.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Opp. Hammedal Filling Station, Ilesha-Garage",
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
      </head>
      <body
        id="body"
        suppressHydrationWarning={true}
        className={`${gellery.variable} ${syne.variable} ${marcellus.variable}`}
      >
        <GlobalErrorHandler />
        <ToastProvider>
          {children}
        </ToastProvider>
      {/* Organization Schema for Google Logo */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Local Business Schema */}
      <Script
        id="local-business-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Analytics mode="production" />
      <SpeedInsights />
      </body>
    </html>
  );
}
