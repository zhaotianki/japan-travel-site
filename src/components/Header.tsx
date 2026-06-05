import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ContactModal } from "./ContactModal";

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="AI Agent 实战知识库首页">
        <span className="brand-mark">
          <Sparkles size={18} aria-hidden="true" />
        </span>
        <span>{siteConfig.name}</span>
      </Link>
      <nav className="main-nav" aria-label="主导航">
        <Link href="/tutorials">知识库</Link>
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
        <ContactModal />
      </div>
    </header>
  );
}
