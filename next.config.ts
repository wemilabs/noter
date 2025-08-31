import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ubrw5iu3hw.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
