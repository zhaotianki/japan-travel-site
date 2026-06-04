import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策",
  description: "Codex 全球教学博客隐私政策与广告、分析、联盟链接说明。"
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
      <h2>站内赞助广告</h2>
      <p>没有配置 AdSense 或广告位未审核通过时，本站会显示站内赞助广告、课程推广、社群推广或合作入口。广告内容会用“广告 / Sponsored”标识。</p>
      <h2>联盟链接与赞助内容</h2>
      <p>本站可能包含联盟链接、课程链接、赞助文章和会员入口。相关内容会尽量明确标注，赞助链接使用 sponsored 关系属性。</p>
      <h2>自动生成内容</h2>
      <p>部分文章由 AI 辅助整理。此类内容会显示来源、更新时间和 AI 辅助整理标识。</p>
      <h2>联系我们</h2>
      <p>如需删除内容、反馈来源错误或洽谈合作，请通过“联系群主”页面提供的链接联系。</p>
    </article>
  );
}
