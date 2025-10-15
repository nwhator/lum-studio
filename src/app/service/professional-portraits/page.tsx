"use client";
import { gsap } from "gsap";
import React from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { registerGSAPPlugins, safeAnimationInit } from "@/utils/ios-safe-gsap";

// Register plugins safely (skips ScrollSmoother on iOS)
registerGSAPPlugins(gsap, { ScrollTrigger, ScrollSmoother, SplitText });

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import FooterTwo from "@/layouts/footers/footer-two";
import Image from "next/image";
import Link from "next/link";

// animation
import { charAnimation, titleAnimation } from "@/utils/title-animation";

// images
import img1 from "@/assets/img/inner-project/portfolio-col-2/port-13.jpg";
import img2 from "@/assets/img/inner-project/portfolio-col-2/port-15.jpg";
import img3 from "@/assets/img/inner-project/portfolio-col-2/port-16.jpg";
import img4 from "@/assets/img/inner-project/portfolio-col-2/port-17.jpg";
import img5 from "@/assets/img/home-03/gallery/gal-5.jpg";

const ProfessionalPortraitsPage = () => {
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      safeAnimationInit(() => {
        charAnimation();
        titleAnimation();
      }, 'portrait-service-animations');
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderTransparent />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* Hero Section */}
            <div className="service-detail-hero pt-200 pb-120">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <div className="text-center mb-60">
                      <h1 className="service-detail-title tp-char-animation" style={{fontSize: 'clamp(28px, 5vw, 80px)', fontWeight: 700, color: '#1a1a1a', marginBottom: '30px', lineHeight: 1.2, wordWrap: 'break-word', overflowWrap: 'break-word', hyphens: 'auto'}}>
                        Professional Portraits
                      </h1>
                      <p className="service-detail-desc" style={{fontSize: '18px', color: '#333', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto'}}>
                        High-quality portrait photography that captures personality, style, and authentic moments for individuals, families, and professionals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Grid */}
            <div className="service-detail-gallery pb-120">
              <div className="container">
                <div className="row g-4 mb-60">
                  <div className="col-lg-5">
                    <div style={{position: 'relative', height: '600px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img1} alt="Professional Portrait" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div style={{position: 'relative', height: '600px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img2} alt="Individual Portrait" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                </div>

                <div className="row g-4 mb-60">
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img3} alt="Family Session" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img4} alt="Professional Headshot" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img5} alt="Lifestyle Photography" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="service-detail-content pb-120" style={{background: '#f8f9fa'}}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <div className="service-detail-info" style={{background: 'white', padding: '60px', borderRadius: '12px'}}>
                      <h2 style={{fontSize: '42px', fontWeight: 700, color: '#1a1a1a', marginBottom: '30px'}}>
                        Portrait Photography <span style={{color: '#B7C435'}}>Services</span>
                      </h2>
                      
                      <div className="row g-4 mb-50">
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Individual Portraits</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Personalized portrait sessions that showcase your unique personality and style with professional lighting and composition.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Family Sessions</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Beautiful family portraits that capture the love and connection between family members in natural settings.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Professional Headshots</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Corporate headshots for LinkedIn, company websites, and professional profiles that make the right impression.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Lifestyle Photography</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Casual, authentic portraits in everyday settings that tell your story naturally and beautifully.</p>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-60">
                        <Link href="/booking" className="service-cta-btn" style={{
                          background: '#B7C435',
                          color: 'white',
                          padding: '18px 50px',
                          borderRadius: '50px',
                          fontSize: '16px',
                          fontWeight: 600,
                          display: 'inline-block',
                          textDecoration: 'none',
                          boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                          transition: 'all 0.3s ease'
                        }}>
                          Book Your Portrait Session
                        </Link>
                      </div>
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
    </Wrapper>
  );
};

export default ProfessionalPortraitsPage;
