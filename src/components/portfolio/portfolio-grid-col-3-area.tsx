import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { UpArrow } from "../svg";
import { useIsotop } from "@/hooks/use-isotop";


// data
const portfolio_data = [
  // Baby Shoot (cat1)
  {
    id: 1,
    img: "/assets/img/inner-project/portfolio-col-2/port-1.webp",
    category: "Baby Shoot",
    title: "Adorable Beginnings",
    year: "2024",
    show: "cat1",
  },
  {
    id: 2,
    img: "/assets/img/inner-project/portfolio-col-2/port-2.webp",
    category: "Baby Shoot",
    title: "Tiny Moments",
    year: "2024",
    show: "cat1",
  },
  {
    id: 3,
    img: "/assets/img/inner-project/portfolio-col-2/port-3.webp",
    category: "Baby Shoot",
    title: "First Smiles",
    year: "2024",
    show: "cat1",
  },
  // Wedding Shoot (cat2)
  {
    id: 4,
    img: "/assets/img/inner-project/portfolio-col-2/port-4.webp",
    category: "Wedding Shoot",
    title: "Forever Begins",
    year: "2024",
    show: "cat2",
  },
  {
    id: 5,
    img: "/assets/img/inner-project/portfolio-col-2/port-5.webp",
    category: "Wedding Shoot",
    title: "The Vows",
    year: "2024",
    show: "cat2",
  },
  {
    id: 6,
    img: "/assets/img/inner-project/portfolio-col-2/port-6.webp",
    category: "Wedding Shoot",
    title: "Celebration",
    year: "2024",
    show: "cat2",
  },
  // Call to Bar (cat3)
  {
    id: 7,
    img: "/assets/img/inner-project/portfolio-col-2/port-7.webp",
    category: "Call to Bar",
    title: "Milestone",
    year: "2024",
    show: "cat3",
  },
  {
    id: 8,
    img: "/assets/img/inner-project/portfolio-col-2/port-8.webp",
    category: "Call to Bar",
    title: "Achievement",
    year: "2024",
    show: "cat3",
  },
  {
    id: 9,
    img: "/assets/img/inner-project/portfolio-col-2/port-9.webp",
    category: "Call to Bar",
    title: "Proud Moment",
    year: "2024",
    show: "cat3",
  },
  // Convocation (cat4)
  {
    id: 10,
    img: "/assets/img/inner-project/portfolio-col-2/port-10.webp",
    category: "Convocation",
    title: "Graduation Day",
    year: "2024",
    show: "cat4",
  },
  {
    id: 11,
    img: "/assets/img/inner-project/portfolio-col-2/port-11.webp",
    category: "Convocation",
    title: "New Beginnings",
    year: "2024",
    show: "cat4",
  },
  {
    id: 12,
    img: "/assets/img/inner-project/portfolio-col-2/port-12.webp",
    category: "Convocation",
    title: "Academic Triumph",
    year: "2024",
    show: "cat4",
  },
  // Family Portraits (cat5)
  {
    id: 13,
    img: "/assets/img/inner-project/portfolio-col-2/port-13.webp",
    category: "Family Portraits",
    title: "Family Bonds",
    year: "2024",
    show: "cat5",
  },
  {
    id: 14,
    img: "/assets/img/inner-project/portfolio-col-2/port-14.webp",
    category: "Family Portraits",
    title: "Generations",
    year: "2024",
    show: "cat5",
  },
  {
    id: 15,
    img: "/assets/img/inner-project/portfolio-col-2/port-15.webp",
    category: "Family Portraits",
    title: "Togetherness",
    year: "2024",
    show: "cat5",
  },
  // Maternity Portraits (cat6)
  {
    id: 16,
    img: "/assets/img/inner-project/portfolio-col-2/port-16.webp",
    category: "Maternity Portrait",
    title: "Motherhood Journey",
    year: "2024",
    show: "cat6",
  },
  {
    id: 17,
    img: "/assets/img/inner-project/portfolio-col-2/port-17.webp",
    category: "Maternity Portrait",
    title: "Expecting Joy",
    year: "2024",
    show: "cat6",
  },
  {
    id: 18,
    img: "/assets/img/inner-project/portfolio-col-2/port-18.webp",
    category: "Maternity Portrait",
    title: "New Life",
    year: "2024",
    show: "cat6",
  },
];

// prop type
type IProps = {
  style_2?: boolean;
};
export default function PortfolioGridColThreeArea({ style_2 = false }: IProps) {
  const { initIsotop, isotopContainer } = useIsotop();
  const [isMobile, setIsMobile] = useState(false);

  // Function to get package route based on category
  const getPackageRoute = (category: string) => {
    switch (category.toLowerCase()) {
      case 'baby shoot':
        return '/packages/baby-shoot';
      case 'wedding shoot':
        return '/packages/wedding';
      case 'call to bar':
        return '/packages/call-to-bar';
      case 'convocation':
        return '/packages/convocation';
      case 'family portraits':
        return '/packages/family-portraits';
      case 'maternity portrait':
        return '/packages/maternity';
      default:
        return '/packages/general';
    }
  };

  // Check if mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only initialize on client side
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => {
        initIsotop();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [initIsotop]);

  // Always show only the first image per category
  const displayedPortfolio = portfolio_data.filter((item, index, self) => 
    index === self.findIndex((t) => t.show === item.show)
  );

  // Get unique category counts (1 per category since we filter duplicates)
  const getCategoryCount = (category: string) => {
    return displayedPortfolio.filter(item => item.show === category).length;
  };

  return (
    <div className="tp-project-5-2-area tp-project-5-2-pt pb-130">
      <div className={`container container-${style_2 ? "1800" : "1530"}`}>
        <div className="row grid gx-3 gy-3" ref={isotopContainer}>
          {displayedPortfolio.map((item) => (
            <div
              key={item.id}
              className="col-xl-4 col-lg-6 col-md-6 col-sm-12 grid-item"
            >
              <div className="tp-project-5-2-thumb mb-30 p-relative portfolio-item-wrapper">
                <div className="portfolio-image-container">
                  <Image
                    className="anim-zoomin"
                    src={item.img}
                    alt={item.title}
                    width={style_2 ? 573 : 486}
                    height={style_2 ? 683 : 576}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                  <div className="portfolio-hover-overlay"></div>
                </div>
                <div className="portfolio-package-section">
                  <Link href={getPackageRoute(item.category)} className="view-package-btn">
                    View Package
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style jsx>{`
          .portfolio-item-wrapper {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            margin-bottom: 30px;
            display: flex;
            flex-direction: column;
            height: auto;
          }

          .portfolio-item-wrapper:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }

          .portfolio-image-container {
            position: relative;
            flex: 1;
            width: 100%;
            overflow: hidden;
            cursor: pointer;
          }

          .portfolio-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .portfolio-hover-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0);
            transition: background-color 0.3s ease;
            pointer-events: none;
            z-index: 1;
          }

          .portfolio-image-container:hover .portfolio-hover-overlay {
            background-color: rgba(0, 0, 0, 0.2);
          }

          .portfolio-image-container:hover img {
            transform: scale(1.05);
          }

          .portfolio-package-section {
            padding: 20px;
            background: #f8f9fa;
            text-align: center;
            margin-top: auto;
          }

          .view-package-btn {
            display: inline-block;
            padding: 12px 24px;
            background: #2c3e50;
            color: white;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            border: 2px solid #2c3e50;
            width: 100%;
            box-sizing: border-box;
          }

          .view-package-btn:hover {
            background: transparent;
            color: #2c3e50;
            text-decoration: none;
          }

          @media (max-width: 768px) {
            .portfolio-item-wrapper {
              margin-bottom: 0;
              height: auto;
              min-height: auto;
            }

            .portfolio-image-container {
              min-height: 250px;
            }

            .portfolio-package-section {
              padding: 12px 15px;
              flex-shrink: 0;
            }

            .view-package-btn {
              padding: 10px 16px;
              font-size: 12px;
              letter-spacing: 0.5px;
              width: 100%;
              display: block;
            }

            .tp-project-5-2-category,
            .tp-project-5-2-content {
              font-size: 14px;
            }

            .tp-project-5-2-title-sm {
              font-size: 16px !important;
            }
          }

          @media (max-width: 576px) {
            .portfolio-item-wrapper {
              margin-bottom: 0;
              min-height: auto;
            }

            .portfolio-image-container {
              min-height: 200px;
            }

            .portfolio-package-section {
              padding: 10px 12px;
            }

            .view-package-btn {
              padding: 8px 12px;
              font-size: 11px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
