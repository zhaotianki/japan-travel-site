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
    title: "Google AdSense 广告位",
    description: "本站已加载 AdSense client。固定广告单元需要在 AdSense 后台通过审核并配置 slot 后展示。",
    cta: "查看隐私政策",
    href: "/contact",
    tags: ["AdSense", "广告披露", "隐私"]
  },
  {
    id: "ai-toolkit-home",
    placement: "home-leaderboard",
    eyebrow: "广告 / Sponsored",
    title: "本站广告说明",
    description: "广告不会替代教程正文。教程目录和正文以真实操作、官方来源和可复现步骤为准。",
    cta: "查看规则",
    href: "/resources",
    tags: ["广告", "真实教程", "来源"]
  },
  {
    id: "enterprise-workflow-content",
    placement: "content-top",
    eyebrow: "广告 / Sponsored",
    title: "内容提交入口",
    description: "提交真实安装、部署、API、MCP、Agent 运行过程中的错误、截图位置和解决方案。",
    cta: "提交问题",
    href: "/contact",
    tags: ["真实操作", "错误记录", "FAQ"]
  },
  {
    id: "sponsor-ai-coding-cases",
    placement: "content-inline",
    eyebrow: "广告 / Sponsored",
    title: "实战记录征集",
    description: "只接受可以复查的真实操作记录，包括命令、错误信息、截图位置和修复步骤。",
    cta: "提交记录",
    href: "/contact",
    tags: ["实战案例", "不虚构", "可复现"]
  }
];
