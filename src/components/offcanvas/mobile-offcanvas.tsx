import React from "react";
import Image from "next/image";
import { CloseTwo, InstagramTwo } from "../svg";
import { Threads, WhatsApp, Facebook, TikTok } from "../svg/social";

// images
import logo from "@/assets/img/logo/logo.png";
import gallery_1 from "@/assets/img/home-03/gallery/gal-1.jpg";
import gallery_2 from "@/assets/img/home-03/gallery/gal-2.jpg";
import gallery_3 from "@/assets/img/home-03/gallery/gal-3.jpg";
import gallery_4 from "@/assets/img/home-03/gallery/gal-4.jpg";
import MobileMenus from "./mobile-menus";

const gallery_images = [gallery_1, gallery_2, gallery_3, gallery_4];

// prop type
type IProps = {
  openOffcanvas: boolean;
  setOpenOffcanvas: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function MobileOffcanvas({openOffcanvas,setOpenOffcanvas}: IProps) {
  return (
    <>
      <div className={`tp-offcanvas-area ${openOffcanvas ? "opened" : ""}`}>
        <div className="tp-offcanvas-wrapper">
          <div className="tp-offcanvas-top d-flex align-items-center justify-content-between">
            <div className="tp-offcanvas-logo">
              <a href="#">
                <Image src={logo} alt="logo" />
              </a>
            </div>
            <div className="tp-offcanvas-close">
              <button
                className="tp-offcanvas-close-btn"
                onClick={() => setOpenOffcanvas(false)}
              >
                <CloseTwo />
              </button>
            </div>
          </div>
          <div className="tp-offcanvas-main">
            <div className="tp-offcanvas-content">
              <h3 className="tp-offcanvas-title">Hello There!</h3>
              <p>Capturing moments, creating stories. Professional photography & videography services.</p>
            </div>
            <div className="tp-main-menu-mobile d-xl-none">
              <MobileMenus/>
            </div>
            <div className="tp-offcanvas-gallery">
              <div className="row gx-2">
                {gallery_images.map((item, i) => (
                  <div className="col-md-3 col-3" key={i}>
                    <div className="tp-offcanvas-gallery-img fix">
                      <a href="#">
                        <Image src={item} alt="gallery-img" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="tp-offcanvas-contact">
              <h3 className="tp-offcanvas-title sm">Information</h3>

              <ul>
                <li>
                  <a href="tel:+2348145538164">+234 814 553 8164</a>
                </li>
                <li>
                  <a href="mailto:contact@thelumstudios.com">contact@thelumstudios.com</a>
                </li>
                <li>
                  <a href="https://www.google.com/maps/@23.8223596,90.3656686,15z?entry=ttu" target="_blank">Ile Ife, Osun State, Nigeria</a>
                </li>
              </ul>
            </div>
            <div className="tp-offcanvas-social">
              <h3 className="tp-offcanvas-title sm">Follow Us</h3>
              <ul>
                <li>
                  <a href="https://www.facebook.com/share/1VahucgBSv/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook />
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/lumphotographystudios/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <InstagramTwo />
                  </a>
                </li>
                <li>
                  <a href="https://www.tiktok.com/@lumphotographystudios?_t=ZS-90R6iHGoSt0&_r=1" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <TikTok />
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/2348107095827" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    <WhatsApp />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setOpenOffcanvas(false)}
        className={`body-overlay ${openOffcanvas ? "opened" : ""}`}
      ></div>
    </>
  );
}
