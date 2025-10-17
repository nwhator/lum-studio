"use client";
import { gsap } from "gsap";
import React, { useEffect } from "react";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText, cursorAnimation } from "@/plugins";
import { registerGSAPPlugins, safeAnimationInit } from "@/utils/ios-safe-gsap";

// Register plugins safely (skips ScrollSmoother on iOS)
registerGSAPPlugins(gsap, { ScrollTrigger, ScrollSmoother, SplitText });

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import PortfolioGridColThreeArea from "@/components/portfolio/portfolio-grid-col-3-area";
import BigText from "@/components/big-text";
import FooterTwo from "@/layouts/footers/footer-two";
// animation
import { hoverBtn } from "@/utils/hover-btn";
import {charAnimation,fadeAnimation,titleAnimation,zoomAnimation} from "@/utils/title-animation";

const PortfolioGridColThreeMain = () => {
  useScrollSmooth();

  useEffect(() => {
    const isTouch = (typeof window !== 'undefined') && (("ontouchstart" in window) || (navigator.maxTouchPoints || 0) > 0);
    if (!isTouch) {
      document.body.classList.add("tp-magic-cursor");
    }
    return () => {
      document.body.classList.remove("tp-magic-cursor");
    }
  }, []);

  useEffect(() => {
    const isTouch = (typeof window !== 'undefined') && (("ontouchstart" in window) || (navigator.maxTouchPoints || 0) > 0);
    if(typeof window !== 'undefined' && !isTouch && document.querySelector('.tp-magic-cursor')) {
      safeAnimationInit(() => {
        cursorAnimation();
      }, 'cursor-animation');
    }
  },[]);

  useGSAP(() => {
    const timer = setTimeout(() => {
      safeAnimationInit(() => {
        charAnimation();
        titleAnimation();
        hoverBtn();
        zoomAnimation();
        fadeAnimation();
      }, 'gallery-animations');
    }, 100);
    return () => clearTimeout(timer);
  });

  return (
    <Wrapper>

      {/* magic cursor start */}
      <div id="magic-cursor">
        <div id="ball"></div>
      </div>
      {/* magic cursor end */}

      {/* header area start */}
      <HeaderTransparent />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* portfolio hero */}
            <div className="tm-hero-area tm-hero-ptb pt-120">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xxl-8 col-xl-10 col-lg-10 text-center">
                    <div className="tm-hero-content new-hero">
                      <h1 className="tm-hero-title fs-320 tp-char-animation">
                        Gallery
                      </h1>
                    </div>
                    <div className="tm-hero-text tp_title_anim" style={{ marginTop: 18 }}>
                      <p className="lead">
                        Explore curated portrait work and memorable moments — a gallery of stories captured with care.
                      </p>
                    </div>
                    {/* Primary CTA removed to keep hero clean and bold per UX request */}
                  </div>
                </div>
              </div>
            </div>
            {/* portfolio hero */}

            {/* portfolio area */}
            <PortfolioGridColThreeArea/>
            {/* portfolio area */}
          </main>

          {/* footer area */}
          {/** <FooterTwo topCls="" /> **/}
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default PortfolioGridColThreeMain;
