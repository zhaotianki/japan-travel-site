export type LearningResource = {
  slug: string;
  type: "视频脚本" | "文档模板" | "截图流程" | "练习任务";
  title: string;
  summary: string;
  audience: string;
  deliverables: string[];
  workflow: string[];
  prompt: string;
};

export const learningResources: LearningResource[] = [
  {
    slug: "codex-first-project-video",
    type: "视频脚本",
    title: "10分钟视频：让 Codex 从零生成一个博客首页",
    summary: "适合新手的短视频结构，讲清楚提示词、权限确认、运行测试和浏览器验证。",
    audience: "第一次接触 Codex 的个人开发者和内容创作者",
    deliverables: ["分镜脚本", "旁白文案", "屏幕录制清单", "片尾行动引导"],
    workflow: ["展示空项目", "输入明确目标", "让 Codex 创建页面", "运行 build", "打开浏览器检查布局"],
    prompt: "请把这个任务拆成适合录屏教学的步骤：目标、提示词、Codex 行动、验证命令、常见错误。"
  },
  {
    slug: "agents-md-doc-template",
    type: "文档模板",
    title: "AGENTS.md 团队规范模板",
    summary: "把项目规则、测试命令、设计要求、权限边界写成 Codex 能长期遵守的仓库说明。",
    audience: "团队负责人、技术负责人、需要让 Codex 稳定参与项目的人",
    deliverables: ["仓库规则模板", "验证命令模板", "前端设计约束", "安全权限说明"],
    workflow: ["列出项目技术栈", "写清楚禁止事项", "加入测试命令", "让 Codex 读取并遵守"],
    prompt: "请根据这个项目生成 AGENTS.md，包含代码风格、测试命令、前端设计要求和不能修改的范围。"
  },
  {
    slug: "browser-screenshot-checklist",
    type: "截图流程",
    title: "前端截图验收：桌面、移动端、广告位和控制台",
    summary: "用截图和 DOM 检查验证页面是否空白、重叠、溢出、广告占位异常或控制台报错。",
    audience: "前端开发者、博客站长、需要交付可视化网页的人",
    deliverables: ["桌面截图", "移动端截图", "控制台错误记录", "布局溢出检查"],
    workflow: ["启动 dev server", "打开首页", "检查主导航", "检查广告占位", "读取 console error", "保存截图"],
    prompt: "请打开本地网站，分别检查首页、案例页和工具页，保存截图并报告控制台错误和布局溢出。"
  },
  {
    slug: "installation-troubleshooting-log",
    type: "练习任务",
    title: "安装排错记录：把一次真实错误整理成教程素材",
    summary: "记录系统版本、工具版本、命令、报错、截图位置和最终解决方案，避免凭记忆写教程。",
    audience: "正在整理 AI 工具安装教程、MCP 配置教程和部署教程的作者",
    deliverables: ["系统版本", "命令记录", "错误信息", "截图位置", "解决方案"],
    workflow: ["记录环境", "复制命令", "保存报错", "验证修复", "整理 FAQ"],
    prompt: "请根据这次真实安装错误整理教程素材，必须包含环境、命令、错误、截图位置、解决方案和 FAQ。"
  }
];
