import type { Metadata } from "next";
import { Clapperboard, FileText, Image as ImageIcon, PlayCircle } from "lucide-react";
import { AdUnit } from "@/components/AdUnit";
import { Sidebar } from "@/components/Sidebar";
import { learningResources } from "@/content/resources";

export const metadata: Metadata = {
  title: "教学资源库",
  description: "Codex 教学视频脚本、文档模板、截图流程和练习任务。"
};

const resourceIcons = {
  视频脚本: Clapperboard,
  文档模板: FileText,
  截图流程: ImageIcon,
  练习任务: PlayCircle
};

export default function ResourcesPage() {
  return (
    <div className="content-layout">
      <div>
        <header className="page-header">
          <div className="eyebrow">
            <span>视频</span>
            <span>文档</span>
            <span>截图</span>
            <span>练习</span>
          </div>
          <h1>Codex 教学资源库</h1>
          <p>把“看懂 Codex”变成可复制的学习资产：录屏脚本、文档模板、截图验收流程和实战练习。</p>
        </header>
        <AdUnit placement="content-top" variant="leaderboard" label="资源库顶部广告" />
        <div className="resource-grid">
          {learningResources.map((resource) => {
            const Icon = resourceIcons[resource.type];

            return (
              <article key={resource.slug} className="resource-card" id={resource.slug}>
                <div className="resource-card-header">
                  <span>
                    <Icon size={18} aria-hidden="true" />
                    {resource.type}
                  </span>
                  <h2>{resource.title}</h2>
                  <p>{resource.summary}</p>
                </div>
                <section>
                  <h3>适合人群</h3>
                  <p>{resource.audience}</p>
                </section>
                <section>
                  <h3>交付物</h3>
                  <ul className="check-list">
                    {resource.deliverables.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3>制作流程</h3>
                  <ol className="step-list">
                    {resource.workflow.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </section>
                <section className="prompt-box">
                  <h3>可直接给 Codex 的提示词</h3>
                  <p>{resource.prompt}</p>
                </section>
              </article>
            );
          })}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
