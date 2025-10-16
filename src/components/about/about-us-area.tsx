import React from "react";
import Link from "next/link";
import Image from "next/image";

// images
import ab_1 from "@/assets/img/backup-original/inner-about/about/about-1.jpg";
import ab_2 from "@/assets/img/backup-original/home-03/gallery/gal-3.jpg";
import ab_3 from "@/assets/img/backup-original/home-03/gallery/gal-4.jpg";
import ab_4 from "@/assets/img/backup-original/home-03/gallery/gal-5.jpg";

// SVG checkmark for features
const CheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="11" stroke="#B7C435" strokeWidth="2" fill="none"/>
    <path d="M7 12L10.5 15.5L17 9" stroke="#B7C435" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function AboutUsArea() {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpanded = (e?: React.KeyboardEvent | React.MouseEvent) => {
    if (e && 'key' in e) {
      const key = (e as React.KeyboardEvent).key;
      if (key !== 'Enter' && key !== ' ') return;
      e.preventDefault();
    }
    setExpanded((s) => !s);
  };

  return (
  <div className="ab-about-area-redesign ab-about-mt pb-90 z-index-5" style={{ paddingTop: 50 }}>
      <div className="container container-1480">
        {/* Folder-style Image Gallery (centered, peeking images that expand to grid on hover) */}
        <section className="about-hero-gallery" style={{ margin: '0 0 2rem 0' }}>
          <div className="folder-gallery">
              <div
                className={`folder-center${expanded ? ' expanded' : ''}`}
                tabIndex={0}
                role="button"
                aria-label={expanded ? 'Collapse gallery' : 'Open gallery'}
                onClick={() => toggleExpanded()}
                onKeyDown={(e) => toggleExpanded(e)}
              >
              <div className="folder-shell">Take a Peek</div>
              <div className="folder-images" aria-hidden={!expanded}>
                {[ab_1, ab_2, ab_3, ab_4].map((src, i) => (
                  <div key={i} className={`peek-img peek-${i+1}`}>
                    <Image src={src} alt={`About ${i+1}`} fill sizes="(max-width: 600px) 100vw, 25vw" style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <style jsx>{`
            .about-hero-gallery { display:block; }
            .folder-gallery { display:flex; justify-content:center; align-items:center; padding: 2.5rem 0; }
            .folder-center { position: relative; width: 760px; max-width: 96%; height: 360px; display:flex; align-items:flex-end; justify-content:center; transition: all 0.45s ease; }
            .folder-shell { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); background: #f5f5f5; padding: 10px 22px; border-radius: 8px 8px 4px 4px; box-shadow: 0 6px 18px rgba(0,0,0,0.08); font-weight:600; color:#222; z-index:5; }
            .folder-images { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; align-items: center; justify-items: center; pointer-events: none; }
            .peek-img { position: relative; width: 100%; height: 100%; max-width: 220px; border-radius: 12px; overflow: hidden; box-shadow: 0 8px 24px rgba(0,0,0,0.12); transition: transform 0.45s cubic-bezier(.2,.8,.2,1), opacity 0.35s; }
            /* initial peeking layout */
            .peek-1 { transform: translate(-60px, 40px) rotate(-6deg) scale(0.92); z-index:4; }
            .peek-2 { transform: translate(-20px, 20px) rotate(-2deg) scale(0.96); z-index:3; }
            .peek-3 { transform: translate(20px, 20px) rotate(2deg) scale(0.96); z-index:2; }
            .peek-4 { transform: translate(60px, 40px) rotate(6deg) scale(0.92); z-index:1; }
            .peek-img :global(img) { width:100%; height:100%; object-fit:cover; }

            /* On hover/focus expand to full grid */
            .folder-center:hover, .folder-center:focus {
              height: auto;
            }
            .folder-center:hover .peek-img,
            .folder-center:focus .peek-img {
              transform: none; opacity:1; pointer-events:auto;
            }
            .folder-center:hover .folder-images,
            .folder-center:focus .folder-images {
              position: relative; grid-template-columns: repeat(4, 1fr); gap: 16px; align-items: stretch; height: auto; pointer-events:auto; padding-top: 28px;
            }

            /* Force same height and show as 4-up on desktop */
            .folder-center .peek-img { height: 240px; }
            @media (min-width: 1200px) {
              .folder-center { width: 1100px; height: 360px; }
              .folder-center .peek-img { height: 260px; }
            }

            /* Mobile: make horizontal swipeable carousel with snap */
            @media (max-width: 768px) {
              .folder-center { width: 100%; height: 220px; }
              .folder-images { display:flex; gap:12px; overflow-x:auto; scroll-snap-type:x mandatory; padding: 8px 12px; }
              .peek-img { flex: 0 0 70%; min-width: 70%; height: 200px; scroll-snap-align:center; }
              .peek-img :global(img) { width:100%; height:100%; object-fit:cover; }
              .folder-shell { display:none; }
            }

            /* Accessibility: focus outline */
            .folder-center:focus { outline: 3px solid rgba(183,196,53,0.18); }

            /* About area top removal handled by outer style */
            .ab-cta-button:hover { background:#B7C435; color:#222; }
          `}</style>
        </section>

        {/* About Content Section */}
        <div id="about-info" className="row justify-content-center mb-80">
          <div className="col-xxl-10 col-xl-11">
            <div className="ab-about-content-redesign text-center">
              <h2 className="ab-about-main-title mb-4">
                Capturing Authentic Moments with <span className="brand-green-text">Creativity & Precision</span>
              </h2>
              <p className="ab-about-description">
                Founded in 2020, LUM Studio is a full-service photography and videography studio 
                focused on capturing authentic moments with creativity and technical precision. 
                Our growing team of photographers, videographers, editors, and content specialists 
                collaborate to deliver memorable visuals for weddings, portraits, events, products, 
                and aerial projects.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row justify-content-center mb-80">
          <div className="col-xl-10">
            <div className="ab-stats-wrapper">
              <div className="row g-4">
                <div className="col-lg-4 col-md-4 col-sm-6">
                  <div className="ab-stat-card">
                    <h3 className="stat-number brand-green-text">4000+</h3>
                    <p className="stat-label">Happy Clients</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                  <div className="ab-stat-card">
                    <h3 className="stat-number brand-green-text">6500+</h3>
                    <p className="stat-label">Projects Completed</p>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6">
                  <div className="ab-stat-card">
                    <h3 className="stat-number brand-green-text">5+</h3>
                    <p className="stat-label">Years Experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="ab-services-section">
              <div className="text-center mb-60">
                <h3 className="ab-services-title">
                  Our <span className="brand-green-text">Services</span>
                </h3>
                <p className="ab-services-subtitle">
                  Comprehensive photography and videography solutions for every occasion
                </p>
              </div>

              <div className="row g-4">
                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Weddings & Events</h4>
                      <p>Capture your special moments with professional coverage</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Portraits & Family Sessions</h4>
                      <p>Timeless portraits that tell your unique story</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Product & Commercial Shoots</h4>
                      <p>Elevate your brand with stunning product photography</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Drone & Aerial Photography</h4>
                      <p>Breathtaking perspectives from above</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Videography & Event Coverage</h4>
                      <p>Professional video production and editing</p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6">
                  <div className="ab-service-card">
                    <div className="service-icon-wrapper">
                      <CheckIcon />
                    </div>
                    <div className="service-content">
                      <h4>Studio Rentals & Creative Direction</h4>
                      <p>Professional space and expert guidance for your projects</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center mt-60">
                <Link href="/booking" className="ab-cta-button">
                  Book a Session
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}