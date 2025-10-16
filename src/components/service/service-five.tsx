import React from "react";
import Link from "next/link";
import { scroller } from "react-scroll";

const service_data = [
  {
    id: 1,
    title: "Wedding Photography",
    desc: "Capturing your special day with timeless elegance and artistic storytelling.",
    number: "01",
  },
  {
    id: 2,
    title: "Portrait Sessions",
    desc: "Professional portraits from maternity to family and individual sessions.",
    number: "02",
  },
  {
    id: 3,
    title: "Event Coverage",
    desc: "Comprehensive photography for corporate events and celebrations.",
    number: "03",
  },
];

// Map card id to ServiceSix slug (string keys for safety)
const serviceSlugMap: Record<string, string> = {
  '1': 'wedding-photography', // Wedding Photography
  '2': 'professional-portraits', // Portrait Sessions (goes to 4th)
  '3': 'event-photography', // Event Coverage
};

function scrollToServiceSix(id: number) {
  const slug = serviceSlugMap[String(id)];
  if (slug) {
    scroller.scrollTo(slug, {
      duration: 700,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -80, // adjust for header height
    });
  } else {
    // fallback: scroll to ServiceSix top
    scroller.scrollTo('sv-service-area', {
      duration: 700,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -80,
    });
  }
}

// service items
export function ServiceItems() {
  return (
    <div className="row justify-content-center">
      {service_data.map((item) => (
        <div key={item.id} className="col-xl-4 col-lg-4 col-md-6">
          <div className="tp-service-5-item tp_fade_bottom space-1" onClick={() => scrollToServiceSix(item.id)} style={{ cursor: 'pointer' }}>
            <div className="tp-service-professional-number">
              {item.number}
            </div>
            <div className="tp-service-4-content">
              <h4 className="tp-service-4-title-sm tp-text-black" style={{ cursor: 'pointer', textDecoration: 'underline', color: '#B7C435' }}>
                {item.title}
              </h4>
              <p>{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// service five area
export default function ServiceFive() {
  return (
    <div className="tp-service-5-area pt-120 pb-70">
      <div className="container container-1775">
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-service-5-title-box mb-90">
              <h4 className="tp-service-5-title p-relative tp_fade_right">
                <span className="tp-service-5-subtitle tp_fade_left">
                  SERVICES
                </span>
                <span className="text-space"></span>
                Exceptional Photography Services <br />
                Tailored to Your Vision
              </h4>
            </div>
          </div>
        </div>
        <div className="tp-service-5-wrap">
          <ServiceItems/>
        </div>
      </div>
    </div>
  );
}
