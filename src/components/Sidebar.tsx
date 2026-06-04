import Link from "next/link";
import { BookOpen, Crown, Mail, RadioTower } from "lucide-react";
import { getAffiliateLinks, getContactUrl } from "@/lib/site";
import { AdUnit } from "./AdUnit";

export function Sidebar() {
  const affiliateLinks = getAffiliateLinks();

  return (
    <aside className="sidebar">
      <AdUnit placement="sidebar-top" label="侧栏广告" />
      <section className="side-panel">
        <h2>
          <Mail size={18} aria-hidden="true" />
          订阅与联系
        </h2>
        <p>加入交流群，获取 Codex 教程、自动化模板和案例更新。</p>
        <Link href={getContactUrl()} className="wide-button">
          联系群主
        </Link>
      </section>
      <section className="side-panel">
        <h2>
          <Crown size={18} aria-hidden="true" />
          获利方式
        </h2>
        <ul className="plain-list">
          <li>Google AdSense 展示广告</li>
          <li>AI工具联盟推荐</li>
          <li>付费课程与电子书</li>
          <li>会员社群与直播答疑</li>
          <li>企业赞助深度文章</li>
        </ul>
      </section>
      <section className="side-panel">
        <h2>
          <BookOpen size={18} aria-hidden="true" />
          推荐资源
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
          <p>配置 NEXT_PUBLIC_AFFILIATE_LINKS 后显示联盟、课程和会员入口。</p>
        )}
      </section>
      <section className="side-panel">
        <h2>
          <RadioTower size={18} aria-hidden="true" />
          更新节奏
        </h2>
        <p>每周一、三、五自动抓取公开来源，去重后发布带来源的 AI 辅助整理内容。</p>
      </section>
    </aside>
  );
}
