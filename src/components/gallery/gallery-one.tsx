import React, { CSSProperties, useState } from 'react';
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % gallery_images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + gallery_images.length) % gallery_images.length);
  };

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

                  {gallery_images.map((g, i) => (

                    <div key={i}>
                      <div className="tp-gallery-item mr-30 gallery-image-wrapper" onClick={() => openLightbox(i)}>
                        <div className="gallery-overlay"></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>×</button>
            <button className="lightbox-prev" onClick={prevImage}>‹</button>
            <Image
              src={gallery_images[currentImage]}
              alt="gallery-img-fullscreen"
              width={1200}
              height={800}
              style={{ objectFit: 'contain', maxWidth: '90vw', maxHeight: '90vh' }}
            />
            <button className="lightbox-next" onClick={nextImage}>›</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-image-wrapper {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 8px;
        }

        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.1);
          z-index: 1;
          transition: background-color 0.3s ease;
        }

        .gallery-image-wrapper:hover .gallery-overlay {
          background-color: rgba(0, 0, 0, 0.3);
        }

        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.9);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .lightbox-content {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lightbox-close {
          position: absolute;
          top: -50px;
          right: 0;
          background: none;
          border: none;
          color: white;
          font-size: 40px;
          cursor: pointer;
          z-index: 10001;
        }

        .lightbox-prev,
        .lightbox-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 30px;
          padding: 10px 15px;
          cursor: pointer;
          border-radius: 50%;
          transition: background-color 0.3s ease;
        }

        .lightbox-prev {
          left: -60px;
        }

        .lightbox-next {
          right: -60px;
        }

        .lightbox-prev:hover,
        .lightbox-next:hover {
          background: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 768px) {
          .gallery-responsive-img {
            max-width: 100vw !important;
            width: auto !important;
            height: auto !important;
          }

          .lightbox-prev {
            left: 10px;
          }

          .lightbox-next {
            right: 10px;
          }

          .lightbox-close {
            top: 20px;
            right: 20px;
          }
        }
      `}</style>
    </div>
  )
}
