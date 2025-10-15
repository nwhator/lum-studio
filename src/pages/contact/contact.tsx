"use client";
import { gsap } from "gsap";
import React from "react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
import { useGSAP } from "@gsap/react";
import { registerGSAPPlugins, safeAnimationInit } from "@/utils/ios-safe-gsap";

// Register plugins safely (skips ScrollSmoother on iOS)
registerGSAPPlugins(gsap, { ScrollTrigger, ScrollSmoother, SplitText });

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import ContactTwo from "@/components/contact/contact-two";
import ContactLocation from "@/components/contact/contact-location";
import FooterTwo from "@/layouts/footers/footer-two";
// animation
import { charAnimation } from "@/utils/title-animation";

const ContactMain = () => {
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      safeAnimationInit(() => {
        charAnimation();
      }, 'contact-animations');
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
          <div
            className="inner-bg"
            style={{
              backgroundImage:
                "url(/assets/img/home-01/team/team-details-bg.png)",
            }}
          >
            <main>
              {/* hero area start */}
              <div className="tm-hero-area tm-hero-ptb p-relative pt-190">
                <div className="container">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="tm-hero-content">
                        <span className="tm-hero-subtitle">Lum Studios</span>
                        <h4 className="tm-hero-title-big tp-char-animation">
                          Get in touch
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* hero area end */}

              {/* contact area */}
              <ContactTwo/>
              {/* contact area */}

              {/* contact location */}
              <ContactLocation/>
              {/* contact location */}
            </main>

            {/* footer area */}
            <FooterTwo topCls="" whiteFooter={true} />
            {/* footer area */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ContactMain;
