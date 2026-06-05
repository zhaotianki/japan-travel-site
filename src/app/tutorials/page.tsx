import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdUnit } from "@/components/AdUnit";
import {
  getTutorialUrl,
  getTutorialVisual,
  requiredTutorialSections,
  searchTutorials,
  tutorialCatalog,
  tutorialCategories,
  tutorialPageSize,
  type TutorialCategory
} from "@/content/tutorials";

export const metadata: Metadata = {
  title: "AI Agent 实战知识库教程目录",
  description: "Codex、Claude Code、ChatGPT、MCP、Github、Vercel、Cursor、Windsurf、Agent 和实战案例的真实教程目录。"
};

type TutorialsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isTutorialCategory(value: string | undefined): value is TutorialCategory {
  return tutorialCategories.includes(value as TutorialCategory);
}

export default async function TutorialsPage({ searchParams }: TutorialsPageProps) {
  const params = (await searchParams) ?? {};
  const requestedCategory = getParam(params.category);
  const selectedCategory = isTutorialCategory(requestedCategory) ? requestedCategory : tutorialCategories[0];
  const query = getParam(params.q)?.trim() ?? "";
  const filteredArticles = searchTutorials(query, selectedCategory);
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / tutorialPageSize));
  const requestedPage = Number.parseInt(getParam(params.page) ?? "1", 10);
  const currentPage = Number.isFinite(requestedPage) ? Math.min(Math.max(requestedPage, 1), totalPages) : 1;
  const pageArticles = filteredArticles.slice((currentPage - 1) * tutorialPageSize, currentPage * tutorialPageSize);
  const activeIndex = tutorialCategories.indexOf(selectedCategory);
  const previousCategory = tutorialCategories[activeIndex - 1];
  const nextCategory = tutorialCategories[activeIndex + 1];

  return (
    <div className="docs-page">
      <aside className="docs-sidebar" aria-label="一级导航">
        <div className="docs-sidebar-title">AI Agent 实战知识库</div>
        <nav>
          {tutorialCategories.map((category) => {
            const count = tutorialCatalog.filter((article) => article.category === category).length;

            return (
              <Link
                key={category}
                href={`/tutorials?category=${encodeURIComponent(category)}&page=1`}
                className={category === selectedCategory ? "active" : undefined}
              >
                <span>{category}</span>
                <strong>{count}</strong>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="docs-main">
        <header className="page-header docs-page-header">
          <div className="eyebrow">
            <span>100篇目录</span>
            <span>真实教程计划</span>
            <span>审核后写正文</span>
          </div>
          <h1>AI Agent 实战知识库</h1>
          <p>
            当前阶段只展示 100 篇真实教程目录：每个一级导航 10 篇。目录通过审核后，再逐篇补充真实截图、命令、错误记录和完整正文。
          </p>
          <form className="docs-search" action="/tutorials">
            <input type="hidden" name="category" value={selectedCategory} />
            <input type="hidden" name="page" value="1" />
            <label htmlFor="tutorial-search">全站搜索</label>
            <div>
              <input id="tutorial-search" name="q" defaultValue={query} placeholder="搜索安装、API、MCP、部署、错误..." />
              <button type="submit">搜索</button>
            </div>
          </form>
        </header>

        <AdUnit placement="content-top" variant="leaderboard" label="教程页广告" />

        <section className="docs-category-summary">
          <div>
            <span>当前分类</span>
            <h2>{selectedCategory}</h2>
            <p>
              {query ? `搜索 “${query}” 后找到 ${filteredArticles.length} 篇目录。` : `本分类共有 ${filteredArticles.length} 篇目录。`}
              每页 {tutorialPageSize} 篇，当前第 {currentPage} / {totalPages} 页。
            </p>
          </div>
          <div className="docs-page-controls">
            {previousCategory ? <Link href={`/tutorials?category=${encodeURIComponent(previousCategory)}&page=1`}>上一篇分类</Link> : null}
            {nextCategory ? <Link href={`/tutorials?category=${encodeURIComponent(nextCategory)}&page=1`}>下一篇分类</Link> : null}
          </div>
        </section>

        <div className="tutorial-list">
          {pageArticles.map((article) => {
            const visual = getTutorialVisual(article);

            return (
              <article key={article.slug} className="knowledge-card docs-directory-card" id={article.slug}>
                <div className="docs-directory-grid">
                  <figure className="tutorial-visual">
                    <Image src={visual.src} alt={visual.alt} width={1280} height={720} loading="lazy" unoptimized />
                    <figcaption>{visual.caption}</figcaption>
                  </figure>
                  <div>
                    <div className="meta-row">
                      <span>{article.status}</span>
                      <span>{article.difficulty}</span>
                      <span>{article.category}</span>
                      <span>{article.updatedAt}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p className="docs-lead">{article.excerpt}</p>
                    <dl className="directory-facts">
                      <div>
                        <dt>适合人群</dt>
                        <dd>{article.audience}</dd>
                      </div>
                      <div>
                        <dt>真实操作主题</dt>
                        <dd>{article.realTask}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <section className="planned-sections" aria-label={`${article.title} 预计章节`}>
                  <h4>预计正文结构</h4>
                  <div>
                    {article.plannedSections.map((section) => (
                      <span key={section}>{section}</span>
                    ))}
                  </div>
                </section>

                <div className="source-list">
                  <strong>来源链接</strong>
                  {article.sources.map((source) => (
                    <a key={source.url} href={source.url} target="_blank" rel="noreferrer">
                      {source.label}
                    </a>
                  ))}
                  <a href={getTutorialUrl(article)}>复制目录链接</a>
                </div>

                {article.related.length > 0 ? (
                  <div className="related-row">
                    <strong>相关教程</strong>
                    {article.related.map((related) => (
                      <span key={related}>{related}</span>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        {pageArticles.length === 0 ? (
          <div className="empty-state">
            <h2>没有找到匹配目录</h2>
            <p>请换一个关键词，或切换到其他一级导航继续查找。</p>
          </div>
        ) : null}

        <nav className="pagination" aria-label={`${selectedCategory} 分页`}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => {
            const href = `/tutorials?category=${encodeURIComponent(selectedCategory)}&page=${page}${query ? `&q=${encodeURIComponent(query)}` : ""}`;

            return (
              <Link key={page} href={href} className={page === currentPage ? "active" : undefined}>
                {page}
              </Link>
            );
          })}
        </nav>
      </div>

      <aside className="docs-toc" aria-label="文档功能">
        <section>
          <h2>自动目录</h2>
          <ol>
            {requiredTutorialSections.map((section) => (
              <li key={section}>{section}</li>
            ))}
          </ol>
        </section>
        <section>
          <h2>站点能力</h2>
          <ul>
            <li>Markdown/MDX 正文预留</li>
            <li>代码高亮预留</li>
            <li>中文/英文/日文路径预留</li>
            <li>AdSense 与推广合作预留</li>
          </ul>
        </section>
      </aside>
    </div>
  );
}
