/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  productionBrowserSourceMaps: true,
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
    return [
      {
        source: '/(.*)',
        destination:  `${backendUrl}$1`,
      },
    ];
  },
};