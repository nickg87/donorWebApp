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

  const posts = await response.json();
  return posts.map((post) => ({
    loc: `/blog/${post.slug}`, // Dynamic route
    lastmod: post.updated_at, // Optional last modified date
  }));
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://donorhub.site', // Replace with your site's base URL
  generateRobotsTxt: true, // (optional) Generate `robots.txt`, default: false
  changefreq: 'daily', // Frequency of content updates
  priority: 0.7, // Priority of pages
  sitemapSize: 5000, // Max entries per sitemap file
  exclude: ['/admin'], // Pages to exclude
  alternateRefs: [
    {
      href: process.env.NEXT_PUBLIC_SITE_URL + '/es',
      hreflang: 'es',
    },
    {
      href: process.env.NEXT_PUBLIC_SITE_URL + '/en',
      hreflang: 'en',
    },
  ],
  additionalPaths: async (config) => {
    const blogPosts = await fetchBlogPosts();
    return blogPosts.map((post) => ({
      loc: post.loc,
      lastmod: post.lastmod,
    }));
  },
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', disallow: ['/admin'] }, // Add the `/admin` rule explicitly
      { userAgent: '*', allow: '/' }, // Allow other paths
    ],
  },
};
