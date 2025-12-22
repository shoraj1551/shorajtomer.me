import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Image optimization setup
  images: {
    domains: [],
    unoptimized: true
  },
};

export default nextConfig;
