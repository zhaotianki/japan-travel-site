import type { Metadata } from "next";
import { AdUnit } from "@/components/AdUnit";
import { CaseList } from "@/components/CaseList";
import { Sidebar } from "@/components/Sidebar";
import cases from "@/content/cases.json";
import { getCasesByTool, getContentStats } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI 编程成功案例库",
  description: "收录 Codex、Claude Code、Cursor、GitHub Copilot、Windsurf 等 AI 编程工具成功案例。"
};

export default function CasesPage() {
  const stats = getContentStats();
  const byTool = getCasesByTool();

  return (
    <div className="content-layout">
      <div>
        <header className="page-header">
          <div className="eyebrow">
            <span>目标 100 篇</span>
            <span>自动更新</span>
            <span>来源保留</span>
          </div>
          <h1>AI 编程成功案例库</h1>
          <p>
            当前收录 {stats.cases} 篇，目标 {stats.targetCases} 篇。自动更新脚本会从公开来源补充案例，所有自动生成内容都保留来源、更新时间和 AI 辅助整理标识。
          </p>
        </header>
        <AdUnit placement="content-top" variant="leaderboard" label="案例页顶部广告" />
        <section className="section-band">
          <div className="article-grid">
            {Object.entries(byTool).map(([tool, count]) => (
              <div className="stat-tile" key={tool}>
                <strong>{count}</strong>
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </section>
        <AdUnit placement="content-inline" variant="inline" label="案例页信息流广告" />
        <CaseList cases={cases} />
      </div>
      <Sidebar />
    </div>
  );
}
