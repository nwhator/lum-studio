'use client';
import React from "react";
import { ArrowBg, RightArrowTwo } from "../svg";
import Link from "next/link";

export default function HeroBannerFour() {
  return (
    <div className="tp-hero-3-area tp-hero-3-ptb fix">
      {/* Animated gradient background */}
      <div className="hero-gradient-bg"></div>
      
      {/* Decorative shapes */}
      <div className="hero-shapes">
        <div className="shape-circle shape-1"></div>
        <div className="shape-circle shape-2"></div>
        <div className="shape-circle shape-3"></div>
        <div className="shape-square shape-4"></div>
        <div className="shape-square shape-5"></div>
      </div>

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
        /* Hero area with gradient background */
        .tp-hero-3-area {
          overflow: hidden !important;
          position: relative;
          z-index: 1;
          background: #ffffff;
        }
        
        /* Animated gradient background */
        .hero-gradient-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(183, 196, 53, 0.03) 0%,
            rgba(255, 255, 255, 1) 25%,
            rgba(255, 255, 255, 1) 50%,
            rgba(183, 196, 53, 0.03) 75%,
            rgba(160, 176, 48, 0.05) 100%
          );
          animation: gradientShift 15s ease infinite;
          z-index: 0;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          50% {
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
        }

        /* Decorative floating shapes */
        .hero-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
        }

        .shape-circle,
        .shape-square {
          position: absolute;
          border-radius: 50%;
          opacity: 0.08;
        }

        .shape-square {
          border-radius: 8px;
        }

        .shape-1 {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #B7C435 0%, #a0b030 100%);
          top: 15%;
          left: 10%;
          animation: float1 20s ease-in-out infinite;
        }

        .shape-2 {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #a0b030 0%, #B7C435 100%);
          top: 60%;
          right: 15%;
          animation: float2 18s ease-in-out infinite;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          background: linear-gradient(135deg, #B7C435 0%, rgba(183, 196, 53, 0.5) 100%);
          bottom: 20%;
          left: 20%;
          animation: float3 22s ease-in-out infinite;
        }

        .shape-4 {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #a0b030 0%, #B7C435 100%);
          top: 30%;
          right: 25%;
          animation: float1 16s ease-in-out infinite reverse;
        }

        .shape-5 {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, rgba(183, 196, 53, 0.6) 0%, #a0b030 100%);
          bottom: 35%;
          right: 10%;
          animation: float2 19s ease-in-out infinite reverse;
        }

        @keyframes float1 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) translateX(20px) rotate(180deg);
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(25px) translateX(-25px) scale(1.1);
          }
        }

        /* Content positioning */
        .tp-hero-3-content-box {
          position: relative;
          z-index: 2;
        }
        
        /* Add top padding for spacing from header */
        .tp-hero-3-ptb {
          padding-top: 150px !important;
        }
        
        @media (max-width: 768px) {
          .tp-hero-3-area {
            overflow: hidden !important;
            max-width: 100vw !important;
          }
          .tp-hero-3-ptb {
            padding-top: 130px !important;
          }
          .tp-hero-3-content-box {
            margin-bottom: 0 !important;
          }

          /* Simplify shapes on mobile */
          .shape-1, .shape-3 {
            width: 80px;
            height: 80px;
          }
          .shape-2 {
            width: 60px;
            height: 60px;
          }
          .shape-4, .shape-5 {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
