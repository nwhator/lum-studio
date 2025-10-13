"use client";
import { gsap } from "gsap";
import { useState } from "react";
import { ScrollSmoother} from '@/plugins';
import { useGSAP } from "@gsap/react";
import { isIOSSafari, isMobileDevice } from "@/utils/ios-safe-gsap";

export default function useScrollSmooth() {
  const [isScrollSmooth, setIsScrollSmooth] = useState<boolean>(true);
  
  useGSAP(() => {
    // Skip ScrollSmoother on iOS and ALL mobile devices for stability
    if (typeof window !== 'undefined' && (isIOSSafari() || isMobileDevice())) {
      console.log('[ScrollSmooth] ⚠️ Skipped on mobile/iOS device - Using native scroll');
      
      // Disable GSAP effects on mobile to prevent fast scroll crashes
      gsap.config({
        nullTargetWarn: false,
        force3D: false, // Disable 3D transforms on mobile
      });
      
      return;
    }

    const smoothWrapper = document.getElementById("smooth-wrapper");
    const smoothContent = document.getElementById("smooth-content");

    if (smoothWrapper && smoothContent && isScrollSmooth) {
      try {
        gsap.config({
          nullTargetWarn: false,
          force3D: true, // Enable 3D on desktop for performance
        });

        console.log('[ScrollSmooth] ✅ Creating ScrollSmoother (desktop only)');
        
        ScrollSmoother.create({
          smooth: 1.5, // Reduced from 2 for better stability
          effects: true,
          smoothTouch: 0, // Disable smooth on touch devices
          normalizeScroll: false,
          ignoreMobileResize: true,
        });
        
        console.log('[ScrollSmooth] ✅ ScrollSmoother initialized successfully');
      } catch (error) {
        console.error('[ScrollSmooth] ❌ Failed to create ScrollSmoother:', error);
        // Store error for debugging
        if (typeof window !== 'undefined') {
          (window as any).__scrollSmoothError = error;
        }
      }
    }
  });
}
