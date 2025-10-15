"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PACKAGE_DATA, formatPrice, CLASSIC_FEATURES, WALKIN_FEATURES, type PackageType } from "@/data/package-pricing";

interface PricingTableProps {
  packageSlug: string;
}

export default function PricingTable({ packageSlug }: PricingTableProps) {
  const router = useRouter();
  const packageData = PACKAGE_DATA.find(pkg => pkg.slug === packageSlug);

  if (!packageData) {
    return null;
  }

  return (
    <div className="pricing-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="pricing-header text-center mb-60">
              <h2 className="pricing-title">Pricing & Packages</h2>
              <p className="pricing-subtitle">
                Choose the perfect package for your photography needs
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4">
          {/** Helper: choose a sensible default looks value (prefer 2 looks) */}
          {(() => null)()}
          {/* Classic Package */}
          <div className="col-xl-6 col-lg-6">
            <div
              className="package-card classic-package is-clickable"
              role="button"
              tabIndex={0}
              onClick={() => {
                const classic = packageData.classic;
                const pref = classic.find(o => o.type === 'look' && o.looks === 2)
                  || classic.find(o => o.type === 'look');
                const looksParam = pref && pref.looks ? `&looks=${pref.looks}` : '';
                router.push(`/booking?package=${packageSlug}&type=classic${looksParam}`);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  const classic = packageData.classic;
                  const pref = classic.find(o => o.type === 'look' && o.looks === 2)
                    || classic.find(o => o.type === 'look');
                  const looksParam = pref && pref.looks ? `&looks=${pref.looks}` : '';
                  router.push(`/booking?package=${packageSlug}&type=classic${looksParam}`);
                }
              }}
            >
              <div className="package-header">
                <div className="package-badge">Popular</div>
                <h3 className="package-name">Classic Package</h3>
                <p className="package-tagline">Premium photography experience</p>
              </div>

              <div className="package-pricing-table">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>Price</th>
                      <th>Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageData.classic.map((option, idx) => (
                      <tr key={idx}>
                        <td className="option-name">{option.description}</td>
                        <td className="option-price">{formatPrice(option.price)}</td>
                        <td className="option-images">
                          {option.images.edited} edited
                          {option.images.unedited > 0 && `, ${option.images.unedited} unedited`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="package-features">
                <h4>What&apos;s Included:</h4>
                <ul>
                  {CLASSIC_FEATURES.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-action">
                {(() => {
                  const classic = packageData.classic;
                  const pref = classic.find(o => o.type === 'look' && o.looks === 2)
                    || classic.find(o => o.type === 'look');
                  const looksParam = pref && pref.looks ? `&looks=${pref.looks}` : '';
                  return (
                    <Link href={`/booking?package=${packageSlug}&type=classic${looksParam}`} className="btn-book-package">
                      Book Classic Package
                    </Link>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Walk-in Package */}
          <div className="col-xl-6 col-lg-6">
            <div
              className="package-card walkin-package is-clickable"
              role="button"
              tabIndex={0}
              onClick={() => {
                const walkin = packageData.walkin;
                const pref = walkin.find(o => o.type === 'look' && o.looks === 2)
                  || walkin.find(o => o.type === 'look');
                const looksParam = pref && pref.looks ? `&looks=${pref.looks}` : '';
                router.push(`/booking?package=${packageSlug}&type=walkin${looksParam}`);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  const walkin = packageData.walkin;
                  const pref = walkin.find(o => o.type === 'look' && o.looks === 2)
                    || walkin.find(o => o.type === 'look');
                  const looksParam = pref && pref.looks ? `&looks=${pref.looks}` : '';
                  router.push(`/booking?package=${packageSlug}&type=walkin${looksParam}`);
                }
              }}
            >
              <div className="package-header">
                <div className="package-badge walkin-badge">Value</div>
                <h3 className="package-name">Walk-in Package</h3>
                <p className="package-tagline">Quick & affordable sessions</p>
              </div>

              <div className="package-pricing-table">
                <table className="pricing-table">
                  <thead>
                    <tr>
                      <th>Option</th>
                      <th>Price</th>
                      <th>Images</th>
                    </tr>
                  </thead>
                  <tbody>
                    {packageData.walkin.map((option, idx) => (
                      <tr key={idx}>
                        <td className="option-name">{option.description}</td>
                        <td className="option-price">{formatPrice(option.price)}</td>
                        <td className="option-images">
                          {option.images.edited} edited
                          {option.images.unedited > 0 && `, ${option.images.unedited} unedited`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="package-features">
                <h4>What&apos;s Included:</h4>
                <ul>
                  {WALKIN_FEATURES.map((feature, idx) => (
                    <li key={idx}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="package-action">
                {(() => {
                  const walkin = packageData.walkin;
                  const pref = walkin.find(o => o.type === 'look' && o.looks === 2)
                    || walkin.find(o => o.type === 'look');
                  const looksParam = pref && pref.looks ? `&looks=${pref.looks}` : '';
                  return (
                    <Link href={`/booking?package=${packageSlug}&type=walkin${looksParam}`} className="btn-book-package secondary">
                      Book Walk-in Package
                    </Link>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-50">
          <div className="col-xl-8">
            <div className="pricing-note">
              <p className="note-icon">📌</p>
              <div className="note-content">
                <h4>Important Note</h4>
                <p><strong>Classic Packages:</strong> Booking and reservations must be made in advance. All prices are in Nigerian Naira (₦). Additional services like express delivery and BTS content are available at extra cost.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pricing-section {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .pricing-header {
          margin-bottom: 60px;
        }

        .pricing-title {
          font-size: 42px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 15px;
        }

        .pricing-subtitle {
          font-size: 18px;
          color: #666;
        }

        .package-card {
          background: #fff;
          border-radius: 12px;
          padding: 40px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .package-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .package-card.is-clickable { cursor: pointer; position: relative; }
        .package-card.is-clickable::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          box-shadow: 0 0 0 0 rgba(183,196,53,0.25);
          transition: box-shadow 0.2s ease;
          pointer-events: none;
        }
        .package-card.is-clickable:hover::after {
          box-shadow: 0 0 0 3px rgba(183,196,53,0.25);
        }

        .classic-package {
          border: 2px solid var(--tp-theme-1);
        }

        .package-header {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
        }

        .package-badge {
          display: inline-block;
          background: var(--tp-theme-1);
          color: white;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 15px;
        }

        .walkin-badge {
          background: #6c757d;
        }

        .package-name {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .package-tagline {
          font-size: 15px;
          color: #666;
        }

        .package-pricing-table {
          margin-bottom: 30px;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
        }

        .pricing-table thead {
          background: #f8f9fa;
        }

        .pricing-table th {
          padding: 15px 12px;
          text-align: left;
          font-size: 13px;
          font-weight: 700;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 2px solid #e0e0e0;
        }

        .pricing-table td {
          padding: 18px 12px;
          border-bottom: 1px solid #f0f0f0;
        }

        .pricing-table tbody tr:last-child td {
          border-bottom: none;
        }

        .pricing-table tbody tr:hover {
          background: #f8f9fa;
        }

        .option-name {
          font-weight: 600;
          color: #333;
        }

        .option-price {
          font-weight: 700;
          color: var(--tp-theme-1);
          font-size: 18px;
        }

        .option-images {
          font-size: 14px;
          color: #666;
        }

        .package-features {
          flex: 1;
          margin-bottom: 30px;
        }

        .package-features h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 20px;
        }

        .package-features ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .package-features li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 10px 0;
          color: #444;
          font-size: 15px;
          line-height: 1.6;
        }

        .package-features li svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--tp-theme-1);
        }

        .package-action {
          margin-top: auto;
        }

        .btn-book-package {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          padding: 18px 30px;
          background: linear-gradient(135deg, var(--tp-theme-1) 0%, #a0b030 100%);
          color: white;
          text-align: center;
          font-weight: 700;
          font-size: 17px;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 4px 15px rgba(183, 196, 53, 0.3);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .btn-book-package::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-book-package:hover::before {
          left: 100%;
        }

        .btn-book-package::after {
          content: '→';
          font-size: 20px;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .btn-book-package:hover {
          background: linear-gradient(135deg, #a0b030 0%, var(--tp-theme-1) 100%);
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 25px rgba(183, 196, 53, 0.5);
          color: white;
        }

        .btn-book-package:hover::after {
          transform: translateX(5px);
        }

        .btn-book-package:active {
          transform: translateY(-1px) scale(1);
          box-shadow: 0 3px 10px rgba(183, 196, 53, 0.4);
        }

        .btn-book-package.secondary {
          background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
          box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
        }

        .btn-book-package.secondary:hover {
          background: linear-gradient(135deg, #5a6268 0%, #6c757d 100%);
          box-shadow: 0 8px 25px rgba(108, 117, 125, 0.5);
          color: white;
        }

        .package-card:hover .btn-book-package {
          transform: translateY(-2px);
        }

        .pricing-note {
          background: #fff3cd;
          border: 1px solid #ffc107;
          border-left: 4px solid #ffc107;
          border-radius: 8px;
          padding: 25px;
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .note-icon {
          font-size: 32px;
          margin: 0;
          line-height: 1;
        }

        .note-content h4 {
          font-size: 18px;
          font-weight: 700;
          color: #856404;
          margin-bottom: 10px;
        }

        .note-content p {
          color: #856404;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 991px) {
          .pricing-section {
            padding: 60px 0;
          }

          .pricing-title {
            font-size: 32px;
          }

          .package-card {
            padding: 30px;
          }

          .package-name {
            font-size: 24px;
          }
        }

        @media (max-width: 576px) {
          .pricing-section {
            padding: 40px 0;
          }

          .pricing-title {
            font-size: 28px;
          }

          .package-card {
            padding: 25px;
          }

          .pricing-table th,
          .pricing-table td {
            padding: 12px 8px;
            font-size: 13px;
          }

          .option-price {
            font-size: 16px;
          }

          .package-features li {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
