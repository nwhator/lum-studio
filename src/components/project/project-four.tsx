import React from "react";
import Image from "next/image";

import { ProjectShape, RightArrow } from "../svg";
// Portfolio images from gallery - Using first 2 from each category for Classic and Walk-in
// Baby Shoot images (cat1)
import babyClassic from '/assets/img/inner-project/portfolio-col-2/port-1.jpg';
import babyWalkin from '/assets/img/inner-project/portfolio-col-2/port-2.jpg';
// Wedding Shoot images (cat2)
import weddingClassic from '/assets/img/inner-project/portfolio-col-2/port-4.jpg';
import weddingWalkin from '/assets/img/inner-project/portfolio-col-2/port-5.jpg';
// Call to Bar images (cat3)
import callToBarClassic from '/assets/img/inner-project/portfolio-col-2/port-7.jpg';
import callToBarWalkin from '/assets/img/inner-project/portfolio-col-2/port-8.jpg';
// Convocation images (cat4)
import convocationClassic from '/assets/img/inner-project/portfolio-col-2/port-10.jpg';
import convocationWalkin from '/assets/img/inner-project/portfolio-col-2/port-11.jpg';
// Family Portraits images (cat5)
import familyClassic from '/assets/img/inner-project/portfolio-col-2/port-13.jpg';
import familyWalkin from '/assets/img/inner-project/portfolio-col-2/port-14.jpg';
// Maternity Portrait images (cat6)
import maternityClassic from '/assets/img/inner-project/portfolio-col-2/port-16.jpg';
import maternityWalkin from '/assets/img/inner-project/portfolio-col-2/port-17.jpg';
import Link from "next/link";

// portfolio data - Using first 2 images from each category
const project_data = [
  {
    id: 1,
    img_1: babyClassic,
    img_2: babyWalkin,
    meta: "Newborn Photography",
    title: "Baby Shoots",
    category: "Active"
  },
  {
    id: 2,
    img_1: weddingClassic,
    img_2: weddingWalkin,
    meta: "Wedding Photography",
    title: "Wedding Shoots",
    category: "Active"
  },
  {
    id: 3,
    img_1: callToBarClassic,
    img_2: callToBarWalkin,
    meta: "Legal Milestone",
    title: "Call to Bar",
    category: "Active"
  },
  {
    id: 4,
    img_1: convocationClassic,
    img_2: convocationWalkin,
    meta: "Academic Achievement",
    title: "Convocation",
    category: "Active"
  },
  {
    id: 5,
    img_1: familyClassic,
    img_2: familyWalkin,
    meta: "Portrait Photography",
    title: "Family Portraits",
    category: "Active"
  },
  {
    id: 6,
    img_1: maternityClassic,
    img_2: maternityWalkin,
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
                  Our <span>Photoshoots</span>
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
                        height={600} // Fixed height
                        style={{ objectFit: 'contain' }} // Maintain aspect ratio
                      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-12 order-1 order-lg-0">
                    <div className="tp-project-3-content text-center">
                      <span className="tp-project-3-category">{item.category} Categories</span>
                      <span className="tp-project-3-meta">{item.meta}</span>
                      <h4 className="tp-project-3-title-sm">
                        <Link href="/gallery">{item.title}</Link>
                      </h4>
                      <div className="tp-project-3-package-types">
                        <span className="package-type classic">Classic</span>
                        <span className="package-divider">|</span>
                        <span className="package-type walkin">Walk-in</span>
                      </div>
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
                        height={600} // Fixed height
                        style={{ objectFit: 'contain' }} // Maintain aspect ratio
                      />
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
