import React from "react";
import { Instagram } from "../svg";
import { Threads, WhatsApp } from "../svg/social";

const social_data = [
  {
    id: 1,
    icon: <Instagram />,
    link: "https://www.instagram.com/lum_studios/",
    label: "Instagram"
  },
  {
    id: 2,
    icon: <Threads />,
    link: "https://www.threads.com/@lum_studios/",
    label: "Threads"
  },
  {
    id: 3,
    icon: <WhatsApp />,
    link: "https://wa.me/2348145538164",
    label: "WhatsApp"
  },
];

export default function Social() {
  return (
    <>
      {social_data.map((item) => (
        <a 
          href={item.link} 
          key={item.id} 
          target="_blank"
          rel="noopener noreferrer"
          title={item.label}
          aria-label={`Follow us on ${item.label}`}
        >
          <span>{item.icon}</span>
        </a>
      ))}
    </>
  );
}
