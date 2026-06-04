import type { SponsorAd } from "@/content/ads";
import { getPublishedTutorials, tutorialCatalog } from "@/content/tutorials";

export const siteConfig = {
  name: "AI实战安装教程与Agent知识库",
  description: "面向零基础用户的真实操作知识库：AI工具安装、插件安装、MCP配置、Agent部署、API申请、Vercel部署和Github管理。",
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
  return getPublishedTutorials().slice(0, 4);
}

export function getContentStats() {
  return {
    tutorials: tutorialCatalog.length,
    published: getPublishedTutorials().length,
    targetTutorials: 100,
    languages: siteConfig.languages.length
  };
}
