// ...existing code...
import React, { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import { ScrollDown } from "../svg";
import Image from "next/image";
import { isMobileDevice } from "@/utils/ios-safe-gsap";

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
    <div className="ab-inner-hero-area p-relative">
      {/* Background Image for all devices */}
      <div className="ab-hero-bg-wrapper">
        <Image
          src="/assets/img/inner-about/hero/hero-1.webp"
          alt="LUM Studios About Hero"
          fill
          priority
          quality={85}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>
      
      <div className="breadcurmb-site d-none">
        <h6>About Us</h6>
      </div>
      <div className="ab-inner-hero-scroll smooth">
        <a className="pointer" onClick={scrollTo}>
          <span>
            Scroll to explore
            <ScrollDown />
          </span>
        </a>
      </div>
      <div className="container container-1480">
        <div className="row">
          <div className="col-xl-8">
            <div
              className={
                isMobile
                  ? "ab-inner-hero-title-box"
                  : "ab-inner-hero-title-box tp-char-animation"
              }
              data-lag={isMobile ? undefined : "0.2"}
              data-stagger={isMobile ? undefined : "0.08"}
            >
              <span className="ab-inner-hero-subtitle">
                Photography &amp; Videography
              </span>
              <h1 className="ab-inner-hero-title">
                Capturing Moments
              </h1>
              <p>
                Founded in 2020, LUM Studio is a creative photography and videography studio built on passion, precision, and artistry. We craft visuals that inspire — weddings, portraits, events, product shoots, and aerial coverage.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-end">
          <div className="col-xl-5 col-lg-8">
            <div
              className="ab-inner-hero-content"
              data-lag="0.2"
              data-stagger="0.08"
            >
              <p>
                Lum Studios develops, designs & delivers visual stories with precision and heart.
              </p>
              <a className="tp-btn-black-2" href="/booking">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}