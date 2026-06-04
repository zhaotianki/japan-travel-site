import type { Metadata } from "next";
import { AdUnit } from "@/components/AdUnit";
import { Sidebar } from "@/components/Sidebar";
import { getTutorialsByCategory, tutorialCatalog } from "@/content/tutorials";

export const metadata: Metadata = {
  title: "50篇真实操作教程目录",
  description: "AI工具安装、插件安装、MCP配置、Agent部署、API申请、Vercel部署和Github管理教程目录。"
};

export default function TutorialsPage() {
  const byCategory = getTutorialsByCategory();

  return (
    <div className="content-layout">
      <div>
        <header className="page-header">
          <div className="eyebrow">
            <span>50篇目录</span>
            <span>真实操作</span>
            <span>逐篇补正文</span>
          </div>
          <h1>AI实战安装教程目录</h1>
          <p>本页先生成 50 篇文章目录。状态为“目录”的条目只代表写作计划；状态为“已发布”的文章包含真实操作正文，不使用虚构案例。</p>
        </header>
        <AdUnit placement="content-top" variant="leaderboard" label="教程页广告" />
        {Object.entries(byCategory).map(([category, articles]) => (
          <section key={category} className="section-band tutorial-detail" id={category}>
            <div className="section-heading">
              <div>
                <h2>{category}</h2>
                <p>{articles.length} 篇教程目录</p>
              </div>
            </div>
            <div className="tutorial-list">
              {articles.map((article) => (
                <article key={article.slug} className="knowledge-card" id={article.slug}>
                  <div className="meta-row">
                    <span>{article.status}</span>
                    <span>{article.sourceType}</span>
                    <span>{article.updatedAt}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.excerpt}</p>
                  <div className="knowledge-columns">
                    <section>
                      <h4>安装前准备</h4>
                      <ul className="plain-list">
                        {article.prerequisites.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h4>详细步骤</h4>
                      <ol className="step-list">
                        {article.steps.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    </section>
                  </div>
                  {article.sections ? (
                    <div className="article-full">
                      {article.sections.map((section) => (
                        <section key={section.heading}>
                          <h4>{section.heading}</h4>
                          {section.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </section>
                      ))}
                    </div>
                  ) : null}
                  <div className="knowledge-columns">
                    <section>
                      <h4>截图位置预留</h4>
                      <ul className="plain-list">
                        {article.screenshotSlots.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h4>常见错误</h4>
                      <ul className="plain-list">
                        {article.commonErrors.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h4>解决方案</h4>
                      <ul className="plain-list">
                        {article.solutions.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                    <section>
                      <h4>FAQ</h4>
                      {article.faq.map((item) => (
                        <p key={item.question}>
                          <strong>{item.question}</strong>
                          <br />
                          {item.answer}
                        </p>
                      ))}
                    </section>
                  </div>
                  <div className="source-list">
                    {article.sources.map((source) => (
                      <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                        {source.label}
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
        <p className="small-note">当前目录数：{tutorialCatalog.length}。后续只在完成真实操作验证后，把目录条目升级为“已发布”。</p>
      </div>
      <Sidebar />
    </div>
  );
}
