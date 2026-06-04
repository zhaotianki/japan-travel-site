import Link from "next/link";
import { getSiteUrl, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteConfig.name}</strong>
        <p>Codex 与 AI 编程工具的教程、案例、对比和自动化更新。</p>
      </div>
      <nav aria-label="页脚导航">
        <Link href="/privacy">隐私政策</Link>
        <Link href="/terms">服务条款</Link>
        <Link href="/resources">资源库</Link>
        <Link href="/rss.xml">RSS</Link>
        <Link href="/sitemap.xml">Sitemap</Link>
        <a href={getSiteUrl()}>{new URL(getSiteUrl()).host}</a>
      </nav>
    </footer>
  );
}
