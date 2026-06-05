import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "English Preview",
  description: "English preview for the AI Agent practical knowledge base."
};

export default function EnglishPage() {
  return (
    <article className="language-page">
      <div className="eyebrow">
        <span>English</span>
        <span>Preview</span>
      </div>
      <h1>AI Agent Practical Knowledge Base</h1>
      <p>
        The first release is Chinese-first. English documentation routes are reserved for verified tutorials about Codex, Claude Code, ChatGPT, MCP, GitHub, Vercel, Cursor, Windsurf, and Agents.
      </p>
      <Link href="/" className="contact-button">
        Back to Chinese site
      </Link>
    </article>
  );
}
