"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGSAP } from "@gsap/react";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import { fadeAnimation } from "@/utils/title-animation";

// internal imports
import Wrapper from "@/layouts/wrapper";
import HeaderTransparent from "@/layouts/headers/header-transparent";
import FooterTwo from "@/layouts/footers/footer-two";

interface PackageData {
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

function CheckoutContent() {
  const [packageData, setPackageData] = useState<PackageData | null>(null);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  
  useScrollSmooth();

  useGSAP(() => {
    const timer = setTimeout(() => {
      fadeAnimation();
    }, 100);
    return () => clearTimeout(timer);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run on client side after mounting
    if (!mounted || !searchParams) return;
    
    const name = searchParams.get('name') || '';
    const category = searchParams.get('category') || '';
    const price = searchParams.get('price') || '';
    const image = searchParams.get('image') || '/assets/img/inner-project/portfolio-col-2/port-1.webp';
    const description = searchParams.get('description') || '';

    if (name && category && price) {
      setPackageData({
        name: decodeURIComponent(name),
        category: decodeURIComponent(category),
        price: decodeURIComponent(price),
        image: decodeURIComponent(image),
        description: decodeURIComponent(description)
      });
    }
  }, [mounted, searchParams]);

  const copyAccountNumber = () => {
    navigator.clipboard.writeText('2087654321');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mounted || !packageData) {
    return (
      <Wrapper>
        <HeaderTransparent />
        <div className="checkout-loading pt-190 pb-130">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="text-center">
                  <h2>Loading checkout...</h2>
                  <p>Please wait while we prepare your package details.</p>
                  <Link href="/gallery" className="tp-btn-circle style-2 mt-30">
                    <span className="tp-btn-circle-text">Back to Gallery</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterTwo topCls="" />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* header area start */}
      <HeaderTransparent />
      {/* header area end */}

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            {/* Checkout Hero */}
            <div className="checkout-hero-area pt-190 pb-60">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8">
                    <div className="checkout-hero-content text-center">
                      <h1 className="checkout-title">Package Checkout</h1>
                      <p className="checkout-subtitle">Complete your photography package booking</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Content */}
            <div className="checkout-area pb-120">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-10">
                    <div className="checkout-wrapper">
                      
                      {/* Package Summary */}
                      <div className="package-summary-section">
                        <h2 className="section-title">Package Summary</h2>
                        <div className="package-summary-card">
                          <div className="package-image">
                            <Image
                              src={packageData.image}
                              alt={packageData.name}
                              width={200}
                              height={150}
                              style={{ objectFit: 'cover' }}
                            />
                          </div>
                          <div className="package-details">
                            <h3 className="package-name">{packageData.name}</h3>
                            <p className="package-category">{packageData.category}</p>
                            <p className="package-description">{packageData.description}</p>
                          </div>
                          <div className="package-price">
                            <span className="price-label">Total Amount</span>
                            <span className="price-value">{packageData.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Information */}
                      <div className="payment-info-section">
                        <h2 className="section-title">Payment Information</h2>
                        <div className="payment-card">
                          <div className="bank-details">
                            <h3>Bank Transfer Details</h3>
                            <div className="bank-info">
                              <div className="info-row">
                                <span className="label">Bank Name:</span>
                                <span className="value">First Bank of Nigeria</span>
                              </div>
                              <div className="info-row">
                                <span className="label">Account Name:</span>
                                <span className="value">LUM STUDIOS LIMITED</span>
                              </div>
                              <div className="info-row">
                                <span className="label">Account Number:</span>
                                <div className="account-number-container">
                                  <span className="value account-number">2087654321</span>
                                  <button 
                                    onClick={copyAccountNumber}
                                    className="copy-btn"
                                    title="Copy account number"
                                  >
                                    {copied ? '✓' : '📋'}
                                  </button>
                                </div>
                              </div>
                              <div className="info-row">
                                <span className="label">Amount:</span>
                                <span className="value amount">{packageData.price}</span>
                              </div>
                            </div>
                          </div>

                          <div className="payment-instructions">
                            <h4>Payment Instructions</h4>
                            <ol>
                              <li>Transfer the exact amount to the account above</li>
                              <li>Use your full name as the transfer reference</li>
                              <li>Call us to confirm your payment</li>
                              <li>We&apos;ll contact you within 24 hours to schedule your session</li>
                            </ol>
                          </div>

                          <div className="contact-info">
                            <h4>Confirm Payment</h4>
                            <div className="contact-details">
                              <div className="contact-item">
                                <span className="contact-label">📞 Call:</span>
                                <a href="tel:+2348123456789" className="contact-value">+234 812 345 6789</a>
                              </div>
                              <div className="contact-item">
                                <span className="contact-label">📱 WhatsApp:</span>
                                <a href="https://wa.me/2348123456789" className="contact-value" target="_blank">+234 812 345 6789</a>
                              </div>
                              <div className="contact-item">
                                <span className="contact-label">✉️ Email:</span>
                                <a href="mailto:lummedia01@gmail.com" className="contact-value">lummedia01@gmail.com</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="checkout-actions">
                        <Link href="/gallery" className="back-btn">
                          ← Back to Gallery
                        </Link>
                        <a href="tel:+2348123456789" className="confirm-payment-btn">
                          📞 Confirm Payment
                        </a>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* footer area */}
          <FooterTwo topCls="" />
          {/* footer area */}
        </div>
      </div>

      <style jsx>{`
        .checkout-hero-area {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          color: #2c3e50;
        }

        .checkout-title {
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #2c3e50;
        }

        .checkout-subtitle {
          font-size: 18px;
          opacity: 0.8;
          color: #495057;
        }

        .checkout-wrapper {
          background: white;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .package-summary-section,
        .payment-info-section {
          padding: 40px;
          border-bottom: 1px solid #eee;
        }

        .payment-info-section {
          border-bottom: none;
        }

        .section-title {
          font-size: 24px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 25px;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }

        .package-summary-card {
          display: flex;
          gap: 25px;
          align-items: center;
          background: #f8f9fa;
          padding: 25px;
          border-radius: 10px;
        }

        .package-image {
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
        }

        .package-details {
          flex: 1;
        }

        .package-name {
          font-size: 20px;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 5px;
        }

        .package-category {
          color: #7f8c8d;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
        }

        .package-description {
          color: #555;
          line-height: 1.5;
          margin: 0;
        }

        .package-price {
          text-align: right;
          flex-shrink: 0;
        }

        .price-label {
          display: block;
          color: #7f8c8d;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .price-value {
          font-size: 28px;
          font-weight: 700;
          color: #27ae60;
        }

        .payment-card {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 10px;
        }

        .bank-details h3,
        .payment-instructions h4,
        .contact-info h4 {
          color: #2c3e50;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .bank-info {
          background: white;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }

        .info-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #eee;
        }

        .info-row:last-child {
          border-bottom: none;
        }

        .label {
          font-weight: 600;
          color: #2c3e50;
        }

        .value {
          font-weight: 500;
        }

        .account-number-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .account-number {
          font-family: monospace;
          font-size: 16px;
          font-weight: bold;
          color: #2c3e50;
        }

        .copy-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 5px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background 0.3s ease;
        }

        .copy-btn:hover {
          background: #2980b9;
        }

        .amount {
          font-size: 18px;
          font-weight: bold;
          color: #27ae60;
        }

        .payment-instructions {
          margin-bottom: 30px;
        }

        .payment-instructions ol {
          margin: 0;
          padding-left: 20px;
        }

        .payment-instructions li {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .contact-details {
          background: white;
          padding: 20px;
          border-radius: 8px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 12px;
        }

        .contact-item:last-child {
          margin-bottom: 0;
        }

        .contact-label {
          font-weight: 600;
          min-width: 100px;
        }

        .contact-value {
          color: #3498db;
          text-decoration: none;
          font-weight: 500;
        }

        .contact-value:hover {
          text-decoration: underline;
        }

        .checkout-actions {
          padding: 30px 40px;
          background: #f8f9fa;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .back-btn,
        .confirm-payment-btn {
          padding: 12px 25px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .back-btn {
          background: #95a5a6;
          color: white;
        }

        .back-btn:hover {
          background: #7f8c8d;
          text-decoration: none;
        }

        .confirm-payment-btn {
          background: #27ae60;
          color: white;
        }

        .confirm-payment-btn:hover {
          background: #229954;
          text-decoration: none;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .checkout-title {
            font-size: 28px;
          }

          .checkout-subtitle {
            font-size: 16px;
          }

          .package-summary-section,
          .payment-info-section {
            padding: 20px;
          }

          .section-title {
            font-size: 20px;
          }

          .package-summary-card {
            flex-direction: column;
            text-align: center;
            padding: 20px;
            gap: 15px;
          }

          .package-image {
            width: 100%;
          }

          .package-image img {
            width: 100% !important;
            height: auto !important;
          }

          .package-name {
            font-size: 18px;
            word-wrap: break-word;
          }

          .package-description {
            font-size: 14px;
            word-wrap: break-word;
          }

          .package-price {
            text-align: center;
            width: 100%;
          }

          .price-value {
            font-size: 24px;
          }

          .payment-card {
            padding: 20px;
          }

          .bank-details h3,
          .payment-instructions h4,
          .contact-info h4 {
            font-size: 16px;
          }

          .bank-info {
            padding: 15px;
          }

          .info-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 10px 0;
          }

          .label {
            font-size: 14px;
          }

          .value {
            font-size: 14px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            max-width: 100%;
          }

          .account-number-container {
            width: 100%;
            justify-content: space-between;
          }

          .account-number {
            font-size: 16px;
          }

          .payment-instructions ol {
            padding-left: 18px;
            font-size: 14px;
          }

          .payment-instructions li {
            word-wrap: break-word;
            margin-bottom: 10px;
          }

          .contact-details {
            padding: 15px;
          }

          .contact-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            margin-bottom: 15px;
          }

          .contact-label {
            min-width: auto;
            font-size: 14px;
          }

          .contact-value {
            font-size: 14px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            max-width: 100%;
          }

          .checkout-actions {
            flex-direction: column;
            gap: 15px;
            padding: 20px;
          }

          .back-btn,
          .confirm-payment-btn {
            width: 100%;
            text-align: center;
            padding: 14px 20px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .checkout-title {
            font-size: 24px;
          }

          .package-summary-card {
            padding: 15px;
          }

          .section-title {
            font-size: 18px;
          }

          .package-name {
            font-size: 16px;
          }

          .price-value {
            font-size: 22px;
          }

          .payment-card {
            padding: 15px;
          }

          .bank-info {
            padding: 12px;
          }

          .contact-details {
            padding: 12px;
          }
        }
      `}</style>
    </Wrapper>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <Wrapper>
        <HeaderTransparent />
        <div className="checkout-loading pt-190 pb-130">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6">
                <div className="text-center">
                  <h2>Loading checkout...</h2>
                  <p>Please wait while we prepare your package details.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterTwo topCls="" />
      </Wrapper>
    }>
      <CheckoutContent />
    </Suspense>
  );
}