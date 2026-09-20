import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.thelumstudios.com";
  const now = new Date();

  // Core high-priority landing pages
  const coreRoutes = [
    { url: "", priority: 1.0, changeFrequency: "daily" as const },
    { url: "/booking", priority: 0.95, changeFrequency: "weekly" as const },
    { url: "/gallery", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/about-us", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/about-me", priority: 0.70, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.80, changeFrequency: "monthly" as const },
    { url: "/faq", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/training", priority: 0.75, changeFrequency: "monthly" as const },
  ];

  // Service landing pages
  const serviceRoutes = [
    { url: "/service/wedding-photography", priority: 0.90, changeFrequency: "weekly" as const },
    { url: "/service/event-photography", priority: 0.90, changeFrequency: "weekly" as const },
    { url: "/service/maternity-baby-shoots", priority: 0.90, changeFrequency: "weekly" as const },
    { url: "/service/professional-portraits", priority: 0.90, changeFrequency: "weekly" as const },
    { url: "/service", priority: 0.80, changeFrequency: "weekly" as const },
    { url: "/service-details", priority: 0.70, changeFrequency: "monthly" as const },
  ];

  // Pricing & package landing pages
  const packageRoutes = [
    { url: "/packages/wedding", priority: 0.90, changeFrequency: "weekly" as const },
    { url: "/packages/maternity", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/packages/baby-shoot", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/packages/convocation", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/packages/call-to-bar", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/packages/family-portraits", priority: 0.85, changeFrequency: "weekly" as const },
    { url: "/packages/general", priority: 0.85, changeFrequency: "weekly" as const },
  ];

  // Portfolio showcase pages
  const portfolioRoutes = [
    { url: "/portfolio-details-1", priority: 0.65, changeFrequency: "monthly" as const },
    { url: "/portfolio-details-2", priority: 0.65, changeFrequency: "monthly" as const },
    { url: "/portfolio-details-3", priority: 0.65, changeFrequency: "monthly" as const },
    { url: "/portfolio-custom-light", priority: 0.65, changeFrequency: "monthly" as const },
    { url: "/portfolio-showcase-details", priority: 0.65, changeFrequency: "monthly" as const },
  ];

  const allRoutes = [...coreRoutes, ...serviceRoutes, ...packageRoutes, ...portfolioRoutes];

  return allRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
