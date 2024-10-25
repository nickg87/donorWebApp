// next.config.mjs
import nextI18NextConfig from './next-i18next.config.js';

/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  productionBrowserSourceMaps: true,
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';
    return [
      {
        source: '/one-million-dollar-pool',
        destination: '/million',
      },
      {
        source: '/(.*)',
        destination:  `${backendUrl}$1`,
      },
    ];
  },
  i18n: {
    ...nextI18NextConfig.i18n,
    localeDetection: false, // Enable locale detection globally
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*', // Keep the same path
        permanent: false,
        locale: false, // Disable locale for /admin path
      },
      // {
      //   source: '/million',
      //   destination: '/one-million-dollar-pool',
      //   permanent: true,
      // },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true, // Optional: makes the SVG scalable based on viewBox
          },
        },
      ],
    });
    return config;
  },
};