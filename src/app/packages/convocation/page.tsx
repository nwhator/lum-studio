import React from "react";
import { Metadata } from "next";
import PackageTemplate from "@/components/packages/package-template";

export const metadata: Metadata = {
  title: "Convocation Photography Packages - Lum Studios",
  description: "Professional graduation photography packages to celebrate your academic achievement",
};

const ConvocationPackagePage = () => {
  const packages = [
    {
      name: "Classic Graduation Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-10.jpg",
      price: "$449",
      description: "Perfect for graduation day. Includes 2-hour coverage, 40 edited photos, and digital gallery access."
    },
    {
      name: "Walk-In Graduation Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-11.jpg",
      price: "$699",
      description: "Complete graduation experience with 4-hour coverage, 80+ edited photos, family group shots, and custom album."
    }
  ];

  const reviews = [
    {
      name: "Dr. Folake Adeyemi",
      rating: 5,
      comment: "Perfect capture of my PhD graduation! The photographer understood the significance of the moment and delivered exceptional results.",
      date: "October 2024"
    },
    {
      name: "Michael Ogundimu",
      rating: 5,
      comment: "Professional service from start to finish. The graduation photos are beautiful and will be treasured by our entire family.",
      date: "September 2024"
    },
    {
      name: "Grace Nnamdi",
      rating: 5,
      comment: "Exceeded expectations! Every important moment was captured - from the procession to the celebrations with family.",
      date: "August 2024"
    }
  ];

  const faqs = [
    {
      question: "Can you photograph both indoor and outdoor ceremonies?",
      answer: "Yes! We're equipped for all types of graduation venues, from indoor auditoriums to outdoor campus ceremonies, with professional lighting equipment."
    },
    {
      question: "Do you capture the entire graduation ceremony?",
      answer: "We photograph key moments including the procession, degree conferment, family celebrations, and any special recognitions or speeches."
    },
    {
      question: "Can multiple family members book together?",
      answer: "Absolutely! We offer group discounts for families with multiple graduates or extended family coverage during the same ceremony."
    },
    {
      question: "What if the weather affects an outdoor ceremony?",
      answer: "We're prepared for all weather conditions and will adapt our photography approach to ensure beautiful photos regardless of conditions."
    },
    {
      question: "Do you provide photos for social media sharing?",
      answer: "Yes! We provide both high-resolution photos for printing and web-optimized versions perfect for social media announcements."
    }
  ];

  return (
    <PackageTemplate
      heroTitle="Convocation Photography Packages"
      heroDescription="Mark this significant academic milestone with professional graduation photography. From the ceremony proceedings to joyful celebrations with loved ones, we capture every proud moment."
      categoryName="Convocation"
      packages={packages}
      reviews={reviews}
      faqs={faqs}
      heroBackgroundImage="/assets/img/inner-project/portfolio-col-2/port-10.jpg"
    />
  );
};

export default ConvocationPackagePage;