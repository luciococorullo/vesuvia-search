import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better SEO
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons'],
  },

  // Image optimization for better performance
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vesuvia-search.vercel.app',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Compression for better performance
  compress: true,

  // Power redirects for SEO
  async redirects() {
    return [
      {
        source: '/train/:path*',
        destination: '/search',
        permanent: true,
      },
      {
        source: '/schedule/:path*',
        destination: '/orari-circumvesuviana',
        permanent: true,
      },
    ];
  },

  // Headers for better SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },

  // Rewrites for better URL structure
  async rewrites() {
    return [
      {
        source: '/napoli-sorrento',
        destination: '/come-arrivare-sorrento',
      },
      {
        source: '/napoli-pompei',
        destination: '/come-arrivare-pompei',
      },
      {
        source: '/treni-circumvesuviana',
        destination: '/orari-circumvesuviana',
      },
    ];
  },
};

export default nextConfig;
