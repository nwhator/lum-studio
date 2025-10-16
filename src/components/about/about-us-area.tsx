import React from "react";
import Link from "next/link";
import Image from "next/image";

// images
import ab_1 from "@/assets/img/inner-about/about/about-1.webp";
import ab_2 from "@/assets/img/home-03/gallery/gal-3.webp";
import ab_3 from "@/assets/img/home-03/gallery/gal-4.webp";
import ab_4 from "@/assets/img/home-03/gallery/gal-5.webp";

// SVG checkmark for features
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke="#B7C435" strokeWidth="2" fill="none"/>
    <path d="M7 12L10.5 15.5L17 9" stroke="#B7C435" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function AboutUsArea() {
  return (
    <div className="ab-about-area-redesign ab-about-mt pb-90 z-index-5">
      <div className="container container-1480">
        {/* Image Gallery Grid */}
        <div className="ab-about-thumb-wrap mb-100">
          <div className="row align-items-center g-4">
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="ab-about-image-box">
                <div style={{ position: 'relative', height: 500, width: '100%' }}>
                 <Image
                    src={ab_1}
                    alt="Lum Studio Photography"
                    fill
                    priority
                    style={{ objectFit: 'cover', borderRadius: '12px' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="ab-about-image-box">
                <div style={{ position: 'relative', height: 500, width: '100%' }}>
                  <Image
                    src={ab_2}
                    alt="Professional Photography Services"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '12px' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="ab-about-image-box">
                <div style={{ position: 'relative', height: 500, width: '100%' }}>
                  <Image
                    src={ab_3}
                    alt="Wedding Photography Nigeria"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '12px' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6">
              <div className="ab-about-image-box">
                <div style={{ position: 'relative', height: 500, width: '100%' }}>
                  <Image
                    src={ab_4}
                    alt="Event Photography Services"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '12px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Content Section */}
        <div id="about-info" className="row justify-content-center mb-80">
          <div className="col-xxl-10 col-xl-11">
            <div className="ab-about-content-redesign text-center">
              <h2 className="ab-about-main-title mb-4">
                Capturing Authentic Moments with <span className="brand-green-text">Creativity & Precision</span>
              </h2>
              <p className="ab-about-description">
                Founded in 2020, LUM Studio is a full-service photography and videography studio 
                focused on capturing authentic moments with creativity and technical precision. 
                Our growing team of photographers, videographers, editors, and content specialists 
                collaborate to deliver memorable visuals for weddings, portraits, events, products, 
                and aerial projects.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row justify-content-center mb-80">
          <div className="col-xl-10">
            <div className="ab-stats-wrapper">
              <div className="row g-4">
                <div className="col-lg-4 col-md-4 col-sm-6">
                  <div className="ab-stat-card">
                    <h3 className="stat-number brand-green-text">4000+</h3>
                    <p className="stat-label">Happy Clients</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                  <div className="ab-stat-card">
                    <h3 className="stat-number brand-green-text">6500+</h3>
                    <p className="stat-label">Projects Completed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                  <div className="ab-stat-card">
                    <h3 className="stat-number brand-green-text">5+</h3>
                    <p className="stat-label">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="ab-services-section">
              <div className="text-center mb-60">
                <h3 className="ab-services-title">
                  Our <span className="brand-green-text">Services</span>
                </h3>
                <p className="ab-services-subtitle">
                  Comprehensive photography and videography solutions for every occasion
                </p>
              </div>

              <div className="row g-4">
                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Weddings & Events</h4>
                      <p>Capture your special moments with professional coverage</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Portraits & Family Sessions</h4>
                      <p>Timeless portraits that tell your unique story</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Product & Commercial Shoots</h4>
                      <p>Elevate your brand with stunning product photography</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Drone & Aerial Photography</h4>
                      <p>Breathtaking perspectives from above</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Videography & Event Coverage</h4>
                      <p>Professional video production and editing</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Studio Rentals & Creative Direction</h4>
                      <p>Professional space and expert guidance for your projects</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mt-60">
                <Link href="/booking" className="ab-cta-button">
                  Book a Session
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}