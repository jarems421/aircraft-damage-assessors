import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        /**
         * Vercel deployment URLs serve the same site as the custom domain. Left indexable they would
         * appear in search results as duplicates of aircraftdamageassessors.com and split its ranking,
         * so every *.vercel.app host is told not to index. The custom domain is unaffected.
         */
        source: "/:path*",
        has: [{ type: "host", value: "(?<deployment>.*\\.vercel\\.app)" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
