import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "AI实战安装教程与Agent知识库隐私政策与广告说明。"
};

export default function PrivacyPage() {
  return (
    <article className="legal-page">
      <h1>隐私政策</h1>
      <p>最后更新：2026-06-04</p>
      <h2>我们收集的信息</h2>
      <p>本站首版以内容阅读为主。服务器、托管平台、广告平台或分析工具可能记录访问日志、设备信息、页面访问数据和广告互动数据。</p>
      <h2>Google AdSense</h2>
      <p>
        当配置了 Google AdSense 后，Google 和其合作伙伴可能使用 cookie 或类似技术展示广告、限制频次、统计广告效果并防止欺诈。面向 EEA、英国和瑞士用户投放广告时，需要使用 Google 认证 CMP 或 AdSense consent message。
      </p>
      <h2>内容提交</h2>
      <p>如果用户提交安装错误、截图位置或解决方案，本站只使用这些信息改进教程内容，不应提交 API Key、密码、付款信息等敏感数据。</p>
      <h2>AI辅助整理</h2>
      <p>本站可以使用 AI 辅助整理文字，但发布为正文的教程必须基于真实操作流程、官方来源或可复查命令。</p>
      <h2>联系我们</h2>
      <p>如需删除内容、反馈来源错误或提交教程修正，请通过“提交问题”页面提供的链接联系。</p>
    </article>
  );
}
