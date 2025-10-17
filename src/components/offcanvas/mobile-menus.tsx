import React from "react";
import Image from "next/image";
import Link from "next/link";
import menu_data from "@/data/menu-data";

export default function MobileMenus() {
  const [navTitle, setNavTitle] = React.useState<string>("");

  //openMobileMenu
  const openMobileMenu = (menu: string) => {
    if (navTitle === menu) {
      setNavTitle("");
    } else {
      setNavTitle(menu);
    }
  };
  return (
    <>
      <nav className="tp-main-menu-content">
        <ul>
          {menu_data.map((menu) => (
            <li
              key={menu.id}
              className={`${
                menu.home_menus || menu.portfolio_mega_menus
                  ? "has-dropdown has-homemenu"
                  : ""
              } ${menu.home_menus ? "dropdown-opened" : ""}`}
            >
              {menu.home_menus || menu.portfolio_mega_menus ? (
                <div className="mobile-menu-top">
                  {/* If menu has a link, make the title tappable - keep a separate toggle for submenu */}
                  {menu.link ? (
                    <Link href={menu.link} className="mobile-menu-link">{menu.title}</Link>
                  ) : (
                    <span className="mobile-menu-link pointer">{menu.title}</span>
                  )}
                  <button className="dropdown-toggle-btn" onClick={() => openMobileMenu(menu.title)} aria-expanded={navTitle === menu.title} aria-controls={`submenu-${menu.id}`}>
                    <i className="fa-light fa-plus"></i>
                  </button>
                </div>
              ) : (
                <Link href={menu.link}>
                  {menu.title}
                </Link>
              )}
              {menu.home_menus ? (
                <div className="tp-submenu submenu tp-mega-menu" style={{ display: navTitle === menu.title ? "block" : "none"}}>
                  <div className="tp-menu-fullwidth">
                    <div className="tp-homemenu-wrapper">
                      <div className="row gx-25 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-1">
                        {menu.home_menus.map((hm, i) => (
                          <div key={i} className="col homemenu">
                            <div className="homemenu-content text-center">
                              <h4 className="homemenu-title">
                                <Link href={hm.link}>{hm.title}</Link>
                              </h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : menu.pages_mega_menu ? (
                <div className="tp-submenu submenu tp-mega-menu" style={{ display: navTitle === menu.title ? "block" : "none"}}>
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
                                      (sm, i) => (
                                        <li key={i}>
                                          <Link href={sm.link}>{sm.title}</Link>
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
                                      (sm, i) => (
                                        <li key={i}>
                                          <Link href={sm.link}>{sm.title}</Link>
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
                      {/* removed shop banner in mobile menu */}
                    </div>
                  </div>
                </div>
              ) : menu.portfolio_mega_menus ? (
                <div className="tp-submenu submenu tp-mega-menu" style={{ display: navTitle === menu.title ? "block" : "none"}}>
                  <div className="tp-menu-fullwidth">
                    <div className="tp-megamenu-portfolio p-relative">
                      {/* removed portfolio banner image */}
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
                        <div className="col-xxl-3 col-xl-3 d-none d-xxl-block">
                          <div className="tp-megamenu-portfolio-text">
                            <h4>60+</h4>
                            <span>Pre-built demo home page</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : menu.dropdown_menus ? (
                <ul className="tp-submenu submenu" style={{ display: navTitle === menu.title ? "block" : "none"}}>
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
      </nav>
    </>
  );
}
