"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { charAnimation, fadeAnimation } from "@/utils/title-animation";

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderOne from "@/layouts/headers/header-one";
import FooterTwo from "@/layouts/footers/footer-two";

// types
interface PackageOption {
  name: string;
  image: string;
  price: string;
  description: string;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface PackageTemplateProps {
  heroTitle: string;
  heroDescription: string;
  categoryName: string;
  packages: PackageOption[];
  reviews: Review[];
  faqs: FAQ[];
  heroBackgroundImage?: string;
}

export default function PackageTemplate({
  heroTitle,
  heroDescription,
  categoryName,
  packages,
  reviews,
  faqs,
  heroBackgroundImage = "/assets/img/inner-project/portfolio-col-2/port-1.jpg"
}: PackageTemplateProps) {
  
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      charAnimation();
      fadeAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderOne />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* Hero Section */}
            <div className="package-hero-area pt-190 pb-130" style={{
              backgroundImage: `url(${heroBackgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}>
              <div className="package-hero-overlay"></div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-lg-10">
                    <div className="package-hero-content text-center">
                      <h1 className="package-hero-title tp-char-animation text-white">
                        {heroTitle}
                      </h1>
                      <p className="package-hero-description text-white mb-40">
                        {heroDescription}
                      </p>
                      <Link href="/contact" className="tp-btn-circle style-2">
                        <span className="tp-btn-circle-text">Book Now</span>
                        <i className="tp-btn-circle-dot"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Packages Section */}
            <div className="package-options-area pt-120 pb-90">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="section-title text-center mb-60">
                      <h2 className="tp-section-title">{categoryName} Packages</h2>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  {packages.map((pkg, index) => (
                    <div key={index} className="col-xl-5 col-lg-6 col-md-8 mb-40">
                      <div className="package-card">
                        <div className="package-image-container">
                          <Image
                            src={pkg.image}
                            alt={pkg.name}
                            width={500}
                            height={400}
                            style={{ objectFit: 'cover' }}
                            className="package-image"
                          />
                          <div className="package-price">{pkg.price}</div>
                        </div>
                        <div className="package-content">
                          <h3 className="package-name">{pkg.name}</h3>
                          <p className="package-description">{pkg.description}</p>
                          <Link href="/contact" className="get-package-btn">
                            Get Package
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="reviews-area pt-90 pb-90 bg-light">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="section-title text-center mb-60">
                      <h2 className="tp-section-title">Client Reviews</h2>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {reviews.map((review, index) => (
                    <div key={index} className="col-xl-4 col-lg-6 col-md-6 mb-30">
                      <div className="review-card">
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
                              ★
                            </span>
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

            {/* FAQ Section */}
            <div className="faq-area pt-120 pb-120">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="section-title text-center mb-60">
                      <h2 className="tp-section-title">Frequently Asked Questions</h2>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-lg-10">
                    <div className="faq-accordion">
                      {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                          <div className="faq-question">
                            <h4>{faq.question}</h4>
                            <span className="faq-toggle">+</span>
                          </div>
                          <div className="faq-answer">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* footer area */}
          <FooterTwo topCls="" />
          {/* footer area */}
        </div>
      </div>

      <style jsx>{`
        .package-hero-area {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: center;
        }

        .package-hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1;
        }

        .package-hero-content {
          position: relative;
          z-index: 2;
        }

        .package-hero-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 20px;
        }

        .package-hero-description {
          font-size: 18px;
          line-height: 1.6;
        }

        .package-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }

        .package-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .package-image-container {
          position: relative;
          height: 300px;
          overflow: hidden;
        }

        .package-image {
          width: 100%;
          height: 100%;
          transition: transform 0.3s ease;
        }

        .package-card:hover .package-image {
          transform: scale(1.05);
        }

        .package-price {
          position: absolute;
          top: 15px;
          right: 15px;
          background: #2c3e50;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-weight: 600;
          font-size: 16px;
        }

        .package-content {
          padding: 30px;
          text-align: center;
        }

        .package-name {
          font-size: 24px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #2c3e50;
        }

        .package-description {
          color: #666;
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .get-package-btn {
          display: inline-block;
          background: #2c3e50;
          color: white;
          padding: 12px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          border: 2px solid #2c3e50;
        }

        .get-package-btn:hover {
          background: transparent;
          color: #2c3e50;
          text-decoration: none;
        }

        .review-card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
        }

        .review-rating {
          margin-bottom: 20px;
        }

        .star {
          font-size: 20px;
          color: #ddd;
          margin: 0 2px;
        }

        .star.filled {
          color: #ffd700;
        }

        .review-comment {
          font-style: italic;
          margin-bottom: 20px;
          color: #666;
        }

        .review-author h4 {
          margin-bottom: 5px;
          color: #2c3e50;
        }

        .review-author span {
          color: #999;
          font-size: 14px;
        }

        .faq-accordion {
          border: 1px solid #eee;
          border-radius: 8px;
          overflow: hidden;
        }

        .faq-item {
          border-bottom: 1px solid #eee;
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-question {
          background: #f8f9fa;
          padding: 20px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s ease;
        }

        .faq-question:hover {
          background: #e9ecef;
        }

        .faq-question h4 {
          margin: 0;
          font-size: 16px;
          color: #2c3e50;
        }

        .faq-toggle {
          font-size: 20px;
          font-weight: bold;
          color: #2c3e50;
        }

        .faq-answer {
          padding: 20px;
          display: none;
        }

        .faq-answer p {
          margin: 0;
          color: #666;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .package-hero-title {
            font-size: 36px;
          }

          .package-hero-description {
            font-size: 16px;
          }

          .package-content {
            padding: 20px;
          }

          .package-name {
            font-size: 20px;
          }

          .review-card {
            padding: 20px;
          }

          .faq-question {
            padding: 15px;
          }

          .faq-question h4 {
            font-size: 14px;
          }

          .faq-answer {
            padding: 15px;
          }
        }
      `}</style>
    </Wrapper>
  );
}