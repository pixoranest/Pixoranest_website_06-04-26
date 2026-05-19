/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  // trailingSlash: true is correct for Hostinger static hosting.
  // It generates /solutions/index.html instead of /solutions.html,
  // which maps cleanly to https://www.pixoranest.com/solutions/
  // Canonical URLs in seo_metadata.ts are updated to match (with trailing slash).
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
    ],
  },

  poweredByHeader: false,

  typescript: {
    ignoreBuildErrors: true,
  },

  // ─── redirects() REMOVED ─────────────────────────────────────────────────
  // Next.js output: "export" does NOT support server-side redirects.
  // The async redirects() function is silently ignored — /services/* URLs
  // were returning 404 in production with no redirect happening at all.
  //
  // STATIC-SAFE ALTERNATIVE for Hostinger:
  // Add the following to your /public/.htaccess file (Apache):
  //
  //   RewriteEngine On
  //   RewriteRule ^services/(.*)$ /solutions/$1 [R=301,L]
  //
  // This handles the /services → /solutions redirect at the web server level,
  // which is the correct layer for static-export sites.
  // ─────────────────────────────────────────────────────────────────────────
}

export default nextConfig