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
    const { ScrollTrigger, ScrollSmoother, SplitText, ...otherPlugins } = plugins;
    
    // Always register ScrollTrigger and SplitText
    const pluginsToRegister: any[] = [];
    
    if (ScrollTrigger) pluginsToRegister.push(ScrollTrigger);
    if (SplitText) pluginsToRegister.push(SplitText);
    
    // Only register ScrollSmoother on desktop browsers (NOT on iOS/mobile)
    if (ScrollSmoother && !isIOSSafari() && !isMobileDevice()) {
      pluginsToRegister.push(ScrollSmoother);
    } else if (ScrollSmoother) {
      console.log('[GSAP] Skipping ScrollSmoother on iOS/mobile for stability');
    }
    
    // Register any other plugins
    Object.values(otherPlugins).forEach(plugin => {
      if (plugin) pluginsToRegister.push(plugin);
    });
    
    if (pluginsToRegister.length > 0) {
      gsap.registerPlugin(...pluginsToRegister);
    }
    
    return true;
  } catch (error) {
    console.error('[GSAP] Error registering plugins:', error);
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
    await initFn();
    return true;
  } catch (error) {
    logError(error as Error, { animationName: name });
    return false;
  }
};
