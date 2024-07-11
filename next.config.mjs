/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: 'http://localhost:3005/$1', // Adjust port as needed
      },
    ];
  },
};