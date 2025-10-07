import React from "react";
import { Metadata } from "next";
import PackageTemplate from "@/components/packages/package-template";

export const metadata: Metadata = {
  title: "Photography Packages - Lum Studios",
  description: "Professional photography packages for all your special moments and occasions",
};

const GeneralPackagePage = () => {
  const packages = [
    {
      name: "Classic Photography Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-1.jpg",
      price: "$399",
      description: "Perfect for special occasions. Includes 2-hour session, 30 edited photos, and digital gallery access."
    },
    {
      name: "Walk-In Photography Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-2.jpg",
      price: "$699",
      description: "Complete photography experience with 4-hour coverage, 60+ edited photos, multiple setups, and custom album."
    }
  ];

  const reviews = [
    {
      name: "Adunni Bakare",
      rating: 5,
      comment: "Exceptional photography service! The team captured every moment beautifully and delivered beyond our expectations.",
      date: "November 2024"
    },
    {
      name: "Kemi Adesola",
      rating: 5,
      comment: "Professional, creative, and reliable. The photos turned out absolutely stunning - we couldn't be happier!",
      date: "October 2024"
    },
    {
      name: "Olumide Fashola",
      rating: 5,
      comment: "Outstanding service from booking to delivery. The photographer understood our vision perfectly and delivered amazing results.",
      date: "September 2024"
    }
  ];

  const faqs = [
    {
      question: "What types of events do you photograph?",
      answer: "We cover a wide range of events including birthdays, anniversaries, corporate events, naming ceremonies, cultural celebrations, and any special occasion you want to remember."
    },
    {
      question: "How far in advance should we book?",
      answer: "We recommend booking 2-4 weeks in advance for regular sessions and 6-8 weeks for major events or peak seasons to ensure availability."
    },
    {
      question: "Do you travel for photography sessions?",
      answer: "Yes! We're happy to travel to your preferred location. Travel fees may apply depending on the distance from our studio."
    },
    {
      question: "Can we customize a package for our specific needs?",
      answer: "Absolutely! We offer flexible packages and can create a custom photography solution tailored to your event, timeline, and budget."
    },
    {
      question: "What's included in the digital gallery?",
      answer: "Your digital gallery includes high-resolution, professionally edited photos with personal usage rights and easy download/sharing options."
    }
  ];

  return (
    <PackageTemplate
      heroTitle="Professional Photography Packages"
      heroDescription="Capture life's precious moments with our professional photography services. From intimate celebrations to grand events, we create beautiful memories that last a lifetime."
      categoryName="Photography"
      packages={packages}
      reviews={reviews}
      faqs={faqs}
      heroBackgroundImage="/assets/img/inner-project/portfolio-col-2/port-1.jpg"
    />
  );
};

export default GeneralPackagePage;