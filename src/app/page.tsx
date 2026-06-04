import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clapperboard, Globe2, Newspaper } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { AdUnit } from "@/components/AdUnit";
import { CaseList } from "@/components/CaseList";
import { Sidebar } from "@/components/Sidebar";
import { ToolComparison } from "@/components/ToolComparison";
import { learningResources } from "@/content/resources";
import { getContentStats, getFeaturedTutorials, getLatestCases } from "@/lib/site";

export default function HomePage() {
  const stats = getContentStats();
  const featuredTutorials = getFeaturedTutorials();
  const latestCases = getLatestCases();
  const lead = featuredTutorials[0];

  return (
    <div className="home-layout">
      <div>
        <section className="hero-feed" aria-label="精选内容">
          <article className="lead-story">
            <Image src={lead.image} alt="" width={960} height={540} priority />
            <div className="lead-story-body">
              <div className="eyebrow">
                <span>中文主站</span>
                <span>Codex 教程</span>
                <span>AI 编程</span>
              </div>
              <h1>{lead.title}</h1>
              <p>{lead.excerpt}</p>
              <Link href="/tutorials" className="contact-button">
                <BookOpen size={18} aria-hidden="true" />
                阅读教程
              </Link>
            </div>
          </article>
          <div className="stats-panel" aria-label="站点数据">
            <div className="stat-tile">
              <strong>{stats.tutorials}</strong>
              <span>首版教程模块</span>
            </div>
            <div className="stat-tile">
              <strong>
                {stats.cases}/{stats.targetCases}
              </strong>
              <span>AI 编程案例目标</span>
            </div>
            <div className="stat-tile">
              <strong>{stats.tools}</strong>
              <span>AI 编程工具对比</span>
            </div>
            <div className="stat-tile">
              <strong>周一三五</strong>
              <span>自动更新节奏</span>
            </div>
          </div>
        </section>

        <AdUnit placement="home-leaderboard" variant="leaderboard" label="首页横幅广告" />

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>热门教程</h2>
              <p>从 Codex 基础到自动化、MCP、Skills 和浏览器验证，按真实工作流组织。</p>
            </div>
            <Link href="/tutorials" className="source-link">
              全部教程
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="article-grid">
            {featuredTutorials.map((tutorial) => (
              <ArticleCard key={tutorial.slug} tutorial={tutorial} compact={tutorial.slug !== lead.slug} />
            ))}
          </div>
        </section>

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>教学资源库</h2>
              <p>给视频、文档、截图和练习任务准备可直接复用的脚本与提示词。</p>
            </div>
            <Link href="/resources" className="source-link">
              查看资源
              <Clapperboard size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="resource-strip">
            {learningResources.map((resource) => (
              <Link key={resource.slug} href={`/resources#${resource.slug}`} className="resource-pill">
                <span>{resource.type}</span>
                <strong>{resource.title}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>最新成功案例</h2>
              <p>案例库扩展到 Codex、Claude Code、Cursor、Copilot、Windsurf 等 AI 编程工具，并保留来源。</p>
            </div>
            <Link href="/cases" className="source-link">
              案例库
              <Newspaper size={16} aria-hidden="true" />
            </Link>
          </div>
          <CaseList cases={latestCases.slice(0, 4)} />
        </section>

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>AI 编程工具总结</h2>
              <p>只覆盖开发类 AI：看优点、缺点、实用性、适合人群和官方来源。</p>
            </div>
            <Link href="/ai-tools" className="source-link">
              工具对比
              <Globe2 size={16} aria-hidden="true" />
            </Link>
          </div>
          <ToolComparison />
        </section>
      </div>
      <Sidebar />
    </div>
  );
}
