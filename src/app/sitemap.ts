import type { MetadataRoute } from "next";
import { getTutorialUrl, tutorialCatalog } from "@/content/tutorials";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const baseRoutes = ["", "/tutorials", "/resources", "/cases", "/contact", "/privacy", "/terms", "/en", "/ja"];
  const tutorialRoutes = tutorialCatalog.map((tutorial) => getTutorialUrl(tutorial));

  return [...baseRoutes, ...tutorialRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.includes("/tutorials?") ? "weekly" : "daily",
    priority: route === "" ? 1 : 0.7
  }));
}
