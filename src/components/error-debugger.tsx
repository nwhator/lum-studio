"use client";
import React, { useEffect, useState } from "react";

interface ErrorLog {
  type: string;
  message: string;
  stack?: string;
  timestamp: string;
  details?: any;
}

export default function ErrorDebugger() {
  const [errors, setErrors] = useState<ErrorLog[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Collect all errors
    const collectErrors = () => {
      const allErrors: ErrorLog[] = [];

      // GSAP errors
      if ((window as any).__gsapError) {
        allErrors.push({
          type: "GSAP Plugin Error",
          message: (window as any).__gsapError.message,
          stack: (window as any).__gsapError.stack,
          timestamp: new Date().toISOString(),
        });
      }

      // Animation errors
      if ((window as any).__animationErrors) {
        (window as any).__animationErrors.forEach((err: any) => {
          allErrors.push({
            type: "Animation Error",
            message: err.error,
            timestamp: err.timestamp,
            details: { name: err.name },
          });
        });
      }

      setErrors(allErrors);
    };

    // Collect errors on mount and after a delay
    collectErrors();
    const timer = setTimeout(collectErrors, 2000);

    // Listen for global errors
    const handleError = (event: ErrorEvent) => {
      setErrors(prev => [...prev, {
        type: "Global Error",
        message: event.message,
        stack: event.error?.stack,
        timestamp: new Date().toISOString(),
        details: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        }
      }]);
    };

    // Listen for unhandled promise rejections
    const handleRejection = (event: PromiseRejectionEvent) => {
      setErrors(prev => [...prev, {
        type: "Promise Rejection",
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
      }]);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  // Only show in development or if errors exist
  if (process.env.NODE_ENV === 'production' && errors.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating debug button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: errors.length > 0 ? '#e74c3c' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={errors.length > 0 ? `${errors.length} error(s)` : 'No errors'}
      >
        {errors.length > 0 ? '⚠️' : '✅'}
        {errors.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            background: '#fff',
            color: '#e74c3c',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {errors.length}
          </span>
        )}
      </button>

      {/* Debug panel */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          zIndex: 10000,
          padding: '20px',
          overflowY: 'auto',
        }}>
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '12px',
            padding: '30px',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
            }}>
              <h2 style={{ margin: 0, color: '#333' }}>
                🐛 Error Debugger
              </h2>
              <button
                onClick={() => setIsVisible(false)}
                style={{
                  background: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                ✕ Close
              </button>
            </div>

            <div style={{
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
            }}>
              <strong>System Info:</strong>
              <div style={{ fontSize: '14px', marginTop: '10px', fontFamily: 'monospace' }}>
                <div>User Agent: {navigator.userAgent}</div>
                <div>Page: {window.location.pathname}</div>
                <div>Time: {new Date().toLocaleString()}</div>
              </div>
            </div>

            {errors.length === 0 ? (
              <div style={{
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                color: '#155724',
                padding: '20px',
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                ✅ No errors detected! Everything is working fine.
              </div>
            ) : (
              <div>
                <h3 style={{ color: '#e74c3c', marginBottom: '15px' }}>
                  Errors Found: {errors.length}
                </h3>
                {errors.map((error, index) => (
                  <div
                    key={index}
                    style={{
                      background: '#fff3cd',
                      border: '1px solid #ffc107',
                      borderRadius: '8px',
                      padding: '15px',
                      marginBottom: '15px',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '10px',
                    }}>
                      <strong style={{ color: '#856404' }}>
                        {index + 1}. {error.type}
                      </strong>
                      <small style={{ color: '#666' }}>
                        {new Date(error.timestamp).toLocaleTimeString()}
                      </small>
                    </div>
                    <div style={{
                      background: 'white',
                      padding: '10px',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontFamily: 'monospace',
                      marginBottom: '10px',
                    }}>
                      {error.message}
                    </div>
                    {error.details && (
                      <details style={{ fontSize: '13px', marginTop: '10px' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                          Details
                        </summary>
                        <pre style={{
                          background: '#f8f9fa',
                          padding: '10px',
                          borderRadius: '4px',
                          overflow: 'auto',
                          fontSize: '12px',
                          marginTop: '5px',
                        }}>
                          {JSON.stringify(error.details, null, 2)}
                        </pre>
                      </details>
                    )}
                    {error.stack && (
                      <details style={{ fontSize: '13px', marginTop: '10px' }}>
                        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                          Stack Trace
                        </summary>
                        <pre style={{
                          background: '#f8f9fa',
                          padding: '10px',
                          borderRadius: '4px',
                          overflow: 'auto',
                          fontSize: '11px',
                          marginTop: '5px',
                        }}>
                          {error.stack}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div style={{
              marginTop: '20px',
              padding: '15px',
              background: '#d1ecf1',
              border: '1px solid #bee5eb',
              borderRadius: '8px',
              fontSize: '14px',
            }}>
              <strong>📋 How to use:</strong>
              <ul style={{ marginTop: '10px', marginBottom: 0 }}>
                <li>This debugger captures all JavaScript errors on the page</li>
                <li>Check the console for more detailed logs</li>
                <li>Screenshot this panel if you need to report bugs</li>
                <li>The floating button shows error count in real-time</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
