import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // This will ignore TypeScript errors during the build
  typescript: {
    ignoreBuildErrors: true,
  },

  // This will ignore ESLint errors during the build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
