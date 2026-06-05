import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, ListChecks, Search } from "lucide-react";
import { AdUnit } from "@/components/AdUnit";
import { ArticleCard } from "@/components/ArticleCard";
import { Sidebar } from "@/components/Sidebar";
import { getLatestTutorials, getPopularTutorials, getTutorialsByCategory, tutorialCatalog } from "@/content/tutorials";
import { getContentStats } from "@/lib/site";

const goals = ["AI工具安装", "MCP配置", "Agent部署", "API申请", "Vercel部署", "Github管理"];

export default function HomePage() {
  const stats = getContentStats();
  const latestTutorials = getLatestTutorials();
  const popularTutorials = getPopularTutorials();
  const byCategory = getTutorialsByCategory();
  const latestUpdates = tutorialCatalog.slice(-6).reverse();

  return (
    <div className="home-layout">
      <div>
        <section className="knowledge-hero" aria-label="知识库首页">
          <div>
            <div className="eyebrow">
              <span>100篇目录</span>
              <span>零基础</span>
              <span>真实操作</span>
            </div>
            <h1>AI Agent 实战知识库</h1>
            <p>
              专注 Codex、Claude Code、ChatGPT、MCP、Github、Vercel、Cursor、Windsurf、Agent 和实战案例。当前先发布 100 篇真实教程目录，审核通过后逐篇补充图文正文。
            </p>
            <div className="hero-actions">
              <Link href="/tutorials" className="contact-button">
                <BookOpen size={18} aria-hidden="true" />
                查看教程目录
              </Link>
              <Link href="/tutorials" className="icon-link">
                <Search size={18} aria-hidden="true" />
                全站搜索
              </Link>
            </div>
          </div>
          <div className="stats-panel" aria-label="站点数据">
            <div className="stat-tile">
              <strong>{stats.tutorials}</strong>
              <span>待审核教程目录</span>
            </div>
            <div className="stat-tile">
              <strong>10</strong>
              <span>一级导航分类</span>
            </div>
            <div className="stat-tile">
              <strong>{stats.languages}</strong>
              <span>语言路径预留</span>
            </div>
          </div>
        </section>

        <AdUnit placement="home-leaderboard" variant="leaderboard" label="首页广告" />

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>最新教程</h2>
              <p>只展示目录，不把未写完的内容包装成正文。</p>
            </div>
            <Link href="/tutorials" className="source-link">
              全部目录
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="article-grid">
            {latestTutorials.slice(0, 4).map((tutorial) => (
              <ArticleCard key={tutorial.slug} tutorial={tutorial} compact />
            ))}
          </div>
        </section>

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>热门教程</h2>
              <p>优先展示新手最常用的安装、API、部署和 Agent 入门目录。</p>
            </div>
          </div>
          <div className="resource-strip">
            {popularTutorials.slice(0, 6).map((tutorial) => (
              <Link key={tutorial.slug} href={`/tutorials?category=${encodeURIComponent(tutorial.category)}&page=1#${tutorial.slug}`} className="resource-pill">
                <span>{tutorial.category} / {tutorial.difficulty}</span>
                <strong>{tutorial.title}</strong>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>最新更新</h2>
              <p>目录更新时间和审核状态集中展示，方便后续逐篇补正文。</p>
            </div>
          </div>
          <div className="update-list">
            {latestUpdates.map((tutorial) => (
              <Link key={tutorial.slug} href={`/tutorials?category=${encodeURIComponent(tutorial.category)}&page=1#${tutorial.slug}`} className="update-row">
                <Clock3 size={17} aria-hidden="true" />
                <span>{tutorial.updatedAt}</span>
                <strong>{tutorial.title}</strong>
                <em>{tutorial.status}</em>
              </Link>
            ))}
          </div>
        </section>

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>工具分类</h2>
              <p>10 个一级导航，每类 10 篇目录。</p>
            </div>
          </div>
          <div className="category-grid">
            {Object.entries(byCategory).map(([category, articles]) => (
              <Link key={category} href={`/tutorials?category=${encodeURIComponent(category)}&page=1`} className="category-card">
                <div>
                  <span>{articles.length} 篇目录</span>
                  <h3>{category}</h3>
                </div>
                <ListChecks size={22} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>真实教程标准</h2>
              <p>目录审核通过后，每篇正文必须补齐这些栏目。</p>
            </div>
          </div>
          <div className="check-grid">
            {goals.map((item) => (
              <div key={item} className="check-item">
                <ListChecks size={18} aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
      <Sidebar />
    </div>
  );
}
