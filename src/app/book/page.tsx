"use client";

import React, { useEffect } from "react";

// Simple redirect fallback: /book -> /booking
export default function BookRedirect() {
  useEffect(() => {
    // Client-side redirect to the canonical booking page
    if (typeof window !== "undefined") {
      window.location.replace("/booking");
    }
  }, []);

  return <div />;
}
