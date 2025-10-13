"use client";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import FooterTwo from "@/layouts/footers/footer-two";
import PricingTable from "@/components/packages/pricing-table";

const GeneralPackagePage = () => {
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
    <Wrapper>
      <HeaderTransparent />

      <section className="package-hero-area pt-180 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="package-hero-content text-center">
                <h1 className="package-hero-title tp-char-animation">
                  Individual & Portrait Photography Packages
                </h1>
                <p className="package-hero-description">
                  Capture life&apos;s precious moments with our professional photography services. From portraits to special occasions, we create beautiful images you&apos;ll treasure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingTable packageSlug="individual-portrait" />

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
        .package-hero-area { background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); }
        .package-hero-title { font-size: 52px; font-weight: 700; color: #1a1a1a; margin-bottom: 25px; }
        .package-hero-description { font-size: 18px; line-height: 1.8; color: #666; max-width: 800px; margin: 0 auto; }
        .review-card { background: #fff; padding: 30px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); height: 100%; }
        .review-rating { display: flex; gap: 4px; }
        .review-comment { font-size: 15px; line-height: 1.7; color: #444; margin-bottom: 20px; }
        .review-author h4 { font-size: 16px; font-weight: 700; color: #1a1a1a; margin-bottom: 5px; }
        .review-author span { font-size: 13px; color: #999; }
        .faq-item { background: #fff; padding: 30px; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); }
        .faq-question { font-size: 18px; font-weight: 700; color: #1a1a1a; margin-bottom: 15px; }
        .faq-answer { font-size: 15px; line-height: 1.7; color: #666; margin: 0; }
        @media (max-width: 991px) { .package-hero-title { font-size: 38px; } }
        @media (max-width: 576px) { .package-hero-area { padding-top: 120px; padding-bottom: 60px; } .package-hero-title { font-size: 32px; } .package-hero-description { font-size: 16px; } }
      `}</style>
    </Wrapper>
  );
};

export default GeneralPackagePage;