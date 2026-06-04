import type { Metadata } from "next";
import { AdUnit } from "@/components/AdUnit";
import { Sidebar } from "@/components/Sidebar";
import { ToolComparison } from "@/components/ToolComparison";

export const metadata: Metadata = {
  title: "AI 编程工具优缺点对比",
  description: "Codex、Claude Code、Cursor、GitHub Copilot、Windsurf 的优点、缺点、实用性和适合人群。"
};

export default function AiToolsPage() {
  return (
    <div className="content-layout">
      <div>
        <header className="page-header">
          <div className="eyebrow">
            <span>AI 编程工具</span>
            <span>优缺点</span>
            <span>实用性</span>
          </div>
          <h1>AI 编程工具总结</h1>
          <p>首版只比较开发类 AI 工具，帮助读者根据任务类型选择 Codex、Claude Code、Cursor、Copilot 或 Windsurf。</p>
        </header>
        <AdUnit placement="content-top" variant="leaderboard" label="AI工具页顶部广告" />
        <ToolComparison />
      </div>
      <Sidebar />
    </div>
  );
}
