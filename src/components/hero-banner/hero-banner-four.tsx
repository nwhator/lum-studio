'use client';
import React from "react";
import { ArrowBg, RightArrowTwo } from "../svg";
import Link from "next/link";

export default function HeroBannerFour() {
  return (
    <div className="tp-hero-3-area tp-hero-3-ptb fix">
      {/* Beautiful Gradient Mesh Background */}
      <div className="hero-gradient-mesh"></div>
      
      {/* Minimal Colorful Floating Elements */}
      <div className="hero-floating-elements">
        <div className="float-orb orb-1"></div>
        <div className="float-orb orb-2"></div>
        <div className="float-orb orb-3"></div>
        <div className="float-dot dot-1"></div>
        <div className="float-dot dot-2"></div>
        <div className="float-dot dot-3"></div>
        <div className="float-line line-1"></div>
        <div className="float-line line-2"></div>
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
        /* Hero area with minimal design - overflow visible */
        .tp-hero-3-area {
          overflow: visible !important;
          position: relative;
          z-index: 1;
          background: linear-gradient(to bottom, #fafafa 0%, #ffffff 100%);
        }
        
        /* Beautiful Gradient Mesh Background - extends beyond hero */
        .hero-gradient-mesh {
          position: absolute;
          top: -200px;
          left: 0;
          width: 100%;
          height: calc(100% + 400px);
          background: 
            radial-gradient(at 20% 30%, rgba(183, 196, 53, 0.15) 0px, transparent 50%),
            radial-gradient(at 80% 20%, rgba(102, 126, 234, 0.15) 0px, transparent 50%),
            radial-gradient(at 40% 70%, rgba(240, 147, 251, 0.12) 0px, transparent 50%),
            radial-gradient(at 90% 80%, rgba(79, 172, 254, 0.14) 0px, transparent 50%),
            radial-gradient(at 10% 90%, rgba(183, 196, 53, 0.1) 0px, transparent 50%);
          animation: meshMove 20s ease-in-out infinite;
          z-index: 0;
          pointer-events: none;
        }

        @keyframes meshMove {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        /* Minimal Floating Elements Container - extends beyond hero */
        .hero-floating-elements {
          position: absolute;
          top: -200px;
          left: 0;
          width: 100%;
          height: calc(100% + 400px);
          z-index: 1;
          pointer-events: none;
        }

        /* Soft Glowing Orbs */
        .float-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(183, 196, 53, 0.4) 0%, rgba(183, 196, 53, 0) 70%);
          top: 10%;
          left: 15%;
          animation: floatOrb1 25s infinite;
        }

        .orb-2 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.35) 0%, rgba(102, 126, 234, 0) 70%);
          top: 50%;
          right: 10%;
          animation: floatOrb2 30s infinite;
        }

        .orb-3 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(240, 147, 251, 0.3) 0%, rgba(240, 147, 251, 0) 70%);
          bottom: 15%;
          left: 25%;
          animation: floatOrb3 28s infinite;
        }

        /* Small Colorful Dots */
        .float-dot {
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          opacity: 0.8;
        }

        .dot-1 {
          background: linear-gradient(135deg, #B7C435, #a0b030);
          top: 25%;
          left: 30%;
          animation: floatDot 15s infinite;
        }

        .dot-2 {
          background: linear-gradient(135deg, #667eea, #764ba2);
          top: 40%;
          right: 20%;
          animation: floatDot 18s infinite reverse;
        }

        .dot-3 {
          background: linear-gradient(135deg, #f093fb, #f5576c);
          bottom: 30%;
          left: 40%;
          animation: floatDot 20s infinite;
        }

        /* Minimal Lines */
        .float-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(183, 196, 53, 0.35), transparent);
          border-radius: 1px;
          opacity: 0.6;
        }

        .line-1 {
          width: 150px;
          top: 35%;
          left: 10%;
          animation: slideLine 12s infinite;
          transform: rotate(-15deg);
        }

        .line-2 {
          width: 120px;
          bottom: 25%;
          right: 15%;
          animation: slideLine 15s infinite reverse;
          transform: rotate(15deg);
        }

        /* Animations */
        @keyframes floatOrb1 {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(30px, -40px);
          }
          50% {
            transform: translate(-20px, -80px);
          }
          75% {
            transform: translate(40px, -40px);
          }
        }

        @keyframes floatOrb2 {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(-40px, 30px);
          }
          66% {
            transform: translate(20px, -30px);
          }
        }

        @keyframes floatOrb3 {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -30px) scale(1.1);
          }
        }

        @keyframes floatDot {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-50px) rotate(180deg);
            opacity: 1;
          }
        }

        @keyframes slideLine {
          0%, 100% {
            transform: translateX(0) rotate(-15deg);
            opacity: 0.2;
          }
          50% {
            transform: translateX(50px) rotate(-15deg);
            opacity: 0.6;
          }
        }

        /* Content positioning */
        .tp-hero-3-content-box {
          position: relative;
          z-index: 10;
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

          /* Simplify on mobile for performance */
          .orb-1, .orb-2 {
            width: 180px;
            height: 180px;
            filter: blur(30px);
          }
          
          .orb-3 {
            display: none;
          }

          .float-line {
            display: none;
          }

          .float-dot {
            width: 6px;
            height: 6px;
          }

          .dot-3 {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
