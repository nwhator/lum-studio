import React from "react";
import { Metadata } from "next";
import PackageTemplate from "@/components/packages/package-template";

export const metadata: Metadata = {
  title: "Family Portrait Packages - Lum Studios",
  description: "Professional family photography packages to capture your family's love and connection. Classic and walk-in family portrait sessions available.",
  keywords: ["family portraits", "family photography", "family photoshoot Nigeria", "family portrait packages", "family photo session"],
};

const FamilyPortraitPackagePage = () => {
  const packages = [
    {
      name: "Classic Family Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-13.jpg",
      price: "$399",
      description: "Perfect for families of all sizes. Includes 1-hour session, 20 edited photos, and digital gallery access."
    },
    {
      name: "Walk-In Family Package",
      image: "/assets/img/inner-project/portfolio-col-2/port-14.jpg",
      price: "$699",
      description: "Complete family experience with 2-hour session, 40 edited photos, prints package, and custom family album."
    }
  ];

  const reviews = [
    {
      name: "The Martinez Family",
      rating: 5,
      comment: "Amazing experience! The photographer made our kids feel so comfortable. We got the most natural, beautiful family photos.",
      date: "July 2024"
    },
    {
      name: "Jennifer Thompson",
      rating: 5,
      comment: "Professional service and gorgeous results. These family portraits will be treasured for generations!",
      date: "June 2024"
    },
    {
      name: "The Kim Family",
      rating: 5,
      comment: "Exceeded our expectations! Even our toddler cooperated thanks to the photographer's patience and skill.",
      date: "May 2024"
    }
  ];

  const faqs = [
    {
      question: "What's the best time of day for family photos?",
      answer: "Golden hour (1 hour before sunset) provides the most flattering natural lighting. We can also work with your family's schedule for indoor or studio sessions."
    },
    {
      question: "How should we dress for our family session?",
      answer: "We recommend coordinating colors rather than matching exactly. Avoid busy patterns and logos. We'll provide a style guide after booking."
    },
    {
      question: "What if my children don't cooperate during the session?",
      answer: "Don't worry! We're experienced with children of all ages and have techniques to keep them engaged. We work at their pace and capture natural moments."
    },
    {
      question: "Can we include our pets in the family photos?",
      answer: "Absolutely! Pets are family too. Let us know in advance so we can plan for extra time and bring treats if needed."
    },
    {
      question: "Do you offer indoor and outdoor sessions?",
      answer: "Yes! We offer both studio sessions and outdoor locations. We can help you choose the best option based on your preferences and family dynamics."
    }
  ];

  return (
    <PackageTemplate
      heroTitle="Family Portrait Packages"
      heroDescription="Celebrate your family's unique bond with professional portrait sessions. From intimate moments to joyful celebrations, we capture the love that makes your family special."
      categoryName="Family Portrait"
      packages={packages}
      reviews={reviews}
      faqs={faqs}
      heroBackgroundImage="/assets/img/inner-project/portfolio-col-2/port-13.jpg"
    />
  );
};

export default FamilyPortraitPackagePage;