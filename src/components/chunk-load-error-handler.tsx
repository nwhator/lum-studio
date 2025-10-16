"use client";

import { useEffect } from 'react';

/**
 * Chunk Load Error Handler
 * Handles JavaScript chunk loading failures by retrying or reloading the page
 */
export default function ChunkLoadErrorHandler() {
  useEffect(() => {
    // Track reload attempts to prevent infinite loops
    const MAX_RELOAD_ATTEMPTS = 3;
    const RELOAD_KEY = 'chunk-reload-count';
    
    const handleChunkError = (event: ErrorEvent) => {
      const error = event.error;
      const message = event.message || error?.message || '';
      
      // Detect chunk loading errors
      const isChunkLoadError = 
        message.includes('Loading chunk') ||
        message.includes('ChunkLoadError') ||
        message.includes('Failed to fetch dynamically imported module') ||
        event.filename?.includes('/_next/static/chunks/');
      
      if (isChunkLoadError) {
        console.error('[ChunkLoadError] Detected chunk loading failure:', message);
        
        // Get current reload count
        const reloadCount = parseInt(sessionStorage.getItem(RELOAD_KEY) || '0', 10);
        
        if (reloadCount < MAX_RELOAD_ATTEMPTS) {
          // Increment reload count
          sessionStorage.setItem(RELOAD_KEY, String(reloadCount + 1));
          
          console.warn(`[ChunkLoadError] Attempting reload (${reloadCount + 1}/${MAX_RELOAD_ATTEMPTS})...`);
          
          // Wait a bit before reloading to avoid race conditions
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          // Max attempts reached, clear the cache and reset counter
          console.error('[ChunkLoadError] Max reload attempts reached. Clearing cache...');
          sessionStorage.removeItem(RELOAD_KEY);
          
          // Clear service worker cache if available
          if ('caches' in window) {
            caches.keys().then((names) => {
              names.forEach((name) => {
                caches.delete(name);
              });
            }).then(() => {
              console.log('[ChunkLoadError] Cache cleared. Reloading one final time...');
              window.location.reload();
            });
          } else {
            // Fallback: just reload
            window.location.reload();
          }
        }
        
        // Prevent default error handling
        event.preventDefault();
      }
    };
    
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLScriptElement;
      
      // Check if it's a script loading error for Next.js chunks
      if (target?.tagName === 'SCRIPT' && target.src?.includes('/_next/static/chunks/')) {
        console.error('[ResourceError] Failed to load script chunk:', target.src);
        
        const reloadCount = parseInt(sessionStorage.getItem(RELOAD_KEY) || '0', 10);
        
        if (reloadCount < MAX_RELOAD_ATTEMPTS) {
          sessionStorage.setItem(RELOAD_KEY, String(reloadCount + 1));
          console.warn(`[ResourceError] Reloading page (${reloadCount + 1}/${MAX_RELOAD_ATTEMPTS})...`);
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      }
    };
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message = reason?.message || String(reason);
      
      // Detect dynamic import failures
      if (message.includes('Failed to fetch dynamically imported module') ||
          message.includes('error loading dynamically imported module')) {
        console.error('[UnhandledRejection] Dynamic import failed:', message);
        
        const reloadCount = parseInt(sessionStorage.getItem(RELOAD_KEY) || '0', 10);
        
        if (reloadCount < MAX_RELOAD_ATTEMPTS) {
          sessionStorage.setItem(RELOAD_KEY, String(reloadCount + 1));
          console.warn(`[UnhandledRejection] Reloading (${reloadCount + 1}/${MAX_RELOAD_ATTEMPTS})...`);
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          
          event.preventDefault();
        }
      }
    };
    
    // Reset reload counter on successful load
    const resetCounter = () => {
      sessionStorage.removeItem(RELOAD_KEY);
      console.log('[ChunkLoadErrorHandler] Page loaded successfully, reset counter');
    };
    
    // Add event listeners
    window.addEventListener('error', handleChunkError);
    window.addEventListener('error', handleResourceError, true); // Use capture phase
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('load', resetCounter);
    
    return () => {
      window.removeEventListener('error', handleChunkError);
      window.removeEventListener('error', handleResourceError, true);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('load', resetCounter);
    };
  }, []);
  
  return null; // This component doesn't render anything
}
