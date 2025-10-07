import React from "react";
import { Metadata } from "next";
import PackageTemplate from "@/components/packages/package-template";

export const metadata: Metadata = {
  title: "Wedding Photography Packages - Lum Studios",
  description: "Professional wedding photography packages to capture your special day beautifully",
};

const WeddingPackagePage = () => {
  const packages = [
    {
      name: "Classic Wedding Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-4.jpg",
      price: "$1,299",
      description: "Perfect for intimate weddings. Includes 6-hour coverage, 200 edited photos, and online gallery."
    },
    {
      name: "Premium Wedding Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-5.jpg",
      price: "$2,499",
      description: "Complete wedding experience with 8-hour coverage, 400+ edited photos, engagement session, and wedding album."
    }
  ];

  const reviews = [
    {
      name: "Jessica & Mark",
      rating: 5,
      comment: "Our wedding photos are absolutely stunning! Every moment was captured perfectly. Thank you for making our day so special!",
      date: "June 2024"
    },
    {
      name: "Amanda & David",
      rating: 5,
      comment: "Professional, creative, and so easy to work with. The photos exceeded all our expectations!",
      date: "May 2024"
    },
    {
      name: "Lisa & James",
      rating: 5,
      comment: "Beautiful, artistic photos that tell the story of our wedding day perfectly. Couldn't be happier!",
      date: "April 2024"
    }
  ];

  const faqs = [
    {
      question: "How far in advance should we book?",
      answer: "We recommend booking 6-12 months in advance, especially for peak wedding season (May-October). Popular dates fill up quickly!"
    },
    {
      question: "Do you travel for destination weddings?",
      answer: "Yes! We love destination weddings. Travel fees may apply depending on location. Contact us for a custom quote."
    },
    {
      question: "What's included in the wedding packages?",
      answer: "All packages include professional editing, high-resolution digital gallery, and personal usage rights. Premium packages include prints and albums."
    },
    {
      question: "Can we meet before the wedding?",
      answer: "Absolutely! We recommend an engagement session to get comfortable with each other and discuss your vision for the wedding day."
    },
    {
      question: "How many photos will we receive?",
      answer: "You'll receive 200-400+ professionally edited photos depending on your package and wedding length. We never compromise on quality!"
    }
  ];

  return (
    <PackageTemplate
      heroTitle="Wedding Photography Packages"
      heroDescription="Your wedding day is one of life's most precious moments. Let us capture every laugh, tear, and joyful celebration with our professional wedding photography services."
      categoryName="Wedding"
      packages={packages}
      reviews={reviews}
      faqs={faqs}
      heroBackgroundImage="/assets/img/inner-project/portfolio-col-2/port-4.jpg"
    />
  );
};

export default WeddingPackagePage;