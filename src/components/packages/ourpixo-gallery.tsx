"use client";
import React from 'react';

interface OurPixoGalleryProps {
  galleryUrl: string;
  title: string;
  subtitle?: string;
}

const OurPixoGallery: React.FC<OurPixoGalleryProps> = ({ galleryUrl, title, subtitle }) => {
  return (
    <section className="ourpixo-gallery-section pt-80 pb-80" style={{ background: '#fff' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="gallery-header text-center mb-50">
              <h2 className="gallery-title">{title}</h2>
              {subtitle && <p className="gallery-subtitle">{subtitle}</p>}
            </div>
            <div className="gallery-embed-container">
              <iframe
                src={galleryUrl}
                className="ourpixo-iframe"
                allowFullScreen
                loading="lazy"
                title={title}
              />
            </div>
            <div className="gallery-footer text-center mt-30">
              <a 
                href={galleryUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-full-gallery-btn"
              >
                View Full Gallery
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '8px' }}>
                  <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ourpixo-gallery-section {
          position: relative;
        }

        .gallery-header {
          margin-bottom: 40px;
        }

        .gallery-title {
          font-size: 36px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 15px;
        }

        .gallery-subtitle {
          font-size: 16px;
          line-height: 1.6;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
        }

        .gallery-embed-container {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          background: #f8f9fa;
        }

        .ourpixo-iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 12px;
        }

        .gallery-footer {
          margin-top: 30px;
        }

        .view-full-gallery-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          background: #2c3e50;
          color: white;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
          border: 2px solid #2c3e50;
        }

        .view-full-gallery-btn:hover {
          background: transparent;
          color: #2c3e50;
          text-decoration: none;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(44, 62, 80, 0.2);
        }

        .view-full-gallery-btn svg {
          transition: transform 0.3s ease;
        }

        .view-full-gallery-btn:hover svg {
          transform: translateX(4px);
        }

        @media (max-width: 991px) {
          .gallery-title {
            font-size: 32px;
          }

          .gallery-embed-container {
            padding-bottom: 75%; /* Adjust aspect ratio for tablets */
          }
        }

        @media (max-width: 768px) {
          .ourpixo-gallery-section {
            padding-top: 60px;
            padding-bottom: 60px;
          }

          .gallery-title {
            font-size: 28px;
          }

          .gallery-subtitle {
            font-size: 14px;
          }

          .gallery-embed-container {
            padding-bottom: 100%; /* More square on mobile */
            border-radius: 8px;
          }

          .view-full-gallery-btn {
            padding: 12px 24px;
            font-size: 13px;
            width: 100%;
          }
        }

        @media (max-width: 576px) {
          .gallery-title {
            font-size: 24px;
          }

          .gallery-embed-container {
            padding-bottom: 120%; /* Taller on small mobile */
          }

          .view-full-gallery-btn {
            padding: 10px 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </section>
  );
};

export default OurPixoGallery;
