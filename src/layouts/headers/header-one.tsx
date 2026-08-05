"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderMenus from "./header-menus";
import useSticky from "@/hooks/use-sticky";
import MobileOffcanvas from "@/components/offcanvas/mobile-offcanvas";

const HeaderOne = () => {
  const { sticky, headerRef, headerFullWidth } = useSticky();
  const [openOffCanvas, setOpenOffCanvas] = React.useState(false);

  useEffect(() => {
    headerFullWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <header className="tp-header-height" ref={headerRef} style={{ position: 'relative', zIndex: 999 }}>
        <div
          id="header-sticky"
          className={`tp-header-area tp-header-mob-space z-index-9 ${sticky ? "header-sticky" : ""}`}
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
            background: "rgba(245,245,247,0.85)", // More transparent to show gradient through
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            backdropFilter: "blur(8px)", // Increased blur for better effect with gradient
            borderBottom: "1px solid rgba(234,234,234,0.5)",
            position: 'relative',
            zIndex: 999,
          }}
        >
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-6">
                <div className="tp-header-logo" style={{ marginLeft: 0 }}>
                  <Link href="/" className="logo-1" aria-label="LUM Studio Home">
                    <Image src="/assets/img/logo/logo.webp" alt="LUM Studios" width={110} height={32} />
                  </Link>
                </div>
              </div>
              <div className="col-xl-8 col-lg-9 d-none d-xl-block">
                <div className="tp-header-menu header-main-menu text-center">
                  <nav className="tp-main-menu-content">
                    {/* header menus */}
                    <HeaderMenus />
                    {/* header menus */}
                  </nav>
                </div>
              </div>
              <div className="col-xl-2 col-lg col-6">
                <div className="tp-header-bar text-end">
                  <button
                    className="tp-offcanvas-open-btn d-xl-none"
                    onClick={() => setOpenOffCanvas(true)}
                    aria-label="Open menu"
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <style jsx>{`
        .tp-offcanvas-open-btn {
          background: transparent !important;
          border: none !important;
          padding: 8px !important;
          cursor: pointer !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
          width: 40px !important;
          height: 30px !important;
          position: relative !important;
          z-index: 2000 !important;
        }

        .tp-offcanvas-open-btn span {
          display: block !important;
          width: 100% !important;
          height: 3px !important;
          background-color: #1a1a1a !important;
          background: #1a1a1a !important;
          border-radius: 2px !important;
          transition: all 0.3s ease !important;
          opacity: 1 !important;
          visibility: visible !important;
          flex-shrink: 0 !important;
        }

        .tp-offcanvas-open-btn:hover span {
          background-color: #B7C435 !important;
          background: #B7C435 !important;
        }
        
        /* Always show hamburger on all screen sizes */
        .d-xl-none {
          display: flex !important;
        }

        /* Ensure button is always visible */
        .tp-header-bar {
          display: flex !important;
          align-items: center !important;
          justify-content: flex-end !important;
        }
      `}</style>
      {/* off canvas */}
      <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
      {/* off canvas */}
    </>
  );
};

export default HeaderOne;
