import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务条款",
  description: "Codex 全球教学博客服务条款。"
};

export default function TermsPage() {
  return (
    <article className="legal-page">
      <h1>服务条款</h1>
      <p>最后更新：2026-06-04</p>
      <h2>内容用途</h2>
      <p>本站内容用于教育、研究和工具比较，不构成法律、投资、医疗或安全承诺。读者应根据自己的项目环境验证所有技术步骤。</p>
      <h2>来源与准确性</h2>
      <p>案例、价格、能力和产品可用性可能变化。本站会保留来源链接和更新时间，但不保证外部信息永久有效。</p>
      <h2>自动发布</h2>
      <p>本站可通过自动化脚本发布新内容。自动发布内容必须保留来源和 AI 辅助整理标识，发现问题后应及时修正。</p>
      <h2>广告与商业合作</h2>
      <p>
        广告、联盟链接、课程、会员和赞助内容可能带来收入。站内广告会尽量标注为“广告 / Sponsored”，联盟或赞助关系不应影响事实来源标注。
      </p>
    </article>
  );
}
