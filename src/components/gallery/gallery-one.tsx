import React, { CSSProperties, useState, useEffect } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
// images
import shape_1 from '@/assets/img/home-03/gallery/gal-shape-1.png';
import shape_d_1 from '@/assets/img/home-03/gallery/gal-shape-dark-1.png';
import shape_2 from '@/assets/img/home-03/gallery/gal-shape-2.png';
import shape_d_2 from '@/assets/img/home-03/gallery/gal-shape-dark-2.png';
import g_1 from '@/assets/img/home-03/gallery/gal-1.jpg';
import g_2 from '@/assets/img/home-03/gallery/gal-2.jpg';
import g_3 from '@/assets/img/home-03/gallery/gal-3.jpg';
import g_4 from '@/assets/img/home-03/gallery/gal-4.jpg';
import g_5 from '@/assets/img/home-03/gallery/gal-5.jpg';


const gallery_images = [
  g_1, g_2, g_3, g_4, g_5, g_3, g_1, g_2, g_3, g_4, g_5, g_3
]

const imgStyle:CSSProperties = {height: "auto"};

export default function GalleryOne() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Show only first image repeated on mobile for animation, all images on desktop/tablet
  const imagesToShow = isMobile ? 
    [g_1, g_2, g_3, g_4, g_5, g_1, g_2, g_3, g_4, g_5] : // Show all images cycling on mobile too
    gallery_images;

  return (
    <div className="tp-gallery-area fix p-relative">
      <div className="tp-gallery-shape-1">
        <Image className="img-1" src={shape_1} alt="shape" style={imgStyle} />
        <Image className="img-2" src={shape_d_1} alt="shape" style={imgStyle} />
      </div>
      <div className="tp-gallery-shape-2">
        <Image className="img-1" src={shape_2} alt="shape" style={imgStyle} />
        <Image className="img-2" src={shape_d_2} alt="shape" style={imgStyle} />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-gallery-slider-wrap">
              <div className="swiper-container tp-gallery-slider-active">
                <Marquee className="tp-gallery-titming" speed={100} direction='left'>
                  {imagesToShow.map((g, i) => (
                    <div key={i}>
                      <div className="tp-gallery-item mr-30">
                        <div className="gallery-image-wrapper">
                          <Image
                            src={g}
                            alt="gallery-img"
                            width={300}
                            height={380}
                            className="gallery-responsive-img"
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            loading={i < 3 ? "eager" : "lazy"}
                            priority={i < 3}
                            sizes="(max-width: 768px) 40vw, 300px"
                          />
                          <div className="gallery-hover-overlay"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gallery-image-wrapper {
          position: relative;
          display: inline-block;
          cursor: pointer;
          overflow: hidden;
          border-radius: 8px;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          width: 300px;
          height: 380px;
        }
        
        .gallery-hover-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0);
          transition: background-color 0.3s ease;
          pointer-events: none;
          border-radius: 8px;
        }
        
        .gallery-image-wrapper:hover .gallery-hover-overlay {
          background-color: rgba(0, 0, 0, 0.2);
        }
        
        .gallery-image-wrapper:hover .gallery-responsive-img {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        
        .gallery-responsive-img {
          display: block;
          width: 100% !important;
          height: 100% !important;
          transition: transform 0.3s ease;
          border-radius: 8px;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          -webkit-touch-callout: none;
          object-fit: cover !important;
        }
        
        @media (max-width: 992px) {
          .gallery-image-wrapper {
            width: 280px;
            height: 360px;
          }
        }
        
        @media (max-width: 768px) {
          .gallery-image-wrapper {
            width: 36vw;
            height: 220px;
            border-radius: 10px;
          }
          
          .tp-gallery-item {
            margin-right: 15px !important;
          }
          
          .gallery-image-wrapper {
            border-radius: 10px;
          }
          
          .gallery-hover-overlay {
            border-radius: 10px;
          }
          
          .gallery-image-wrapper:hover .gallery-responsive-img {
            transform: scale(1.02);
          }
        }
        
        @media (max-width: 480px) {
          .gallery-image-wrapper {
            width: 34vw;
            height: 200px;
          }
          
          .tp-gallery-item {
            margin-right: 10px !important;
          }
        }
      `}</style>
    </div>
  )
}
