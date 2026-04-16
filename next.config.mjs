/** @type {import('next').NextConfig} */
const nextConfig = {
  // ─── CRITICAL: Static export for Hostinger ─────────────────────────────────
  output: "export",

  // ─── CRITICAL: Trailing slash ensures index.html per route ─────────────────
  trailingSlash: true,

  // ─── CRITICAL: Disable Next.js image optimization ──────────────────────────
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

  // ─── Security (optional) ───────────────────────────────────────────────────
  poweredByHeader: false,
};

export default nextConfig; // ✅ FIXED