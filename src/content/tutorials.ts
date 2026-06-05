export type TutorialCategory =
  | "Codex"
  | "Claude Code"
  | "ChatGPT"
  | "MCP"
  | "Github"
  | "Vercel"
  | "Cursor"
  | "Windsurf"
  | "Agent"
  | "实战案例";

export type TutorialDifficulty = "新手入门" | "初级" | "中级" | "高级";

export type TutorialStatus = "目录待审核" | "已发布";

export type TutorialVisual = {
  src: string;
  alt: string;
  caption: string;
};

export type Tutorial = {
  slug: string;
  title: string;
  category: TutorialCategory;
  difficulty: TutorialDifficulty;
  status: TutorialStatus;
  updatedAt: string;
  audience: string;
  realTask: string;
  excerpt: string;
  plannedSections: string[];
  sources: { label: string; url: string }[];
  related: string[];
};

export const tutorialPageSize = 10;

export const tutorialCategories: TutorialCategory[] = [
  "Codex",
  "Claude Code",
  "ChatGPT",
  "MCP",
  "Github",
  "Vercel",
  "Cursor",
  "Windsurf",
  "Agent",
  "实战案例"
];

export const requiredTutorialSections = [
  "简介",
  "安装前准备",
  "第一步",
  "第二步",
  "第三步",
  "常见错误",
  "解决方案",
  "FAQ",
  "相关教程"
];

const categoryVisuals: Record<TutorialCategory, Omit<TutorialVisual, "src"> & { keyword: string }> = {
  Codex: {
    alt: "Codex 从安装到运行的文档流程图",
    caption: "Codex 教程会围绕本地环境、项目目录、权限、任务执行和验证结果整理。",
    keyword: "Codex"
  },
  "Claude Code": {
    alt: "Claude Code 终端安装与项目运行流程图",
    caption: "Claude Code 教程会记录安装、登录、API 配置、项目任务和错误排查。",
    keyword: "Claude"
  },
  ChatGPT: {
    alt: "ChatGPT 与 OpenAI Platform 设置流程图",
    caption: "ChatGPT 教程会覆盖账号、Plus、API Key、Token、账单和本地验证。",
    keyword: "OpenAI"
  },
  MCP: {
    alt: "MCP client、server 与 tool 连接流程图",
    caption: "MCP 教程会记录 server 安装、客户端配置、权限、日志和最小验证。",
    keyword: "MCP"
  },
  Github: {
    alt: "Github 仓库、分支、提交、推送和 PR 流程图",
    caption: "Github 教程会强调独立分支、提交记录、PR、权限和 CI 验证。",
    keyword: "Git"
  },
  Vercel: {
    alt: "Vercel 部署、环境变量、域名和构建日志流程图",
    caption: "Vercel 教程会覆盖本地 build、项目链接、生产部署、域名和日志排查。",
    keyword: "Deploy"
  },
  Cursor: {
    alt: "Cursor 安装、扩展、Agent 和项目运行流程图",
    caption: "Cursor 教程会记录安装、模型配置、Agent、插件、项目运行和安全检查。",
    keyword: "Cursor"
  },
  Windsurf: {
    alt: "Windsurf 安装、Cascade 和项目执行流程图",
    caption: "Windsurf 教程会记录安装、登录、Cascade、项目任务和失败复盘。",
    keyword: "Windsurf"
  },
  Agent: {
    alt: "AI Agent 从任务目标到验证结果的闭环流程图",
    caption: "Agent 教程会按目标、权限、工具、执行、日志、验证和复盘组织。",
    keyword: "Agent"
  },
  实战案例: {
    alt: "真实操作案例的命令、截图、错误和解决方案流程图",
    caption: "实战案例只记录可复查的操作过程，不写无法验证的成功故事。",
    keyword: "Case"
  }
};

const sourceMap: Record<TutorialCategory, { label: string; url: string }> = {
  Codex: { label: "OpenAI Codex docs", url: "https://developers.openai.com/codex/overview" },
  "Claude Code": { label: "Claude Code docs", url: "https://docs.anthropic.com/en/docs/claude-code" },
  ChatGPT: { label: "OpenAI Platform docs", url: "https://platform.openai.com/docs" },
  MCP: { label: "Model Context Protocol docs", url: "https://modelcontextprotocol.io/" },
  Github: { label: "GitHub Docs", url: "https://docs.github.com/" },
  Vercel: { label: "Vercel Docs", url: "https://vercel.com/docs" },
  Cursor: { label: "Cursor Docs", url: "https://docs.cursor.com/" },
  Windsurf: { label: "Windsurf Docs", url: "https://docs.windsurf.com/" },
  Agent: { label: "OpenAI Codex docs", url: "https://developers.openai.com/codex/overview" },
  实战案例: { label: "本站真实操作记录", url: "https://codex-global-blog.vercel.app/tutorials" }
};

const tutorialBlueprints: Record<TutorialCategory, Array<[string, TutorialDifficulty, string, string]>> = {
  Codex: [
    ["2026年Mac安装Codex完整教程", "新手入门", "第一次在 Mac 上安装并启动 Codex", "检查 macOS、Node.js、Git、账号登录和第一次只读任务。"],
    ["2026年Windows安装Codex完整教程", "新手入门", "第一次在 Windows 上安装并启动 Codex", "检查 Windows Terminal、PowerShell、Node.js、Git 和路径配置。"],
    ["Codex CLI配置教程", "初级", "把 Codex CLI 配成可控的项目助手", "整理模型、权限、sandbox、审批、网络和项目规则。"],
    ["AGENTS.md怎么写", "初级", "给项目写一份 Codex 能执行的规则文件", "把测试命令、禁止事项、提交规则和 UI 规范写清楚。"],
    ["Codex Skills怎么安装", "初级", "安装并验证 Codex Skills", "记录技能来源、安装位置、启用方式和最小验证任务。"],
    ["Codex连接Github工作流", "中级", "让 Codex 在独立分支中协助修改代码", "覆盖 branch、diff、commit、push、PR 和 review。"],
    ["Codex连接MCP完整流程", "中级", "把 MCP server 接入 Codex", "检查客户端配置、认证、工具列表、日志和最小读操作。"],
    ["Codex调试Next.js构建失败", "中级", "用 Codex 排查 npm run build 失败", "从错误日志定位文件、修复代码并重新构建。"],
    ["Codex自动化代码审查流程", "高级", "让 Codex 执行代码审查和风险报告", "限定审查范围、运行测试、输出风险和修复建议。"],
    ["给Codex的终极提示词模板", "高级", "把复杂任务拆成 Codex 可执行指令", "建立目标、约束、验证、权限和交付格式模板。"]
  ],
  "Claude Code": [
    ["2026年Claude Code安装教程", "新手入门", "安装 Claude Code 并完成第一次项目读取", "检查终端环境、登录方式、项目目录和只读验证。"],
    ["Claude Code API配置教程", "新手入门", "配置 Anthropic API 后运行最小任务", "整理 API Key、环境变量、账单状态和本地验证。"],
    ["Claude Code收费说明怎么看", "初级", "按官方价格页理解订阅和用量", "解释订阅、API、额度、限制和成本检查方法。"],
    ["Claude Code项目初始化教程", "初级", "在空项目里跑起第一次开发任务", "从创建项目、Git 初始化到让 Claude Code 读取结构。"],
    ["Claude Code修复构建失败实战", "中级", "用真实构建日志指导 Claude Code 修复错误", "记录失败命令、错误定位、修复 diff 和复测。"],
    ["Claude Code与Codex区别", "中级", "比较两种 Agent 的安装和项目工作流", "从入口、权限、终端体验、上下文和验证角度对比。"],
    ["Claude Code连接Github流程", "中级", "把 Claude Code 修改结果提交到 GitHub", "覆盖分支、提交、远程推送和 PR。"],
    ["Claude Code常见权限错误排查", "中级", "排查读写文件、联网和命令执行限制", "按权限来源、项目目录和终端输出逐项检查。"],
    ["Claude Code多人项目使用规范", "高级", "在团队项目中使用 Claude Code", "整理规则文件、分支策略、审查流程和敏感信息边界。"],
    ["Claude Code高级提示词模板", "高级", "为复杂代码任务设计可验证提示词", "包含任务背景、修改范围、测试命令和交付要求。"]
  ],
  ChatGPT: [
    ["ChatGPT Plus购买教程", "新手入门", "完成 Plus 订阅并确认可用能力", "检查账号、支付、地区限制、发票和模型入口。"],
    ["OpenAI API Key申请全过程", "新手入门", "创建 API Key 并完成最小请求验证", "覆盖项目、账单、Key 保存、环境变量和安全删除。"],
    ["Token是什么", "新手入门", "理解 token、上下文和费用", "用真实 API 请求解释输入、输出、上下文长度和计费。"],
    ["GPT API申请教程", "初级", "从 Platform 项目到第一次 API 调用", "整理账号、组织、项目、账单、Key 和 curl 验证。"],
    ["API Key怎么获取和保存", "初级", "安全创建、保存、轮换和撤销 API Key", "避免把 Key 写入代码或提交到 GitHub。"],
    ["ChatGPT生成代码后本地运行", "初级", "把聊天生成的代码放到本地验证", "记录文件创建、依赖安装、运行命令和错误处理。"],
    ["ChatGPT自定义GPT创建教程", "中级", "创建一个面向安装问题的自定义 GPT", "整理知识文件、指令、测试问题和发布权限。"],
    ["ChatGPT连接Github思路", "中级", "把 ChatGPT 生成内容转为可提交代码", "通过本地 Git、PR 和 review 建立可控流程。"],
    ["OpenAI账单和用量查看教程", "中级", "查看 API 用量、限制和成本", "检查 usage、limits、billing 和异常用量。"],
    ["ChatGPT高级提示词调试法", "高级", "让 ChatGPT 输出可执行、可验证步骤", "用角色、输入、输出、约束、校验和错误复盘组织。"]
  ],
  MCP: [
    ["什么是MCP", "新手入门", "理解 MCP client、server、tool 和 resource", "用实际连接流程说明 MCP 在 Agent 中的作用。"],
    ["Playwright MCP安装教程", "新手入门", "安装并验证浏览器自动化 MCP", "检查 Node、浏览器、server 启动、工具列表和截图验证。"],
    ["Github MCP安装教程", "初级", "安装 GitHub MCP 并验证仓库读取", "整理 GitHub token、权限范围、server 配置和最小读操作。"],
    ["Browser MCP安装教程", "初级", "配置浏览器 MCP 并完成页面读取", "覆盖安装、启动、连接、导航、截图和日志排查。"],
    ["MCP安装踩坑记录", "初级", "整理 MCP 常见失败原因", "排查 server 未启动、配置路径错误、认证失败和客户端重启。"],
    ["MCP权限安全检查清单", "中级", "限制 MCP 工具的权限范围", "检查 token、文件系统、浏览器、GitHub 和外部服务访问。"],
    ["MCP Server日志怎么看", "中级", "通过日志定位 MCP 连接失败", "记录启动日志、错误码、客户端提示和修复动作。"],
    ["MCP接入Codex流程", "中级", "把 MCP 工具接入 Codex 任务", "验证工具出现、执行只读任务、保存输出和回滚配置。"],
    ["MCP接入Claude Code流程", "高级", "把 MCP 工具接入 Claude Code", "检查配置格式、权限、工具调用和失败恢复。"],
    ["自己写一个最小MCP Server", "高级", "创建可运行的最小 MCP server", "实现工具定义、启动命令、客户端连接和最小调用。"]
  ],
  Github: [
    ["GitHub新建仓库全过程", "新手入门", "创建仓库并完成第一次 push", "覆盖仓库创建、remote、branch、commit 和 push。"],
    ["Git安装与基础配置教程", "新手入门", "安装 Git 并配置用户名邮箱", "检查 git version、global config、默认分支和凭据。"],
    ["GitHub Pull Request实战", "初级", "用 PR 提交一次可审查变更", "覆盖分支、commit、push、PR 描述和合并。"],
    ["GitHub Token配置教程", "初级", "创建 token 并用于本地或工具认证", "记录权限、过期时间、保存方式和撤销流程。"],
    ["GitHub SSH Key配置教程", "初级", "配置 SSH 后免密码推送", "生成 key、添加公钥、测试 ssh -T 和 remote 切换。"],
    ["GitHub Actions构建检查", "中级", "添加 CI 并读取失败日志", "安装依赖、运行 lint/build、查看日志和修复失败。"],
    ["Github连接Codex", "中级", "让 Codex 修改后提交到 GitHub", "建立独立分支、检查 diff、commit、push 和 PR。"],
    ["GitHub仓库权限管理", "中级", "给团队成员配置仓库权限", "区分 read、write、maintain、admin 和组织设置。"],
    ["GitHub Pages与Vercel区别", "中级", "选择静态站或 Next.js 部署方案", "比较构建能力、域名、SSR、CI 和扩展限制。"],
    ["GitHub误提交密钥处理", "高级", "发现密钥提交后立即止损", "撤销 Key、清理历史、强制轮换并检查暴露范围。"]
  ],
  Vercel: [
    ["Vercel部署Next.js全过程", "新手入门", "把 Next.js 项目部署到生产环境", "覆盖 npm run build、Vercel link、production deploy 和线上检查。"],
    ["Vercel绑定Github仓库", "新手入门", "接入 GitHub 后自动部署", "检查导入仓库、构建命令、环境变量和首次部署。"],
    ["Vercel环境变量配置", "初级", "配置开发、预览和生产变量", "整理变量作用域、加密、重新部署和本地拉取。"],
    ["Vercel自定义域名绑定", "初级", "给项目绑定自己的域名", "覆盖 DNS、CNAME、A 记录、HTTPS 和验证状态。"],
    ["Vercel部署失败排查", "初级", "从构建日志定位失败原因", "检查依赖、Node 版本、环境变量、路径和 TypeScript 错误。"],
    ["Vercel部署后SEO检查", "中级", "检查 sitemap、robots、metadata 和 canonical", "确认生产域名、页面标题、OG 信息和索引文件。"],
    ["AdSense审核全过程", "中级", "为 Vercel 站点准备 AdSense 审核", "检查原创内容、隐私政策、ads.txt、广告脚本和站点状态。"],
    ["Vercel Cron定时任务入门", "中级", "配置定时更新任务", "整理 vercel.json、API route、运行频率和日志验证。"],
    ["Vercel日志查看教程", "中级", "查看部署和函数运行日志", "区分 build logs、runtime logs、preview 和 production。"],
    ["Vercel生产部署回滚教程", "高级", "部署失败后回滚到稳定版本", "找到旧部署、promote、检查域名和记录回滚原因。"]
  ],
  Cursor: [
    ["Cursor安装完整教程", "新手入门", "安装 Cursor 并打开第一个项目", "检查系统、下载来源、登录、项目目录和模型入口。"],
    ["Cursor模型配置教程", "新手入门", "配置 Cursor 可用模型和账号", "整理账号登录、模型选择、API Key 和验证问题。"],
    ["Cursor Agent使用教程", "初级", "让 Cursor Agent 完成一次小修改", "限定文件范围、运行命令、检查 diff 和回滚。"],
    ["Cursor插件安装教程", "初级", "在 Cursor 中安装常用插件", "检查 Marketplace、插件权限、启用状态和冲突。"],
    ["Cursor连接Github教程", "初级", "用 Cursor 管理 GitHub 项目", "覆盖 clone、branch、commit、push 和 PR。"],
    ["Cursor调试前端页面", "中级", "用 Cursor 修复 React/Next.js 页面问题", "结合浏览器现象、代码定位、修改和构建验证。"],
    ["Cursor终端与Agent协作", "中级", "让 Agent 使用终端命令验证结果", "规定命令、权限、输出格式和失败处理。"],
    ["Cursor Rules怎么写", "中级", "为项目写 Cursor 规则", "整理代码规范、测试命令、UI 约束和禁止事项。"],
    ["Cursor处理大型项目上下文", "高级", "控制 Agent 读取范围和任务边界", "使用文件引用、规则、摘要和阶段性验证。"],
    ["Cursor高级提示词模板", "高级", "让 Cursor 输出可审查代码修改", "包含目标、范围、验收标准、测试命令和交付格式。"]
  ],
  Windsurf: [
    ["Windsurf安装完整教程", "新手入门", "安装 Windsurf 并打开第一个项目", "检查下载、登录、项目目录和首次任务。"],
    ["Windsurf Cascade使用教程", "新手入门", "用 Cascade 完成一次项目操作", "记录目标、上下文、命令、修改和验证。"],
    ["Windsurf模型和账号配置", "初级", "配置可用模型、账号和额度", "检查登录状态、模型入口、API 设置和限制。"],
    ["Windsurf连接Github教程", "初级", "用 Windsurf 管理 GitHub 项目", "覆盖 clone、branch、commit、push 和远程检查。"],
    ["Windsurf终端运行项目", "初级", "在 Windsurf 中启动本地项目", "安装依赖、运行 dev server、查看端口和错误。"],
    ["Windsurf修复构建失败", "中级", "根据构建日志让 Cascade 修复错误", "从错误定位、修改、重跑 build 到记录结果。"],
    ["Windsurf规则文件怎么写", "中级", "给 Windsurf 项目写执行规则", "整理技术栈、命令、安全边界和 UI 要求。"],
    ["Windsurf与Cursor区别", "中级", "比较两种 AI IDE 的实际使用流程", "从安装、Agent、终端、上下文和 Git 工作流对比。"],
    ["Windsurf处理多文件修改", "高级", "控制 Cascade 的修改范围", "通过阶段任务、diff 检查、测试和回滚降低风险。"],
    ["Windsurf高级提示词模板", "高级", "让 Windsurf 生成可验证修改计划", "规定输入、边界、命令、风险和完成报告。"]
  ],
  Agent: [
    ["AI Agent是什么", "新手入门", "理解 Agent 与普通聊天机器人的区别", "用目标、工具、权限、执行和验证解释 Agent。"],
    ["OpenAI Codex Agent实战", "新手入门", "让 Codex 完成一次小型项目任务", "记录目标、读取文件、修改、验证和最终报告。"],
    ["Pi Agent安装与运行", "初级", "安装并跑起 Pi Agent", "检查官方来源、环境、账号、启动命令和验证结果。"],
    ["Agent部署前环境检查", "初级", "准备本地和云端运行环境", "检查 Node、Git、API Key、权限、日志和回滚方案。"],
    ["Agent工具权限设置教程", "初级", "限制 Agent 可以使用的工具", "区分读文件、写文件、联网、部署和删除权限。"],
    ["Agent连接MCP教程", "中级", "让 Agent 调用 MCP 工具", "配置 server、认证、工具列表、最小调用和日志排查。"],
    ["Agent自动化浏览器任务", "中级", "让 Agent 使用浏览器完成验证", "记录导航、点击、截图、控制台错误和复测。"],
    ["Agent写代码后的验收流程", "中级", "建立代码修改后的验收清单", "包含 lint、build、测试、diff、截图和部署检查。"],
    ["Agent失败复盘模板", "高级", "记录 Agent 任务失败原因", "按目标、权限、输入、命令、错误和修复计划复盘。"],
    ["多Agent协作流程设计", "高级", "拆分规划、执行、审查和部署角色", "定义交接格式、上下文边界、验证和最终合并。"]
  ],
  实战案例: [
    ["本站从本地到Vercel部署记录", "新手入门", "记录本站部署到 Vercel 的真实流程", "包含 build、link、deploy、production URL 和线上文件检查。"],
    ["本地Next.js项目创建全过程", "新手入门", "从空目录创建并启动 Next.js 项目", "记录依赖安装、dev server、页面访问和构建。"],
    ["GitHub独立分支保存项目", "初级", "用独立分支保存一次网站修改", "记录 status、add、commit、push 和 PR 检查。"],
    ["AdSense脚本接入本站记录", "初级", "把真实 AdSense client 加入页面", "检查 layout 脚本、ads.txt、生产域名和页面加载。"],
    ["联系表单邮件发送链路记录", "初级", "从弹窗表单到邮件 API 的真实链路", "记录表单字段、API route、邮件服务和错误提示。"],
    ["教程页分页改造记录", "中级", "把教程页改成分类分页", "记录数据源、query 参数、每页数量和移动端检查。"],
    ["文章专属图片生成记录", "中级", "为每篇目录生成不同示意图", "记录 slug 动态图、alt、caption 和浏览器检查。"],
    ["全站搜索上线记录", "中级", "给知识库增加搜索入口", "记录搜索字段、结果过滤、空状态和移动端体验。"],
    ["目录审核到正文发布流程", "高级", "建立目录先审、正文后写的发布流程", "记录状态、来源、章节、截图和上线检查。"],
    ["AI知识库持续更新任务设计", "高级", "设计每周更新真实教程的任务流程", "记录来源抓取、人工审核、正文生成、部署和日志。"]
  ]
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replaceAll("+", "plus")
    .replaceAll("/", "-")
    .replaceAll(" ", "-")
    .replace(/[：:，,。()（）]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function createTutorial(category: TutorialCategory, item: [string, TutorialDifficulty, string, string], index: number): Tutorial {
  const [title, difficulty, realTask, excerpt] = item;
  const categoryItems = tutorialBlueprints[category];
  const previous = categoryItems[index - 1]?.[0];
  const next = categoryItems[index + 1]?.[0];

  return {
    slug: `${toSlug(category)}-${toSlug(title)}`,
    title,
    category,
    difficulty,
    status: "目录待审核",
    updatedAt: "2026-06-05",
    audience:
      difficulty === "新手入门"
        ? "零基础用户"
        : difficulty === "初级"
          ? "已经能复制命令并查看错误的新手"
          : difficulty === "中级"
            ? "能使用 Git、终端和项目目录的学习者"
            : "需要处理复杂项目、权限和部署流程的进阶用户",
    realTask,
    excerpt,
    plannedSections: requiredTutorialSections,
    sources: [sourceMap[category]],
    related: [previous, next].filter(Boolean) as string[]
  };
}

export const tutorialCatalog: Tutorial[] = tutorialCategories.flatMap((category) =>
  tutorialBlueprints[category].map((item, index) => createTutorial(category, item, index))
);

export function getPublishedTutorials() {
  return tutorialCatalog.filter((article) => article.status === "已发布");
}

export function getLatestTutorials() {
  return tutorialCatalog.slice(0, 8);
}

export function getPopularTutorials() {
  return tutorialCatalog.filter((article) => ["新手入门", "初级"].includes(article.difficulty)).slice(0, 8);
}

export function getTutorialsByCategory() {
  return tutorialCatalog.reduce<Record<TutorialCategory, Tutorial[]>>((acc, article) => {
    acc[article.category] = acc[article.category] || [];
    acc[article.category].push(article);
    return acc;
  }, {} as Record<TutorialCategory, Tutorial[]>);
}

export function getTutorialDifficulty(tutorial: Pick<Tutorial, "difficulty">): TutorialDifficulty {
  return tutorial.difficulty;
}

export function getTutorialVisual(tutorial: Pick<Tutorial, "category" | "title" | "slug" | "difficulty">) {
  const visual = categoryVisuals[tutorial.category];

  return {
    ...visual,
    src: `/api/tutorial-visual/${encodeURIComponent(tutorial.slug)}`,
    alt: `${tutorial.title}：${tutorial.difficulty}，${visual.alt}`,
    caption: `${tutorial.difficulty}｜${visual.caption}`
  };
}

export function getTutorialUrl(article: Pick<Tutorial, "category" | "slug">) {
  const byCategory = getTutorialsByCategory();
  const categoryArticles = byCategory[article.category] ?? [];
  const index = categoryArticles.findIndex((item) => item.slug === article.slug);
  const page = index >= 0 ? Math.floor(index / tutorialPageSize) + 1 : 1;

  return `/tutorials?category=${encodeURIComponent(article.category)}&page=${page}#${article.slug}`;
}

export function searchTutorials(query: string, category?: TutorialCategory) {
  const normalized = query.trim().toLowerCase();
  const pool = category ? tutorialCatalog.filter((article) => article.category === category) : tutorialCatalog;

  if (!normalized) {
    return pool;
  }

  return pool.filter((article) =>
    [article.title, article.category, article.difficulty, article.audience, article.realTask, article.excerpt]
      .join(" ")
      .toLowerCase()
      .includes(normalized)
  );
}
