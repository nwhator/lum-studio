import React from "react";
import Image from "next/image";

// images from gallery
import ser_img_1 from "@/assets/img/inner-project/portfolio-col-2/port-1.jpg";
import ser_img_2 from "@/assets/img/inner-project/portfolio-col-2/port-5.jpg";
import ser_img_3 from "@/assets/img/inner-project/portfolio-col-2/port-9.jpg";
import ser_img_4 from "@/assets/img/inner-project/portfolio-col-2/port-13.jpg";
import { RightArrow, ShapeTwo } from "../svg";
import Link from "next/link";

const service_data = [
  {
    id: 1,
    img: ser_img_1,
    subtitle: "Photography Studio",
    title: "Wedding Photography",
    slug: "wedding-photography",
    text: "We capture every precious moment of your special day with artistic excellence and professional precision.",
    lists: [
      "Full-Day Coverage",
      "Pre-Wedding Shoots",
      "Drone Photography",
      "Professional Editing",
    ],
  },
  {
    id: 2,
    img: ser_img_2,
    subtitle: "Photography Studio",
    title: "Maternity & Baby Shoots",
    slug: "maternity-baby-shoots",
    text: "Celebrate the beauty of motherhood and capture your baby's precious early moments with our gentle approach.",
    lists: [
      "Maternity Sessions",
      "Newborn Photography",
      "Baby Milestones",
      "Family Portraits",
    ],
  },
  {
    id: 3,
    img: ser_img_3,
    subtitle: "Photography Studio",
    title: "Event Photography",
    slug: "event-photography",
    text: "Professional coverage for all your special events, documenting every important moment with creative flair.",
    lists: [
      "Corporate Events",
      "Birthday Parties",
      "Graduations",
      "Social Gatherings",
    ],
  },
  {
    id: 4,
    img: ser_img_4,
    subtitle: "Photography Studio",
    title: "Professional Portraits",
    slug: "professional-portraits",
    text: "High-quality portrait photography that captures personality, style, and authentic moments for individuals, families, and professionals.",
    lists: [
      "Individual Portraits",
      "Family Sessions",
      "Professional Headshots",
      "Lifestyle Photography",
    ],
  },
];

export default function ServiceSix() {
  return (
    <div className="sv-service-area project-panel-area-2">
      <div className="container-fluid p-0">
        {service_data.map((item, index) => (
          <div key={item.id} className="sv-service-item project-panel-2">
            <div className="row g-0">
              <div className="col-xl-6 col-lg-6">
                <div className="sv-service-thumb" style={{ position: 'relative', minHeight: '500px' }}>
                  <Image
                    src={item.img}
                    alt={`${item.title} - LUM Studios`}
                    fill
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="sv-service-content-wrap d-flex align-items-center">
                  <div className="sv-service-content">
                    <div className="sv-service-title-box">
                      <span className="sv-service-subtitle">
                        {item.subtitle}
                      </span>
                      <h4 className="sv-service-title">{item.title}</h4>
                    </div>
                    <div className="sv-service-space-wrap">
                      <div className="sv-service-text">
                        <p>{item.text}</p>
                      </div>
                      <div className="sv-service-list">
                        <ul>
                          {item.lists.map((list, i) => (
                            <li key={i}>{list}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="sv-service-btn">
                        <Link
                          className="tp-btn-zikzak zikzak-inner p-relative"
                          href={`/service/${item.slug}`}
                        >
                          <span className="zikzak-content">
                            See Details
                            <RightArrow clr="currentColor" />
                          </span>
                          <ShapeTwo />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
