"use client";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import FooterTwo from "@/layouts/footers/footer-two";
import PricingTable from "@/components/packages/pricing-table";
import OurPixoGallery from "@/components/packages/ourpixo-gallery";
import { getGalleriesBySlug } from "@/data/ourpixo-galleries";

const WeddingPackagePage = () => {
  // Get wedding galleries
  const weddingGalleries = getGalleriesBySlug('wedding');

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

  return (
    <Wrapper>
      <HeaderTransparent />
      
      <section className="package-hero-area pt-180 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="package-hero-content text-center">
                <h1 className="package-hero-title tp-char-animation">
                  Pre-Wedding Photography Packages
                </h1>
                <p className="package-hero-description">
                  Your pre-wedding shoot is one of life&apos;s most precious moments. Let us capture every laugh, smile, and joyful celebration with our professional photography services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingTable packageSlug="pre-wedding-shoot" />

      {/* Gallery Sections */}
      {weddingGalleries.map((gallery, idx) => (
        <OurPixoGallery
          key={gallery.id}
          galleryUrl={gallery.url}
          title={gallery.name}
          subtitle={idx === 0 ? "Explore our beautiful wedding photography collection" : undefined}
        />
      ))}

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

export default WeddingPackagePage;