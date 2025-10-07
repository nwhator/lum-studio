import React from "react";
import { Metadata } from "next";
import PackageTemplate from "@/components/packages/package-template";

export const metadata: Metadata = {
  title: "Baby Shoot Packages - Lum Studios",
  description: "Professional baby photography packages to capture your little one's precious moments",
};

const BabyShootPackagePage = () => {
  const packages = [
    {
      name: "Classic Baby Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-1.jpg",
      price: "$299",
      description: "Perfect for newborns and infants. Includes 1-hour session, 15 edited photos, and digital gallery access."
    },
    {
      name: "Walk-In Baby Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-2.jpg",
      price: "$499",
      description: "Complete baby photography experience with 2-hour session, 30 edited photos, prints, and custom album."
    }
  ];

  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely beautiful photos of our newborn! The photographer was so patient and gentle with our baby.",
      date: "March 2024"
    },
    {
      name: "Mike Chen",
      rating: 5,
      comment: "Professional service and stunning results. We couldn't be happier with our baby photos.",
      date: "February 2024"
    },
    {
      name: "Emma Williams",
      rating: 5,
      comment: "Captured the most precious moments of our little one. Highly recommend!",
      date: "January 2024"
    }
  ];

  const faqs = [
    {
      question: "What's the best age for a baby photoshoot?",
      answer: "The ideal time for newborn photos is within the first 2 weeks of life when babies sleep deeply and can be easily positioned. However, we can capture beautiful photos of babies at any age!"
    },
    {
      question: "How long does a baby photoshoot take?",
      answer: "Baby sessions typically last 1-2 hours depending on the package. We work at your baby's pace with plenty of time for feeding and soothing breaks."
    },
    {
      question: "What should I bring to the session?",
      answer: "We provide props, blankets, and backdrops. Just bring your baby, extra diapers, and anything special you'd like included in the photos."
    },
    {
      question: "Can siblings be included in the photos?",
      answer: "Absolutely! We love capturing family moments. Let us know in advance so we can plan accordingly and ensure we have enough time."
    },
    {
      question: "When will I receive my photos?",
      answer: "You'll receive a preview within 48 hours and your full edited gallery within 1-2 weeks of your session."
    }
  ];

  return (
    <PackageTemplate
      heroTitle="Baby Photography Packages"
      heroDescription="Capture your little one's precious first moments with our professional baby photography services. From newborn sessions to milestone photos, we create timeless memories you'll treasure forever."
      categoryName="Baby Shoot"
      packages={packages}
      reviews={reviews}
      faqs={faqs}
      heroBackgroundImage="/assets/img/inner-project/portfolio-col-2/port-1.jpg"
    />
  );
};

export default BabyShootPackagePage;