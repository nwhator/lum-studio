"use client";
import React, { Suspense, lazy } from 'react';
import { LoadingSpinner, GallerySkeleton } from '@/components/ui/loading';

// Lazy load heavy components
const PortfolioGridCol3Area = lazy(() => import('@/components/portfolio/portfolio-grid-col-3-area'));

export function GalleryContentLoader() {
  return (
    <Suspense fallback={<GallerySkeleton />}>
      <PortfolioGridCol3Area />
    </Suspense>
  );
}

export default GalleryContentLoader;
