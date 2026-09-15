import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/companyConfig";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL ?? "http://localhost:3000";
  const routes = ["", "/about", "/damage-assessment", "/services", "/contact", "/privacy", "/terms", "/cookies"];
  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/damage-assessment" ? 0.9 : 0.7,
  }));
}
