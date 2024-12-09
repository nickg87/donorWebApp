require('dotenv').config(); // Load environment variables

const fetchBlogPosts = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
  if (!baseUrl) {
    throw new Error('NEXT_PUBLIC_BACKEND_API_URL is not defined in your .env file');
  }

  const response = await fetch(`${baseUrl}articles`);
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  return await response.json();
};


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://donorhub.site';
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL, // Replace with your site's base URL
  generateRobotsTxt: true, // (optional) Generate `robots.txt`, default: false
  changefreq: 'daily', // Frequency of content updates
  priority: 0.7, // Priority of pages
  sitemapSize: 5000, // Max entries per sitemap file
  exclude: ['/admin', '/public'], // Pages to exclude
  alternateRefs: [
    {
      href: SITE_URL + '/es',
      hreflang: 'es',
    },
    {
      href: SITE_URL + '/en',
      hreflang: 'en',
    },
  ],
  additionalPaths: async (config) => {
    const blogPosts = await fetchBlogPosts();
    return blogPosts.map((post) => ({
      loc: `/blog/${post.slug}`, // Fully qualified loc
      lastmod: post.updated_at,            // Optional lastmod
      changefreq: 'weekly', // Frequency of content updates
      priority: 0.7, // Priority of pages
      alternateRefs: [
        { hreflang: 'es', href: SITE_URL + '/es/' }, // Spanish URL
        { hreflang: 'en', href: SITE_URL + `/en` }, // English URL
      ],
    }));
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/admin', '/public', '/blog/[slug]', '/blog/public/locales', '/public/locales'] }, // Add the `/admin` rule explicitly
      { userAgent: '*', allow: '/' }, // Allow other paths
    ],
  },
};
