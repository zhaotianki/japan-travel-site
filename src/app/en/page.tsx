import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "English Preview",
  description: "English landing preview for the Codex global tutorial blog."
};

export default function EnglishPage() {
  return (
    <article className="language-page">
      <div className="eyebrow">
        <span>English</span>
        <span>Preview</span>
      </div>
      <h1>Codex Global Tutorial Blog</h1>
      <p>
        The first release is Chinese-first. English article pages are reserved for future localization of tutorials, case studies, and AI coding tool comparisons.
      </p>
      <Link href="/" className="contact-button">
        Back to Chinese site
      </Link>
    </article>
  );
}
