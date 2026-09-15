import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aircraftdamageassessors.com"; // Representative domain placeholder

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
