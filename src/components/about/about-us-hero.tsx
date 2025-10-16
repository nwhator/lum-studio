// ...existing code...
import React, { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import { ScrollDown } from "../svg";
import Image from "next/image";
import { isMobileDevice } from "@/utils/ios-safe-gsap";
import AboutHeroGallery from "./about-hero-gallery";

export default function AboutUsHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  const scrollTo = () => {
    scroller.scrollTo('about-info', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart',
    });
  };
  return (
    <>
      <div
        className="ab-inner-hero-area p-relative"
        style={{
          minHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* Background Image for all devices */}
        <div className="ab-hero-bg-wrapper" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
          <Image
            src="/assets/img/backup-original/inner-about/hero/hero-1.jpg"
            alt="LUM Studios About Hero"
            fill
            priority
            quality={85}
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          {/* Dark overlay for better contrast */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.35)',
            zIndex: 2,
            pointerEvents: 'none',
          }} />
        </div>

        <div style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
        }}>
          <div className="breadcurmb-site d-none">
            <h6>About Us</h6>
          </div>
          <div className="ab-inner-hero-scroll smooth" style={{ marginBottom: '1.5rem' }}>
            <a className="pointer" onClick={scrollTo}>
              <span>
                Scroll to explore
                <ScrollDown />
              </span>
            </a>
          </div>
          <div
            className={isMobile
              ? "ab-inner-hero-title-box text-center"
              : "ab-inner-hero-title-box tp-char-animation text-center"}
            data-lag={isMobile ? undefined : "0.2"}
            data-stagger={isMobile ? undefined : "0.08"}
            style={{ maxWidth: 800, margin: '0 auto' }}
          >
            <span className="ab-inner-hero-subtitle" style={{ display: 'block', marginBottom: '1.2rem', fontWeight: 500, fontSize: '1.2rem' }}>
              Photography &amp; Videography
            </span>
            <h1 className="ab-inner-hero-title" style={{ marginTop: '2.5rem', marginBottom: '1.5rem', fontWeight: 700, fontSize: '3rem', lineHeight: 1.1 }}>
              Capturing Moments
            </h1>
            <p style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>
              Founded in 2020, LUM Studio is a creative photography and videography studio built on passion, precision, and artistry. We craft visuals that inspire — weddings, portraits, events, product shoots, and aerial coverage.
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
              Lum Studios develops, designs & delivers visual stories with precision and heart.
            </p>
            <a className="tp-btn-black-2" href="/booking" style={{ marginTop: '0.5rem', padding: '0.75rem 2.5rem', fontSize: '1.1rem' }}>
              Book Now
            </a>
          </div>
        </div>
      </div>
      <AboutHeroGallery />
    </>
  );
}