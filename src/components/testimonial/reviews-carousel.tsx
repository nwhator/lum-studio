"use client";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Keyboard } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import reviews from "@/data/reviews-data";

// Simple card-only reviews carousel. No reviewer names required per request.
const sliderSetting: SwiperOptions = {
  slidesPerView: 4,
  spaceBetween: 24,
  loop: true,
  speed: 700,
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
  // pause on mouse enter will be handled by module props below (pauseOnMouseEnter)
  pagination: {
    clickable: true,
  },
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    576: { slidesPerView: 1.3 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  },
  navigation: {
    nextEl: ".tp-reviews-next",
    prevEl: ".tp-reviews-prev",
  },
};

const StarIcon: React.FC<{ size?: number; color?: string }> = ({ size = 16, color = '#f5c518' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 .587l3.668 7.431L23.4 9.75l-5.7 5.555L19.336 24 12 20.201 4.664 24l1.636-8.695L.6 9.75l7.732-1.732L12 .587z" />
  </svg>
);

const ReviewsCarousel: React.FC = () => {
  const swiperRef = useRef<any>(null);

  return (
  <div className="tp-reviews-area pt-80 pb-80" style={{ background: '#fff' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="tp-reviews-header text-center mb-40">
              <h2 className="tp-section-title">Reviews</h2>
              <p className="tp-section-subtitle">What our clients say about our work</p>
            </div>
            <div className="tp-reviews-slider-wrapper p-relative">
              <div className="tp-reviews-arrow-box d-none d-lg-block">
                <button
                  className="tp-reviews-prev"
                  aria-label="Previous reviews"
                  onClick={() => swiperRef.current?.slidePrev()}
                >
                  ‹
                </button>
                <button
                  className="tp-reviews-next"
                  aria-label="Next reviews"
                  onClick={() => swiperRef.current?.slideNext()}
                >
                  ›
                </button>
              </div>

              <Swiper
                {...sliderSetting}
                modules={[Autoplay, Navigation, Pagination, Keyboard]}
                onSwiper={(sw) => (swiperRef.current = sw)}
                className="swiper-container tp-reviews-slider"
                autoplay={{ ...(sliderSetting.autoplay as any), pauseOnMouseEnter: true }}
                keyboard={{ enabled: true }}
                pagination={{ clickable: true }}
              >
                {reviews.map((text, idx) => (
                  <SwiperSlide key={idx}>
                    <div
                      className="tp-review-card p-4 bg-white shadow-sm h-100"
                      style={{ minHeight: 140, borderRadius: 12, boxShadow: '0 10px 30px rgba(12,20,40,0.08)' }}
                      onClick={() => swiperRef.current?.slideNext()}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") swiperRef.current?.slideNext();
                      }}
                    >
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                        {/* 5 stars */}
                        <div style={{ display: 'flex', gap: 4 }} aria-hidden>
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} size={14} />
                          ))}
                        </div>
                        <div style={{ marginLeft: 'auto', opacity: 0.6, fontSize: 12 }}>
                          {/* optional small label - kept empty for now */}
                        </div>
                      </div>

                      <div style={{ fontStyle: 'italic', fontSize: 15, lineHeight: 1.4, color: '#111' }}>
                        <span style={{ fontSize: 30, lineHeight: 0.6, marginRight: 8, color: '#e9e9e9' }}>“</span>
                        <span>{text}</span>
                        <span style={{ fontSize: 30, lineHeight: 0.6, marginLeft: 8, color: '#e9e9e9' }}>”</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCarousel;
