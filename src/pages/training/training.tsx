"use client";
import React from "react";
import HeaderOne from "@/layouts/headers/header-one";
import FooterTwo from "@/layouts/footers/footer-two";
import Link from "next/link";
import Image from 'next/image';
import trainingHero from '@/public/assets/img/home-01/hero/hero-1-1.webp';

export default function TrainingPage() {
  return (
    <div>
      <HeaderOne />
      <main>
        <section className="tm-hero-area tm-hero-ptb pt-120 text-center">
          <div className="container">
            <h1 className="tm-hero-title fs-320">Training at Lum Studio</h1>
            <p className="lead mt-20">Practical photography, editing and videography courses taught by industry professionals.</p>
            <div style={{ marginTop: 22 }}>
              <Link href="https://wa.me/2348145538164" className="tp-btn-black-2" aria-label="Enroll via WhatsApp">Enroll / Ask a Question</Link>
            </div>
            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
              <Image src={trainingHero} alt="Training hero" width={1200} height={480} priority sizes="(max-width: 768px) 100vw, 1200px" />
            </div>
          </div>
        </section>

        <section className="training-about pt-80 pb-60">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-lg-8">
                <h3 className="mb-20">What you'll learn</h3>
                <p className="lead">A hands-on curriculum focused on camera fundamentals, lighting, post-production, and building a client-ready portfolio.</p>
                <ul className="training-list mx-auto" style={{maxWidth: 720, marginTop: 18}}>
                  <li>Camera fundamentals and exposure (manual mode mastery)</li>
                  <li>Portrait, lifestyle, and event photography techniques</li>
                  <li>Lighting — natural light & studio flash</li>
                  <li>Post-production: Lightroom & Photoshop workflows</li>
                  <li>Videography basics: framing, motion, and editing</li>
                  <li>Client workflow, portfolio building and pricing</li>
                </ul>
                <div style={{ marginTop: 18 }}>
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
              <div className="col-lg-10">
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
        .tm-hero-area { display:flex; align-items:center; justify-content:center; text-align:center; }
        .tm-hero-title { font-size: clamp(28px, 4.4vw, 48px); margin-bottom: 8px; font-weight:700; }
        .lead { color: #444; font-size: 18px; max-width: 780px; margin: 0 auto; }

        /* Hero image responsiveness */
        .tm-hero-area img { width: 100%; height: auto; border-radius: 12px; box-shadow: 0 12px 40px rgba(0,0,0,0.06); }

        .training-about .training-list { list-style: disc; padding-left: 20px; text-align: left; }
        .training-about h3 { font-size: 22px; margin-bottom: 8px; }

        .plan-card { padding: 28px; border-radius: 12px; background: #fff; box-shadow: 0 6px 30px rgba(0,0,0,0.06); transition: transform 180ms ease, box-shadow 180ms ease; }
        .plan-card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(0,0,0,0.08); }
        .plan-card .price { font-size: 28px; font-weight:700; margin: 12px 0; color: #1a1a1a; }
        .tp-btn-black-2 { display:inline-block; margin-top:12px; padding: 12px 26px; border-radius: 50px; }
        .training-cta p { margin-bottom: 12px; }
        .accordion details { margin-bottom: 12px; }

        /* fade-in animations */
        .fade-in { opacity: 0; transform: translateY(8px); animation: fadeUp 480ms cubic-bezier(.2,.9,.2,1) forwards; }
        .fade-in-delay { animation-delay: 120ms; }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* Center plan cards on mobile and keep horizontal on desktop */
        @media (max-width: 991px) {
          .training-about .training-list { text-align: left; }
          .tm-hero-area { padding-left: 18px; padding-right: 18px; }
          .tm-hero-area img { max-width: 100%; }
        }

        @media (min-width: 992px) {
          .plan-card { min-height: 240px; display:flex; flex-direction:column; justify-content:space-between; }
        }
      `}</style>
    </div>
  );
}
