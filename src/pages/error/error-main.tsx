"use client";
import { gsap } from "gsap";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { ScrollSmoother, ScrollTrigger, SplitText } from "@/plugins";
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import FooterTwo from "@/layouts/footers/footer-two";
import error from '@/assets/img/error/error.png';

const ErrorMain = () => {
  useScrollSmooth();

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderTransparent />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* error hero */}
            <div className="tp-error-area pt-190 pb-120">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tp-error-wrapper text-center">
                      <div className="tp-error-number">
                        <h1 className="tp-error-big-title">404</h1>
                      </div>
                      <Image src={error} alt="error-img" style={{ height: 'auto' }} />
                      <div className="tp-error-content">
                        <h4 className="tp-error-title-sm">
                          Page Not Found
                        </h4>
                        <p>The page you are looking for doesn&apos;t exist or has been moved.</p>
                        <div className="tp-error-btn-wrapper">
                          <Link className="tp-btn-black-2 mr-20" href="/">
                            Back to Home
                          </Link>
                          <Link className="tp-btn-circle style-2" href="/gallery">
                            View Gallery
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* error hero */}
          </main>

          {/* footer area */}
          <FooterTwo topCls="" />
          {/* footer area */}
        </div>
      </div>
    </Wrapper>
  );
};

export default ErrorMain;
