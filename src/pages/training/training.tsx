"use client";
import React from "react";
import HeaderOne from "@/layouts/headers/header-one";
import FooterTwo from "@/layouts/footers/footer-two";
import Link from "next/link";
import Image from 'next/image';

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
              <Image src="/assets/img/backup-original/inner-about/hero/team.jpg" alt="Training hero" width={1200} height={480} priority sizes="(max-width: 768px) 100vw, 1200px" />
            </div>
          </div>
        </section>

        <section className="training-about pt-80 pb-60">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="about-card text-center fade-in">
                  <h3 className="mb-16">What you'll learn</h3>
                  <p className="lead">A hands-on curriculum focused on camera fundamentals, lighting, post-production, and building a client-ready portfolio.</p>

                  <ul className="training-list mx-auto" style={{maxWidth: 720, marginTop: 22}}>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M20 6L9 17l-5-5" stroke="#B7C435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Camera fundamentals and exposure (manual mode mastery)</span>
                    </li>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M20 6L9 17l-5-5" stroke="#B7C435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Portrait, lifestyle, and event photography techniques</span>
                    </li>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M20 6L9 17l-5-5" stroke="#B7C435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Lighting — natural light & studio flash</span>
                    </li>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M20 6L9 17l-5-5" stroke="#B7C435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Post-production: Lightroom & Photoshop workflows</span>
                    </li>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M20 6L9 17l-5-5" stroke="#B7C435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Videography basics: framing, motion, and editing</span>
                    </li>
                    <li>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M20 6L9 17l-5-5" stroke="#B7C435" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Client workflow, portfolio building and pricing</span>
                    </li>
                  </ul>

                  <div style={{ marginTop: 22 }}>
                    <p style={{ marginBottom: 12 }}>Hands-on sessions, small class sizes, and mentorship from working creatives.</p>
                    <Link href="https://wa.me/2348145538164" className="tp-btn-green" aria-label="Enroll via WhatsApp">Enroll Now</Link>
                  </div>
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
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="plan-card text-center">
                      <h4>6 Months Program</h4>
                      <p className="price">N100,000</p>
                      <p>Intensive course focused on practical skills and portfolio work.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="plan-card text-center">
                      <h4>3 Months Program</h4>
                      <p className="price">N70,000</p>
                      <p>Fast-track fundamentals and editing essentials.</p>
                    </div>
                  </div>
                </div>
                <div className="text-center" style={{ marginTop: 32 }}>
                  <Link href="tel:+2348145538164" className="tp-btn-black-2" aria-label="Call to find out more">Call to find out</Link>
                </div>
              </div>
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
  .tp-btn-green { display:inline-block; margin-top:12px; padding: 12px 26px; border-radius: 50px; background: linear-gradient(180deg,#B7C435,#92a01d); color:#fff; text-decoration:none; font-weight:700; }
  .tp-btn-green:hover { opacity: 0.95; transform: translateY(-2px); }

  .about-card { background: #fff; padding: 34px; border-radius: 14px; box-shadow: 0 12px 40px rgba(0,0,0,0.06); }
  .training-list { list-style:none; padding: 0; margin: 0; display:block; }
  .training-list li { display:flex; gap:12px; align-items:flex-start; padding: 10px 0; color:#333; }
  .training-list li svg { flex: 0 0 18px; margin-top: 4px; }
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
