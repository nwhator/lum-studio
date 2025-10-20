import React from "react";
import { Instagram } from "../svg";
import { Facebook, TikTok, Threads, WhatsApp } from "../svg/social";

const social_data = [
  {
    id: 1,
    icon: <Facebook />,
    link: "https://www.facebook.com/share/1VahucgBSv/?mibextid=wwXIfr",
    label: "Facebook"
  },
  {
    id: 2,
    icon: <Instagram />,
    link: "https://www.instagram.com/lum_studios/",
    label: "Instagram"
  },
  {
    id: 3,
    icon: <TikTok />,
    link: "https://www.tiktok.com/@lumphotographystudios?_t=ZS-90R6iHGoSt0&_r=1",
    label: "TikTok"
  },
  {
    id: 4,
    icon: <WhatsApp />,
    link: "https://wa.me/2348146638164",
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
