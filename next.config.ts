import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
        pathname: "/digikala-products/**",
      },
      {
        protocol: "https",
        hostname: "dkstatics-public.digikala.com",
        pathname: "/digikala-adservice-banners/**",
      },
    ],
  },
};

export default nextConfig;
