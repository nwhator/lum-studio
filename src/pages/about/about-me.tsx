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
import AboutMeHero from "@/components/about/about-me-hero";
import AboutMeArea from "@/components/about/about-me-area";
import AboutPortfolio from "@/components/portfolio/about-portfolio";
import AboutWork from "@/components/work/about-work";
import LineImgSlider from "@/components/line-text/line-img-slider";
import BigText from "@/components/big-text";
import FooterTwo from "@/layouts/footers/footer-two";
// animation
import {charAnimation,fadeAnimation,titleAnimation} from "@/utils/title-animation";
import { hoverBtn } from "@/utils/hover-btn";
import { teamMarqueAnim } from "@/utils/scroll-marque";

const AboutMeMain = () => {
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      safeAnimationInit(() => {
        charAnimation();
        titleAnimation();
        teamMarqueAnim();
        fadeAnimation();
        hoverBtn();
      }, 'about-me-animations');
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
            {/* about hero */}
            <AboutMeHero />
            {/* about hero */}

            {/* about me area */}
            <AboutMeArea />
            {/* about me area */}

            {/* about portfolio */}
            <AboutPortfolio />
            {/* about portfolio */}

            {/* about work */}
            <AboutWork />
            {/* about work */}

            {/* line img slider */}
            <LineImgSlider/>
            {/* line img slider */}

            {/* big text */}
            <BigText cls="char-wrapper" />
            {/* big text */}
          </main>

          {/* footer area */}
          <FooterTwo topCls="" />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default AboutMeMain;
