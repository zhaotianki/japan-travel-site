import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2, ListChecks } from "lucide-react";
import { AdUnit } from "@/components/AdUnit";
import { ArticleCard } from "@/components/ArticleCard";
import { Sidebar } from "@/components/Sidebar";
import { tutorialCatalog, getPublishedTutorials, getTutorialsByCategory, getTutorialVisual } from "@/content/tutorials";
import { getContentStats } from "@/lib/site";

const goals = ["AI工具安装", "AI插件安装", "MCP配置", "Agent部署", "API申请", "Vercel部署", "Github管理"];

export default function HomePage() {
  const stats = getContentStats();
  const published = getPublishedTutorials();
  const byCategory = getTutorialsByCategory();
  const lead = published[0] ?? tutorialCatalog[0];
  const leadVisual = getTutorialVisual(lead);

  return (
    <div className="home-layout">
      <div>
        <section className="hero-feed" aria-label="知识库首页">
          <article className="lead-story">
            <Image src={leadVisual.src} alt={leadVisual.alt} width={1280} height={720} priority />
            <div className="lead-story-body">
              <div className="eyebrow">
                <span>真实操作</span>
                <span>安装部署</span>
                <span>Agent知识库</span>
              </div>
              <h1>AI实战安装教程与Agent知识库</h1>
              <p>帮助零基础用户完成 AI 工具安装、插件安装、MCP 配置、Agent 部署、API 申请、Vercel 部署和 Github 管理。目录可以先发布；正文必须来自可复现操作流程。</p>
              <Link href="/tutorials" className="contact-button">
                <BookOpen size={18} aria-hidden="true" />
                查看50篇目录
              </Link>
            </div>
          </article>
          <div className="stats-panel" aria-label="站点数据">
            <div className="stat-tile">
              <strong>{stats.tutorials}</strong>
              <span>已生成教程目录</span>
            </div>
            <div className="stat-tile">
              <strong>{stats.published}</strong>
              <span>已发布真实操作正文</span>
            </div>
            <div className="stat-tile">
              <strong>{stats.targetTutorials}</strong>
              <span>目标从安装到跑起来教程</span>
            </div>
            <div className="stat-tile">
              <strong>7</strong>
              <span>零基础核心目标</span>
            </div>
          </div>
        </section>

        <AdUnit placement="home-leaderboard" variant="leaderboard" label="首页广告" />

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>零基础目标</h2>
              <p>每个目标都拆成准备、安装、验证、错误处理和 FAQ，不发布无法复现的故事。</p>
            </div>
          </div>
          <div className="resource-strip">
            {goals.map((goal) => (
              <div key={goal} className="resource-pill">
                <span>目标</span>
                <strong>{goal}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>已发布真实操作正文</h2>
              <p>这些文章已经包含功能介绍、准备、步骤、截图位、常见错误、解决方案和 FAQ。</p>
            </div>
            <Link href="/tutorials" className="source-link">
              全部教程
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="article-grid">
            {published.map((tutorial) => (
              <ArticleCard key={tutorial.slug} tutorial={tutorial} compact={tutorial.slug !== lead.slug} />
            ))}
          </div>
        </section>

        <section className="section-band">
          <div className="section-heading">
            <div>
              <h2>专区目录</h2>
              <p>先生成 50 篇目录，再逐篇补充 2000 字以上真实操作正文。</p>
            </div>
          </div>
          <div className="category-grid">
            {Object.entries(byCategory).map(([category, articles]) => (
              <Link key={category} href={`/tutorials#${category}`} className="category-card">
                <div>
                  <span>{articles.length} 篇</span>
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
              <h2>正文硬性结构</h2>
              <p>任何发布为正文的文章都必须满足这些栏目，目录条目不会伪装成已完成教程。</p>
            </div>
          </div>
          <div className="check-grid">
            {["功能介绍", "安装前准备", "详细步骤", "截图位置预留", "常见错误", "解决方案", "FAQ"].map((item) => (
              <div key={item} className="check-item">
                <CheckCircle2 size={18} aria-hidden="true" />
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
