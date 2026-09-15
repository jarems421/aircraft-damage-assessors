import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://aircraft-damage-assessors-jarems421s-projects.vercel.app";

  const routes = [
    "",
    "/about",
    "/damage-assessment",
    "/services",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route === "/damage-assessment" ? 0.9 : 0.7,
  }));
}
