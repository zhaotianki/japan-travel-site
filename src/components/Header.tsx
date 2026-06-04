import Link from "next/link";
import { MessageCircle, Search, Sparkles } from "lucide-react";
import { getContactUrl, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Codex 全球教学博客首页">
        <span className="brand-mark">
          <Sparkles size={18} aria-hidden="true" />
        </span>
        <span>{siteConfig.name}</span>
      </Link>
      <nav className="main-nav" aria-label="主导航">
        <Link href="/tutorials">教程</Link>
        <Link href="/resources">资源库</Link>
        <Link href="/cases">案例库</Link>
        <Link href="/ai-tools">AI工具</Link>
        <Link href="/contact">合作</Link>
      </nav>
      <div className="header-actions">
        <div className="language-switcher" aria-label="语言切换">
          {siteConfig.languages.map((language) => (
            <Link key={language.code} href={language.href}>
              {language.label}
            </Link>
          ))}
        </div>
        <Link href="/cases" className="icon-link" aria-label="搜索案例">
          <Search size={18} aria-hidden="true" />
        </Link>
        <Link href={getContactUrl()} className="contact-button">
          <MessageCircle size={18} aria-hidden="true" />
          联系群主
        </Link>
      </div>
    </header>
  );
}
