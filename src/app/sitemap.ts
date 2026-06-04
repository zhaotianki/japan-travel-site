import type { MetadataRoute } from "next";
import { aiCodingTools } from "@/content/aiTools";
import { tutorials } from "@/content/tutorials";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();
  const baseRoutes = ["", "/tutorials", "/resources", "/cases", "/ai-tools", "/contact", "/privacy", "/terms", "/en", "/ja"];
  const toolRoutes = aiCodingTools.map((tool) => `/ai-tools#${tool.slug}`);
  const tutorialRoutes = tutorials.map((tutorial) => `/tutorials#${tutorial.slug}`);

  return [...baseRoutes, ...toolRoutes, ...tutorialRoutes].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route.includes("#") ? "weekly" : "daily",
    priority: route === "" ? 1 : 0.7
  }));
}
