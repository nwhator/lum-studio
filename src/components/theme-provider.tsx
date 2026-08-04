"use client";
import React from "react";
import { ThemeProvider } from "next-themes";

interface LumThemeProviderProps {
  children: React.ReactNode;
}

const LumThemeProvider = ({ children }: LumThemeProviderProps) => {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="lum-theme"
    >
      {children}
    </ThemeProvider>
  );
};

export default LumThemeProvider;