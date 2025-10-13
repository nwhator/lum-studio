"use client";
import React, { useState } from 'react';
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
 * - Error handling for mobile devices
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  imageType = 'gallery',
  index = 0,
  totalImages = 0,
  eager = false,
  priority,
  loading,
  quality = 85,
  placeholder,
  blurDataURL,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  // Handle image load errors
  const handleError = () => {
    setHasError(true);
    console.warn('Image failed to load:', props.src);
  };

  // Determine if image should be priority loaded
  const isPriority = eager || priority || getImagePriority(index, totalImages);
  
  // Get responsive sizes based on image type - only if not using fill
  const responsiveSizes = props.fill ? undefined : getImageSizes(imageType);
  
  // Determine loading strategy
  const loadingStrategy = isPriority ? 'eager' : (loading || 'lazy');
  
  // Check if src is a remote URL (string) or local import (object)
  const isRemoteImage = typeof props.src === 'string' && 
    (props.src.startsWith('http') || props.src.startsWith('/'));
  
  // Simplified placeholder logic - only use blur for static imports
  let imagePlaceholder: 'blur' | 'empty' = 'empty';
  if (!isRemoteImage && typeof props.src === 'object' && 'blurDataURL' in props.src) {
    imagePlaceholder = 'blur';
  } else if (blurDataURL) {
    imagePlaceholder = 'blur';
  }
  
  // If error occurred, show fallback
  if (hasError) {
    return (
      <div 
        style={{
          ...props.style,
          background: '#f0f0f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#999',
          fontSize: '14px',
        }}
      >
        Image unavailable
      </div>
    );
  }

  try {
    return (
      <Image
        {...props}
        alt={props.alt || ''}
        sizes={responsiveSizes}
        priority={isPriority}
        loading={loadingStrategy}
        quality={quality}
        placeholder={imagePlaceholder}
        blurDataURL={imagePlaceholder === 'blur' ? blurDataURL : undefined}
        onError={handleError}
        style={{
          ...props.style,
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    );
  } catch (error) {
    console.error('OptimizedImage error:', error);
    // Fallback to standard Next.js Image without optimizations
    return (
      <Image
        {...props}
        alt={props.alt || ''}
        onError={handleError}
      />
    );
  }
};

export default OptimizedImage;
