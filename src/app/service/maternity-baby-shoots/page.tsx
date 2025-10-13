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
import img1 from "@/assets/img/inner-project/portfolio-col-2/port-5.jpg";
import img2 from "@/assets/img/inner-project/portfolio-col-2/port-6.jpg";
import img3 from "@/assets/img/inner-project/portfolio-col-2/port-7.jpg";
import img4 from "@/assets/img/inner-project/portfolio-col-2/port-8.jpg";
import img5 from "@/assets/img/home-03/gallery/gal-3.jpg";
import img6 from "@/assets/img/home-03/gallery/gal-4.jpg";

const MaternityBabyPage = () => {
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      safeAnimationInit(() => {
        charAnimation();
        titleAnimation();
      }, 'maternity-service-animations');
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
                        Maternity & Baby Shoots
                      </h1>
                      <p className="service-detail-desc" style={{fontSize: '18px', color: '#333', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto'}}>
                        Celebrate the beauty of motherhood and your baby&apos;s precious early moments with our gentle, professional photography services.
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
                  <div className="col-lg-6">
                    <div style={{position: 'relative', height: '500px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img1} alt="Maternity Photography" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div style={{position: 'relative', height: '500px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img2} alt="Baby Photography" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                </div>

                <div className="row g-4 mb-60">
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img3} alt="Maternity Shoot" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img4} alt="Newborn Photography" fill style={{objectFit: 'cover'}} />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div style={{position: 'relative', height: '400px', borderRadius: '12px', overflow: 'hidden'}}>
                      <Image src={img5} alt="Baby Milestones" fill style={{objectFit: 'cover'}} />
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
                        Maternity & Baby <span style={{color: '#B7C435'}}>Services</span>
                      </h2>
                      
                      <div className="row g-4 mb-50">
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Maternity Sessions</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Beautiful, comfortable maternity photography that celebrates your pregnancy journey with elegance and style.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Newborn Photography</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Gentle, safe newborn photography within the first two weeks, capturing those precious tiny details.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Baby Milestones</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Document your baby&apos;s growth with milestone sessions at 3, 6, 9, and 12 months.</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="service-feature-box" style={{padding: '30px', background: '#f8f9fa', borderRadius: '8px', borderLeft: '4px solid #B7C435'}}>
                            <h4 style={{fontSize: '22px', fontWeight: 600, color: '#1a1a1a', marginBottom: '15px'}}>Family Portraits</h4>
                            <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>Include siblings and parents for heartwarming family photos with your new addition.</p>
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
                          Book Your Maternity Session
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ Section */}
                <div className="row justify-content-center mt-80">
                  <div className="col-xl-10">
                    <div className="service-faq-section" style={{background: 'white', padding: '60px', borderRadius: '12px'}}>
                      <h3 style={{fontSize: '36px', fontWeight: 700, color: '#1a1a1a', marginBottom: '40px', textAlign: 'center'}}>
                        Frequently Asked <span style={{color: '#B7C435'}}>Questions</span>
                      </h3>
                      
                      <div className="faq-items">
                        <div className="faq-item" style={{marginBottom: '30px', padding: '25px', background: '#f8f9fa', borderRadius: '8px'}}>
                          <h5 style={{fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px'}}>
                            When is the best time for a maternity shoot?
                          </h5>
                          <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>
                            The ideal time is between 28-34 weeks of pregnancy when your bump is beautifully round but you&apos;re still comfortable moving around.
                          </p>
                        </div>

                        <div className="faq-item" style={{marginBottom: '30px', padding: '25px', background: '#f8f9fa', borderRadius: '8px'}}>
                          <h5 style={{fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px'}}>
                            Do you provide maternity gowns?
                          </h5>
                          <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>
                            <strong style={{color: '#e74c3c'}}>No, we do not provide maternity gowns.</strong> We recommend bringing your own outfits that make you feel beautiful and comfortable. We suggest flowing dresses, fitted gowns, or casual outfits depending on your preferred style. We&apos;re happy to provide styling suggestions before your session.
                          </p>
                        </div>

                        <div className="faq-item" style={{marginBottom: '30px', padding: '25px', background: '#f8f9fa', borderRadius: '8px'}}>
                          <h5 style={{fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px'}}>
                            When should we schedule a newborn session?
                          </h5>
                          <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>
                            Newborn sessions are best done within the first 5-14 days after birth when babies are still very sleepy and curly. We recommend booking your session during pregnancy and we&apos;ll schedule the exact date after your baby arrives.
                          </p>
                        </div>

                        <div className="faq-item" style={{marginBottom: '30px', padding: '25px', background: '#f8f9fa', borderRadius: '8px'}}>
                          <h5 style={{fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px'}}>
                            Can we include siblings and partners?
                          </h5>
                          <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>
                            Absolutely! We encourage including your partner and other children for some beautiful family moments. These photos become treasured memories for the whole family.
                          </p>
                        </div>

                        <div className="faq-item" style={{marginBottom: '30px', padding: '25px', background: '#f8f9fa', borderRadius: '8px'}}>
                          <h5 style={{fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px'}}>
                            What should I bring to the session?
                          </h5>
                          <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>
                            For maternity: Bring 2-3 outfit changes, comfortable shoes, and any props or accessories you&apos;d like to include. For newborn: Bring feeding supplies, extra diapers, and any special items like a family heirloom blanket. We provide all wraps, props, and backdrops for newborn sessions.
                          </p>
                        </div>

                        <div className="faq-item" style={{padding: '25px', background: '#f8f9fa', borderRadius: '8px'}}>
                          <h5 style={{fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '12px'}}>
                            How long does a session take?
                          </h5>
                          <p style={{color: '#333', lineHeight: 1.7, margin: 0}}>
                            Maternity sessions typically last 1-2 hours. Newborn sessions can take 2 hours to allow for feeding, soothing, and multiple setups. We work at your baby&apos;s pace to ensure they&apos;re comfortable and we get those perfect shots.
                          </p>
                        </div>
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

export default MaternityBabyPage;
