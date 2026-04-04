/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aaknzniigmmrdjlakiry.supabase.co",
      },
    ],
  },
};
module.exports = nextConfig;
