/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ IMPORTANT: Static export REMOVE chesam
  // output: "export",

  trailingSlash: true,

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    unoptimized: true,
  },
}

export default nextConfig