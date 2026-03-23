import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@modernstores/ui"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.modernstores.com" },
    ]
  }
};

export default nextConfig;
