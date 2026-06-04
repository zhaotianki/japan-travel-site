export type Tutorial = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  level: "入门" | "进阶" | "实战";
  readMinutes: number;
  updatedAt: string;
  image: string;
  lessons: string[];
  sources: { label: string; url: string }[];
};

export const tutorials: Tutorial[] = [
  {
    slug: "codex-quickstart",
    title: "Codex 入门：从一句话到可运行项目",
    excerpt: "了解 Codex 的工作方式、适合任务、权限确认、代码审查和验证步骤。",
    category: "Codex 基础",
    level: "入门",
    readMinutes: 9,
    updatedAt: "2026-06-04",
    image: "/media/codex-workbench.svg",
    lessons: ["选择 CLI、App、IDE 或 Web 使用场景", "写出高质量任务提示", "让 Codex 读仓库、执行测试并解释结果"],
    sources: [
      { label: "OpenAI Codex overview", url: "https://developers.openai.com/codex/overview" }
    ]
  },
  {
    slug: "codex-cli-workflow",
    title: "Codex CLI 工作流：读代码、改代码、跑测试",
    excerpt: "把日常开发拆成探索、实现、验证、提交四个阶段，让 Codex 成为稳定的本地开发伙伴。",
    category: "CLI",
    level: "实战",
    readMinutes: 12,
    updatedAt: "2026-06-04",
    image: "/media/terminal-flow.svg",
    lessons: ["用 AGENTS.md 固化项目规则", "让 Codex 优先使用 rg 和测试命令", "处理 sandbox、approval 和联网限制"],
    sources: [
      { label: "Codex customization", url: "https://developers.openai.com/codex/concepts/customization" }
    ]
  },
  {
    slug: "codex-app-browser",
    title: "Codex App 与浏览器验证：从 UI 修改到截图检查",
    excerpt: "适合前端网站、管理后台和交互工具：让 Codex 启动本地服务、打开页面、检查控制台并修复问题。",
    category: "App",
    level: "进阶",
    readMinutes: 10,
    updatedAt: "2026-06-04",
    image: "/media/browser-review.svg",
    lessons: ["什么时候使用 in-app browser", "如何要求 Codex 做桌面和移动端截图验证", "检查空白画布、布局重叠和控制台错误"],
    sources: [
      { label: "Codex in-app browser", url: "https://developers.openai.com/codex/app/in-app-browser" }
    ]
  },
  {
    slug: "codex-automations",
    title: "Codex 自动化：每周三次更新博客内容",
    excerpt: "把资料抓取、案例去重、草稿生成、SEO metadata 和 RSS 更新变成可持续流程。",
    category: "自动化",
    level: "实战",
    readMinutes: 11,
    updatedAt: "2026-06-04",
    image: "/media/content-pipeline.svg",
    lessons: ["独立自动化与线程自动化的区别", "如何写稳定的自动化提示", "为什么自动发布仍要保留来源和更新时间"],
    sources: [
      { label: "Codex automations", url: "https://developers.openai.com/codex/app/automations" }
    ]
  },
  {
    slug: "skills-mcp-integrations",
    title: "Skills、MCP 与集成：把 Codex 接入真实工作流",
    excerpt: "从可复用技能到 GitHub、Slack、Linear 和外部数据源，建立可持续的团队知识系统。",
    category: "扩展能力",
    level: "进阶",
    readMinutes: 13,
    updatedAt: "2026-06-04",
    image: "/media/integration-map.svg",
    lessons: ["Skill 适合封装任务流程", "MCP 适合接入私有或实时数据", "集成工具必须控制权限边界"],
    sources: [
      { label: "Codex skills", url: "https://developers.openai.com/codex/skills" },
      { label: "Model Context Protocol", url: "https://developers.openai.com/codex/concepts/customization#mcp" }
    ]
  },
  {
    slug: "codex-life-future",
    title: "Codex 如何改变生活、科技和未来工作方式",
    excerpt: "用家庭、学习、小企业、研发和城市服务例子，说明软件代理如何把想法变成可运行工具。",
    category: "未来生活",
    level: "入门",
    readMinutes: 8,
    updatedAt: "2026-06-04",
    image: "/media/future-work.svg",
    lessons: ["普通人如何用 Codex 做个人自动化", "小团队如何压缩软件交付周期", "未来工作更像管理多个专业代理"],
    sources: [
      { label: "OpenAI customer stories", url: "https://openai.com/business/customer-stories/" }
    ]
  }
];
