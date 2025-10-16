"use client";
import React from "react";
import BackToTop from "@/components/back-to-top";
// PageLoader removed - Already in layout.tsx (root level)
// ThemeSetting removed to disable theme toggle
if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap.bundle.min");
}

interface WrapperProps {
  children: React.ReactNode;
  showBackToTop?: boolean;
}

const Wrapper = ({ children, showBackToTop=true }: WrapperProps) => {
  return (
    <React.Fragment>
      {children}
      {showBackToTop && <BackToTop />}
      {/* <ThemeSetting /> - Theme toggle removed */}
    </React.Fragment>
  );
};

export default Wrapper;
