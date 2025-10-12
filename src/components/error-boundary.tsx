"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, any>
    ) => void;
  }
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Detect if iOS Safari
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Send error to Vercel Analytics or external logging service
    if (typeof window !== "undefined") {
      try {
        // Log to console with full details
        const errorDetails = {
          message: error.message,
          stack: error.stack,
          name: error.name,
          componentStack: errorInfo.componentStack,
          userAgent: navigator.userAgent,
          isIOS,
          isSafari,
          isMobile,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          pathname: window.location.pathname,
        };
        
        console.error("=== ERROR DETAILS ===");
        console.error(JSON.stringify(errorDetails, null, 2));
        console.error("=== END ERROR DETAILS ===");

        // Send to tracking service (if available)
        if (window.gtag) {
          window.gtag("event", "exception", {
            description: error.message,
            fatal: true,
            user_agent: navigator.userAgent,
            page_url: window.location.href,
          });
        }
      } catch (logError) {
        console.error("Failed to log error:", logError);
      }
    }
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Show detailed error in development or on mobile for debugging
      const isDev = process.env.NODE_ENV === 'development';
      const showDetails = isDev || /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);

      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          background: "#f8f9fa"
        }}>
          <div style={{
            maxWidth: "800px",
            width: "100%",
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}>
            <h1 style={{ color: "#e74c3c", marginBottom: "20px", fontSize: "24px" }}>
              ⚠️ Application Error
            </h1>
            <p style={{ color: "#666", marginBottom: "20px", lineHeight: "1.6" }}>
              Something went wrong. Please try reloading the page.
            </p>
            
            {showDetails && this.state.error && (
              <div style={{
                background: "#f8d7da",
                border: "1px solid #f5c6cb",
                borderRadius: "8px",
                padding: "15px",
                marginBottom: "20px",
                fontSize: "14px",
                textAlign: "left"
              }}>
                <strong style={{ color: "#721c24", display: "block", marginBottom: "10px" }}>
                  Error Details (for debugging):
                </strong>
                <div style={{ 
                  background: "#fff", 
                  padding: "10px", 
                  borderRadius: "4px",
                  overflowX: "auto",
                  fontFamily: "monospace",
                  fontSize: "12px"
                }}>
                  <div style={{ marginBottom: "5px" }}>
                    <strong>Message:</strong> {this.state.error.message}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    <strong>Type:</strong> {this.state.error.name}
                  </div>
                  <div style={{ marginBottom: "5px" }}>
                    <strong>Page:</strong> {window.location.pathname}
                  </div>
                  {this.state.error.stack && (
                    <details style={{ marginTop: "10px" }}>
                      <summary style={{ cursor: "pointer", color: "#721c24", fontWeight: "bold" }}>
                        Stack Trace
                      </summary>
                      <pre style={{ 
                        whiteSpace: "pre-wrap", 
                        fontSize: "11px",
                        marginTop: "5px",
                        color: "#666"
                      }}>
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            )}
            
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.reload();
                }}
                style={{
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "50px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                🔄 Reload Page
              </button>
              <a
                href="/"
                style={{
                  background: "#2196F3",
                  color: "white",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "50px",
                  fontSize: "16px",
                  fontWeight: "600",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                🏠 Return Home
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
