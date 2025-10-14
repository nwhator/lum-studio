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
      <header className="tp-header-height" ref={headerRef}>
        <div
          id="header-sticky"
          className={`tp-header-area tp-header-mob-space z-index-9 ${sticky ? "header-sticky" : ""}`}
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
            background: "rgba(245,245,247,0.98)", // light grey
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            backdropFilter: "blur(2px)",
            borderBottom: "1px solid #eaeaea",
          }}
        >
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-6">
                <div className="tp-header-logo" style={{ marginLeft: 0 }}>
                  <Link href="/" className="logo-1" aria-label="LUM Studio Home">
                    <Image src="/assets/img/logo/logo.png" alt="LUM Studios" width={110} height={32} />
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
                <div className="tp-header-bar text-end" style={{ marginRight: 0 }}>
                  <button
                    className="tp-offcanvas-open-btn d-xl-none"
                    onClick={() => setOpenOffCanvas(true)}
                    aria-label="Open menu"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                      width: '30px',
                      height: '24px'
                    }}
                  >
                    <span style={{ display: 'block', width: '100%', height: '3px', background: '#111', borderRadius: '2px' }}></span>
                    <span style={{ display: 'block', width: '100%', height: '3px', background: '#111', borderRadius: '2px' }}></span>
                    <span style={{ display: 'block', width: '100%', height: '3px', background: '#111', borderRadius: '2px' }}></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* off canvas */}
      <MobileOffcanvas openOffcanvas={openOffCanvas} setOpenOffcanvas={setOpenOffCanvas} />
      {/* off canvas */}
    </>
  );
};

export default HeaderOne;
