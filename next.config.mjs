// ─────────────────────────────────────────────────────────────────────────────
// FILE: next.config.mjs  (replace your existing file entirely)
// ─────────────────────────────────────────────────────────────────────────────

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── Static export for Hostinger ──────────────────────────────────────────
  output: "export",

  // ─── Trailing slash: each route → /route/index.html ───────────────────────
  // IMPORTANT: All canonical URLs in metadata must end with /
  // All internal <Link href="..."> must end with /
  trailingSlash: true,

  // ─── Disable image optimization (required for static export) ──────────────
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.unsplash.com" },
    ],
  },

  // ─── Remove X-Powered-By header ───────────────────────────────────────────
  poweredByHeader: false,

  // ─── Redirect /case-studies → /customer-stories ───────────────────────────
  // NOTE: redirects() does NOT work with output: "export"
  // Instead use a static HTML redirect file — see public/case-studies/index.html below
}

export default nextConfig

// ─────────────────────────────────────────────────────────────────────────────
// IMPORTANT NOTE ON REDIRECTS WITH STATIC EXPORT:
// next.config.mjs `redirects()` is ignored when output: "export" is set.
// To handle /case-studies/ → /customer-stories/ redirect on Hostinger:
//
// OPTION A (recommended): Create public/case-studies/index.html with:
//
//   <!DOCTYPE html>
//   <html>
//   <head>
//     <meta http-equiv="refresh" content="0; url=/customer-stories/" />
//     <link rel="canonical" href="https://pixoranest.com/customer-stories/" />
//   </head>
//   <body>Redirecting...</body>
//   </html>
//
// OPTION B: Add redirect rule in Hostinger .htaccess:
//   Redirect 301 /case-studies/ https://pixoranest.com/customer-stories/
// ─────────────────────────────────────────────────────────────────────────────