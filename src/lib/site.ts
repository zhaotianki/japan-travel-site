import cases from "@/content/cases.json";
import type { SponsorAd } from "@/content/ads";
import { aiCodingTools } from "@/content/aiTools";
import { tutorials } from "@/content/tutorials";

export const siteConfig = {
  name: "Codex 全球教学博客",
  description: "中文主站，系统学习 Codex 与 AI 编程工具：教程、案例、工具对比和自动化内容更新。",
  defaultUrl: "http://localhost:3000",
  locale: "zh-CN",
  languages: [
    { code: "zh", label: "中文", href: "/" },
    { code: "en", label: "English", href: "/en" },
    { code: "ja", label: "日本語", href: "/ja" }
  ]
};

export type CaseStudy = (typeof cases)[number];

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || siteConfig.defaultUrl;
}

export function getContactUrl() {
  return process.env.NEXT_PUBLIC_CONTACT_URL || "/contact";
}

export function getAdSenseClient() {
  return process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "";
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
  return tutorials.slice(0, 4);
}

export function getLatestCases() {
  return [...cases].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 8);
}

export function getCasesByTool() {
  return cases.reduce<Record<string, number>>((acc, item) => {
    acc[item.tool] = (acc[item.tool] || 0) + 1;
    return acc;
  }, {});
}

export function getContentStats() {
  return {
    tutorials: tutorials.length,
    cases: cases.length,
    targetCases: 100,
    tools: aiCodingTools.length,
    languages: siteConfig.languages.length
  };
}
