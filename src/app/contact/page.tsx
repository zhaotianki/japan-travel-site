import type { Metadata } from "next";
import { BookOpenCheck, MessageCircle, Send, ShieldCheck, Wrench } from "lucide-react";
import { AdUnit } from "@/components/AdUnit";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "提交问题",
  description: "提交 AI 工具安装、MCP 配置、Agent 部署、API 申请、Github 或 Vercel 部署中的真实问题。"
};

export default function ContactPage() {
  const cooperationItems = [
    {
      icon: MessageCircle,
      title: "提交真实错误",
      text: "提交安装命令、报错截图位置、系统版本、工具版本和你已经尝试过的解决方法。"
    },
    {
      icon: Wrench,
      title: "补充操作步骤",
      text: "如果某篇目录已经完成真实操作，可以提交准备条件、详细步骤、验证命令和最终结果。"
    },
    {
      icon: BookOpenCheck,
      title: "官方来源修正",
      text: "如果官方安装命令、价格、API 页面或 MCP 配置方式变化，请提交新的官方来源链接。"
    },
    {
      icon: ShieldCheck,
      title: "内容纠错",
      text: "指出无法复现的步骤、过期命令、缺失截图位置或 FAQ 不完整的地方。"
    }
  ];

  return (
    <article className="legal-page">
      <div className="eyebrow">
        <span>问题反馈</span>
        <span>真实操作</span>
        <span>纠错</span>
      </div>
      <h1>提交问题</h1>
      <p>本站只接收真实安装、部署、MCP、Agent、API、Github、Vercel 操作过程中出现的问题和可复查解决方案。</p>
      <AdUnit placement="content-inline" variant="inline" label="提交页广告" />
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
      <section className="side-panel contact-form-panel">
        <h2>
          <Send size={18} aria-hidden="true" />
          发送到站长邮箱
        </h2>
        <p>提交后服务器会调用邮件服务发送。上线前需要在部署平台设置 `RESEND_API_KEY` 和 `CONTACT_TO_EMAIL`。</p>
        <ContactForm />
      </section>
    </article>
  );
}
