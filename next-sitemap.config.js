// ─────────────────────────────────────────────────────────────────────────────
// FILE: next-sitemap.config.js  (project root, next to package.json)
// ─────────────────────────────────────────────────────────────────────────────
// BUGS FIXED vs previous version:
//
// BUG 1 — DUPLICATE URLs
//   next-sitemap auto-crawls the /out/ folder AND runs additionalPaths().
//   The old config listed every URL in BOTH places → every page appeared
//   twice in sitemap.xml. Google treats duplicate URLs as a quality signal.
//   FIX: Remove additionalPaths entirely. Use the `transform` hook instead
//   to set priority/changefreq per URL pattern on the auto-crawled paths.
//
// BUG 2 — transform() 3-argument call silently ignored
//   next-sitemap v4 transform() only accepts (config, path).
//   Passing a 3rd argument like { priority, changefreq } does nothing —
//   the values are silently dropped and top-level defaults are used instead.
//   FIX: Use the correct 2-arg transform that returns a modified object.
//
// BUG 3 — Self-referencing additionalSitemaps
//   robotsTxtOptions.additionalSitemaps pointed to pixoranest.com/sitemap.xml
//   which IS the file being generated — a direct self-reference.
//   Google Search Console flags this as a warning and may skip processing it.
//   FIX: Remove additionalSitemaps entirely (it's not needed here).
// ─────────────────────────────────────────────────────────────────────────────

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://pixoranest.com",

  // Output to /out/ — matches `output: "export"` in next.config.mjs
  outDir: "./out",

  // Generate robots.txt into /out/robots.txt
  generateRobotsTxt: true,

  // Match trailingSlash: true in next.config.mjs
  trailingSlash: true,

  // Single sitemap file — fine for under 500 URLs
  generateIndexSitemap: false,

  // ── Exclude pages that must NOT be indexed ──────────────────────────────────
  exclude: [
    "/api/*",
    "/demo/*",
    "/privacy-policy/",
    "/terms-of-service/",
    "/whatsapp-policy/",
  ],

  // ── CORRECT transform API: 2 args only ─────────────────────────────────────
  // next-sitemap auto-discovers all pages from /out/. This transform runs
  // once per discovered URL and sets the correct priority and changefreq
  // based on the URL pattern. No additionalPaths needed — no duplicates.
  transform: async (config, path) => {
    // Homepage — highest priority
    if (path === "/") {
      return { loc: path, priority: 1.0, changefreq: "weekly", lastmod: new Date().toISOString() }
    }

    // Core product/solution pages
    if (path.startsWith("/solutions")) {
      return { loc: path, priority: 1.0, changefreq: "weekly", lastmod: new Date().toISOString() }
    }

    // Industry pages
    if (path.startsWith("/industries")) {
      return { loc: path, priority: 0.8, changefreq: "weekly", lastmod: new Date().toISOString() }
    }

    // Blog posts — frequent updates
    if (path.startsWith("/blog")) {
      return { loc: path, priority: 0.7, changefreq: "weekly", lastmod: new Date().toISOString() }
    }

    // Pricing, about, contact, customer-stories
    if (["/pricing/", "/about/", "/contact/", "/customer-stories/"].includes(path)) {
      return { loc: path, priority: 0.6, changefreq: "monthly", lastmod: new Date().toISOString() }
    }

    // Default for any other discovered page
    return {
      loc: path,
      priority: config.priority ?? 0.5,
      changefreq: config.changefreq ?? "monthly",
      lastmod: new Date().toISOString(),
    }
  },

  // ── robots.txt ──────────────────────────────────────────────────────────────
  // FIX: Removed additionalSitemaps — it was pointing to the file being
  // generated (self-reference), which Google Search Console flags as a warning.
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/demo/"],
      },
    ],
  },
}

module.exports = config