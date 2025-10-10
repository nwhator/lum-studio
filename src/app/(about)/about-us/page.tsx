import React from "react";
import { Metadata } from "next";
import AboutUsMain from "@/pages/about/about-us";

export const metadata: Metadata = {
  title: "About - Lum Studios | Professional Photography Studio",
  description: "Learn about Lum Studios - Nigeria's best photography studio. We specialize in capturing life's precious moments through weddings, portraits, maternity, and event photography.",
  keywords: ["about lum studios", "professional photography Nigeria", "photography studio Ile-Ife", "wedding photographers", "portrait photographers"],
};

const AboutUsPage = () => {
  return (
    <AboutUsMain/>
  );
};

export default AboutUsPage;
