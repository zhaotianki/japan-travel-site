import type { Metadata } from "next";
import { AdUnit } from "@/components/AdUnit";
import { ArticleCard } from "@/components/ArticleCard";
import { Sidebar } from "@/components/Sidebar";
import { tutorials } from "@/content/tutorials";

export const metadata: Metadata = {
  title: "Codex 教程",
  description: "Codex 入门、CLI、App、IDE、自动化、AGENTS.md、Skills、MCP 和集成教学。"
};

export default function TutorialsPage() {
  return (
    <div className="content-layout">
      <div>
        <header className="page-header">
          <div className="eyebrow">
            <span>Codex</span>
            <span>教程中心</span>
            <span>中文主站</span>
          </div>
          <h1>Codex 教程：从基础到可持续自动化</h1>
          <p>每篇教程都围绕一个真实工作流：输入目标、读取上下文、生成变更、验证结果、沉淀规则。</p>
        </header>
        <AdUnit placement="content-top" variant="leaderboard" label="教程页顶部广告" />
        <div className="tutorial-list">
          {tutorials.map((tutorial) => (
            <section key={tutorial.slug} className="tutorial-detail" id={tutorial.slug}>
              <ArticleCard tutorial={tutorial} />
              <ul className="lesson-list">
                {tutorial.lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
              <div className="source-list">
                {tutorial.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
