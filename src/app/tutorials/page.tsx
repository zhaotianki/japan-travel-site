import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdUnit } from "@/components/AdUnit";
import { Sidebar } from "@/components/Sidebar";
import { getTutorialsByCategory, getTutorialVisual, tutorialCatalog, tutorialCategories, tutorialPageSize } from "@/content/tutorials";

export const metadata: Metadata = {
  title: "AI完整教程首页",
  description: "AI工具安装、插件安装、MCP配置、Agent部署、API申请、Vercel部署、Github管理、相关插件、联盟营销和实战案例教程目录。"
};

type TutorialsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getCommandExample(category: string) {
  const examples: Record<string, string[]> = {
    Codex: ["node --version", "npm --version", "git status --short", "codex"],
    "Claude Code": ["node --version", "git status --short", "claude"],
    ChatGPT: ["echo $OPENAI_API_KEY", "curl https://api.openai.com/v1/models"],
    MCP: ["node --version", "npx @modelcontextprotocol/inspector"],
    Agent: ["git status --short", "npm run build"],
    Github: ["git remote -v", "git status --short", "git push origin HEAD"],
    Vercel: ["npm run build", "npx vercel deploy --prod"],
    相关插件: ["code --list-extensions", "code --install-extension <publisher.extension>"],
    联盟营销: ["curl https://your-domain.com/ads.txt"],
    实战案例: ["npm run lint", "npm run build", "git diff --stat"]
  };

  return examples[category] ?? ["确认版本", "执行最小验证", "保存日志"];
}

export default async function TutorialsPage({ searchParams }: TutorialsPageProps) {
  const params = (await searchParams) ?? {};
  const byCategory = getTutorialsByCategory();
  const requestedCategory = getParam(params.category);
  const selectedCategory = tutorialCategories.includes(requestedCategory as (typeof tutorialCategories)[number])
    ? (requestedCategory as (typeof tutorialCategories)[number])
    : tutorialCategories[0];
  const selectedArticles = byCategory[selectedCategory] ?? [];
  const totalPages = Math.max(1, Math.ceil(selectedArticles.length / tutorialPageSize));
  const requestedPage = Number.parseInt(getParam(params.page) ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;
  const pageArticles = selectedArticles.slice((currentPage - 1) * tutorialPageSize, currentPage * tutorialPageSize);

  return (
    <div className="content-layout">
      <div>
        <header className="page-header">
          <div className="eyebrow">
            <span>10个专区</span>
            <span>每区50篇</span>
            <span>每页10篇</span>
          </div>
          <h1>AI完整教程首页</h1>
          <p>下方导航包含 Codex、Claude Code、ChatGPT、MCP、Agent、Github、Vercel、相关插件、联盟营销和实战案例。每个专区 50 篇文章，每篇文章都有图片、准备、步骤、截图位、常见错误、解决方案和 FAQ。</p>
        </header>
        <AdUnit placement="content-top" variant="leaderboard" label="教程页广告" />
        <nav className="category-nav" aria-label="教程分类导航">
          {tutorialCategories.map((category) => (
            <Link
              key={category}
              href={`/tutorials?category=${encodeURIComponent(category)}&page=1`}
              className={category === selectedCategory ? "active" : undefined}
            >
              <span>{category}</span>
              <strong>{byCategory[category]?.length ?? 0}</strong>
            </Link>
          ))}
        </nav>
        <section className="section-band tutorial-detail" id={selectedCategory}>
          <div className="section-heading">
            <div>
              <h2>{selectedCategory}</h2>
              <p>
                共 {selectedArticles.length} 篇，当前第 {currentPage} / {totalPages} 页，每页 {tutorialPageSize} 篇。
              </p>
            </div>
          </div>
          <div className="tutorial-list">
            {pageArticles.map((article) => {
              const visual = getTutorialVisual(article);

              return (
                <article key={article.slug} className="knowledge-card docs-article" id={article.slug}>
                  <div className="docs-layout">
                    <aside className="docs-mini-nav" aria-label={`${article.title} 文章目录`}>
                      <a href={`#${article.slug}`}>Overview</a>
                      <a href={`#${article.slug}-prepare`}>准备</a>
                      <a href={`#${article.slug}-steps`}>步骤</a>
                      <a href={`#${article.slug}-commands`}>命令</a>
                      <a href={`#${article.slug}-errors`}>排错</a>
                      <a href={`#${article.slug}-faq`}>FAQ</a>
                    </aside>
                    <div>
                      <div className="docs-topline">
                        <div className="meta-row">
                          <span>{article.status}</span>
                          <span>{article.sourceType}</span>
                          <span>{article.updatedAt}</span>
                        </div>
                        <a className="copy-page-link" href={`#${article.slug}`}>
                          Copy page
                        </a>
                      </div>
                      <h3>{article.title}</h3>
                      <p className="docs-lead">{article.excerpt}</p>
                      <figure className="tutorial-visual">
                        <Image src={visual.src} alt={visual.alt} width={1280} height={720} loading="lazy" />
                        <figcaption>{visual.caption}</figcaption>
                      </figure>
                      <div className="docs-callout info">
                        <strong>Documentation rule</strong>
                        <p>本文按 Quickstart 文档格式整理：先准备环境，再按步骤执行，最后检查命令输出、截图、错误和 FAQ。</p>
                      </div>
                      <section id={`${article.slug}-prepare`}>
                        <h4>安装前准备</h4>
                        <div className="doc-check-grid">
                          {article.prerequisites.map((item) => (
                            <div key={item} className="doc-check-item">
                              {item}
                            </div>
                          ))}
                        </div>
                      </section>
                      <section id={`${article.slug}-steps`}>
                        <h4>Quickstart steps</h4>
                        <div className="doc-step-list">
                          {article.steps.map((item, index) => (
                            <section key={item} className="doc-step">
                              <span>{index + 1}</span>
                              <div>
                                <h5>{item}</h5>
                                <p>完成后记录截图位置和验证结果；如果失败，保留完整错误文本，不要只保存最后一行。</p>
                              </div>
                            </section>
                          ))}
                        </div>
                      </section>
                      <section id={`${article.slug}-commands`}>
                        <h4>命令与验证</h4>
                        <pre className="command-block">
                          <code>{getCommandExample(article.category).join("\n")}</code>
                        </pre>
                        <div className="docs-table" role="table" aria-label="验证项目">
                          <div role="row">
                            <strong role="cell">检查项</strong>
                            <strong role="cell">通过标准</strong>
                          </div>
                          <div role="row">
                            <span role="cell">版本</span>
                            <span role="cell">能输出当前版本或登录状态</span>
                          </div>
                          <div role="row">
                            <span role="cell">权限</span>
                            <span role="cell">只授予完成教程所需的最小权限</span>
                          </div>
                          <div role="row">
                            <span role="cell">结果</span>
                            <span role="cell">有截图、日志或线上 URL 可以复查</span>
                          </div>
                        </div>
                      </section>
                    </div>
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
                  <div className="docs-bottom-grid">
                    <section>
                      <h4>截图位置预留</h4>
                      <ul className="plain-list">
                        {article.screenshotSlots.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </section>
                    <section id={`${article.slug}-errors`}>
                      <h4>常见错误</h4>
                      <div className="docs-callout warning">
                        <strong>WARNING</strong>
                        <p>如果遇到下面错误，先保存完整命令输出，再按解决方案逐项排查。</p>
                      </div>
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
                    <section id={`${article.slug}-faq`}>
                      <h4>FAQ</h4>
                      {article.faq.map((item) => (
                        <details key={item.question} className="docs-faq">
                          <summary>{item.question}</summary>
                          <p>{item.answer}</p>
                        </details>
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
              );
            })}
          </div>
          <nav className="pagination" aria-label={`${selectedCategory} 分页`}>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <Link
                key={page}
                href={`/tutorials?category=${encodeURIComponent(selectedCategory)}&page=${page}`}
                className={page === currentPage ? "active" : undefined}
              >
                {page}
              </Link>
            ))}
          </nav>
        </section>
        <p className="small-note">当前目录总数：{tutorialCatalog.length}。目录条目会继续逐篇补成 2000 字以上真实操作正文。</p>
      </div>
      <Sidebar />
    </div>
  );
}
