"use client";
import { useEffect } from 'react';

/**
 * Global Error Handler for iPhone crash debugging
 * Catches unhandled errors and displays them visibly on the screen
 */
export default function GlobalErrorHandler() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isIPhone = /iPhone|iPod/.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    // Create error display overlay (only on iPhone for debugging)
    let errorOverlay: HTMLDivElement | null = null;

    const showError = (error: Error | string, source?: string) => {
      const errorMessage = typeof error === 'string' ? error : error.message;
      const errorStack = typeof error === 'object' && error.stack ? error.stack : '';

      console.error('=== UNHANDLED ERROR ===');
      console.error('Message:', errorMessage);
      console.error('Source:', source || 'unknown');
      console.error('Stack:', errorStack);
      console.error('User Agent:', navigator.userAgent);
      console.error('Page:', window.location.href);
      console.error('=== END UNHANDLED ERROR ===');

      // Store in sessionStorage for later inspection
      try {
        const errors = JSON.parse(sessionStorage.getItem('global_errors') || '[]');
        errors.push({
          message: errorMessage,
          stack: errorStack,
          source: source || 'unknown',
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        });
        sessionStorage.setItem('global_errors', JSON.stringify(errors.slice(-10)));
      } catch (e) {
        console.warn('Could not store error:', e);
      }

      // Show visual error on iPhone (for debugging crashes)
      if (isIPhone) {
        if (!errorOverlay) {
          errorOverlay = document.createElement('div');
          errorOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff3333;
            color: white;
            padding: 10px;
            font-family: monospace;
            font-size: 11px;
            z-index: 999999;
            max-height: 30vh;
            overflow-y: auto;
            border-bottom: 3px solid #cc0000;
          `;
          document.body.appendChild(errorOverlay);
        }

        errorOverlay.innerHTML = `
          <div style="font-weight: bold; margin-bottom: 5px;">⚠️ ERROR DETECTED (iPhone Debug Mode)</div>
          <div style="margin-bottom: 3px;"><strong>Message:</strong> ${errorMessage}</div>
          <div style="margin-bottom: 3px;"><strong>Source:</strong> ${source || 'Unknown'}</div>
          <div style="margin-bottom: 3px;"><strong>Page:</strong> ${window.location.pathname}</div>
          ${errorStack ? `<details style="margin-top: 5px;"><summary style="cursor: pointer;">Stack Trace</summary><pre style="font-size: 9px; white-space: pre-wrap; margin-top: 5px;">${errorStack}</pre></details>` : ''}
          <button onclick="location.reload()" style="margin-top: 10px; background: white; color: #ff3333; border: none; padding: 8px 15px; border-radius: 5px; font-weight: bold; cursor: pointer;">Reload Page</button>
        `;
      }
    };

    // Global error handler
    const handleError = (event: ErrorEvent) => {
      event.preventDefault();
      showError(event.error || event.message, 'window.onerror');
      return true;
    };

    // Unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      showError(event.reason || 'Promise rejection', 'unhandledrejection');
    };

    // iOS-specific: catch resource loading errors
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
        console.error('Resource failed to load:', target);
        if (isIPhone) {
          showError(`Resource failed: ${target.tagName} - ${(target as any).src || (target as any).href}`, 'resource-error');
        }
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);
    window.addEventListener('error', handleResourceError, true); // Capture phase for resource errors

    // Log successful initialization
    console.log('✅ Global error handler initialized (iPhone mode:', isIPhone, ')');

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
      window.removeEventListener('error', handleResourceError, true);
      if (errorOverlay) {
        errorOverlay.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
}
