export type AiCodingTool = {
  slug: string;
  name: string;
  company: string;
  bestFor: string;
  strengths: string[];
  weaknesses: string[];
  practicalUse: string;
  audience: string;
  pricingNote: string;
  sourceUrl: string;
};

export const aiCodingTools: AiCodingTool[] = [
  {
    slug: "codex",
    name: "Codex",
    company: "OpenAI",
    bestFor: "软件开发代理、代码审查、调试、自动化任务和多工具工作流",
    strengths: ["能读仓库并按现有结构改代码", "支持 CLI、App、IDE、Web 等多个表面", "适合测试、审查和自动化闭环"],
    weaknesses: ["高质量使用依赖清晰提示和测试命令", "联网、文件写入和外部工具需要权限控制", "自动发布内容时必须做来源和合规校验"],
    practicalUse: "让 Codex 读项目、提出改动、应用补丁、运行测试，再用浏览器验证前端。",
    audience: "个人开发者、创业者、工程团队、希望自动化重复软件任务的人",
    pricingNote: "以 OpenAI 当前计划和 API 定价为准。",
    sourceUrl: "https://developers.openai.com/codex/overview"
  },
  {
    slug: "claude-code",
    name: "Claude Code",
    company: "Anthropic",
    bestFor: "终端中的长上下文代码阅读、重构和代理式开发",
    strengths: ["适合复杂代码库问答", "终端工作流直接", "长文档和代码分析口碑强"],
    weaknesses: ["不同计划和地区可用性会变化", "与 OpenAI/Codex 工作流不是完全同一套权限模型", "仍需要人工验证生成代码"],
    practicalUse: "在终端中交给它一个明确开发任务，让它读取文件、解释方案并生成变更。",
    audience: "重度终端用户、后端工程师、需要大量阅读代码的团队",
    pricingNote: "以 Anthropic 官方价格和订阅页为准。",
    sourceUrl: "https://www.anthropic.com/claude-code"
  },
  {
    slug: "cursor",
    name: "Cursor",
    company: "Anysphere",
    bestFor: "AI-first 代码编辑器、代码库问答、多文件编辑",
    strengths: ["编辑器体验紧凑", "适合边写边问", "对个人开发和原型制作友好"],
    weaknesses: ["深度自动化仍需要外部 CI/脚本配合", "复杂任务容易受上下文选择影响", "团队治理能力取决于工作区配置"],
    practicalUse: "在编辑器内让 AI 解释代码、生成组件、批量修改文件并人工 review diff。",
    audience: "前端开发者、独立开发者、需要快速迭代产品的人",
    pricingNote: "以 Cursor 官方价格为准。",
    sourceUrl: "https://www.cursor.com/"
  },
  {
    slug: "github-copilot",
    name: "GitHub Copilot",
    company: "GitHub / Microsoft",
    bestFor: "IDE 补全、代码建议、GitHub 生态和企业采用",
    strengths: ["IDE 覆盖广", "GitHub 生态集成强", "企业管理和采用路径成熟"],
    weaknesses: ["代理式长任务体验依赖具体环境", "复杂产品判断仍需要开发者主导", "生成建议必须经过审查"],
    practicalUse: "用作日常补全、PR 辅助、代码解释和团队标准化编码助手。",
    audience: "企业开发团队、GitHub 用户、需要稳定补全体验的工程师",
    pricingNote: "以 GitHub Copilot 官方价格为准。",
    sourceUrl: "https://github.com/features/copilot"
  },
  {
    slug: "windsurf",
    name: "Windsurf",
    company: "Codeium",
    bestFor: "AI IDE、上下文感知代码生成和多步骤编辑",
    strengths: ["IDE 内代理体验完整", "适合应用开发和快速修改", "强调上下文驱动开发"],
    weaknesses: ["团队迁移成本取决于现有编辑器习惯", "复杂任务仍需要测试闭环", "不同模型能力和价格会变化"],
    practicalUse: "把产品需求直接交给 IDE 代理，让它生成页面、组件和修复建议。",
    audience: "前端团队、全栈开发者、习惯 AI IDE 的个人开发者",
    pricingNote: "以 Windsurf 官方价格为准。",
    sourceUrl: "https://windsurf.com/"
  }
];
