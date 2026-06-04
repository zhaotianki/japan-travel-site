import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务条款",
  description: "AI实战安装教程与Agent知识库服务条款。"
};

export default function TermsPage() {
  return (
    <article className="legal-page">
      <h1>服务条款</h1>
      <p>最后更新：2026-06-04</p>
      <h2>内容用途</h2>
      <p>本站内容用于 AI 工具安装、插件安装、MCP 配置、Agent 部署、API 申请、Github 管理和 Vercel 部署学习，不构成法律、投资、医疗或安全承诺。读者应根据自己的项目环境验证所有技术步骤。</p>
      <h2>来源与准确性</h2>
      <p>安装命令、价格、API 页面、账号政策和产品可用性可能变化。本站会保留来源链接和更新时间，但不保证外部信息永久有效。</p>
      <h2>内容规则</h2>
      <p>本站不发布虚构案例，不把目录条目伪装成正文。已发布正文必须包含功能介绍、安装前准备、详细步骤、截图位置预留、常见错误、解决方案和 FAQ。</p>
      <h2>广告</h2>
      <p>本站可以加载 Google AdSense。广告内容不代表教程结论，教程正文仍以真实操作和官方来源为准。</p>
    </article>
  );
}
