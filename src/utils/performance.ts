/**
 * Performance Optimization Utilities
 * Lazy load components and optimize initial page load
 */

import { lazy, ComponentType } from 'react';

/**
 * Dynamically import GSAP plugins only when needed
 */
export const loadGSAPPlugins = async () => {
  const [{ ScrollTrigger }, { ScrollSmoother }, { SplitText }] = await Promise.all([
    import('gsap/ScrollTrigger'),
    import('gsap/ScrollSmoother'),
    import('gsap/SplitText'),
  ]);
  
  return { ScrollTrigger, ScrollSmoother, SplitText };
};

/**
 * Lazy load component with loading fallback
 */
export const lazyLoad = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback?: React.ReactNode
) => {
  return lazy(importFunc);
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Defer non-critical scripts
 */
export const deferScript = (src: string, async: boolean = true): void => {
  if (typeof window === 'undefined') return;
  
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  script.async = async;
  document.body.appendChild(script);
};

/**
 * Report Web Vitals
 */
export const reportWebVitals = (metric: any) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }
};

/**
 * Optimize images with responsive sizes
 */
export const getImageSizes = (type: 'hero' | 'gallery' | 'thumbnail' | 'portrait') => {
  switch (type) {
    case 'hero':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1920px';
    case 'gallery':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'thumbnail':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 384px';
    case 'portrait':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px';
    default:
      return '100vw';
  }
};

/**
 * Image loading priorities
 */
export const getImagePriority = (index: number, total: number): boolean => {
  // Prioritize first 2-3 images in a gallery
  return index < 3 && total > 5;
};

/**
 * Lazy load sections below fold
 */
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.disconnect();
        }
      });
    },
    { rootMargin: '100px' }
  );
  
  if (ref.current) {
    observer.observe(ref.current);
  }
  
  return () => observer.disconnect();
};

/**
 * Check if device is low-end for adaptive loading
 */
export const isLowEndDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const connection = (navigator as any).connection;
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  
  // Low memory (< 4GB)
  if (memory && memory < 4) return true;
  
  // Few CPU cores (< 4)
  if (cores && cores < 4) return true;
  
  // Slow connection
  if (connection) {
    const effectiveType = connection.effectiveType;
    if (effectiveType === '2g' || effectiveType === 'slow-2g') return true;
  }
  
  return false;
};

/**
 * Adaptive loading - decide whether to load heavy content
 */
export const shouldLoadHeavyContent = (): boolean => {
  if (typeof window === 'undefined') return true;
  
  // Don't load on low-end devices
  if (isLowEndDevice()) return false;
  
  // Check save-data preference
  const connection = (navigator as any).connection;
  if (connection?.saveData) return false;
  
  return true;
};

/**
 * Debounce function for scroll/resize events
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function for high-frequency events
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return function(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Prefetch next page for faster navigation
 */
export const prefetchPage = (href: string) => {
  if (typeof document === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};
