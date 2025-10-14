import React, { CSSProperties } from "react";
import Link from "next/link";
import menu_data from "@/data/menu-data";

// Removed heavy images from header mega menu for cleaner look on transparent header
// const imgStyle:CSSProperties = { width: "100%", height: "235px", objectFit: "cover" };
const HeaderMenus = () => {
  return (
    <ul>
      {menu_data.map((menu) => (
        <li key={menu.id} className="has-dropdown">
          <Link href={menu.link}>{menu.title}</Link>
          {menu.home_menus ? (
            <div className="tp-submenu submenu tp-mega-menu">
              <div className="tp-menu-fullwidth">
                <div className="tp-homemenu-wrapper">
                  <div className="row gx-25 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1">
                    {menu.home_menus.map((home_menu, i) => (
                      <div key={i} className="col homemenu">
                        <div className="homemenu-content text-center" style={{padding: '10px 0'}}>
                          <h4 className="homemenu-title" style={{margin: 0}}>
                            <Link href={home_menu.link}>{home_menu.title}</Link>
                          </h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : menu.pages_mega_menu ? (
            <div className="tp-submenu submenu tp-mega-menu">
              <div className="tp-megamenu-wrapper">
                <div className="row gx-50">
                  <div className="col-xl-8">
                    <div className="tp-megamenu-list-box">
                      <div className="row gx-50">
                        <div className="col-xl-8">
                          <div className="tp-megamenu-list">
                            <h4 className="tp-megamenu-title">
                              {menu.pages_mega_menu.first.title}
                            </h4>
                            <div className="tp-megamenu-list-wrap">
                              <ul>
                                {menu.pages_mega_menu.first.submenus.map(
                                  (psm,i) => (
                                    <li key={i}>
                                      <Link href={psm.link}>{psm.title}</Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4">
                          <div className="tp-megamenu-list tp-megamenu-list-2">
                            <h4 className="tp-megamenu-title">
                              {menu.pages_mega_menu.second.title}
                            </h4>
                            <div className="tp-megamenu-list-wrap">
                              <ul>
                                {menu.pages_mega_menu.second.submenus.map(
                                  (psm,i) => (
                                    <li key={i}>
                                      <Link href={psm.link}>{psm.title}</Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Removed shop-style image/banner column */}
                </div>
              </div>
            </div>
          ) : menu.portfolio_mega_menus ? (
            <div className="tp-submenu submenu tp-mega-menu">
              <div className="tp-menu-fullwidth">
                <div className="tp-megamenu-portfolio p-relative">
                  <div className="tp-megamenu-portfolio-banner" />
                  <div className="row gx-50">
                    <div className="col-xxl-9 col-xl-10">
                      <div className="tp-megamenu-list-box">
                        <div className="row gx-50">
                          <div className="col-xxl-5 col-xl-6">
                            <div className="tp-megamenu-list">
                              <h4 className="tp-megamenu-title">
                                {menu.portfolio_mega_menus.first.title}
                              </h4>
                              <div className="tp-megamenu-list-wrap tp-portfolio-menu-style">
                                <div className="row">
                                  {menu.portfolio_mega_menus.first.submenus.map(
                                    (portSm, i) => (
                                      <div key={i} className="col-lg-6">
                                        <ul>
                                          {portSm.menu_lists.map((psm) => (
                                            <li key={psm.title}>
                                              <Link href={psm.link}>
                                                {psm.title}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          {menu.portfolio_mega_menus.second.submenus.map(
                            (portSm2, i) => (
                              <div key={i} className="col-xxl-3 col-xl-3">
                                <div className="tp-megamenu-list tp-megamenu-list-2 ml-20">
                                  <h4 className="tp-megamenu-title">
                                    {portSm2.title}
                                  </h4>
                                  <div className="tp-megamenu-list-wrap">
                                    <ul>
                                      {portSm2.menu_lists.map((psm) => (
                                        <li key={psm.title}>
                                          <Link href={psm.link}>
                                            {psm.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : menu.dropdown_menus ? (
            <ul className="tp-submenu submenu">
              {menu.dropdown_menus.map((mm, i) => (
                <li key={i}>
                  <Link href={mm.link}>{mm.title}</Link>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default HeaderMenus;
