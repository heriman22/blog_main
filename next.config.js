/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60, // Cache images for at least 60 seconds to improve performance
  },
  // Disable powered by header
  poweredByHeader: false,
};

module.exports = nextConfig; 