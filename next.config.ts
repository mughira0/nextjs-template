import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Enable loading local images
  images: {
    domains: [],
  },
};

export default nextConfig;
