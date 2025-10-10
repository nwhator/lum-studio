import React from "react";
import { Metadata } from "next";
import PackageTemplate from "@/components/packages/package-template";

export const metadata: Metadata = {
  title: "Maternity Photography Packages - Lum Studios",
  description: "Beautiful maternity photography packages to celebrate your pregnancy journey. Professional studio and walk-in maternity photoshoot options available.",
  keywords: ["maternity photography", "pregnancy photoshoot", "maternity portraits Nigeria", "pregnancy photography packages", "expecting mother photos"],
};

const MaternityPackagePage = () => {
  const packages = [
    {
      name: "Classic Maternity Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-16.jpg",
      price: "$349",
      description: "Beautiful maternity session. Includes 1-hour session, 25 edited photos, and digital gallery access."
    },
    {
      name: "Walk-In Maternity Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-17.jpg",
      price: "$599",
      description: "Complete maternity experience with 2-hour session, 50+ edited photos, partner/family shots, and custom album."
    }
  ];

  const reviews = [
    {
      name: "Bukola & Tunde",
      rating: 5,
      comment: "Absolutely stunning maternity photos! The photographer made me feel beautiful and comfortable throughout the entire session.",
      date: "November 2024"
    },
    {
      name: "Chioma Eze",
      rating: 5,
      comment: "Professional and artistic approach to maternity photography. The photos perfectly capture this special time in our lives.",
      date: "October 2024"
    },
    {
      name: "Fatima & Ibrahim",
      rating: 5,
      comment: "Beautiful, elegant photos that celebrate the miracle of pregnancy. We couldn't be happier with the results!",
      date: "September 2024"
    }
  ];

  const faqs = [
    {
      question: "When is the best time for a maternity shoot?",
      answer: "The ideal time is between 28-36 weeks when your bump is prominent but you're still comfortable moving around. We can discuss timing based on your preferences."
    },
    {
      question: "Do you provide maternity gowns and props?",
      answer: "Yes! We have a collection of elegant maternity gowns, flowing fabrics, and props. You're also welcome to bring personal items that are meaningful to you."
    },
    {
      question: "Can my partner and children be included?",
      answer: "Absolutely! We love capturing the whole family welcoming the new addition. Partners and siblings make the photos even more special and meaningful."
    },
    {
      question: "Do you offer both studio and outdoor sessions?",
      answer: "Yes! We can photograph in our studio with professional lighting or at beautiful outdoor locations. We'll help you choose based on your vision and comfort."
    },
    {
      question: "What should I wear for the session?",
      answer: "Form-fitting clothing that shows your beautiful bump works best. We'll provide a style guide with suggestions and have gowns available during the session."
    }
  ];

  return (
    <PackageTemplate
      heroTitle="Maternity Photography Packages"
      heroDescription="Celebrate the beauty and wonder of pregnancy with elegant maternity photography. Capture this magical time as you prepare to welcome your little miracle into the world."
      categoryName="Maternity Portrait"
      packages={packages}
      reviews={reviews}
      faqs={faqs}
      heroBackgroundImage="/assets/img/inner-project/portfolio-col-2/port-16.jpg"
    />
  );
};

export default MaternityPackagePage;