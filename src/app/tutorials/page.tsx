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
                <article key={article.slug} className="knowledge-card" id={article.slug}>
                  <figure className="tutorial-visual">
                    <Image src={visual.src} alt={visual.alt} width={1280} height={720} loading="lazy" />
                    <figcaption>{visual.caption}</figcaption>
                  </figure>
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
