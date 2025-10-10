import React from "react";
import { Metadata } from "next";
import PackageTemplate from "@/components/packages/package-template";

export const metadata: Metadata = {
  title: "Call to Bar Photography Packages - Lum Studios",
  description: "Professional photography packages to celebrate your call to bar ceremony and achievement. Classic and walk-in sessions for lawyers being called to the Nigerian Bar.",
  keywords: ["call to bar photography", "lawyer ceremony photography", "Nigerian bar call photography", "legal profession photography", "barrister photoshoot"],
};

const CallToBarPackagePage = () => {
  const packages = [
    {
      name: "Classic Call to Bar Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-7.jpg",
      price: "$599",
      description: "Perfect for ceremony coverage. Includes 3-hour coverage, 50 edited photos, and digital gallery access."
    },
    {
      name: "Walk-In Call to Bar Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-8.jpg",
      price: "$899",
      description: "Complete celebration package with 5-hour coverage, 100+ edited photos, family portraits, and custom album."
    }
  ];

  const reviews = [
    {
      name: "Barrister Adebayo",
      rating: 5,
      comment: "Exceptional service! Every important moment was captured beautifully. The photos perfectly commemorate this milestone in my career.",
      date: "September 2024"
    },
    {
      name: "Chiamaka Okafor",
      rating: 5,
      comment: "Professional and discreet during the ceremony. The final photos exceeded my expectations - truly stunning work!",
      date: "August 2024"
    },
    {
      name: "Emmanuel Johnson",
      rating: 5,
      comment: "Amazing photography that captured the dignity and importance of the call to bar ceremony. Highly recommended!",
      date: "July 2024"
    }
  ];

  const faqs = [
    {
      question: "Do you have experience with call to bar ceremonies?",
      answer: "Yes! We specialize in legal profession ceremonies and understand the protocol, timing, and important moments to capture during call to bar events."
    },
    {
      question: "Can you photograph both the ceremony and reception?",
      answer: "Absolutely! Our packages can cover the entire day from the ceremony at court to the celebration reception with family and friends."
    },
    {
      question: "Do you require special permissions for court photography?",
      answer: "We handle all necessary permissions and work closely with court officials to ensure respectful, unobtrusive photography during the ceremony."
    },
    {
      question: "Can family portraits be included?",
      answer: "Yes! We can arrange formal family portraits before or after the ceremony, as well as candid family moments throughout the celebration."
    },
    {
      question: "How quickly will I receive my photos?",
      answer: "You'll receive a preview gallery within 24-48 hours and your complete edited collection within 1-2 weeks of the ceremony."
    }
  ];

  return (
    <PackageTemplate
      heroTitle="Call to Bar Photography Packages"
      heroDescription="Celebrate this momentous achievement with professional photography that captures the dignity and pride of your call to bar ceremony. From the formal proceedings to joyful celebrations with family."
      categoryName="Call to Bar"
      packages={packages}
      reviews={reviews}
      faqs={faqs}
      heroBackgroundImage="/assets/img/inner-project/portfolio-col-2/port-7.jpg"
    />
  );
};

export default CallToBarPackagePage;