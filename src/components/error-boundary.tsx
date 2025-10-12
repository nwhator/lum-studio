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

    // Send error to Vercel Analytics or external logging service
    if (typeof window !== "undefined") {
      try {
        // Log to console with full details
        console.error("Error Details:", {
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          userAgent: navigator.userAgent,
          isIOS,
          isSafari,
          timestamp: new Date().toISOString(),
          url: window.location.href,
        });

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
            maxWidth: "600px",
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            textAlign: "center"
          }}>
            <h1 style={{ color: "#e74c3c", marginBottom: "20px" }}>
              Oops! Something went wrong
            </h1>
            <p style={{ color: "#666", marginBottom: "30px", lineHeight: "1.6" }}>
              We&apos;re sorry, but something unexpected happened. Our team has been notified and we&apos;re working to fix it.
            </p>
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
              Reload Page
            </button>
            <div style={{ marginTop: "20px" }}>
              <a
                href="/"
                style={{
                  color: "#4CAF50",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Return to Home
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
