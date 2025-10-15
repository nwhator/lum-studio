'use client';
import React from "react";
import { ArrowBg, RightArrowTwo } from "../svg";
import Link from "next/link";
import ParticleAnimation from "../effects/particle-animation";

export default function HeroBannerFour() {
  return (
    <div className="tp-hero-3-area tp-hero-3-ptb fix">
      <ParticleAnimation />
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-hero-3-content-box text-center p-relative">
              <h4 className="tp-hero-3-title tp_reveal_anim">
                <span className="tp-reveal-line">{"We're"} Capturing Moments, </span>
                <span className="tp-reveal-line">Creating Stories</span>
              </h4>
              <span className="tp-hero-3-category tp_reveal_anim">
                We illuminate you.
              </span>
              <Link className="tp-btn-black-2" href="/booking">
                Book a Shoot{" "}
                <span className="p-relative">
                  <RightArrowTwo />
                  <ArrowBg />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Hero overflow for particle animation */
        .tp-hero-3-area {
          overflow: hidden !important;
          position: relative;
          z-index: 1;
        }
        
        /* Reduce padding between header and hero */
        .tp-hero-3-ptb {
          padding-top: 100px !important;
        }
        
        @media (max-width: 768px) {
          .tp-hero-3-area {
            overflow: hidden !important;
            max-width: 100vw !important;
          }
          .tp-hero-3-ptb {
            padding-top: 80px !important;
          }
          .tp-hero-3-content-box {
            margin-bottom: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
