/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Umrah guide and the cost calculator now live on the homepage story.
  async redirects() {
    return [
      { source: "/umrah", destination: "/", permanent: true },
      { source: "/planner", destination: "/#ch-calc", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000, // 30 days
    deviceSizes: [640, 1080, 1920],
  },
};
module.exports = nextConfig;
