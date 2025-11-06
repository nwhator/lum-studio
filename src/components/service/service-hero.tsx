import React from "react";

export default function ServiceHero() {
  return (
    <div className="sv-hero-area sv-hero-ptb">
      <div className="container container-1530">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="sv-hero-title-box text-center">
              <h1 className="sv-hero-title" style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: '700', marginTop: '50px' }}>
                Our Services
              </h1>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .sv-hero-title {
          animation: none !important;
          opacity: 1 !important;
          transform: none !important;
        }
      `}</style>
    </div>
  );
}
