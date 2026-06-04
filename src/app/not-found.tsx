import Link from "next/link";

export default function NotFound() {
  return (
    <article className="legal-page">
      <h1>页面不存在</h1>
      <p>这个页面还没有发布，或者链接已经变化。</p>
      <Link href="/" className="contact-button">
        返回首页
      </Link>
    </article>
  );
}
