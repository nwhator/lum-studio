import type { Metadata, Viewport } from "next";
import keywords from "@/data/seo-keywords.json";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Syne, Marcellus } from "next/font/google";
import localFont from "next/font/local";
import { ToastProvider } from "@/components/ui/toast";
// import GlobalErrorHandler from "@/components/global-error-handler";
import PageLoader from "@/components/loaders/page-loader";
// import ChunkLoadErrorHandler from "@/components/chunk-load-error-handler";
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

// Consolidated Syne font
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
  title: "LUM Studios - Professional Photography & Videography in Nigeria",
  description: "Founded in 2020, LUM Studios is a premier creative photography and videography studio in Ile-Ife, Nigeria. We specialize in luxury weddings, maternity, baby shoots, professional portraits, convocation, call to bar, and special events. Capturing moments, creating timeless stories.",
  url: "https://www.thelumstudios.com",
  ogImage: "https://www.thelumstudios.com/assets/img/logo/logo-bg.webp",
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#B7C435",
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
  alternates: {
    canonical: siteConfig.url,
  },
  
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
  
  // Icons
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  
  // Manifest
  manifest: "/manifest.webmanifest",

  // Localized Geotargeting for Search Engines
  other: {
    "geo.region": "NG-OS",
    "geo.placename": "Ile-Ife",
    "geo.position": "7.4905;4.5521",
    "ICBM": "7.4905, 4.5521",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema for Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "LUM Studios",
    "alternateName": "LUM Photography Studios",
    "url": siteConfig.url,
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.thelumstudios.com/assets/img/logo/logo.webp",
      "width": "600",
      "height": "600"
    },
    "image": "https://www.thelumstudios.com/assets/img/logo/logo.webp",
    "sameAs": [
      "https://www.facebook.com/share/1VahucgBSv/?mibextid=wwXIfr",
      "https://www.instagram.com/lumphotographystudios/",
      "https://www.tiktok.com/@lumphotographystudios",
      "https://wa.me/2348145538164"
    ]
  };

  // JSON-LD Schema for WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LUM Studios",
    "url": siteConfig.url,
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.thelumstudios.com/gallery?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // JSON-LD Schema for Local Professional Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "LUM Studios",
    "alternateName": "LUM Photography Studios",
    "description": siteConfig.description,
    "url": siteConfig.url,
    "logo": "https://www.thelumstudios.com/assets/img/logo/logo.webp",
    "image": siteConfig.ogImage,
    "telephone": ["+2348065407503", "+2348145538164"],
    "email": "lummedia01@gmail.com",
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
    "areaServed": [
      { "@type": "State", "name": "Osun State" },
      { "@type": "City", "name": "Ile-Ife" },
      { "@type": "City", "name": "Lagos" },
      { "@type": "City", "name": "Ibadan" },
      { "@type": "Country", "name": "Nigeria" }
    ],
    "sameAs": [
      "https://www.facebook.com/share/1VahucgBSv/?mibextid=wwXIfr",
      "https://www.instagram.com/lumphotographystudios/",
      "https://www.tiktok.com/@lumphotographystudios",
      "https://wa.me/2348145538164"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Photography & Videography Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wedding Photography & Videography",
            "description": "Luxury full-day wedding photography, pre-wedding shoots, photobooks, and drone coverage."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Maternity Photography",
            "description": "Artistic, elegant maternity and pregnancy photoshoot sessions in studio or outdoors."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Baby & Newborn Photography",
            "description": "Delicate and creative newborn, 6-month, and 1st birthday milestone baby shoots."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Professional Portraits & Headshots",
            "description": "Executive corporate headshots, fashion portraits, birthday shoots, and creative studio portraits."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Convocation & Call to Bar Photography",
            "description": "Commemorative graduation and Call to Bar studio and outdoor photography sessions."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Event Photography & Cinematography",
            "description": "Corporate events, inaugurations, naming ceremonies, anniversaries, and concerts."
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
      </head>
      <body
        id="body"
        suppressHydrationWarning={true}
        className={`${gellery.variable} ${syne.variable} ${marcellus.variable}`}
      >
        {/* <ChunkLoadErrorHandler /> */}
        <PageLoader />
        {/* <GlobalErrorHandler /> */}
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
      {/* WebSite Schema for Search Box */}
      <Script
        id="website-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
