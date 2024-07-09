/** @type {import('next').NextConfig} */
// next.config.mjs
export default {
  async rewrites() {
    return [
      {
        source: '/(.*)',
        destination: 'http://localhost:3009/$1', // Adjust port as needed
      },
    ];
  },
};