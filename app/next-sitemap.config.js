/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out',
  exclude: [
    '/oauth',
    '/email-auth',
    '/home',
    '/budget',
    '/projects',
    '/projects/*',
    '/sessions',
    '/sleep',
    '/focus',
    '/terms-of-service',
    '/appsumo',
    '/privacy-policy',
    '/account',
    '/habits',
    '/capacity',
    '/work',
  ],
}
