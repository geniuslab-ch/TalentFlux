/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mode Vercel natif — SSG automatique pour les pages sans getData*
  // Server Components (layout, metadata, JSON-LD) rendus côté serveur ✓
  // Client Components ("use client") hydratés côté client ✓
  reactStrictMode: true,

  // Les images Supabase Storage sont sur un domaine externe
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
