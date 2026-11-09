/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Craft and Now were retired; send old links somewhere useful
  async redirects() {
    return [
      { source: '/craft', destination: '/open-source', permanent: true },
      { source: '/craft/:path*', destination: '/open-source', permanent: true },
      { source: '/now', destination: '/about', permanent: true },
    ];
  },

  // SEO optimizations
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
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Image optimization
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  experimental: {},
  
  // Enable trailing slash for better SEO
  trailingSlash: false,
  
  // Power by Next.js header
  poweredByHeader: false,
}

module.exports = nextConfig
