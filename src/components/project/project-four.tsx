import React from "react";
import Image from "next/image";

import { ProjectShape, RightArrow } from "../svg";
// Portfolio images from gallery - Using string paths for public folder images
// These will be used as src strings for Next.js Image component
import Link from "next/link";

// portfolio data - Using string paths from public folder
const project_data = [
  {
    id: 1,
    img_classic: "/assets/img/inner-project/portfolio-col-2/port-1.webp",
    img_walkin: "/assets/img/inner-project/portfolio-col-2/port-2.webp",
    meta: "Newborn Photography",
    title: "Baby Shoots",
    slug: "baby-shoot",
    category: "Active",
    description: "Precious moments of your newborn"
  },
  {
    id: 2,
    img_classic: "/assets/img/inner-project/portfolio-col-2/port-4.webp",
    img_walkin: "/assets/img/inner-project/portfolio-col-2/port-5.webp",
    meta: "Wedding Photography",
    title: "Wedding Shoots",
    slug: "wedding",
    category: "Active",
    description: "Capturing your special day"
  },
  {
    id: 3,
    img_classic: "/assets/img/inner-project/portfolio-col-2/port-9.webp",
    img_walkin: "/assets/img/inner-project/portfolio-col-2/port-8.webp",
    meta: "Legal Milestone",
    title: "Call to Bar",
    slug: "call-to-bar",
    category: "Active",
    description: "Your professional achievement"
  },
  {
    id: 4,
    img_classic: "/assets/img/inner-project/portfolio-col-2/port-10.webp",
    img_walkin: "/assets/img/inner-project/portfolio-col-2/port-11.webp",
    meta: "Academic Achievement",
    title: "Convocation",
    slug: "convocation",
    category: "Active",
    description: "Celebrating your success"
  },
  {
    id: 5,
    img_classic: "/assets/img/inner-project/portfolio-col-2/port-13.webp",
    img_walkin: "/assets/img/inner-project/portfolio-col-2/port-14.webp",
    meta: "Portrait Photography",
    title: "Family Portraits",
    slug: "family-portraits",
    category: "Active",
    description: "Timeless family memories"
  },
  {
    id: 6,
    img_classic: "/assets/img/inner-project/portfolio-col-2/port-16.webp",
    img_walkin: "/assets/img/inner-project/portfolio-col-2/port-17.webp",
    meta: "Maternity Photography", 
    title: "Maternity Portraits",
    slug: "maternity",
    category: "Active",
    description: "Beautiful journey to motherhood"
  },
];
// prop type
type IProps = {
  style_2?: boolean;
};
export default function ProjectFour({ style_2 = false }: IProps) {
  return (
    <div className={`tp-project-modern-area ${style_2 ? "pt-60" : "pt-130 black-bg pb-130"}`}>
      <div className="container">
        {!style_2 && (
          <div className="row justify-content-center mb-60">
            <div className="col-xl-8">
              <div className="tp-project-modern-header text-center">
                <h1 className="tp-section-title">
                  Our Shoots
                </h1>
                <p className="tp-project-modern-subtitle">
                  Explore our professional photography services tailored for your special moments
                </p>
                <Link className="tp-btn-modern" href="/gallery">
                  View Full Gallery
                  <RightArrow clr="#fff" />
                </Link>
              </div>
            </div>
          </div>
        )}
        
        <div className="tp-project-modern-grid">
          {project_data.map((item, i) => (
            <div 
              key={item.id} 
              className="tp-project-modern-card"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="tp-project-modern-card-inner">
                {/* Classic Package */}
                <Link 
                  href={`/packages/${item.slug}?type=classic`} 
                  className="tp-project-package-item"
                >
                  <div className="tp-project-modern-image-wrapper">
                    <Image
                      src={item.img_classic}
                      alt={`${item.title} - Classic`}
                      width={500}
                      height={600}
                      className="tp-project-modern-image"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="tp-project-package-badge classic-badge">
                      <span>Classic</span>
                    </div>
                  </div>
                </Link>

                {/* Walk-in Package */}
                <Link 
                  href={`/packages/${item.slug}?type=walkin`} 
                  className="tp-project-package-item"
                >
                  <div className="tp-project-modern-image-wrapper">
                    <Image
                      src={item.img_walkin}
                      alt={`${item.title} - Walk-in`}
                      width={500}
                      height={600}
                      className="tp-project-modern-image"
                      style={{ objectFit: 'cover' }}
                    />
                    <div className="tp-project-package-badge walkin-badge">
                      <span>Walk-in</span>
                    </div>
                  </div>
                </Link>

                {/* Content Overlay */}
                <div className="tp-project-modern-overlay">
                  <div className="tp-project-modern-content">
                    <h3 className="tp-project-modern-title">{item.title}</h3>
                    <p className="tp-project-modern-desc">{item.description}</p>
                    <div className="tp-project-modern-action">
                      <Link href="/gallery" className="tp-project-modern-btn">
                        View Project
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
