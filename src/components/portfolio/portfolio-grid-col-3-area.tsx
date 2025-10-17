import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
type IProps = { style_2?: boolean };

// Helper: map category to package route
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

export default function PortfolioGridColThreeArea({ style_2 = false }: IProps) {
  const { initIsotop, isotopContainer } = useIsotop();
  const [isMobile, setIsMobile] = useState(false);
  const [centeredCard, setCenteredCard] = useState<number | null>(null);

  // Build a data structure: categories with their images (3 each)
  const categories = useMemo(() => {
    // group by show (cat1..cat6) and sort by id
    const map = new Map<string, { category: string; images: string[]; ids: number[] }>();
    for (const p of portfolio_data) {
      if (!map.has(p.show)) map.set(p.show, { category: p.category, images: [], ids: [] });
      const entry = map.get(p.show)!;
      if (entry.images.length < 3) {
        entry.images.push(p.img);
        entry.ids.push(p.id);
      }
    }
    return Array.from(map.entries()).map(([show, v]) => ({ show, ...v }));
  }, []);

  // Flipbook state: index per category
  const indicesRef = useRef<number[]>(categories.map(() => 0));
  const [, tick] = useState(0); // used to force re-render each tick

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // init isotop on mount (client-side)
    if (typeof window !== 'undefined') {
      const t = setTimeout(() => initIsotop(), 120);
      return () => clearTimeout(t);
    }
  }, [initIsotop]);

  useEffect(() => {
    // Cycle each category's index every 4s
    const interval = setInterval(() => {
      for (let i = 0; i < indicesRef.current.length; i++) {
        indicesRef.current[i] = (indicesRef.current[i] + 1) % Math.max(1, (categories[i]?.images.length ?? 1));
      }
      // trigger update
      tick((n) => n + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [categories]);

  // Center animation: on hover show the focused card in a fixed overlay that recenters it
  const openCenter = (index: number) => setCenteredCard(index);
  const closeCenter = () => setCenteredCard(null);

  return (
    <div className="tp-project-5-2-area tp-project-5-2-pt pb-130">
      <div className={`container container-${style_2 ? "1800" : "1530"}`}>
        <div className="row grid gx-3 gy-3 gallery-viewport-grid" ref={isotopContainer}>
          {categories.map((cat, i) => {
            const images = cat.images;
            const idx = indicesRef.current[i] % images.length;
            const packageRoute = getPackageRoute(cat.category);
            return (
              <div key={cat.show} className="col-xl-4 col-lg-6 col-md-6 col-sm-12 grid-item">
                <div
                  className={`portfolio-card ${centeredCard === i ? 'is-centered' : ''}`}
                  onMouseEnter={() => !isMobile && openCenter(i)}
                  onMouseLeave={() => !isMobile && closeCenter()}
                  onFocus={() => !isMobile && openCenter(i)}
                  onBlur={() => !isMobile && closeCenter()}
                >
                  <div className="flipbook" aria-hidden={false}>
                    {images.map((src, k) => (
                      <div
                        key={k}
                        className={`flip-frame ${k === idx ? 'visible' : ''}`}
                        style={{ zIndex: k === idx ? 3 : 1 }}
                      >
                        <Image src={src} alt={`${cat.category} ${k + 1}`} fill sizes="(max-width:600px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>

                  <div className="card-meta">
                    <div className="meta-top">
                      <h4 className="cat-title">{cat.category}</h4>
                      <span className="count">{images.length} images</span>
                    </div>
                    <div className="meta-actions">
                      <Link href={packageRoute} className="view-package-btn">View Package</Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center overlay when a card is hovered */}
        {centeredCard !== null && (
          <div className="center-overlay" onClick={closeCenter} role="dialog" aria-modal="true">
            <div className="center-inner" onClick={(e) => e.stopPropagation()}>
              <div className="center-flipbook">
                {categories[centeredCard].images.map((src, k) => (
                  <div key={k} className={`center-frame`}>
                    <Image src={src} alt={`${categories[centeredCard].category} ${k + 1}`} fill sizes="100vw" style={{ objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
              <div className="center-meta">
                <h3>{categories[centeredCard].category}</h3>
                <Link href={getPackageRoute(categories[centeredCard].category)} className="view-package-btn large">View Package</Link>
                <button className="close-btn" onClick={closeCenter} aria-label="Close">Close</button>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          .gallery-viewport-grid { display:flex; flex-wrap:wrap; gap:18px; align-items:stretch; }
          .portfolio-card { position:relative; border-radius:10px; overflow:hidden; height:360px; box-shadow: 0 8px 24px rgba(12,12,12,0.08); transition: transform .35s ease, box-shadow .35s ease; background:#f6f6f6; }
          .portfolio-card.is-centered { transform: scale(1.02); box-shadow: 0 18px 48px rgba(12,12,12,0.18); }
          .flipbook { position:relative; width:100%; height:70%; background:#ddd; }
          .flip-frame { position:absolute; inset:0; opacity:0; transform-origin:center; transition: opacity .6s ease, transform .6s cubic-bezier(.2,.9,.25,1); }
          .flip-frame.visible { opacity:1; transform: translateY(0) scale(1); }
          .flip-frame:not(.visible) { transform: translateY(6px) scale(.98); }
          .flip-frame img, .flip-frame :global(img) { width:100%; height:100%; object-fit:cover; }
          .card-meta { padding:14px; display:flex; justify-content:space-between; align-items:center; gap:12px; height:30%; }
          .meta-top { display:flex; flex-direction:column; }
          .cat-title { margin:0; font-size:18px; font-weight:700; }
          .count { font-size:13px; color:#666; }
          .view-package-btn { background:#111; color:#fff; padding:8px 12px; border-radius:6px; text-decoration:none; font-size:13px; }
          .view-package-btn.large { padding:10px 14px; font-size:15px; }

          /* Center overlay */
          .center-overlay { position:fixed; inset:0; z-index:1200; background: rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; padding:24px; }
          .center-inner { width:min(1100px, 96%); max-height:90vh; overflow:auto; background:#fff; border-radius:10px; padding:18px; display:flex; gap:18px; }
          .center-flipbook { flex:1; display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; }
          .center-frame { position:relative; width:100%; height:60vh; border-radius:8px; overflow:hidden; }
          .center-meta { width:320px; display:flex; flex-direction:column; gap:12px; justify-content:flex-start; }
          .close-btn { background:transparent; border:none; color:#777; cursor:pointer; padding:6px; }

          @media (max-width: 1024px) {
            .portfolio-card { height:320px; }
            .center-inner { flex-direction:column; }
            .center-flipbook { grid-template-columns:1fr; }
            .center-meta { width:100%; }
          }
          @media (max-width: 768px) {
            .gallery-viewport-grid { gap:12px; }
            .portfolio-card { height:260px; }
            .flipbook { height:62%; }
            .flip-frame { transition: opacity .45s ease; }
            /* mobile: enable horizontal scrolling for cards */
            .row.grid { display:flex; overflow-x:auto; gap:12px; scroll-snap-type:x mandatory; padding-bottom:12px; }
            .col-xl-4, .col-lg-6, .col-md-6, .col-sm-12 { flex:0 0 80%; scroll-snap-align:center; max-width:80%; }
          }
        `}</style>
      </div>
    </div>
  );
}
