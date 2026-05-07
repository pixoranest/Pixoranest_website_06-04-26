/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://www.pixoranest.com',

  generateRobotsTxt: false,

  sitemapSize: 5000,

  changefreq: 'weekly',
  priority: 0.7,

  exclude: [
    '/admin',
    '/api/*',
    '/private/*',
    '/*.json',
    '/404',
    '/500',
    '/search',
    '/thank-you',
  ],

  transform: async (config, path) => {

    const tier1Critical = [
      '/',
      '/about',
      '/solutions',
      '/pricing',
      '/contact',
      '/customer-stories',
    ]

    const tier2Important = [
      '/industries',
      '/blog',
      '/solutions/firstvoice',
      '/solutions/leadnest',
      '/solutions/callorbit',
      '/solutions/echoassist',
      '/solutions/socialium',
    ]

    let priority = 0.6
    let changefreq = 'monthly'

    // Tier 1
    if (tier1Critical.includes(path)) {
      priority = 1.0
      changefreq = path === '/' ? 'hourly' : 'daily'
    }

    // Tier 2
    else if (tier2Important.includes(path)) {
      priority = 0.9
      changefreq = 'weekly'
    }

    // Blog Articles
    else if (path.includes('/blog/')) {
      priority = 0.8
      changefreq = 'monthly'
    }

    // Industry Pages
    else if (path.includes('/industries/')) {
      priority = 0.7
      changefreq = 'weekly'
    }

    // Legal Pages
    else if (
      path.includes('/privacy') ||
      path.includes('/terms') ||
      path.includes('/policy')
    ) {
      priority = 0.3
      changefreq = 'yearly'
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },
}

module.exports = config