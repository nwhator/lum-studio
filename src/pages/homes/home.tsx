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
    document.body.classList.add("tp-smooth-scroll");
    
    // Lazy load GSAP and animations after initial paint
    const loadAnimations = async () => {
      // Wait for critical content to render first
      if (typeof window === 'undefined') return;
      
      // Use requestIdleCallback for non-blocking load
      if ('requestIdleCallback' in window) {
        requestIdleCallback(async () => {
          try {
            const [
              { gsap },
              { ScrollTrigger },
              { ScrollSmoother },
              { SplitText },
              { useGSAP }
            ] = await Promise.all([
              import('gsap'),
              import('gsap/ScrollTrigger'),
              import('gsap/ScrollSmoother'),
              import('gsap/SplitText'),
              import('@gsap/react')
            ]);

            // Register plugins
            gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

            // Initialize animations
            const { fadeAnimation, revelAnimationOne } = await import('@/utils/title-animation');
            const { projectThreeAnimation } = await import('@/utils/project-anim');
            const { ctaAnimation } = await import('@/utils/cta-anim');
            const { textInvert } = await import('@/utils/text-invert');

            fadeAnimation();
            revelAnimationOne();
            projectThreeAnimation();
            ctaAnimation();
            textInvert();

            setAnimationsLoaded(true);
          } catch (error) {
            console.error('Failed to load animations:', error);
          }
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(async () => {
          try {
            const [
              { gsap },
              { ScrollTrigger },
              { ScrollSmoother },
              { SplitText },
              { useGSAP }
            ] = await Promise.all([
              import('gsap'),
              import('gsap/ScrollTrigger'),
              import('gsap/ScrollSmoother'),
              import('gsap/SplitText'),
              import('@gsap/react')
            ]);

            gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, SplitText);

            const { fadeAnimation, revelAnimationOne } = await import('@/utils/title-animation');
            const { projectThreeAnimation } = await import('@/utils/project-anim');
            const { ctaAnimation } = await import('@/utils/cta-anim');
            const { textInvert } = await import('@/utils/text-invert');

            fadeAnimation();
            revelAnimationOne();
            projectThreeAnimation();
            ctaAnimation();
            textInvert();

            setAnimationsLoaded(true);
          } catch (error) {
            console.error('Failed to load animations:', error);
          }
        }, 500); // Delay to allow initial paint
      }
    };

    loadAnimations();

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
