"use client";
import { gsap } from "gsap";
import { useState } from "react";
import { ScrollSmoother} from '@/plugins';
import { useGSAP } from "@gsap/react";
import { isIOSSafari, isMobileDevice } from "@/utils/ios-safe-gsap";

export default function useScrollSmooth() {
  const [isScrollSmooth, setIsScrollSmooth] = useState<boolean>(true);
  
  useGSAP(() => {
    // Skip ScrollSmoother on iOS and mobile devices
    if (typeof window !== 'undefined' && (isIOSSafari() || isMobileDevice())) {
      console.log('[ScrollSmooth] ⚠️ Skipped on mobile/iOS device');
      return;
    }

    const smoothWrapper = document.getElementById("smooth-wrapper");
    const smoothContent = document.getElementById("smooth-content");

    if (smoothWrapper && smoothContent && isScrollSmooth) {
      try {
        gsap.config({
          nullTargetWarn: false,
        });

        console.log('[ScrollSmooth] ✅ Creating ScrollSmoother (desktop)');
        
        ScrollSmoother.create({
          smooth: 2,
          effects: true,
          smoothTouch: 0.1,
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
