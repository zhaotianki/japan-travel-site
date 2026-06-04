import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "日本語プレビュー",
  description: "Codex グローバル教学ブログの日本語プレビューページ。"
};

export default function JapanesePage() {
  return (
    <article className="language-page">
      <div className="eyebrow">
        <span>日本語</span>
        <span>Preview</span>
      </div>
      <h1>Codex グローバル教学ブログ</h1>
      <p>初版は中国語を主サイトとして公開します。日本語の記事ページは今後、重点記事から順番に追加します。</p>
      <Link href="/" className="contact-button">
        中国語サイトへ
      </Link>
    </article>
  );
}
