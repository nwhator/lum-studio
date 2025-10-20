"use client";
import React, { useEffect, useState } from "react";
import nextDynamic from "next/dynamic";

// Lazy load heavy components
const Wrapper = nextDynamic(() => import("@/layouts/wrapper"), { ssr: true });
const HeaderOne = nextDynamic(() => import("@/layouts/headers/header-one"), { ssr: true });
const FooterTwo = nextDynamic(() => import("@/layouts/footers/footer-two"), { ssr: true });

// Critical components loaded immediately
import HeroBannerFour from "@/components/hero-banner/hero-banner-four";
import GalleryOne from "@/components/gallery/gallery-one";
import AboutThree from "@/components/about/about-three";
import ProjectFour from "@/components/project/project-four";
const ReviewsCarousel = nextDynamic(() => import("@/components/testimonial/reviews-carousel"), { ssr: false });

const HomeLum = () => {
  const [animationsLoaded, setAnimationsLoaded] = useState(false);
  const [isIOSSafari, setIsIOSSafari] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect iOS Safari - skip heavy animations to prevent crashes
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOSSafariBrowser = isIOS && isSafari;
    
    setIsIOSSafari(isIOSSafariBrowser);
    
    if (isIOSSafariBrowser) {
      console.log('iOS Safari detected - using lightweight mode, skipping heavy animations');
      setAnimationsLoaded(true);
      // Don't add smooth scroll class on iOS to prevent crashes
      return;
    }

    document.body.classList.add("tp-smooth-scroll");
    
    // Lazy load GSAP and animations after initial paint
    const loadAnimations = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        console.log('Loading animations...');
        
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

        console.log('GSAP modules loaded successfully');

        // Register plugins (NO ScrollSmoother)
        gsap.registerPlugin(ScrollTrigger, SplitText);

        // Load and initialize animations
        const { fadeAnimation, revelAnimationOne } = await loadWithTimeout(import('@/utils/title-animation'));
        const { projectThreeAnimation } = await loadWithTimeout(import('@/utils/project-anim'));
        const { ctaAnimation } = await loadWithTimeout(import('@/utils/cta-anim'));
        const { textInvert } = await loadWithTimeout(import('@/utils/text-invert'));

        console.log('Animation modules loaded, initializing...');

        fadeAnimation();
        revelAnimationOne();
        projectThreeAnimation();
        ctaAnimation();
        textInvert();

        setAnimationsLoaded(true);
        console.log('✅ Animations initialized successfully');
      } catch (error) {
        console.error('Error loading animations (site will work without them):', error);
        setAnimationsLoaded(true); // Site works without animations
      }
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadAnimations(), { timeout: 2000 });
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

      <div id="smooth-wrapper" style={{ overflow: 'visible' }}>
        <div id="smooth-content" style={{ overflow: 'visible' }}>
          <main style={{ overflow: 'visible', position: 'relative' }}>

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

            {/* reviews area start */}
            <ReviewsCarousel />
            {/* reviews area end */}

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
