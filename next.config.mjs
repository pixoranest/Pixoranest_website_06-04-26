/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

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

  // Ignore TypeScript build errors temporarily
  typescript: {
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: "/services/:slug*",
        destination: "/solutions/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;