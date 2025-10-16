import React from "react";
import Image from "next/image";
import Social from "../social/social";
import shape from "@/assets/img/inner-about/about/shape-1.webp";

export default function ContactTwo() {
  return (
    <div className="cn-contactform-area cn-contactform-style p-relative pb-100">
      <div className="ab-2-hero-social-wrap d-none d-xl-block">
        <div className="ab-2-hero-social">
          <Social/>
        </div>
        <div className="ab-2-hero-social-text">
          <span>Follow us</span>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="ab-about-category-title-box mb-60 p-relative text-center">
              <h4 className="ab-about-category-title">
                Let&apos;s Work Together <br />
                <span>Contact Us</span>
              </h4>
              <Image
                className="ab-about-shape-1 d-none d-xl-block"
                src={shape}
                alt="shape"
                style={{margin: '0 auto'}}
              />
            </div>
          </div>
        </div>
        
        {/* Contact Information Cards */}
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="contact-info-grid">
              <div className="row g-4">
                
                {/* Phone */}
                <div className="col-lg-4 col-md-6">
                  <div className="contact-info-card">
                    <div className="contact-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 16.92V19.92C22 20.4728 21.5523 20.92 21 20.92H19C10.1634 20.92 3 13.7566 3 4.92V2.92C3 2.36772 3.44772 1.92 4 1.92H7C7.55228 1.92 8 2.36772 8 2.92V7.42C8 7.97228 7.55228 8.42 7 8.42H5.03C5.54954 13.0534 9.36662 16.8705 14 17.39V15.42C14 14.8677 14.4477 14.42 15 14.42H19.5C20.0523 14.42 20.5 14.8677 20.5 15.42V16.92" stroke="#B7C435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h5>Phone</h5>
                    <p>
                      <a href="tel:+2348145538164">+234 814 553 8164</a>
                    </p>
                    <p>
                      <a href="tel:+2349022292514">+234 902 229 2514</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="col-lg-4 col-md-6">
                  <div className="contact-info-card">
                    <div className="contact-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 8L10.89 13.26C11.5417 13.6793 12.4583 13.6793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="#B7C435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h5>Email</h5>
                    <p>
                      <a href="mailto:contact@thelumstudios.com">contact@thelumstudios.com</a>
                    </p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="col-lg-4 col-md-6">
                  <div className="contact-info-card">
                    <div className="contact-icon">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382C17.015 14.153 14.769 13.049 14.354 12.896C13.938 12.742 13.64 12.666 13.342 13.124C13.044 13.582 12.141 14.611 11.877 14.909C11.614 15.207 11.35 15.249 10.893 15.02C10.435 14.791 8.959 14.315 7.216 12.765C5.855 11.558 4.954 10.067 4.691 9.609C4.428 9.151 4.661 8.908 4.89 8.68C5.097 8.473 5.347 8.144 5.576 7.881C5.805 7.618 5.881 7.438 6.035 7.14C6.189 6.842 6.111 6.579 5.997 6.35C5.881 6.121 4.954 3.875 4.58 2.959C4.213 2.067 3.842 2.188 3.57 2.175L2.812 2.16C2.514 2.16 2.056 2.274 1.641 2.732C1.226 3.19 0.039 4.294 0.039 6.54C0.039 8.786 1.724 10.949 1.953 11.247C2.182 11.545 4.954 15.788 9.229 17.783C10.279 18.268 11.093 18.566 11.723 18.787C12.78 19.125 13.734 19.078 14.494 18.963C15.341 18.835 17.159 17.866 17.533 16.799C17.908 15.732 17.908 14.832 17.794 14.645C17.68 14.457 17.382 14.343 16.924 14.114L17.472 14.382ZM12.063 21.785H12.06C10.286 21.784 8.548 21.302 7.028 20.394L6.68 20.187L2.891 21.213L3.934 17.527L3.704 17.165C2.706 15.586 2.173 13.766 2.174 11.905C2.176 6.446 6.603 2.019 12.067 2.019C14.723 2.02 17.213 3.055 19.078 4.922C20.943 6.789 21.976 9.281 21.975 11.936C21.973 17.395 17.546 21.822 12.063 21.785Z" fill="#B7C435"/>
                      </svg>
                    </div>
                    <h5>WhatsApp</h5>
                    <p>
                      <a href="https://wa.me/2349022292514" target="_blank" rel="noopener noreferrer">
                        Chat with us
                      </a>
                    </p>
                    <p className="text-muted small">Available 24/7</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-60">
              <p className="contact-cta-text mb-30">
                Ready to capture your special moments?
              </p>
              <a href="/booking" className="tp-btn-black-2">
                Book a Session
                <span className="p-relative">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact-info-grid {
          margin-bottom: 40px;
        }

        .contact-info-card {
          background: #fff;
          padding: 40px 30px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 100%;
          border: 1px solid #f0f0f0;
        }

        .contact-info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(183, 196, 53, 0.15);
          border-color: #B7C435;
        }

        .contact-icon {
          width: 70px;
          height: 70px;
          background: rgba(183, 196, 53, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          transition: all 0.3s ease;
        }

        .contact-info-card:hover .contact-icon {
          background: rgba(183, 196, 53, 0.2);
          transform: scale(1.1);
        }

        .contact-info-card h5 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 15px;
          color: #1a1a1a;
        }

        .contact-info-card p {
          margin-bottom: 8px;
          font-size: 15px;
        }

        .contact-info-card a {
          color: #666;
          text-decoration: none;
          transition: color 0.3s ease;
          font-weight: 500;
        }

        .contact-info-card a:hover {
          color: #B7C435;
        }

        .text-muted {
          color: #999 !important;
        }

        .small {
          font-size: 13px;
        }

        .contact-cta-text {
          font-size: 20px;
          color: #333;
          font-weight: 500;
        }

        .tp-btn-black-2 {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 35px;
          background: #1a1a1a;
          color: #fff;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tp-btn-black-2:hover {
          background: #B7C435;
          color: #1a1a1a;
          transform: translateY(-2px);
        }

        .tp-btn-black-2 svg {
          transition: transform 0.3s ease;
        }

        .tp-btn-black-2:hover svg {
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .contact-info-card {
            padding: 30px 20px;
          }

          .contact-icon {
            width: 60px;
            height: 60px;
          }

          .contact-icon svg {
            width: 30px;
            height: 30px;
          }

          .contact-cta-text {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
