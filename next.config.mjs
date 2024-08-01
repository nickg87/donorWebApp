/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  productionBrowserSourceMaps: true,
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination:  `${process.env.NEXT_PUBLIC_BACKEND_URL}$1`, // Adjust port as needed
      },
    ];
  },
};