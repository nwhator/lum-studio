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
    img_1: "/assets/img/inner-project/portfolio-col-2/port-1.jpg",
    img_2: "/assets/img/inner-project/portfolio-col-2/port-2.jpg",
    meta: "Newborn Photography",
    title: "Baby Shoots",
    category: "Active"
  },
  {
    id: 2,
    img_1: "/assets/img/inner-project/portfolio-col-2/port-4.jpg",
    img_2: "/assets/img/inner-project/portfolio-col-2/port-5.jpg",
    meta: "Wedding Photography",
    title: "Wedding Shoots",
    category: "Active"
  },
  {
    id: 3,
    img_1: "/assets/img/inner-project/portfolio-col-2/port-9.jpg",
    img_2: "/assets/img/inner-project/portfolio-col-2/port-8.jpg",
    meta: "Legal Milestone",
    title: "Call to Bar",
    category: "Active"
  },
  {
    id: 4,
    img_1: "/assets/img/inner-project/portfolio-col-2/port-10.jpg",
    img_2: "/assets/img/inner-project/portfolio-col-2/port-11.jpg",
    meta: "Academic Achievement",
    title: "Convocation",
    category: "Active"
  },
  {
    id: 5,
    img_1: "/assets/img/inner-project/portfolio-col-2/port-13.jpg",
    img_2: "/assets/img/inner-project/portfolio-col-2/port-14.jpg",
    meta: "Portrait Photography",
    title: "Family Portraits",
    category: "Active"
  },
  {
    id: 6,
    img_1: "/assets/img/inner-project/portfolio-col-2/port-16.jpg",
    img_2: "/assets/img/inner-project/portfolio-col-2/port-17.jpg",
    meta: "Maternity Photography", 
    title: "Maternity Portraits",
    category: "Active"
  },
];
// prop type
type IProps = {
  style_2?: boolean;
};
export default function ProjectFour({ style_2 = false }: IProps) {
  return (
    <div className={`tp-project-3-area ${style_2 ? "pt-60 pw-project-style" : "pt-130 black-bg"}`}>
      <div className="container container-1720">
        {!style_2 && (
          <div className="row justify-content-center">
            <div className="col-xl-7">
              <div className="tp-project-3-title-box p-relative mb-150">
                <h4 className="tp-section-title-200 tp_reveal_anim">
                  Our <span>Pictures</span>
                </h4>
                <div className="tp-project-3-btn-box">
                  <Link
                    className="tp-btn-zikzak p-relative"
                    href="/gallery"
                  >
                    <span className="zikzak-content">
                      See <br /> all shoots
                      <RightArrow clr="#19191A" />
                    </span>
                    <ProjectShape />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-xl-12">
            {project_data.map((item, i) => (
              <div key={item.id} className="tp-project-3-wrap">
                <div className="row">
                  <div className="col-xl-4 col-lg-4 col-md-6">
                    <div className="tp-project-3-thumb pro-img-1">
                      <Image
                        src={item.img_1}
                        alt="port-img"
                        width={400}
                        height={600}
                        style={{ objectFit: 'cover' }}
                      />
                      <Link href={`/packages/${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="package-label-overlay classic-overlay">
                        <span>Classic Package</span>
                      </Link>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 order-1 order-lg-0">
                    <div className="tp-project-3-content text-center">
                      <span className="tp-project-3-meta">{item.meta}</span>
                      <h4 className="tp-project-3-title-sm" style={{color: 'var(--tp-theme-1)'}}>
                        <Link href="/gallery">{item.title}</Link>
                      </h4>
                      <Link
                        className="tp-btn-project-sm"
                        href="/gallery"
                      >
                        See Project
                      </Link>
                    </div>
                    <div className="tp-project-3-border color-1 text-center">
                      <span></span>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-6 order-0 order-lg-0">
                    <div className="tp-project-3-thumb pro-img-2">
                      <Image
                        src={item.img_2}
                        alt="port-img"
                        width={400}
                        height={600}
                        style={{ objectFit: 'cover' }}
                      />
                      <Link href={`/packages/${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="package-label-overlay walkin-overlay">
                        <span>Walk-in Package</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
