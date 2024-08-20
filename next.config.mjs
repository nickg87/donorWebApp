import nextI18NextConfig from './next-i18next.config.js';

/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  productionBrowserSourceMaps: true,
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    return [
      {
        source: '/(.*)',
        destination:  `${backendUrl}$1`,
      },
    ];
  },
  i18n: {
    ...nextI18NextConfig.i18n,
    localeDetection: true, // Enable locale detection globally
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*', // Keep the same path
        permanent: false,
        locale: false, // Disable locale for /admin path
      },
    ];
  },
};