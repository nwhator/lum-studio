/**
 * iOS-Safe GSAP Utility
 * Detects iOS/Safari and provides safe animation loading
 * Prevents crashes caused by ScrollSmoother and heavy animations on iOS
 */

// Detect iOS Safari
export const isIOSSafari = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  
  return isIOS && isSafari;
};

// Detect any mobile device
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Safe GSAP registration - excludes ScrollSmoother on iOS
 * @param gsap - GSAP instance
 * @param plugins - Object containing GSAP plugins
 */
export const registerGSAPPlugins = (
  gsap: any,
  plugins: {
    ScrollTrigger?: any;
    ScrollSmoother?: any;
    SplitText?: any;
    [key: string]: any;
  }
) => {
  try {
    // Ensure we're on client side
    if (typeof window === 'undefined') {
      console.warn('[GSAP] registerGSAPPlugins called on server side, skipping');
      return false;
    }

    const { ScrollTrigger, ScrollSmoother, SplitText, ...otherPlugins } = plugins;
    
    // Always register ScrollTrigger and SplitText
    const pluginsToRegister: any[] = [];
    
    if (ScrollTrigger) pluginsToRegister.push(ScrollTrigger);
    if (SplitText) pluginsToRegister.push(SplitText);
    
    // Only register ScrollSmoother on desktop browsers (NOT on iOS/mobile)
    const shouldSkipScrollSmoother = isIOSSafari() || isMobileDevice();
    if (ScrollSmoother && !shouldSkipScrollSmoother) {
      pluginsToRegister.push(ScrollSmoother);
      console.log('[GSAP] ScrollSmoother enabled (desktop)');
    } else if (ScrollSmoother && shouldSkipScrollSmoother) {
      console.log('[GSAP] ⚠️ Skipping ScrollSmoother on iOS/mobile for stability');
    }
    
    // Register any other plugins
    Object.values(otherPlugins).forEach(plugin => {
      if (plugin) pluginsToRegister.push(plugin);
    });
    
    if (pluginsToRegister.length > 0) {
      gsap.registerPlugin(...pluginsToRegister);
      console.log('[GSAP] ✅ Registered plugins:', pluginsToRegister.map(p => p.name || 'unnamed').join(', '));
    }
    
    return true;
  } catch (error) {
    console.error('[GSAP] ❌ Error registering plugins:', error);
    // Log to window for mobile debugging
    if (typeof window !== 'undefined') {
      (window as any).__gsapError = error;
    }
    return false;
  }
};

/**
 * Log error to console and external services
 * @param error - Error object
 * @param context - Additional context
 */
export const logError = (error: Error, context?: Record<string, any>) => {
  const errorData = {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'unknown',
    isIOSSafari: isIOSSafari(),
    isMobile: isMobileDevice(),
    ...context,
  };
  
  console.error('[Error Log]:', errorData);
  
  // Send to analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'exception', {
      description: error.message,
      fatal: false,
      ...context,
    });
  }
  
  return errorData;
};

/**
 * Wrapper for animation initialization with error handling
 * @param initFn - Animation initialization function
 * @param name - Name of animation for logging
 */
export const safeAnimationInit = async (
  initFn: () => void | Promise<void>,
  name: string = 'animation'
): Promise<boolean> => {
  try {
    // Ensure we're on client side
    if (typeof window === 'undefined') {
      console.warn(`[GSAP] ${name}: Skipped (server side)`);
      return false;
    }

    // Ensure DOM is ready
    if (document.readyState === 'loading') {
      console.warn(`[GSAP] ${name}: Waiting for DOM ready`);
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      });
    }

    console.log(`[GSAP] ${name}: Initializing...`);
    await initFn();
    console.log(`[GSAP] ${name}: ✅ Initialized successfully`);
    return true;
  } catch (error) {
    console.error(`[GSAP] ${name}: ❌ Failed to initialize`, error);
    logError(error as Error, { animationName: name });
    
    // Store error for debugging
    if (typeof window !== 'undefined') {
      (window as any).__animationErrors = (window as any).__animationErrors || [];
      (window as any).__animationErrors.push({
        name,
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString()
      });
    }
    
    return false;
  }
};
