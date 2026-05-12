/** @type {import('next-sitemap').IConfig} */

const SITE_URL = "https://www.pixoranest.com"

module.exports = {
  siteUrl: SITE_URL,

  generateRobotsTxt: false,
  sitemapSize: 5000,

  changefreq: "weekly",
  priority: 0.7,

  exclude: [
    "/admin",
    "/api/*",
    "/private/*",
    "/*.json",
    "/404",
    "/500",
    "/search",
    "/thank-you",
  ],

  transform: async (config, path) => {
    const tier1Critical = [
      "/",
      "/about",
      "/solutions",
      "/pricing",
      "/contact",
      "/customer-stories",
    ]

    const tier2Important = [
      "/industries",
      "/blog",
      "/solutions/firstvoice",
      "/solutions/leadnest",
      "/solutions/callorbit",
      "/solutions/echoassist",
      "/solutions/socialium",
    ]

    let priority = 0.6
    let changefreq = "monthly"

    if (tier1Critical.includes(path)) {
      priority = 1.0
      changefreq = path === "/" ? "hourly" : "daily"
    } else if (tier2Important.includes(path)) {
      priority = 0.9
      changefreq = "weekly"
    } else if (path.includes("/blog/")) {
      priority = 0.8
      changefreq = "monthly"
    } else if (path.includes("/industries/")) {
      priority = 0.7
      changefreq = "weekly"
    } else if (
      path.includes("/privacy") ||
      path.includes("/terms") ||
      path.includes("/policy")
    ) {
      priority = 0.3
      changefreq = "yearly"
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    }
  },

  alternateRefs: [
    {
      href: SITE_URL,
      hreflang: "en-IN",
    },
    {
      href: SITE_URL,
      hreflang: "x-default",
    },
  ],
}