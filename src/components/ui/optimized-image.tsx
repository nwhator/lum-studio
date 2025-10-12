"use client";
import React from 'react';
import Image, { ImageProps } from 'next/image';
import { getImageSizes, getImagePriority } from '@/utils/performance';

interface OptimizedImageProps extends Omit<ImageProps, 'sizes'> {
  imageType?: 'hero' | 'gallery' | 'thumbnail' | 'portrait';
  index?: number;
  totalImages?: number;
  eager?: boolean;
}

/**
 * Optimized Image Component
 * - Automatic responsive sizes based on image type
 * - Smart priority loading for above-fold images
 * - Lazy loading for below-fold images
 * - Optimized formats (AVIF/WebP)
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  imageType = 'gallery',
  index = 0,
  totalImages = 0,
  eager = false,
  priority,
  loading,
  quality = 85,
  placeholder = 'blur',
  blurDataURL,
  ...props
}) => {
  // Determine if image should be priority loaded
  const isPriority = eager || priority || getImagePriority(index, totalImages);
  
  // Get responsive sizes based on image type
  const responsiveSizes = getImageSizes(imageType);
  
  // Determine loading strategy
  const loadingStrategy = isPriority ? 'eager' : (loading || 'lazy');
  
  // Check if src is a remote URL (string) or local import (object)
  const isRemoteImage = typeof props.src === 'string' && (props.src.startsWith('http') || props.src.startsWith('/'));
  
  // Don't set sizes if using fill prop (it handles its own sizing)
  const imageSizes = props.fill ? undefined : responsiveSizes;
  
  // Only use blur placeholder for local static imports with blurDataURL
  let imagePlaceholder: 'blur' | 'empty' = 'empty';
  if (!isRemoteImage && blurDataURL) {
    imagePlaceholder = 'blur';
  } else if (!isRemoteImage && typeof props.src === 'object') {
    // Static import has built-in blur data
    imagePlaceholder = 'blur';
  }
  
  return (
    <Image
      {...props}
      sizes={imageSizes}
      priority={isPriority}
      loading={loadingStrategy}
      quality={quality}
      placeholder={imagePlaceholder}
      blurDataURL={blurDataURL}
      style={{
        ...props.style,
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
};

export default OptimizedImage;
