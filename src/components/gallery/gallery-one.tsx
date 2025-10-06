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

  // Show only first image on mobile, all images on desktop/tablet
  const imagesToShow = isMobile ? [gallery_images[0]] : gallery_images;

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
                {isMobile ? (
                  // Mobile view: Show only first image, no marquee
                  <div className="mobile-single-image">
                    <div className="tp-gallery-item">
                      <Image
                        src={imagesToShow[0]}
                        alt="gallery-img"
                        height={600}
                        width={500}
                        style={{ 
                          objectFit: 'contain'
                        }}
                        className="gallery-responsive-img"
                      />
                    </div>
                  </div>
                ) : (
                  // Desktop/Tablet view: Show all images with marquee
                  <Marquee className="tp-gallery-titming" speed={100} direction='left'>
                    {imagesToShow.map((g, i) => (
                      <div key={i}>
                        <div className="tp-gallery-item mr-30">
                          <Image
                            src={g}
                            alt="gallery-img"
                            height={600}
                            width={500}
                            style={{ 
                              objectFit: 'contain'
                            }}
                            className="gallery-responsive-img"
                          />
                        </div>
                      </div>
                    ))}
                  </Marquee>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .mobile-single-image {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        @media (max-width: 768px) {
          .gallery-responsive-img {
            max-width: 90% !important;
            width: 90% !important;
            height: auto !important;
          }

          .mobile-single-image .tp-gallery-item {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  )
}
