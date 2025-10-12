"use client";
import React from "react";
import ErrorBoundary from "@/components/error-boundary";

interface ClientErrorBoundaryProps {
  children: React.ReactNode;
}

export default function ClientErrorBoundary({ children }: ClientErrorBoundaryProps) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}
