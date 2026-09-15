import type { MetadataRoute } from "next";
import { SEARCH_INDEXING_ENABLED, SITE_URL } from "@/data/companyConfig";

export default function robots(): MetadataRoute.Robots {
  // Review builds block crawlers until the production domain is configured in NEXT_PUBLIC_SITE_URL.
  if (!SEARCH_INDEXING_ENABLED) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
