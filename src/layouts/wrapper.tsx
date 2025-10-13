"use client";
import React from "react";
import BackToTop from "@/components/back-to-top";
import PageLoader from "@/components/loaders/page-loader";
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
      <PageLoader />
      {children}
      {showBackToTop && <BackToTop />}
      {/* <ThemeSetting /> - Theme toggle removed */}
    </React.Fragment>
  );
};

export default Wrapper;
