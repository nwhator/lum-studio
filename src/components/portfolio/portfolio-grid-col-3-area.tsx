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
    // Cycle each category's index every 5s
    const interval = setInterval(() => {
      for (let i = 0; i < indicesRef.current.length; i++) {
        indicesRef.current[i] = (indicesRef.current[i] + 1) % Math.max(1, (categories[i]?.images.length ?? 1));
      }
      // trigger update
      tick((n) => n + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [categories]);

  // no center overlay; cards show stacked images and cycle automatically

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
                  <Link href={packageRoute} className={`portfolio-card`} aria-label={`Open package ${cat.category}`}>
                    <div className="stacked" aria-hidden={false}>
                      {images.map((src, k) => {
                        const n = images.length;
                        const offset = (k - idx + n) % n; // 0 = top, 1 = next (peeking), 2 = next-next
                        // Use CSS variables so hover/focus can adjust the top frame scale
                        const translateY = offset === 0 ? -8 : offset * 12; // positive means move down for deeper layers
                        const scale = offset === 0 ? 1 : 1 - offset * 0.02;
                        const zIndex = 100 - offset; // ensure top has highest z-index
                        const opacity = 1 - offset * 0.06;
                        const boxShadow = offset === 0 ? '0 20px 56px rgba(12,12,12,0.24)' : '0 6px 18px rgba(8,8,8,0.06)';
                        const isTop = offset === 0;
                        return (
                          <div
                            key={k}
                            className={`stack-frame`}
                            data-top={isTop}
                            style={{
                              zIndex,
                              opacity,
                              boxShadow,
                              // export vars for CSS to consume
                              ['--ty' as any]: `${translateY}px`,
                              ['--s' as any]: `${scale}`,
                              animation: isTop ? 'stack-arrive .45s ease' : undefined,
                            }}
                          >
                            <Image src={src} alt={`${cat.category} ${k + 1}`} fill sizes="(max-width:600px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                          </div>
                        );
                      })}
                    </div>

                  <div className="card-meta">
                    <div className="meta-top">
                      <h4 className="cat-title">{cat.category}</h4>
                    </div>
                    <div className="meta-actions">
                        {/* Removed inner View Package link */}
                    </div>
                  </div>
                    </Link>
              </div>
            );
          })}
        </div>

        <style jsx>{`
          .gallery-viewport-grid { display:flex; flex-wrap:wrap; gap:28px; align-items:stretch; }
          .portfolio-card { position:relative; border-radius:10px; overflow:hidden; height:auto; min-height:420px; box-shadow: 0 8px 24px rgba(12,12,12,0.08); transition: box-shadow .35s ease; background:transparent; display:flex; flex-direction:column; }
          .portfolio-card { cursor: pointer; }
          .portfolio-card:hover, .portfolio-card:focus-visible { transform: translateY(-6px); box-shadow: 0 22px 60px rgba(12,12,12,0.25); }
          /* Enforce square aspect ratio (1:1) for images */
          .stacked { position:relative; width:100%; display:block; padding-top:100%; /* 1:1 */ }
          .stack-frame { position:absolute; left:8px; right:8px; top:8px; bottom:8px; border-radius:8px; overflow:hidden; transition: transform .45s cubic-bezier(.2,.9,.25,1), opacity .45s ease, box-shadow .45s ease; transform: translateY(var(--ty,0)) scale(var(--s,1)); }
          .stack-frame :global(img) { width:100%; height:100%; object-fit:cover; }
          /* Hover/focus: slightly scale the top frame to indicate interactivity */
          .portfolio-card:hover .stack-frame[data-top="true"], .portfolio-card:focus-visible .stack-frame[data-top="true"] {
            --s: 1.03;
            filter: none;
          }
          @keyframes stack-arrive { from { opacity:0; transform: translateY(calc(var(--ty,0) + 8px)) scale(calc(var(--s,1) - 0.02)); } to { opacity:1; transform: translateY(var(--ty,0)) scale(var(--s,1)); } }
          .card-meta { padding:14px; display:flex; justify-content:space-between; align-items:center; gap:12px; height:30%; }
          .meta-top { display:flex; flex-direction:column; }
          .cat-title { margin:0; font-size:18px; font-weight:700; }
          .count { font-size:13px; color:#666; }
          .view-package-btn { background:#111; color:#fff; padding:8px 12px; border-radius:6px; text-decoration:none; font-size:13px; }

          @media (max-width: 1024px) {
            /* Let the stacked 1:1 container determine height on smaller screens */
            .portfolio-card { height: auto; }
          }
          @media (max-width: 768px) {
            .gallery-viewport-grid { gap:12px; }
            /* Let the stacked 1:1 container determine height on mobile */
            .portfolio-card { height: auto; }
            /* mobile: enable horizontal scrolling for cards */
            .row.grid { display:flex; overflow-x:auto; gap:12px; scroll-snap-type:x mandatory; padding-bottom:12px; justify-content:center; padding-left:12px; padding-right:12px; }
            .col-xl-4, .col-lg-6, .col-md-6, .col-sm-12 { flex:0 0 84%; scroll-snap-align:center; max-width:84%; display:flex; justify-content:center; }
          }
        `}</style>
      </div>
    </div>
  );
}
