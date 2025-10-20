"use client";
import React from "react";
import HeaderOne from "@/layouts/headers/header-one";
import FooterTwo from "@/layouts/footers/footer-two";
import Link from "next/link";

export default function TrainingPage() {
  return (
    <div>
      <HeaderOne />
      <main>
        <section className="tm-hero-area tm-hero-ptb pt-120 text-center">
          <div className="container">
            <h1 className="tm-hero-title fs-320">Training at Lum Studio</h1>
            <p className="lead mt-20">Practical photography, editing and videography courses taught by industry professionals.</p>
          </div>
        </section>

        <section className="training-about pt-80 pb-60">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h3>What you'll learn</h3>
                <ul className="training-list">
                  <li>Camera fundamentals and exposure (manual mode mastery)</li>
                  <li>Portrait, lifestyle, and event photography techniques</li>
                  <li>Lighting — natural light & studio flash</li>
                  <li>Post-production: Lightroom & Photoshop workflows</li>
                  <li>Videography basics: framing, motion, and editing</li>
                  <li>Client workflow, portfolio building and pricing</li>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="training-cta">
                  <p>Hands-on sessions, small class sizes, and mentorship from working creatives.</p>
                  <Link href="https://wa.me/2348145538164" className="tp-btn-black-2">Enroll Now</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="training-plans pt-60 pb-80">
          <div className="container">
            <div className="row g-4 justify-content-center">
              <div className="col-md-4">
                <div className="plan-card text-center">
                  <h4>1 Year Program</h4>
                  <p className="price">N150,000</p>
                  <p>Comprehensive program covering photography, editing and videography.</p>
                  <Link href="https://wa.me/2348145538164" className="tp-btn-black-2">Enroll</Link>
                </div>
              </div>
              <div className="col-md-4">
                <div className="plan-card text-center">
                  <h4>6 Months Program</h4>
                  <p className="price">N100,000</p>
                  <p>Intensive course focused on practical skills and portfolio work.</p>
                  <Link href="https://wa.me/2348145538164" className="tp-btn-black-2">Enroll</Link>
                </div>
              </div>
              <div className="col-md-4">
                <div className="plan-card text-center">
                  <h4>3 Months Program</h4>
                  <p className="price">N70,000</p>
                  <p>Fast-track fundamentals and editing essentials.</p>
                  <Link href="https://wa.me/2348145538164" className="tp-btn-black-2">Enroll</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="training-faq pt-60 pb-80">
          <div className="container">
            <h3>Frequently Asked Questions</h3>
            <div className="accordion">
              <details>
                <summary>Are there certificates?</summary>
                <div>Yes — we provide a certificate of completion and portfolio review.</div>
              </details>
            </div>
          </div>
        </section>
      </main>
      <FooterTwo />

      <style jsx>{`
        .training-about .training-list { list-style: disc; padding-left: 20px; }
        .plan-card { padding: 28px; border-radius: 12px; background: #fff; box-shadow: 0 6px 30px rgba(0,0,0,0.06); }
        .plan-card .price { font-size: 28px; font-weight:700; margin: 12px 0; }
        .tp-btn-black-2 { display:inline-block; margin-top:12px; }
        .training-cta p { margin-bottom: 12px; }
        .accordion details { margin-bottom: 12px; }
      `}</style>
    </div>
  );
}
