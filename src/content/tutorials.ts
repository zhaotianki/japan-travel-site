export type TutorialSection = {
  heading: string;
  body: string[];
};

export type Tutorial = {
  slug: string;
  title: string;
  category: "Codex" | "Claude Code" | "ChatGPT" | "MCP" | "Agent" | "Github" | "Vercel" | "联盟营销" | "实战案例";
  status: "已发布" | "目录";
  updatedAt: string;
  sourceType: "真实操作" | "官方文档整理";
  excerpt: string;
  prerequisites: string[];
  steps: string[];
  screenshotSlots: string[];
  commonErrors: string[];
  solutions: string[];
  faq: { question: string; answer: string }[];
  sources: { label: string; url: string }[];
  sections?: TutorialSection[];
};

const requiredArticleShape = {
  screenshotSlots: ["准备环境截图", "安装命令截图", "配置完成截图", "首次运行成功截图"],
  faq: [
    { question: "这篇教程是否基于真实操作？", answer: "是。目录条目不会冒充正文；已发布文章会列出命令、验证点和来源。" },
    { question: "如果官方安装命令变化怎么办？", answer: "优先以文章内的官方来源链接为准，并在更新时修订命令。" }
  ]
};

export const tutorials: Tutorial[] = [
  {
    slug: "mac-install-codex-2026",
    title: "2026年Mac安装Codex完整教程",
    category: "Codex",
    status: "已发布",
    updatedAt: "2026-06-04",
    sourceType: "真实操作",
    excerpt: "从检查 macOS、Node.js、npm、登录方式，到启动 Codex 并完成第一次项目操作。",
    prerequisites: ["一台可联网 Mac", "终端 Terminal 或 iTerm2", "Node.js 22 或更高版本", "ChatGPT/Codex 可用账号或 OpenAI API Key", "一个 Git 项目目录"],
    steps: [
      "打开终端并运行 node --version 与 npm --version，确认 Node.js 环境可用。",
      "进入项目目录，优先确认 git status 干净，避免把无关文件交给 Codex。",
      "按 OpenAI 官方 Codex 文档选择 CLI、App 或 IDE 入口；CLI 场景需要按官方当前命令安装。",
      "首次运行 Codex 后完成账号登录或 API Key 授权。",
      "让 Codex 读取项目，执行一个只读任务，例如解释 package.json 和可用脚本。",
      "再执行一个小型修改任务，要求 Codex 修改、运行测试、报告 diff。",
      "把常用规则写入 AGENTS.md，让之后的任务稳定遵守。"
    ],
    screenshotSlots: ["node --version 输出截图", "Codex 登录成功截图", "Codex 读取项目截图", "第一次任务完成截图"],
    commonErrors: ["node: command not found", "npm 权限错误", "Codex 无法联网", "API Key 未配置", "Git 工作区混乱导致 Codex 读到无关改动"],
    solutions: [
      "Node 不存在时先安装 Node.js LTS 或使用 nvm 管理版本。",
      "npm 权限错误不要直接 sudo 全局安装；优先修复 npm 全局目录或使用 npx。",
      "联网失败时检查代理、防火墙、公司网络策略和 Codex sandbox 权限。",
      "API Key 问题先确认环境变量是否写入当前 shell，会话重开后是否仍存在。",
      "执行任务前用 git status --short 明确当前改动范围。"
    ],
    faq: [
      ...requiredArticleShape.faq,
      { question: "Mac 安装 Codex 必须会编程吗？", answer: "不必须，但必须会复制命令、看错误信息、区分项目目录和系统目录。" },
      { question: "应该用 Codex App 还是 CLI？", answer: "零基础先用 App 更直观；需要持续在项目中操作、跑测试、提交代码时使用 CLI 更合适。" }
    ],
    sources: [
      { label: "OpenAI Codex overview", url: "https://developers.openai.com/codex/overview" },
      { label: "Codex customization and AGENTS.md", url: "https://developers.openai.com/codex/concepts/customization" }
    ],
    sections: [
      {
        heading: "功能介绍",
        body: [
          "Codex 是面向软件开发的 AI 编程代理。它不是普通聊天机器人，而是可以读取项目文件、理解现有结构、生成代码补丁、运行命令、检查错误并把结果汇报给用户的开发工具。Mac 用户安装 Codex 的目标不是“装一个软件就结束”，而是建立一套从项目目录进入、明确任务、让 Codex 修改、运行验证、保存结果的完整工作流。",
          "零基础用户最容易混淆三件事：Codex 的使用入口、项目环境、账号授权。入口可以是 Codex App、CLI、IDE 或 Web；项目环境是你本机真实的文件夹；账号授权决定 Codex 是否能调用模型。安装教程必须把这三件事分开，否则后面遇到错误时不知道该检查哪里。"
        ]
      },
      {
        heading: "安装前准备",
        body: [
          "先打开终端，执行 node --version、npm --version、git --version。只要其中一个命令不存在，就不要急着安装 Codex。Node.js 是很多前端和命令行工具的运行环境；npm 用于执行或临时下载 Node 工具；Git 用于管理项目状态。Codex 参与真实项目时，Git 是最重要的安全边界，因为你可以通过 diff 看清它改了什么。",
          "准备一个空文件夹或已有 Git 项目。初学者建议先创建测试项目，不要直接在生产项目里实验。进入目录后运行 pwd 确认当前位置，再运行 git status --short。输出为空说明工作区干净；如果看到很多文件，先确认它们是不是你自己刚才改的。"
        ]
      },
      {
        heading: "详细步骤",
        body: [
          "第一步，确认 Node、npm、Git 可用。第二步，按 OpenAI 官方 Codex 文档选择入口。CLI 安装命令和登录方式可能随版本变化，因此文章不硬编码过期命令，实际安装时以官方文档页面为准。第三步，完成登录或 API Key 授权。第四步，让 Codex 做只读任务，例如“请读取这个项目，告诉我 package.json 里有哪些脚本，不要修改文件”。第五步，再让它执行最小修改，例如“新增一个 README 小节，修改后运行 npm run build，如果失败先解释原因”。",
          "当 Codex 开始要求权限时，不要盲目同意。读文件通常风险低；写文件会改变项目；联网、安装依赖、部署、删除文件、推送 GitHub 都需要明确知道后果。每次任务结束后运行 git diff 或查看 Codex 的 review 面板，确认变更符合预期。"
        ]
      },
      {
        heading: "常见错误与解决方案",
        body: [
          "如果终端提示 node: command not found，说明 Node.js 没装好或 shell 找不到路径。先安装 LTS 版本，再重开终端验证。若 npm 安装全局包提示 permission denied，不建议直接 sudo；这会把权限问题带到后续项目。更稳的做法是使用 npx、nvm 或修复 npm prefix。",
          "如果 Codex 无法联网，先区分是系统网络、公司代理、DNS、防火墙，还是 Codex sandbox 限制。真实工作中，很多失败不是 Codex 不会做，而是当前环境不允许它访问网络或写入目录。"
        ]
      }
    ]
  },
  {
    slug: "windows-install-codex-2026",
    title: "2026年Windows安装Codex完整教程",
    category: "Codex",
    status: "目录",
    updatedAt: "2026-06-04",
    sourceType: "官方文档整理",
    excerpt: "覆盖 Windows Terminal、PowerShell、Node.js、Git、登录和首次运行验证。",
    prerequisites: ["Windows 10/11", "Windows Terminal", "Node.js LTS", "Git for Windows", "Codex 可用账号"],
    steps: ["安装 Node.js LTS", "安装 Git for Windows", "配置 PowerShell 执行环境", "按官方文档安装/启动 Codex", "运行只读验证任务"],
    screenshotSlots: requiredArticleShape.screenshotSlots,
    commonErrors: ["PowerShell 执行策略限制", "PATH 未刷新", "Git Bash 与 PowerShell 路径混淆"],
    solutions: ["重开终端刷新 PATH", "统一使用 Windows Terminal", "执行任务前确认 pwd 和 git status"],
    faq: requiredArticleShape.faq,
    sources: [{ label: "OpenAI Codex", url: "https://developers.openai.com/codex/overview" }]
  },
  {
    slug: "codex-cli-config",
    title: "Codex CLI配置教程",
    category: "Codex",
    status: "目录",
    updatedAt: "2026-06-04",
    sourceType: "官方文档整理",
    excerpt: "讲清楚模型、sandbox、审批、网络、项目规则和常用命令。",
    prerequisites: ["Codex CLI 可运行", "Git 项目", "明确的测试命令"],
    steps: ["查看当前配置", "设置安全的 sandbox", "配置常用模型和审批策略", "写入 AGENTS.md", "执行验证任务"],
    screenshotSlots: requiredArticleShape.screenshotSlots,
    commonErrors: ["审批模式过宽", "网络权限不足", "配置写错位置"],
    solutions: ["先用保守权限", "把项目规则写入仓库级 AGENTS.md", "每次配置后做只读验证"],
    faq: requiredArticleShape.faq,
    sources: [{ label: "Codex configuration", url: "https://developers.openai.com/codex/config" }]
  },
  {
    slug: "agents-md-how-to-write",
    title: "AGENTS.md怎么写",
    category: "Codex",
    status: "目录",
    updatedAt: "2026-06-04",
    sourceType: "真实操作",
    excerpt: "把项目规则、测试命令、禁止事项、前端规范和提交规则写成 Codex 能执行的说明。",
    prerequisites: ["一个 Git 项目", "已知项目技术栈", "已知测试/构建命令"],
    steps: ["写明项目目标", "列出安装和测试命令", "列出不能做的事", "加入 UI/代码规范", "让 Codex 读取并复述规则"],
    screenshotSlots: requiredArticleShape.screenshotSlots,
    commonErrors: ["规则太空泛", "没有验证命令", "混入个人偏好但不说明原因"],
    solutions: ["规则写成可执行命令", "给出具体文件路径", "把安全边界写清楚"],
    faq: requiredArticleShape.faq,
    sources: [{ label: "AGENTS.md guidance", url: "https://developers.openai.com/codex/concepts/customization#agents-guidance" }]
  },
  {
    slug: "vercel-deploy-nextjs-full-process",
    title: "Vercel部署Next.js全过程",
    category: "Vercel",
    status: "已发布",
    updatedAt: "2026-06-04",
    sourceType: "真实操作",
    excerpt: "基于本站真实部署过程：本地构建、Vercel link、生产部署、生产域名、sitemap和ads.txt检测。",
    prerequisites: ["Next.js 项目", "npm install 已完成", "Vercel 账号", "可运行 npx vercel", "项目通过 npm run build"],
    steps: ["运行 npm run lint", "运行 npm run build", "执行 npx vercel link --yes", "执行 npx vercel deploy --yes --prod", "记录 production URL", "检查首页、sitemap.xml、ads.txt"],
    screenshotSlots: ["Vercel link 成功截图", "Production URL 截图", "Vercel build logs 截图", "线上首页截图"],
    commonErrors: ["项目名包含大写或空格", "没有登录 Vercel", "构建时环境变量缺失", "部署成功但 sitemap 仍是 localhost"],
    solutions: ["使用小写项目名，例如 codex-global-blog", "先 vercel link 再 deploy", "把生产 URL 写入默认配置或环境变量", "部署后用 curl 或浏览器检查线上文件"],
    faq: [
      ...requiredArticleShape.faq,
      { question: "Vercel 部署一定要先有 GitHub 吗？", answer: "不一定。CLI 可以直接部署本地目录；接入 GitHub 后更适合长期 CI/CD。" }
    ],
    sources: [
      { label: "Vercel deployments", url: "https://vercel.com/docs/deployments/overview" },
      { label: "Next.js deployment", url: "https://nextjs.org/docs/app/building-your-application/deploying" }
    ],
    sections: [
      {
        heading: "功能介绍",
        body: [
          "Vercel 是部署 Next.js 项目的常用平台。对零基础用户来说，部署不是把文件上传完就结束，而是要确认构建通过、生产域名可访问、静态页面生成正常、SEO 文件使用线上域名、广告和环境变量没有漏配。",
          "本站的真实流程是先本地运行 lint 和 build，再使用 Vercel CLI 创建/链接项目，最后执行生产部署。部署过程中遇到过项目名不合法的问题，因为本地文件夹名包含大写和空格；解决办法是使用合法的小写项目名 codex-global-blog。"
        ]
      },
      {
        heading: "详细步骤",
        body: [
          "第一步，在项目根目录运行 npm run lint。第二步，运行 npm run build。只有这两步通过，才进入部署。第三步，执行 npx vercel link --yes --project codex-global-blog，把本地目录链接到 Vercel 项目。第四步，执行 npx vercel deploy --yes --prod。成功后 CLI 会返回 Production URL 和 Inspector URL。",
          "第五步，检查生产域名。本站最终生产域名是 https://codex-global-blog.vercel.app。第六步，检查 sitemap.xml 是否输出生产域名，而不是 localhost。第七步，检查 ads.txt 是否按 AdSense client 输出 publisher 记录。"
        ]
      },
      {
        heading: "常见错误与解决方案",
        body: [
          "如果 Vercel 报 project name 不合法，通常是目录名包含空格、大写或特殊字符。不要改整个目录也可以解决，部署时指定 --project 合法项目名，或先 vercel link 到合法项目名。",
          "如果部署成功但页面仍旧旧版本，检查是否 alias 到生产域名，或者是否访问了旧 preview URL。生产部署完成后，Vercel CLI 会显示 Aliased 行。"
        ]
      }
    ]
  },
  {
    slug: "adsense-review-full-process",
    title: "AdSense审核全过程",
    category: "联盟营销",
    status: "目录",
    updatedAt: "2026-06-04",
    sourceType: "真实操作",
    excerpt: "从插入 AdSense 脚本、配置 ads.txt、隐私政策，到等待 Google 审核。",
    prerequisites: ["可访问的生产域名", "Google AdSense 账号", "隐私政策页面", "足够原创内容", "ads.txt 可访问"],
    steps: ["在 AdSense 获取 ca-pub", "把脚本加入 layout", "配置 ads.txt", "部署生产站", "在 AdSense 后台提交站点审核"],
    screenshotSlots: ["AdSense 代码截图", "ads.txt 线上访问截图", "隐私政策截图", "审核状态截图"],
    commonErrors: ["ads.txt 不匹配", "站点内容不足", "隐私政策缺失", "域名无法访问"],
    solutions: ["确认 publisher ID", "补充真实教程内容", "添加隐私与条款", "重新部署后再提交审核"],
    faq: requiredArticleShape.faq,
    sources: [
      { label: "Google AdSense site setup", url: "https://support.google.com/adsense/answer/7584263" },
      { label: "Google ads.txt", url: "https://support.google.com/adsense/answer/12171612" }
    ]
  },
  {
    slug: "openai-api-key-application",
    title: "OpenAI API Key申请全过程",
    category: "ChatGPT",
    status: "目录",
    updatedAt: "2026-06-04",
    sourceType: "官方文档整理",
    excerpt: "解释 API Key、项目、账单、环境变量和安全保存方法。",
    prerequisites: ["OpenAI 账号", "可访问 OpenAI Platform", "支付/账单设置", "本地终端"],
    steps: ["登录 Platform", "创建或选择项目", "创建 API Key", "复制后立即保存到安全位置", "写入本地环境变量", "用最小请求验证"],
    screenshotSlots: requiredArticleShape.screenshotSlots,
    commonErrors: ["Key 复制后丢失", "把 Key 提交到 GitHub", "账单未启用", "环境变量当前终端不可见"],
    solutions: ["立即保存到密码管理器", "使用 .env.local 并加入 .gitignore", "确认 billing", "重开终端或 source 配置文件"],
    faq: requiredArticleShape.faq,
    sources: [{ label: "OpenAI API keys", url: "https://platform.openai.com/api-keys" }]
  },
  {
    slug: "claude-code-install-2026",
    title: "2026年Claude Code安装教程",
    category: "Claude Code",
    status: "目录",
    updatedAt: "2026-06-04",
    sourceType: "官方文档整理",
    excerpt: "覆盖 Claude Code 安装、登录、项目目录、首次任务和安全验证。",
    prerequisites: ["Node.js 或官方要求的运行环境", "Anthropic/Claude 账号", "终端", "Git 项目"],
    steps: ["查看 Claude Code 官方安装页", "安装 CLI", "登录或配置 API", "进入项目目录", "执行只读任务", "执行小范围修改"],
    screenshotSlots: requiredArticleShape.screenshotSlots,
    commonErrors: ["权限不足", "API 配置错误", "项目目录选错", "命令版本变化"],
    solutions: ["以官方安装页为准", "先做只读验证", "每次修改后检查 git diff"],
    faq: requiredArticleShape.faq,
    sources: [{ label: "Claude Code", url: "https://www.anthropic.com/claude-code" }]
  },
  {
    slug: "mcp-what-is-mcp",
    title: "什么是MCP",
    category: "MCP",
    status: "目录",
    updatedAt: "2026-06-04",
    sourceType: "官方文档整理",
    excerpt: "解释 MCP server、tool、resource、client，以及为什么 Agent 需要 MCP。",
    prerequisites: ["了解 API 基础概念", "一个支持 MCP 的客户端", "目标服务账号"],
    steps: ["确认客户端支持 MCP", "选择官方 MCP server", "配置认证", "验证工具列表", "执行最小读操作"],
    screenshotSlots: requiredArticleShape.screenshotSlots,
    commonErrors: ["server 未启动", "认证缺失", "工具不可见", "权限过大"],
    solutions: ["先检查配置路径", "最小权限授权", "重启客户端", "查看 server 日志"],
    faq: requiredArticleShape.faq,
    sources: [{ label: "Model Context Protocol", url: "https://modelcontextprotocol.io/" }]
  },
  {
    slug: "github-connect-codex",
    title: "Github连接Codex",
    category: "Github",
    status: "目录",
    updatedAt: "2026-06-04",
    sourceType: "真实操作",
    excerpt: "GitHub remote、branch、commit、push、PR 与 Codex 工作流。",
    prerequisites: ["GitHub 账号", "Git 项目", "远程仓库", "Git 凭据或 GitHub App"],
    steps: ["检查 git remote -v", "创建或选择分支", "git add/commit", "git push", "创建 PR", "用 Codex 做 review 或修复"],
    screenshotSlots: requiredArticleShape.screenshotSlots,
    commonErrors: ["没有 remote", "推错分支", "覆盖 main", "gh 未登录"],
    solutions: ["先推独立分支", "不要在未知仓库覆盖 main", "使用 PR 审查", "明确 origin URL"],
    faq: requiredArticleShape.faq,
    sources: [{ label: "GitHub Docs", url: "https://docs.github.com/" }]
  }
];

const moreTitles: Array<[Tutorial["category"], string, string]> = [
  ["Codex", "Skills怎么安装", "安装和验证 Codex Skills 的真实流程"],
  ["Codex", "MCP怎么安装到Codex", "把 MCP server 接入 Codex 的流程"],
  ["Codex", "给Codex的终极提示词", "真实项目中可执行的任务提示词结构"],
  ["Claude Code", "Claude Code API配置", "Claude Code 与 Anthropic API 的配置检查"],
  ["Claude Code", "Claude Code收费说明", "按官方价格页理解订阅和用量"],
  ["Claude Code", "Claude Code实战案例：修复构建失败", "用真实项目构建错误做修复流程"],
  ["ChatGPT", "ChatGPT Plus购买教程", "购买前准备、地区限制和账单检查"],
  ["ChatGPT", "GPT API申请教程", "Platform 项目、账单和 API Key 申请"],
  ["ChatGPT", "Token是什么", "用真实 API 调用解释 token、上下文和费用"],
  ["ChatGPT", "API Key怎么获取", "创建、保存、轮换和撤销 API Key"],
  ["MCP", "Playwright MCP安装", "安装并验证浏览器自动化 MCP"],
  ["MCP", "Github MCP安装", "安装并验证 GitHub MCP 权限"],
  ["MCP", "Browser MCP安装", "浏览器工具 MCP 安装与最小测试"],
  ["MCP", "MCP安装踩坑记录", "server、client、权限和日志排错"],
  ["Agent", "Pi Agent安装与运行", "Pi Agent 的安装前检查和运行验证"],
  ["Agent", "OpenAI Codex Agent实战", "Codex 作为 Agent 的任务闭环"],
  ["Agent", "Cursor Agent安装与运行", "Cursor Agent 项目操作流程"],
  ["Agent", "Windsurf Agent安装与运行", "Windsurf Agent 项目操作流程"],
  ["Github", "GitHub新建仓库全过程", "从创建仓库到首次 push"],
  ["Github", "GitHub Pull Request实战", "分支、PR、review 和 merge"],
  ["Github", "GitHub Actions部署检查", "CI 安装依赖、构建和失败日志"],
  ["Vercel", "Vercel绑定Github仓库", "Git 集成和自动部署"],
  ["Vercel", "Vercel环境变量配置", "生产、预览、本地变量区别"],
  ["Vercel", "Vercel自定义域名绑定", "DNS、CNAME、HTTPS 验证"],
  ["Vercel", "Vercel部署失败排查", "构建日志和依赖错误处理"],
  ["联盟营销", "Google AdSense脚本安装", "把 AdSense 脚本加入 Next.js"],
  ["联盟营销", "ads.txt配置教程", "publisher ID 和线上验证"],
  ["联盟营销", "隐私政策怎么写", "广告站点必须公开说明的数据使用"],
  ["联盟营销", "联盟链接nofollow sponsored配置", "合规标注联盟链接"],
  ["实战案例", "本站从本地到Vercel部署记录", "基于本站真实命令记录"],
  ["实战案例", "本地Next.js项目创建全过程", "从 package.json 到 build"],
  ["实战案例", "GitHub独立分支保存项目", "不覆盖 main 的安全推送"],
  ["实战案例", "AdSense脚本接入本站记录", "ca-pub、layout 和 ads.txt"],
  ["Codex", "Codex审查代码流程", "让 Codex 找 bug、跑测试、输出风险"],
  ["Codex", "Codex调试Next.js构建失败", "真实构建日志的排查步骤"],
  ["Claude Code", "Claude Code与Codex区别", "基于安装、权限、终端工作流比较"],
  ["ChatGPT", "ChatGPT生成脚本后如何本地运行", "从代码到终端验证"],
  ["MCP", "MCP权限安全检查清单", "避免过度授权和敏感数据泄露"],
  ["Agent", "Agent部署前环境检查", "Node、Git、账号、权限和日志"],
  ["Vercel", "Vercel Cron定时任务入门", "定时运行任务的配置前提"]
];

export const tutorialCatalog: Tutorial[] = [
  ...tutorials,
  ...moreTitles.map(([category, title, excerpt], index) => ({
    slug: `${category.toLowerCase().replaceAll(" ", "-")}-${index + 1}`,
    title,
    category,
    status: "目录" as const,
    updatedAt: "2026-06-04",
    sourceType: "官方文档整理" as const,
    excerpt,
    prerequisites: ["官方账号或工具访问权限", "可联网电脑", "终端基础操作能力", "用于练习的测试项目"],
    steps: ["确认官方文档", "准备账号和环境", "安装工具", "执行最小验证", "记录错误和解决方案"],
    screenshotSlots: requiredArticleShape.screenshotSlots,
    commonErrors: ["版本变化", "权限不足", "网络或代理失败", "配置写错位置"],
    solutions: ["以官方文档为准", "使用最小权限", "保存命令输出", "先在测试项目验证"],
    faq: requiredArticleShape.faq,
    sources: [{ label: "官方文档待核验", url: "https://docs.github.com/" }]
  }))
].slice(0, 50);

export function getPublishedTutorials() {
  return tutorialCatalog.filter((article) => article.status === "已发布");
}

export function getTutorialsByCategory() {
  return tutorialCatalog.reduce<Record<Tutorial["category"], Tutorial[]>>((acc, article) => {
    acc[article.category] = acc[article.category] || [];
    acc[article.category].push(article);
    return acc;
  }, {} as Record<Tutorial["category"], Tutorial[]>);
}
