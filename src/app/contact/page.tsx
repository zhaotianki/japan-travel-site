import type { Metadata } from "next";
import Link from "next/link";
import { BadgeDollarSign, BookOpenCheck, MessageCircle, Send, ShieldCheck } from "lucide-react";
import { AdUnit } from "@/components/AdUnit";
import { getContactUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "联系群主",
  description: "联系 Codex 全球教学博客群主，洽谈社群、课程、赞助、合作和内容更新。"
};

export default function ContactPage() {
  const contactUrl = getContactUrl();
  const isConfigured = contactUrl !== "/contact";
  const cooperationItems = [
    {
      icon: MessageCircle,
      title: "加入社群",
      text: "面向 Codex 初学者、AI 编程实践者和内容站长，发布教程、案例和自动化模板。"
    },
    {
      icon: BadgeDollarSign,
      title: "广告与赞助",
      text: "支持工具推荐、赞助文章、课程合作和会员社群，但必须标注商业关系。"
    },
    {
      icon: BookOpenCheck,
      title: "企业培训",
      text: "围绕 Codex CLI、App、AGENTS.md、自动化、GitHub review 和前端验证建立团队工作流。"
    },
    {
      icon: ShieldCheck,
      title: "内容纠错",
      text: "案例、价格、功能和来源可能变化，欢迎提交更准确的公开来源和修正建议。"
    }
  ];

  return (
    <article className="legal-page">
      <div className="eyebrow">
        <span>社群</span>
        <span>合作</span>
        <span>赞助</span>
      </div>
      <h1>联系群主</h1>
      <p>用于社群加入、课程合作、赞助文章、AI 工具联盟合作和企业 Codex 培训咨询。</p>
      <AdUnit placement="content-inline" variant="inline" label="联系页合作广告" />
      <div className="contact-grid">
        {cooperationItems.map((item) => {
          const Icon = item.icon;

          return (
            <section key={item.title} className="contact-card">
              <Icon size={20} aria-hidden="true" />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </section>
          );
        })}
      </div>
      {isConfigured ? (
        <Link href={contactUrl} className="contact-button">
          <MessageCircle size={18} aria-hidden="true" />
          打开联系入口
        </Link>
      ) : (
        <div className="side-panel">
          <h2>
            <Send size={18} aria-hidden="true" />
            联系链接未配置
          </h2>
          <p>设置 `NEXT_PUBLIC_CONTACT_URL` 后，页面顶部和侧栏的“联系群主”按钮会自动指向你的群链接或私信入口。</p>
        </div>
      )}
    </article>
  );
}
