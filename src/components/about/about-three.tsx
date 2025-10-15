import React from "react";
import Image from "next/image";
import Link from "next/link";
// internal imports
import shape from '@/assets/img/home-03/about/ab-shape-img.png';
import { ArrowBg, RightArrowTwo } from "../svg";

const stats = [
  { number: "5+", label: "Years Experience" },
  { number: "4000+", label: "Happy Clients" },
  { number: "6500+", label: "Projects Completed" }
];

const features = [
  { 
    title: "Professional Quality", 
    desc: "High-end equipment and expertise"
  },
  { 
    title: "Fast Delivery", 
    desc: "Quick turnaround on all projects"
  },
  { 
    title: "Creative Vision", 
    desc: "Unique storytelling approach"
  },
  { 
    title: "Client Focused", 
    desc: "Your satisfaction is our priority"
  }
];

export default function AboutThree() {
  return (
    <div 
      className="tp-about-3-area pt-120 pb-120" 
      style={{ 
        background: 'transparent', 
        position: 'relative', 
        overflow: 'visible',
        zIndex: 2 
      }}
    >
      <div className="container">
        {/* Header Section */}
        <div className="row justify-content-center mb-60">
          <div className="col-xl-8">
            <div className="tp-about-3-title-box text-center">
              <span className="tp-section-subtitle-3">
                <span className="subtitle-line"></span>
                <span className="tp-subtitle-text">About LUM Studio</span>
                <span className="subtitle-line"></span>
              </span>
              <h2 className="tp-section-title-lg mt-20 mb-20">
                Capturing Moments, <br className="d-none d-md-block" />
                <span className="title-highlight">Creating Stories</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="row align-items-center mb-50">
          <div className="col-lg-5 mb-40 mb-lg-0">
            <div className="about-image-section">
              <div className="tp-about-3-shape">
                <Image src={shape} alt="LUM Studio" style={{ height: "auto" }} priority />
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="about-content-section">
              <p className="about-text-lead mb-25">
                Founded in 2020, LUM Studio is a creative photography and videography brand built 
                on passion, precision, and artistry.
              </p>
              <p className="about-text mb-35">
                We specialize in weddings, portraits, events, and lifestyle photography – bringing 
                technical excellence and creative vision to every project.
              </p>
              
              {/* Stats Mini */}
              <div className="about-stats-mini mb-35">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-mini-item">
                    <div className="stat-mini-number">{stat.number}</div>
                    <div className="stat-mini-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Features List */}
              <div className="features-list mb-35">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#B7C435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="feature-content">
                      <h6 className="feature-title">{feature.title}</h6>
                      <p className="feature-desc">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="about-cta-section">
                <Link className="tp-btn-green" href="/about-us">
                  Learn More About Us
                  <span className="p-relative ms-2">
                    <RightArrowTwo />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
