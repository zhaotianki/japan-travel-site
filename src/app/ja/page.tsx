import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "日本語プレビュー",
  description: "AI Agent 実践ナレッジベースの日本語プレビューページ。"
};

export default function JapanesePage() {
  return (
    <article className="language-page">
      <div className="eyebrow">
        <span>日本語</span>
        <span>Preview</span>
      </div>
      <h1>AI Agent 実践ナレッジベース</h1>
      <p>初版は中国語を主サイトとして公開します。日本語ドキュメントは、確認済みの実践チュートリアルから順番に追加します。</p>
      <Link href="/" className="contact-button">
        中国語サイトへ
      </Link>
    </article>
  );
}
