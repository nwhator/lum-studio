import React from "react";
import Image from "next/image";

// images from gallery
import ser_img_1 from "@/assets/img/inner-project/portfolio-col-2/port-1.webp";
import ser_img_2 from "@/assets/img/inner-project/portfolio-col-2/port-5.webp";
import ser_img_3 from "@/assets/img/inner-project/portfolio-col-2/port-9.webp";
import ser_img_4 from "@/assets/img/inner-project/portfolio-col-2/event.jpg";
import { RightArrow, ShapeTwo } from "../svg";
import Link from "next/link";

const service_data = [
	{
		id: 1,
		img: ser_img_2,
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
		img: ser_img_1,
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
    img: ser_img_4,
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
    img: ser_img_3,
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
      <div className="container container-1530">
        <div className="row g-4">
          {service_data.map((item, index) => (
            <div key={item.id} className="col-xl-3 col-lg-6 col-md-6">
              <div className="sv-service-card" id={item.slug}>
                <div className="sv-service-thumb" style={{ position: 'relative', minHeight: '250px' }}>
                  <Image
                    src={item.img}
                    alt={`${item.title} - LUM Studios`}
                    fill
                    priority={index < 2}
                    loading={index < 2 ? "eager" : "lazy"}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="sv-service-content">
                  <div className="sv-service-title-box">
                    <h4 className="sv-service-title">{item.title}</h4>
                  </div>
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
          ))}
        </div>
      </div>
      <style jsx>{`
        .sv-service-card {
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 6px 30px rgba(0,0,0,0.06);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .sv-service-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.1);
        }
        .sv-service-thumb {
          border-radius: 12px 12px 0 0;
        }
        .sv-service-content {
          padding: 24px;
        }
        .sv-service-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #1a1a1a;
        }
        .sv-service-text p {
          margin-bottom: 16px;
          color: #666;
        }
        .sv-service-list ul {
          list-style: none;
          padding: 0;
          margin-bottom: 20px;
        }
        .sv-service-list li {
          padding: 4px 0;
          color: #444;
        }
        .sv-service-list li:before {
          content: '✓';
          color: #B7C435;
          font-weight: bold;
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}
