import React from "react";
import { Metadata } from "next";
import PortfolioShowcaseMain from "@/pages/portfolio/portfolio-showcase-main";

export const metadata: Metadata = {
  title: "Lum Studios - Portfolio Showcase page",
};

const PortfolioShowcasePage = () => {
  return (
    <PortfolioShowcaseMain/>
  );
};

export default PortfolioShowcasePage;
