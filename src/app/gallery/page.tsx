import React from "react";
import { Metadata } from "next";
import PortfolioGridColThreeMain from "@/pages/portfolio/gallery-main";

export const metadata: Metadata = {
  title: "Gallery - Lum Studios | Photography Portfolio",
  description: "Explore Lum Studios' photography portfolio showcasing our work in weddings, maternity, baby shoots, family portraits, and special events across Nigeria.",
  keywords: ["photography portfolio", "wedding photos Nigeria", "maternity photography gallery", "family portrait samples", "photography showcase"],
};

const PortfolioGridColThreePage = () => {
  return (
    <PortfolioGridColThreeMain/>
  );
};

export default PortfolioGridColThreePage;
