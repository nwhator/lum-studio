"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy load heavy components
const Wrapper = dynamic(() => import("@/layouts/wrapper"), { ssr: true });
const HeaderOne = dynamic(() => import("@/layouts/headers/header-one"), { ssr: true });
const FooterTwo = dynamic(() => import("@/layouts/footers/footer-two"), { ssr: true });

// Critical components loaded immediately
import HeroBannerFour from "@/components/hero-banner/hero-banner-four";
import GalleryOne from "@/components/gallery/gallery-one";
import AboutThree from "@/components/about/about-three";
import ProjectFour from "@/components/project/project-four";

const HomeLum = () => {
  const [animationsLoaded, setAnimationsLoaded] = useState(false);

  useEffect(() => {
    // Detect iOS Safari - skip heavy animations to prevent crashes
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOSSafari = isIOS && isSafari;
    
    if (isIOSSafari) {
      console.log('iOS Safari detected - using lightweight mode');
      setAnimationsLoaded(true);
      return;
    }

    document.body.classList.add("tp-smooth-scroll");
    
    // Lazy load GSAP and animations after initial paint
    const loadAnimations = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        // Add timeout protection to prevent hanging
        const loadWithTimeout = (promise: Promise<any>, timeout = 5000) => {
          return Promise.race([
            promise,
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Load timeout')), timeout)
            )
          ]);
        };

        // Load core GSAP modules (SKIP ScrollSmoother - causes iOS crashes)
        const [
          { gsap },
          { ScrollTrigger },
          { SplitText },
        ] = await Promise.all([
          loadWithTimeout(import('gsap')),
          loadWithTimeout(import('gsap/ScrollTrigger')),
          loadWithTimeout(import('gsap/SplitText')),
        ]);

        // Register plugins (NO ScrollSmoother)
        gsap.registerPlugin(ScrollTrigger, SplitText);

        // Load and initialize animations
        const { fadeAnimation, revelAnimationOne } = await loadWithTimeout(import('@/utils/title-animation'));
        const { projectThreeAnimation } = await loadWithTimeout(import('@/utils/project-anim'));
        const { ctaAnimation } = await loadWithTimeout(import('@/utils/cta-anim'));
        const { textInvert } = await loadWithTimeout(import('@/utils/text-invert'));

        fadeAnimation();
        revelAnimationOne();
        projectThreeAnimation();
        ctaAnimation();
        textInvert();

        setAnimationsLoaded(true);
      } catch (error) {
        console.error('Error loading animations (site will work without them):', error);
        setAnimationsLoaded(true); // Site works without animations
      }
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadAnimations());
    } else {
      setTimeout(() => loadAnimations(), 500);
    }

    return () => {
      document.body.classList.remove("tp-smooth-scroll");
    };
  }, []);

  return (
    <Wrapper>

      {/* header area start */}
      <HeaderOne />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>

            {/* hero area start */}
            <HeroBannerFour />
            {/* hero area end */}

            {/* gallery area start */}
            <GalleryOne />
            {/* gallery area end */}

            {/* about area start */}
            <AboutThree />
            {/* about area end */}

            {/* project area start */}
            <ProjectFour />
            {/* project area end */}

          </main>

          {/* footer area */}
          <FooterTwo />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default HomeLum;
