import Link from "next/link";
import { MessageCircle, Search, Sparkles } from "lucide-react";
import { getContactUrl, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="AI实战安装教程与Agent知识库首页">
        <span className="brand-mark">
          <Sparkles size={18} aria-hidden="true" />
        </span>
        <span>{siteConfig.name}</span>
      </Link>
      <nav className="main-nav" aria-label="主导航">
        <Link href="/tutorials">教程</Link>
        <Link href="/cases">实战案例</Link>
        <Link href="/resources">截图/文档</Link>
        <Link href="/contact">提交问题</Link>
      </nav>
      <div className="header-actions">
        <div className="language-switcher" aria-label="语言切换">
          {siteConfig.languages.map((language) => (
            <Link key={language.code} href={language.href}>
              {language.label}
            </Link>
          ))}
        </div>
        <Link href="/tutorials" className="icon-link" aria-label="搜索教程">
          <Search size={18} aria-hidden="true" />
        </Link>
        <Link href={getContactUrl()} className="contact-button">
          <MessageCircle size={18} aria-hidden="true" />
          提交问题
        </Link>
      </div>
    </header>
  );
}
