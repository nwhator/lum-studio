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
                            height={600}
                            width={500}
                            style={{ 
                              objectFit: 'cover'
                            }}
                            className="gallery-responsive-img"
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
          transition: transform 0.3s ease;
          border-radius: 8px;
        }
        
        @media (max-width: 768px) {
          .gallery-responsive-img {
            max-width: 42vw !important;
            width: 42vw !important;
            height: 300px !important;
            object-fit: cover !important;
          }
          
          .tp-gallery-item {
            margin-right: 10px !important;
          }
          
          .gallery-image-wrapper {
            border-radius: 6px;
          }
          
          .gallery-hover-overlay {
            border-radius: 6px;
          }
          
          .gallery-image-wrapper:hover .gallery-responsive-img {
            transform: scale(1.02);
          }
        }
        
        @media (max-width: 480px) {
          .gallery-responsive-img {
            max-width: 40vw !important;
            width: 40vw !important;
            height: 280px !important;
          }
          
          .tp-gallery-item {
            margin-right: 8px !important;
          }
        }
      `}</style>
    </div>
  )
}
