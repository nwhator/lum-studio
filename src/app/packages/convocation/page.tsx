"use client";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import FooterTwo from "@/layouts/footers/footer-two";
import PricingTable from "@/components/packages/pricing-table";

const ConvocationPackagePage = () => {

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

  return (
    <Wrapper>
      <HeaderTransparent />
      
      <section className="package-hero-area pt-180 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="package-hero-content text-center">
                <h1 className="package-hero-title tp-char-animation">
                  Convocation Photography Packages
                </h1>
                <p className="package-hero-description">
                  Mark this significant academic milestone with professional graduation photography. From the ceremony proceedings to joyful celebrations with loved ones, we capture every proud moment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingTable packageSlug="graduation-shoot" />

      <section className="reviews-area pt-80 pb-80" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="reviews-header text-center mb-60">
                <h2 className="tp-section-title">What Our Clients Say</h2>
              </div>
              <div className="row g-4">
                {reviews.map((review, idx) => (
                  <div key={idx} className="col-xl-4 col-lg-4 col-md-6">
                    <div className="review-card">
                      <div className="review-rating mb-15">
                        {[...Array(review.rating)].map((_, i) => (
                          <span key={i} style={{ color: 'var(--tp-theme-1)', fontSize: '18px' }}>★</span>
                        ))}
                      </div>
                      <p className="review-comment">&ldquo;{review.comment}&rdquo;</p>
                      <div className="review-author">
                        <h4>{review.name}</h4>
                        <span>{review.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faqs-area pt-80 pb-120" style={{ background: '#f8f9fa' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="faqs-header text-center mb-60">
                <h2 className="tp-section-title">Frequently Asked Questions</h2>
              </div>
              <div className="faqs-wrapper">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <h3 className="faq-question">{faq.question}</h3>
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterTwo />

      <style jsx>{`
        .package-hero-area {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
        }
        .package-hero-title {
          font-size: 52px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 25px;
        }
        .package-hero-description {
          font-size: 18px;
          line-height: 1.8;
          color: #666;
          max-width: 800px;
          margin: 0 auto;
        }
        .review-card {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          height: 100%;
        }
        .review-rating { display: flex; gap: 4px; }
        .review-comment {
          font-size: 15px;
          line-height: 1.7;
          color: #444;
          margin-bottom: 20px;
        }
        .review-author h4 {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 5px;
        }
        .review-author span { font-size: 13px; color: #999; }
        .faq-item {
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          margin-bottom: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        .faq-question {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 15px;
        }
        .faq-answer {
          font-size: 15px;
          line-height: 1.7;
          color: #666;
          margin: 0;
        }
        @media (max-width: 991px) {
          .package-hero-title { font-size: 38px; }
        }
        @media (max-width: 576px) {
          .package-hero-area {
            padding-top: 120px;
            padding-bottom: 60px;
          }
          .package-hero-title { font-size: 32px; }
          .package-hero-description { font-size: 16px; }
        }
      `}</style>
    </Wrapper>
  );
};

export default ConvocationPackagePage;