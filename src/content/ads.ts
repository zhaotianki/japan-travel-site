export type SponsorAd = {
  id: string;
  placement: "sidebar-top" | "home-leaderboard" | "content-top" | "content-inline";
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  tags: string[];
};

export const sponsorAds: SponsorAd[] = [
  {
    id: "codex-training-sidebar",
    placement: "sidebar-top",
    eyebrow: "广告 / Sponsored",
    title: "Codex 实战训练营",
    description: "从提示词、AGENTS.md、浏览器验证到自动化更新，建立能直接用于项目的 AI 编程流程。",
    cta: "预约学习",
    href: "/contact",
    tags: ["课程", "社群", "Codex"]
  },
  {
    id: "ai-toolkit-home",
    placement: "home-leaderboard",
    eyebrow: "广告 / Sponsored",
    title: "AI 编程工具包：模板、脚本、案例库",
    description: "适合内容站长和开发者的可复用素材包：教程脚本、截图清单、案例整理提示词和自动发布流程。",
    cta: "查看资源库",
    href: "/resources",
    tags: ["模板", "自动化", "内容变现"]
  },
  {
    id: "enterprise-workflow-content",
    placement: "content-top",
    eyebrow: "广告 / Sponsored",
    title: "企业 Codex 工作流搭建",
    description: "帮助团队把 Codex 接入代码审查、测试、前端验收、GitHub/Slack/Linear 流程，并沉淀团队规则。",
    cta: "联系合作",
    href: "/contact",
    tags: ["企业培训", "代码审查", "自动化"]
  },
  {
    id: "sponsor-ai-coding-cases",
    placement: "content-inline",
    eyebrow: "广告 / Sponsored",
    title: "赞助 AI 编程案例深度文章",
    description: "面向 AI 编程工具、课程、社群和开发者服务，支持案例文章、工具评测和教程合作。",
    cta: "提交合作需求",
    href: "/contact",
    tags: ["赞助文章", "工具评测", "联盟推荐"]
  }
];
