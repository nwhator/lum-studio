import React from "react";
import Image from "next/image";
import { Search } from "../svg";
import faq_banner from '@/assets/img/inner-faq/faq/banner-faq.webp';
import FaqItem from "./faq-item";

// type 
export type IFaq = {
  id: number;
  question: string;
  answer: string;
}

// Comprehensive LUM Studios FAQ data
export const faq_data: IFaq[] = [
  {
    id: 1,
    question: "Where is LUM Studios located and what are your opening hours?",
    answer:
      "LUM Studios is located Opp. Hammedal Filling Station, Ilesha-Garage, Ile-Ife, Osun State, Nigeria. We are open Monday through Saturday from 9:00 AM to 6:00 PM. Sunday sessions are available by special appointment for events and destination shoots.",
  },
  {
    id: 2,
    question: "How do I book a photoshoot session or event coverage?",
    answer:
      "You can book directly on our website via our interactive Booking page (/booking). Choose between Studio Shoots (with instant slot selection) or Events & Weddings. Select your package, pick your preferred date and time, fill in your details, and submit. You will receive an instant email confirmation and direct WhatsApp concierge assistance.",
  },
  {
    id: 3,
    question: "What is your payment and deposit policy?",
    answer:
      "For studio sessions, we require a non-refundable deposit to secure your time slot, with the balance due before or on the day of the shoot. For Weddings and large Events, we require a 70% deposit to lock in your date on our production calendar, with the remaining 30% payable before or on the event day. Payments are made via bank transfer to our Moniepoint account (Acct No: 5646143460, LUM Studios).",
  },
  {
    id: 4,
    question: "What is the turnaround time for receiving our edited pictures and videos?",
    answer:
      "Standard studio photoshoot portraits are delivered within 48 to 72 hours via a private high-resolution digital download link. For Weddings and large Events, highlight previews are delivered within 3-5 days, while complete edited photo galleries and cinematic films are delivered within 2 to 4 weeks.",
  },
  {
    id: 5,
    question: "Do you travel outside Ile-Ife for weddings and special events?",
    answer:
      "Yes! While our physical studio is based in Ile-Ife, our photography and cinematography crew regularly travels across Osun State, Lagos, Ibadan, Abuja, and nationwide across Nigeria for destination weddings and corporate events.",
  },
  {
    id: 6,
    question: "What packages do you offer for Convocation and Call to Bar?",
    answer:
      "We offer dedicated Convocation and Call to Bar graduation packages tailored for students and legal professionals. Packages include solo portraits, group/family photos, academic gown styling, and options for framed wall art and photo gift items.",
  },
  {
    id: 7,
    question: "Can I bring multiple outfits and props to my studio session?",
    answer:
      "Yes! Depending on your chosen package (Walk-in vs Classic), you can bring multiple outfit changes. We also have props and backdrops available. Feel free to bring personal items, baby props, or branding assets to personalize your session.",
  },
  {
    id: 8,
    question: "Do you offer photo printing, canvas frames, and photobooks?",
    answer:
      "Yes! We produce premium framed canvas wall art, luxury synthetic and crystal wedding photobooks, and photo enlargement frames with nationwide delivery.",
  },
];

export default function FaqArea() {
  return (
    <div className="fq-faq-area fq-faq-bdr pt-80 pb-140">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <div className="fq-faq-wrapper">
              <div className="tp-service-2-accordion-box">
                <div className="accordion" id="accordionExample">
                  {faq_data.map((item, index) => (
                    <FaqItem key={item.id} item={item} isFirst={index === 0} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4">
            <div className="fq-faq-sidebar">
              <div className="fq-faq-sidebar-content">
                <h4 className="fq-faq-sidebar-title">Have Questions?</h4>
                <p>
                  Need personalized advice or custom package pricing? Reach out to our studio team anytime.
                </p>
              </div>
              <div className="fq-faq-sidebar-thumb">
                <Image
                  className="w-100"
                  src={faq_banner}
                  alt="LUM Studios FAQ Banner"
                  style={{height:'auto'}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
