import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/img/logo/logo-white.png";
import logo_2 from "@/assets/img/logo/logo.png";
import { RightArrow } from "@/components/svg";
import { Facebook, Instagram, TikTok, Threads, WhatsApp } from "@/components/svg/social";

// prop type
type IProps = {
  whiteFooter?: boolean;
  topCls?: string;
};

export default function FooterTwo({ whiteFooter = false,topCls='footer-top' }: IProps) {
  return (
    <footer className={`${topCls}`}>
      <div
        className={`tp-footer-2-area pt-60 pb-20 ${
          whiteFooter ? "tp-footer-white" : "black-bg"
        }`}
      >
        <div className="container container-1480">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-6 mb-50">
              <div className="tp-footer-2-widget footer-col-2-1">
                {!whiteFooter && (
                  <div className="tp-footer-2-widget-logo">
                    <Link href="/">
                      <Image src={logo} alt="logo" />
                    </Link>
                  </div>
                )}
                {whiteFooter && (
                  <div className="tp-footer-2-widget-logo tp-footer-dark">
                    <Link className="logo-1" href="/">
                      <Image src={logo_2} alt="logo" />
                    </Link>
                    <Link className="logo-2" href="/">
                      <Image src={logo} alt="logo" />
                    </Link>
                  </div>
                )}
                <div className="tp-footer-2-widget-text">
                  <p>
                    Capturing moments, creating stories. <br /> Professional photography & videography.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-6 mb-50">
              <div className="tp-footer-2-widget footer-col-2-2">
                <div className="tp-footer-2-widget-menu">
                  <h4 className="tp-footer-2-widget-title">Sitemap</h4>
                  <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="/gallery">Gallery</a></li>
                    <li><a href="/contact">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-5 col-md-6 mb-50">
              <div className="tp-footer-2-widget footer-col-2-3">
                <h4 className="tp-footer-2-widget-title">Office</h4>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a
                      href="https://maps.app.goo.gl/58XNcbtgwe9uyXiNA"
                      target="_blank"
                    >
                      Opp. Hammedal Filling Station, Ilesha-Garage, Ile-ife, Osun State
                    </a>
                  </span>
                </div>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a href="tel:+2348145538164">P: +234 814 553 8164</a>
                  </span>
                  <span>
                    <a href="tel:+2349022292514">P: +234 902 229 2514</a>
                  </span>
                </div>
                <div className="tp-footer-2-contact-item">
                  <span>
                    <a href="mailto:contact@thelumstudios.com">E: contact@thelumstudios.com</a>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 col-md-6 mb-50">
              <div className="tp-footer-2-widget footer-col-2-4">
                <div className="tp-footer-2-widget-newslatter">
                  <h4 className="tp-footer-2-widget-title">
                    Subscribe to our newsletter
                  </h4>
                  <form action="#">
                    <div className="tp-footer-2-input p-relative">
                      <input type="text" placeholder="Enter your email..." />
                      <button>
                        <RightArrow clr={whiteFooter?"currentcolor":'#F3F3F4'}/>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`tp-copyright-2-area tp-copyright-2-bdr-top ${
          whiteFooter ? "tp-copyright-white" : "black-bg"
        }`}
      >
        <div className="container container-1480">
          <div className="row align-items-center">
            <div className="col-xl-4 col-lg-5">
              <div className="tp-copyright-2-left text-center text-lg-start">
                <p>
                  All rights reserved — {new Date().getFullYear()} © LUM Studios
                </p>
              </div>
            </div>
            <div className="col-xl-8 col-lg-7">
              <div className="tp-copyright-2-social text-center text-lg-end">
                <a 
                  className="social-icon-link mb-10" 
                  href="https://www.facebook.com/share/1VahucgBSv/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Follow us on Facebook"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook />
                </a>
                <a 
                  className="social-icon-link mb-10" 
                  href="https://instagram.com/lum_studios/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Follow us on Instagram"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram />
                </a>
                <a 
                  className="social-icon-link mb-10" 
                  href="https://www.tiktok.com/@lumphotographystudios?_t=ZS-90R6iHGoSt0&_r=1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Follow us on TikTok"
                  aria-label="Follow us on TikTok"
                >
                  <TikTok />
                </a>
                <a 
                  className="social-icon-link mb-10" 
                  href="https://wa.me/2349022292514" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Contact us on WhatsApp"
                  aria-label="Contact us on WhatsApp"
                >
                  <WhatsApp />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- footer area end --> */}
    </footer>
  );
}
