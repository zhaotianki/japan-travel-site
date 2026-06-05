import type { SponsorAd } from "@/content/ads";
import { tutorialCatalog } from "@/content/tutorials";

export const siteConfig = {
  name: "AI Agent 实战知识库",
  description: "面向零基础用户的真实操作知识库：Codex、Claude Code、ChatGPT、MCP、Github、Vercel、Cursor、Windsurf 和 Agent 教程目录。",
  defaultUrl: "https://codex-global-blog.vercel.app",
  defaultAdSenseClient: "ca-pub-3023331294575844",
  locale: "zh-CN",
  languages: [
    { code: "zh", label: "中文", href: "/" },
    { code: "en", label: "English", href: "/en" },
    { code: "ja", label: "日本語", href: "/ja" }
  ]
};

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || siteConfig.defaultUrl;
}

export function getContactUrl() {
  return process.env.NEXT_PUBLIC_CONTACT_URL || "/contact";
}

export function getAdSenseClient() {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT || siteConfig.defaultAdSenseClient;
}

export function getAdSenseSlot() {
  return process.env.NEXT_PUBLIC_ADSENSE_SLOT || "";
}

export function getAffiliateLinks() {
  const raw = process.env.NEXT_PUBLIC_AFFILIATE_LINKS;
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as Array<{ label: string; url: string; description?: string }>;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getSponsorAds() {
  const raw = process.env.NEXT_PUBLIC_SPONSOR_ADS;
  if (!raw) {
    return [] as SponsorAd[];
  }

  try {
    const parsed = JSON.parse(raw) as SponsorAd[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getFeaturedTutorials() {
  return tutorialCatalog.slice(0, 4);
}

export function getContentStats() {
  return {
    tutorials: tutorialCatalog.length,
    published: tutorialCatalog.filter((article) => article.status === "已发布").length,
    targetTutorials: tutorialCatalog.length,
    languages: siteConfig.languages.length
  };
}
