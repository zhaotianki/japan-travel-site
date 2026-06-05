import { BookOpen, Crown, Mail, RadioTower } from "lucide-react";
import { getAffiliateLinks } from "@/lib/site";
import { AdUnit } from "./AdUnit";
import { ContactModal } from "./ContactModal";

export function Sidebar() {
  const affiliateLinks = getAffiliateLinks();

  return (
    <aside className="sidebar">
      <AdUnit placement="sidebar-top" label="侧栏广告" />
      <section className="side-panel">
        <h2>
          <Mail size={18} aria-hidden="true" />
          提交问题
        </h2>
        <p>只收集真实安装、部署、API、MCP 和 Agent 使用过程中的错误与解决方案。</p>
        <ContactModal className="wide-button" label="提交问题" />
      </section>
      <section className="side-panel">
        <h2>
          <Crown size={18} aria-hidden="true" />
          审核规则
        </h2>
        <ul className="plain-list">
          <li>不发布虚构案例</li>
          <li>目录不冒充正文</li>
          <li>每篇正文保留来源</li>
          <li>步骤必须能复现</li>
          <li>错误必须给解决方案</li>
        </ul>
      </section>
      <section className="side-panel">
        <h2>
          <BookOpen size={18} aria-hidden="true" />
          正文格式
        </h2>
        {affiliateLinks.length > 0 ? (
          <ul className="plain-list">
            {affiliateLinks.map((link) => (
              <li key={link.url}>
                <a href={link.url} rel="sponsored noreferrer" target="_blank">
                  {link.label}
                </a>
                {link.description ? <span>{link.description}</span> : null}
              </li>
            ))}
          </ul>
        ) : (
          <p>目录审核通过后，每篇教程必须包含简介、安装前准备、三步操作、常见错误、解决方案、FAQ 和相关教程。</p>
        )}
      </section>
      <section className="side-panel">
        <h2>
          <RadioTower size={18} aria-hidden="true" />
          更新节奏
        </h2>
        <p>10 个一级导航每类 10 篇目录；审核通过后逐篇补充可复现的真实图文正文。</p>
      </section>
    </aside>
  );
}
