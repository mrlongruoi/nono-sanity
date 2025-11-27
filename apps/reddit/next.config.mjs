/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  // Disable source maps to silence warnings
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
  },
  images: {
      remotePatterns: [
        {
          hostname: "cdn.sanity.io",
          protocol: "https",
        },
        {
          hostname: "img.clerk.com",
          protocol: "https",
        },
      ],
    },
}

export default nextConfig
