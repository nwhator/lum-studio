"use client";
import React from "react";
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import FooterTwo from "@/layouts/footers/footer-two";
import PricingTable from "@/components/packages/pricing-table";
import OurPixoGallery from "@/components/packages/ourpixo-gallery";
import { getGalleriesBySlug } from "@/data/ourpixo-galleries";

const FamilyPortraitPackagePage = () => {
  // Get family portrait galleries
  const familyGalleries = getGalleriesBySlug('family-portraits');

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
    <Wrapper>
      <HeaderTransparent />
      {/* Hero Section */}
      <section className="package-hero-area pt-180 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10">
              <div className="package-hero-content text-center">
                <h1 className="package-hero-title tp-char-animation">
                  Family Portrait Packages
                </h1>
                <p className="package-hero-description">
                  Celebrate your family&apos;s unique bond with professional portrait sessions. From intimate moments to joyful celebrations, we capture the love that makes your family special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <PricingTable packageSlug="family-shoot" />

      {/* Gallery Sections */}
      {familyGalleries.map((gallery, idx) => (
        <OurPixoGallery
          key={gallery.id}
          galleryUrl={gallery.url}
          title={gallery.name}
          subtitle={idx === 0 ? "See our heartwarming family photography collection" : undefined}
        />
      ))}

      {/* Reviews Section */}
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

      {/* FAQs Section */}
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

        .review-rating {
          display: flex;
          gap: 4px;
        }

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

        .review-author span {
          font-size: 13px;
          color: #999;
        }

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
          .package-hero-title {
            font-size: 38px;
          }
        }

        @media (max-width: 576px) {
          .package-hero-area {
            padding-top: 120px;
            padding-bottom: 60px;
          }

          .package-hero-title {
            font-size: 32px;
          }

          .package-hero-description {
            font-size: 16px;
          }
        }
      `}</style>
    </Wrapper>
  );
};

export default FamilyPortraitPackagePage;