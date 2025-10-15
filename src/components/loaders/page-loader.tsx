"use client";
import { useState, useEffect } from "react";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Minimum loading time - 1500ms for balance between speed and smooth UX
    const minLoadTime = 1500;
    const startTime = Date.now();

    const handleLoad = () => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadTime - elapsedTime);

      setTimeout(() => {
        setFadeOut(true);
        // Remove loader after fade animation
        setTimeout(() => {
          setLoading(false);
        }, 500); // Match CSS transition duration
      }, remainingTime);
    };

    // Check if page is already loaded (only in browser)
    if (typeof window !== 'undefined') {
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  if (!loading) return null;

  return (
    <div className={`page-loader ${fadeOut ? "fade-out" : ""}`}>
      <div className="loader-content">
        <div className="loader-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loader-text">Loading Experience...</p>
      </div>

      <style jsx>{`
        .page-loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 99999;
          transition: opacity 0.5s ease, visibility 0.5s ease;
        }

        .page-loader.fade-out {
          opacity: 0;
          visibility: hidden;
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 35px;
        }

        .loader-spinner {
          position: relative;
          width: 80px;
          height: 80px;
        }

        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 4px solid transparent;
          border-top-color: var(--tp-theme-1);
          border-radius: 50%;
          animation: spin 1.2s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
        }

        .spinner-ring:nth-child(2) {
          width: 70%;
          height: 70%;
          top: 15%;
          left: 15%;
          border-top-color: rgba(var(--tp-theme-rgb), 0.6);
          animation-duration: 1.5s;
          animation-direction: reverse;
        }

        .spinner-ring:nth-child(3) {
          width: 40%;
          height: 40%;
          top: 30%;
          left: 30%;
          border-top-color: rgba(var(--tp-theme-rgb), 0.3);
          animation-duration: 0.9s;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .loader-text {
          font-family: var(--tp-ff-syne);
          font-size: 14px;
          font-weight: 500;
          color: #666;
          letter-spacing: 2px;
          text-transform: uppercase;
          animation: fadeInOut 2s ease-in-out infinite;
        }

        @keyframes fadeInOut {
          0%, 100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .logo-container {
            width: 140px;
            height: 140px;
          }

          :global(.logo-pulse) {
            width: 140px !important;
            height: 140px !important;
          }

          .loader-spinner {
            width: 50px;
            height: 50px;
          }

          .loader-text {
            font-size: 12px;
          }
        }

        @media (max-width: 576px) {
          .logo-container {
            width: 120px;
            height: 120px;
          }

          :global(.logo-pulse) {
            width: 120px !important;
            height: 120px !important;
          }

          .loader-content {
            gap: 25px;
          }
        }

        /* Accessibility - Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          :global(.logo-pulse),
          .spinner-ring,
          .loader-text {
            animation: none;
          }

          :global(.logo-pulse) {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
