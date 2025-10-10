import React from "react";
import { Metadata } from "next";
import AboutMeMain from "@/pages/about/about-me";

export const metadata: Metadata = {
  title: "About - Lum Studios | Capturing your Moments",
  description: "Meet the creative force behind Lum Studios. Learn about our photographer's passion for capturing authentic moments and creating timeless memories.",
  keywords: ["photographer Nigeria", "professional photographer", "photography services", "about photographer", "lum studios team"],
};

const AboutMePage = () => {
  return (
    <AboutMeMain/>
  );
};

export default AboutMePage;
