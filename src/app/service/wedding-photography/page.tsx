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
import img1 from "@/assets/img/inner-project/portfolio-col-2/port-1.jpg";
import img2 from "@/assets/img/inner-project/portfolio-col-2/port-2.jpg";
import img3 from "@/assets/img/inner-project/portfolio-col-2/port-3.jpg";
import img4 from "@/assets/img/inner-project/portfolio-col-2/port-4.jpg";
import img5 from "@/assets/img/home-03/gallery/gal-1.jpg";
import img6 from "@/assets/img/home-03/gallery/gal-2.jpg";

const WeddingPhotographyPage = () => {
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      safeAnimationInit(() => {
        charAnimation();
        titleAnimation();
      }, 'wedding-service-animations');
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
                      <span className="service-detail-subtitle" style={{color: '#B7C435', fontSize: '14px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', display: 'block', marginBottom: '20px'}}>
                        Photography Studio
                      </span>
                      <h1 className="service-detail-title tp-char-animation" style={{fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 700, color: '#1a1a1a', marginBottom: '30px', lineHeight: 1.2}}>
                        Wedding Photography
                      </h1>
                      <p className="service-detail-desc" style={{fontSize: '18px', color: '#333', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto'}}>
                        Capture the magic of your special day with our professional wedding photography services. We tell your love story through timeless images that you&apos;ll cherish forever.
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
                  <div className="col-lg-8">
                    <div style={{position: 'relative', height: '600px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img1} alt="Wedding Photography" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '600px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img2} alt="Wedding Photography" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                </div>

                <div className="row g-4 mb-60">
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img3} alt="Wedding Photography" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img4} alt="Wedding Photography" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img5} alt="Wedding Photography" fill style={{objectFit: 'cover'}} />
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
                        Our Wedding Photography <span style={{color: '#B7C435'}}>Services</span>
                      </h2>
                      
                      <div className="row g-4 mb-50">
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Full-Day Coverage</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>From getting ready to the last dance, we capture every moment of your special day with professional excellence.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Pre-Wedding Shoots</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Beautiful engagement and pre-wedding sessions to tell your love story before the big day.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Drone Photography</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Stunning aerial shots that add a unique perspective to your wedding album.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Professional Editing</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Expert retouching and color grading to ensure every photo is perfect.</p>
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
                          Book Your Wedding Session
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

export default WeddingPhotographyPage;
