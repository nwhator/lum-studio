// ...existing code...
import React from "react";
import Image from "next/image";
import { Hand } from "../svg";

// images
import shape from "@/assets/img/inner-about/about/shape-1.png";
import ab_1 from "@/assets/img/inner-about/about/about-1.jpg";
import ab_2 from "@/assets/img/home-03/gallery/gal-3.jpg";
import ab_3 from "@/assets/img/home-03/gallery/gal-4.jpg";
import ab_4 from "@/assets/img/home-03/gallery/gal-5.jpg";

export default function AboutUsArea() {
  return (
    <div className="ab-about-area ab-about-mt pb-90 z-index-5">
      <div className="container container-1480">
        <div className="ab-about-thumb-wrap mb-180">
          <div className="row align-items-center">
            <div className="col-xl-6 col-lg-6 col-md-6 mb-30">
              <div className="ab-about-left-thumb">
                <div data-speed=".7" style={{ position: 'relative', height: 500, width: '100%' }}>
                 <Image
                    src={ab_1}
                    alt="about-img"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 mb-30">
              <div className="ab-about-right-thumb">
                <div data-speed="1.1" style={{ position: 'relative', height: 500, width: '100%' }}>
                  <Image
                    src={ab_2}
                    alt="about-img"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 mb-30">
              <div className="ab-about-left-thumb">
                <div data-speed="0.9" style={{ position: 'relative', height: 500, width: '100%' }}>
                  <Image
                    src={ab_3}
                    alt="about-img"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 mb-30">
              <div className="ab-about-right-thumb">
                <div data-speed="1.2" style={{ position: 'relative', height: 500, width: '100%' }}>
                  <Image
                    src={ab_4}
                    alt="about-img"
                    fill
                    style={{ objectFit: 'cover', borderRadius: '8px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="about-info" className="row">
          <div className="col-xxl-9">
            <div className="ab-about-content p-relative">
              <span>
                <Hand />
                Hi!
              </span>
              <p className="tp-dropcap tp_fade_bottom">
                Founded in 2020, LUM Studio is a full-service photography and videography studio
                focused on capturing authentic moments with creativity and technical precision.
                Our growing team of photographers, videographers, editors, and content specialists
                collaborate to deliver memorable visuals for weddings, portraits, events, products,
                and aerial projects.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-9">
            <div className="row">
              <div className="col-xl-5 col-lg-5 col-md-4 mb-40">
                <div className="ab-about-category-title-box p-relative">
                  <h4 className="ab-about-category-title">
                    Our <br />
                    <span>Services</span>
                  </h4>
                  <Image
                    className="ab-about-shape-1 d-none d-md-block"
                    src={shape}
                    alt="shape"
                  />
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-8">
                <div className="row">
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-40">
                    <div className="ab-about-category-list category-space-1 tp_fade_bottom">
                      <ul>
                        <li>Weddings & Events</li>
                        <li>Portraits & Family Sessions</li>
                        <li>Product & Commercial Shoots</li>
                        <li>Drone & Aerial Photography</li>
                        <li>Studio Rentals & Lighting</li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 mb-40">
                    <div className="ab-about-category-list category-space-2 tp_fade_bottom">
                      <ul>
                        <li>Videography & Event Coverage</li>
                        <li>Editing, Retouching & Color Grading</li>
                        <li>Social Media Content Packages</li>
                        <li>Creative Direction & Storyboarding</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}