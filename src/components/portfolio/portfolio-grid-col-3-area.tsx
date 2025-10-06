import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { UpArrow } from "../svg";
import { useIsotop } from "@/hooks/use-isotop";


// data
const portfolio_data = [
  // Baby Shoot (cat1)
  {
    id: 1,
    img: "/assets/img/inner-project/portfolio-col-2/port-1.jpg",
    category: "Baby Shoot",
    title: "Adorable Beginnings",
    year: "2024",
    show: "cat1",
  },
  {
    id: 2,
    img: "/assets/img/inner-project/portfolio-col-2/port-2.jpg",
    category: "Baby Shoot",
    title: "Tiny Moments",
    year: "2024",
    show: "cat1",
  },
  {
    id: 3,
    img: "/assets/img/inner-project/portfolio-col-2/port-3.jpg",
    category: "Baby Shoot",
    title: "First Smiles",
    year: "2024",
    show: "cat1",
  },
  // Wedding Shoot (cat2)
  {
    id: 4,
    img: "/assets/img/inner-project/portfolio-col-2/port-4.jpg",
    category: "Wedding Shoot",
    title: "Forever Begins",
    year: "2024",
    show: "cat2",
  },
  {
    id: 5,
    img: "/assets/img/inner-project/portfolio-col-2/port-5.jpg",
    category: "Wedding Shoot",
    title: "The Vows",
    year: "2024",
    show: "cat2",
  },
  {
    id: 6,
    img: "/assets/img/inner-project/portfolio-col-2/port-6.jpg",
    category: "Wedding Shoot",
    title: "Celebration",
    year: "2024",
    show: "cat2",
  },
  // Call to Bar (cat3)
  {
    id: 7,
    img: "/assets/img/inner-project/portfolio-col-2/port-7.jpg",
    category: "Call to Bar",
    title: "Milestone",
    year: "2024",
    show: "cat3",
  },
  {
    id: 8,
    img: "/assets/img/inner-project/portfolio-col-2/port-8.jpg",
    category: "Call to Bar",
    title: "Achievement",
    year: "2024",
    show: "cat3",
  },
  {
    id: 9,
    img: "/assets/img/inner-project/portfolio-col-2/port-9.jpg",
    category: "Call to Bar",
    title: "Proud Moment",
    year: "2024",
    show: "cat3",
  },
  // Convocation (cat4)
  {
    id: 10,
    img: "/assets/img/inner-project/portfolio-col-2/port-10.jpg",
    category: "Convocation",
    title: "Graduation Day",
    year: "2024",
    show: "cat4",
  },
  {
    id: 11,
    img: "/assets/img/inner-project/portfolio-col-2/port-11.jpg",
    category: "Convocation",
    title: "New Beginnings",
    year: "2024",
    show: "cat4",
  },
  {
    id: 12,
    img: "/assets/img/inner-project/portfolio-col-2/port-12.jpg",
    category: "Convocation",
    title: "Academic Triumph",
    year: "2024",
    show: "cat4",
  },
  // Family Portraits (cat5)
  {
    id: 13,
    img: "/assets/img/inner-project/portfolio-col-2/port-13.jpg",
    category: "Family Portraits",
    title: "Family Bonds",
    year: "2024",
    show: "cat5",
  },
  {
    id: 14,
    img: "/assets/img/inner-project/portfolio-col-2/port-14.jpg",
    category: "Family Portraits",
    title: "Generations",
    year: "2024",
    show: "cat5",
  },
  {
    id: 15,
    img: "/assets/img/inner-project/portfolio-col-2/port-15.jpg",
    category: "Family Portraits",
    title: "Togetherness",
    year: "2024",
    show: "cat5",
  },
  // Maternity Portraits (cat6)
  {
    id: 16,
    img: "/assets/img/inner-project/portfolio-col-2/port-16.jpg",
    category: "Maternity Portrait",
    title: "Motherhood Journey",
    year: "2024",
    show: "cat6",
  },
  {
    id: 17,
    img: "/assets/img/inner-project/portfolio-col-2/port-17.jpg",
    category: "Maternity Portrait",
    title: "Expecting Joy",
    year: "2024",
    show: "cat6",
  },
  {
    id: 18,
    img: "/assets/img/inner-project/portfolio-col-2/port-18.jpg",
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openLightbox = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % portfolio_data.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + portfolio_data.length) % portfolio_data.length);
  };

  useEffect(() => {
    initIsotop();
  }, [initIsotop]);

  return (
    <div className="tp-project-5-2-area tp-project-5-2-pt pb-130">
      <div className={`container container-${style_2 ? "1800" : "1530"}`}>
        {!style_2 && (
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="portfolio-filter masonary-menu d-flex justify-content-center mb-60">
                <button data-filter="*" className="active">
                  <span>SHOW ALL</span>
                </button>
                <button data-filter=".cat1">
                  <span>Baby Shoot</span>
                </button>
                <button data-filter=".cat2">
                  <span>Wedding Shoot</span>
                </button>
                <button data-filter=".cat3">
                  <span>Call to Bar</span>
                </button>
                <button data-filter=".cat4">
                  <span>Convocation</span>
                </button>
                <button data-filter=".cat5">
                  <span>Family Portraits</span>
                </button>
                <button data-filter=".cat6">
                  <span>Maternity Portrait</span>
                </button>
                <button data-filter=".cat7">
                  <span>Naming</span>
                </button>
                <button data-filter=".cat8">
                  <span>Portraits</span>
                </button>
                <button data-filter=".cat9">
                  <span>Product Shoot</span>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="row grid" ref={isotopContainer}>
          {portfolio_data.map((item) => (
            <div
              key={item.id}
              className={`col-xl-4 col-lg-6 col-md-6 grid-item ${item.show}`}
            >
              <div className="tp-project-5-2-thumb mb-30 p-relative not-hide-cursor portfolio-image-wrapper" data-cursor="View<br>Picture">
                <div className="portfolio-overlay" onClick={(e) => openLightbox(item.id - 1, e)}>
                  <div className="overlay-content">
                    <span className="view-text">View Picture</span>
                  </div>
                </div>
                <Link href="#" className="cursor-hide">
                    <Image
                      className="anim-zoomin"
                      src={item.img}
                      alt="port-img"
                      width={style_2 ? 573 : 486}
                      height={style_2 ? 683 : 576}
                      style={{ height: "100%" }}
                    />
                  <div className="tp-project-5-2-category tp-fade-anim">
                    <span>{item.category}</span>
                  </div>
                  <div className="tp-project-5-2-content tp-fade-anim">
                    <span className="tp-project-5-2-meta">{item.year}</span>
                    <h4 className="tp-project-5-2-title-sm">{item.title}</h4>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="tp-projct-5-2-btn-box mt-50 d-flex justify-content-center">
              <div className="tp-hover-btn-wrapper">
                <Link
                  className="tp-btn-circle style-2 tp-hover-btn-item tp-hover-btn"
                  href="/portfolio-grid-col-4"
                >
                  <span className="tp-btn-circle-text">
                    More <br /> Projects
                  </span>
                  <span className="tp-btn-circle-icon">
                    <UpArrow />
                  </span>
                  <i className="tp-btn-circle-dot"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={closeLightbox}>×</button>
              <button className="lightbox-prev" onClick={prevImage}>‹</button>
              <div className="lightbox-image-container">
                <Image
                  src={portfolio_data[currentImage].img}
                  alt="portfolio-img-fullscreen"
                  width={800}
                  height={600}
                  style={{ objectFit: 'contain', maxWidth: '85vw', maxHeight: '70vh' }}
                />
                <div className="lightbox-info">
                  <span className="lightbox-category">{portfolio_data[currentImage].category}</span>
                  <h3 className="lightbox-title">{portfolio_data[currentImage].title}</h3>
                  <span className="lightbox-year">{portfolio_data[currentImage].year}</span>
                </div>
              </div>
              <button className="lightbox-next" onClick={nextImage}>›</button>
            </div>
          </div>
        )}

        <style jsx>{`
          .portfolio-image-wrapper {
            position: relative;
            overflow: hidden;
            border-radius: 8px;
          }

          .portfolio-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.1);
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .portfolio-image-wrapper:hover .portfolio-overlay {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.6);
          }

          .overlay-content {
            text-align: center;
            color: white;
            transform: translateY(20px);
            transition: transform 0.3s ease;
          }

          .portfolio-image-wrapper:hover .overlay-content {
            transform: translateY(0);
          }

          .view-text {
            font-size: 18px;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .lightbox-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
          }

          .lightbox-content {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            max-width: 90vw;
            max-height: 80vh;
          }

          .lightbox-image-container {
            position: relative;
            text-align: center;
          }

          .lightbox-info {
            position: absolute;
            bottom: -50px;
            left: 50%;
            transform: translateX(-50%);
            color: white;
            text-align: center;
            width: 100%;
          }

          .lightbox-category {
            font-size: 14px;
            color: #ccc;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .lightbox-title {
            font-size: 24px;
            margin: 8px 0;
            color: white;
          }

          .lightbox-year {
            font-size: 16px;
            color: #999;
          }

          .lightbox-close {
            position: absolute;
            top: -50px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 40px;
            cursor: pointer;
            z-index: 10001;
            transition: color 0.3s ease;
          }

          .lightbox-close:hover {
            color: #ccc;
          }

          .lightbox-prev,
          .lightbox-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            font-size: 30px;
            padding: 15px 20px;
            cursor: pointer;
            border-radius: 50%;
            transition: background-color 0.3s ease;
          }

          .lightbox-prev {
            left: -80px;
          }

          .lightbox-next {
            right: -80px;
          }

          .lightbox-prev:hover,
          .lightbox-next:hover {
            background: rgba(255, 255, 255, 0.4);
          }

          @media (max-width: 768px) {
            .lightbox-prev {
              left: 10px;
              padding: 10px 15px;
              font-size: 24px;
            }

            .lightbox-next {
              right: 10px;
              padding: 10px 15px;
              font-size: 24px;
            }

            .lightbox-close {
              top: 20px;
              right: 20px;
              font-size: 30px;
            }

            .lightbox-info {
              bottom: -80px;
            }

            .lightbox-title {
              font-size: 20px;
            }

            .view-text {
              font-size: 16px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
