"use client";
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = '#B7C435',
  text 
}) => {
  const sizeMap = {
    sm: 24,
    md: 40,
    lg: 60
  };
  
  const spinnerSize = sizeMap[size];
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '40px',
    }}>
      <div 
        className="loading-spinner"
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      {text && (
        <p style={{
          color: '#666',
          fontSize: '14px',
          fontWeight: 500,
          margin: 0,
        }}>
          {text}
        </p>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  width = '100%', 
  height = 200,
  borderRadius = '8px',
  className = ''
}) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        backgroundSize: '200% 100%',
        animation: 'loading 1.5s ease-in-out infinite',
      }}
    >
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
};

interface ImageSkeletonProps {
  aspectRatio?: string;
  count?: number;
}

export const ImageSkeleton: React.FC<ImageSkeletonProps> = ({ 
  aspectRatio = '4/3',
  count = 1 
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} style={{ position: 'relative', width: '100%', aspectRatio }}>
          <Skeleton width="100%" height="100%" />
        </div>
      ))}
    </>
  );
};

export const GallerySkeleton: React.FC = () => {
  return (
    <div className="container" style={{ padding: '120px 15px' }}>
      <div className="row g-4">
        <div className="col-lg-4 col-md-6">
          <ImageSkeleton aspectRatio="3/4" />
        </div>
        <div className="col-lg-4 col-md-6">
          <ImageSkeleton aspectRatio="3/4" />
        </div>
        <div className="col-lg-4 col-md-6">
          <ImageSkeleton aspectRatio="3/4" />
        </div>
        <div className="col-lg-4 col-md-6">
          <ImageSkeleton aspectRatio="3/4" />
        </div>
        <div className="col-lg-4 col-md-6">
          <ImageSkeleton aspectRatio="3/4" />
        </div>
        <div className="col-lg-4 col-md-6">
          <ImageSkeleton aspectRatio="3/4" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
