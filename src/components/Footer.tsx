import Link from "next/link";
import { getSiteUrl, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{siteConfig.name}</strong>
        <p>AI工具安装、MCP配置、Agent部署、API申请、Github管理和Vercel部署的真实操作知识库。</p>
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
