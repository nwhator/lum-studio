import React from "react";
import Image from "next/image";

import { ProjectShape, RightArrow } from "../svg";
// images
import port_1 from '@/assets/img/home-03/gallery/gal-1.jpg';
import port_2 from '@/assets/img/home-03/gallery/gal-2.jpg';
import port_3 from '@/assets/img/home-03/gallery/gal-3.jpg';
import port_4 from '@/assets/img/home-03/gallery/gal-4.jpg';
// Classic and Walk-in images
import classic_1 from '@/assets/img/home-01/project/project-1-1.jpg';
import classic_2 from '@/assets/img/home-01/project/project-1-2.jpg';
import classic_3 from '@/assets/img/home-01/project/project-1-3.jpg';
import classic_4 from '@/assets/img/home-01/project/project-1-4.jpg';
import walkin_1 from '@/assets/img/home-01/project/project-1-5.jpg';
import walkin_2 from '@/assets/img/home-01/project/project-1-6.jpg';
import walkin_3 from '@/assets/img/home-02/project/project-2-1.jpg';
import walkin_4 from '@/assets/img/home-02/project/project-2-2.jpg';
import Link from "next/link";

// portfolio data
const project_data = [
  {
    id: 1,
    img_1: classic_1,
    img_2: walkin_1,
    meta: "Wedding Photography",
    title: "Elegant Wedding Shoots",
    category: "Active"
  },
  {
    id: 2,
    img_1: classic_2,
    img_2: walkin_2,
    meta: "Portrait Photography",
    title: "Family Portraits",
    category: "Active"
  },
  {
    id: 3,
    img_1: classic_3,
    img_2: walkin_3,
    meta: "Newborn Photography",
    title: "Baby Shoots",
    category: "Active"
  },
  {
    id: 4,
    img_1: classic_4,
    img_2: walkin_4,
    meta: "Maternity Photography",
    title: "Maternity Shoots",
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
