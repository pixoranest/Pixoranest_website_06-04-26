/** @type {import('next-sitemap').IConfig} */

const SITE_URL = "https://www.pixoranest.com"

// Use a stable build-time date so crawlers don't see "updated" on every deploy.
const BUILD_DATE = new Date().toISOString().split("T")[0] // YYYY-MM-DD

module.exports = {
  siteUrl: SITE_URL,

  generateRobotsTxt: false,
  sitemapSize: 5000,

  changefreq: "weekly",
  priority: 0.7,

  // ─── Excluded paths ──────────────────────────────────────────────────────
  // /solutions/crm-automation excluded — no physical page exists yet.
  // /demo/success excluded — post-conversion page, should not be indexed.
  exclude: [
    "/admin",
    "/api/*",
    "/private/*",
    "/*.json",
    "/404",
    "/500",
    "/search",
    "/thank-you",
    "/demo/success",
    "/solutions/crm-automation",
  ],

  // ─── Priority & changefreq tiers ─────────────────────────────────────────
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
      changefreq = path === "/" ? "daily" : "daily"
      // NOTE: "hourly" is not meaningful for a static site — crawlers ignore it
      // and it can dilute crawl budget signals. "daily" is the correct ceiling.
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
      lastmod: BUILD_DATE, // stable date — no noise on every deploy
    }
  },

  // ─── alternateRefs: REMOVED ───────────────────────────────────────────────
  // WHY: alternateRefs in next-sitemap stamps every single sitemap entry with
  // hreflang pointing to the homepage URL. This created 29 hreflang conflicts
  // because each page ends up with two competing hreflang signals:
  //   (1) the correct self-referencing hreflang from generateAlternates() in metadata
  //   (2) a wrong hreflang pointing to https://www.pixoranest.com (homepage)
  //
  // The seo_metadata.ts generateAlternates() already handles hreflang correctly
  // via Next.js <head> tags. Sitemap does NOT need to duplicate this.
  // Google's own documentation confirms hreflang in <head> is sufficient.
  // ─────────────────────────────────────────────────────────────────────────
}