import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization - simplified for better mobile compatibility
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'inline',
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.thelumstudios.com',
      },
    ],
  },
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['gsap', 'react-slick', '@gsap/react', 'react-modal-video'],
    webpackBuildWorker: true,
    optimizeCss: true,
  },
  
  // Production optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false, // Disable strict mode to reduce hydration warnings in dev
  
  // Reduce build output
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // Webpack optimizations
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
      
      // Add chunk loading retry logic for production
      if (!dev) {
        config.output = {
          ...config.output,
          crossOriginLoading: 'anonymous',
          chunkLoadTimeout: 30000, // Increase timeout to 30s for slow connections
        };
      }
    }
    
    // Optimize bundle splitting with better error handling
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxSize: 244000, // Split chunks larger than 244KB for better loading
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework bundle
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // GSAP bundle (lazy loaded)
          gsap: {
            test: /[\\/]node_modules[\\/]gsap[\\/]/,
            name: 'gsap',
            priority: 30,
            reuseExistingChunk: true,
          },
          // Commons bundle
          commons: {
            name: 'commons',
            minChunks: 2,
            priority: 20,
            reuseExistingChunk: true,
          },
          // Lib bundle
          lib: {
            test: /[\\/]node_modules[\\/]/,
            name: 'lib',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // Production optimizations
    if (!dev) {
      config.optimization.minimize = true;
    }
    
    return config;
  },

  // Headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
