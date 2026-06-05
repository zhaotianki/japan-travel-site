import { NextResponse } from "next/server";
import { getTutorialDifficulty, tutorialCatalog } from "@/content/tutorials";

const palettes = [
  ["#ecfeff", "#0891b2", "#0f172a", "#a7f3d0"],
  ["#eef2ff", "#4f46e5", "#111827", "#c7d2fe"],
  ["#f0fdf4", "#16a34a", "#052e16", "#bbf7d0"],
  ["#fff7ed", "#f97316", "#431407", "#fed7aa"],
  ["#fef2f2", "#dc2626", "#450a0a", "#fecaca"],
  ["#f8fafc", "#64748b", "#0f172a", "#e2e8f0"]
];

const categoryKeywords: Record<string, string> = {
  Codex: "Codex",
  "Claude Code": "Claude",
  ChatGPT: "API",
  MCP: "MCP",
  Agent: "Agent",
  Github: "Git",
  Vercel: "Deploy",
  Cursor: "Cursor",
  Windsurf: "Windsurf",
  实战案例: "Case"
};

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function hash(value: string) {
  return [...value].reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 100000, 7);
}

function splitTitle(title: string) {
  if (title.length <= 18) {
    return [title, ""];
  }

  return [title.slice(0, 18), title.slice(18, 36)];
}

export async function GET(_request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  const article = tutorialCatalog.find((item) => item.slug === decodeURIComponent(slug));
  const title = article?.title ?? "AI教程";
  const category = article?.category ?? "AI";
  const level = article ? getTutorialDifficulty(article) : "新手入门";
  const keyword = categoryKeywords[category] ?? "AI";
  const seed = hash(`${category}-${title}-${level}-${slug}`);
  const palette = palettes[seed % palettes.length];
  const accentTwo = palettes[(seed + 2) % palettes.length][1];
  const [lineOne, lineTwo] = splitTitle(title);
  const stepOffset = seed % 4;
  const steps = ["准备", "安装", "配置", "验证", "排错", "上线"];
  const visibleSteps = Array.from({ length: 4 }, (_, index) => steps[(index + stepOffset) % steps.length]);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720" role="img" aria-labelledby="title desc">
  <title id="title">${escapeXml(title)}</title>
  <desc id="desc">${escapeXml(category)} ${escapeXml(level)} tutorial visual for ${escapeXml(title)}</desc>
  <rect width="1280" height="720" fill="#f8fafc"/>
  <rect x="58" y="52" width="1164" height="616" rx="28" fill="${palette[0]}" stroke="#dbe3ee" stroke-width="3"/>
  <circle cx="1094" cy="150" r="${46 + (seed % 28)}" fill="${palette[3]}" opacity="0.85"/>
  <circle cx="190" cy="590" r="${54 + (seed % 34)}" fill="#ffffff" opacity="0.78"/>
  <g font-family="Arial, 'PingFang SC', sans-serif">
    <rect x="92" y="88" width="184" height="48" rx="24" fill="${palette[1]}"/>
    <text x="118" y="120" fill="#ffffff" font-size="22" font-weight="700">${escapeXml(category)}</text>
    <rect x="298" y="88" width="142" height="48" rx="24" fill="#ffffff" stroke="${palette[1]}" stroke-width="3"/>
    <text x="326" y="120" fill="${palette[2]}" font-size="22" font-weight="700">${escapeXml(level)}</text>
    <text x="92" y="206" fill="${palette[2]}" font-size="50" font-weight="800">${escapeXml(lineOne)}</text>
    <text x="92" y="266" fill="${palette[2]}" font-size="42" font-weight="800">${escapeXml(lineTwo)}</text>
    <text x="94" y="318" fill="#475569" font-size="24">图文教程：准备环境、执行步骤、保存截图、检查错误和验证结果</text>
    <rect x="92" y="386" width="730" height="136" rx="18" fill="#111827"/>
    <text x="132" y="438" fill="#e5e7eb" font-size="24">$ ${escapeXml(keyword.toLowerCase())} --version</text>
    <text x="132" y="480" fill="#a7f3d0" font-size="22">完成最小验证，再进入下一步</text>
    ${visibleSteps
      .map((step, index) => {
        const x = 92 + index * 238;
        return `<rect x="${x}" y="568" width="196" height="58" rx="14" fill="#ffffff" stroke="${index % 2 ? accentTwo : palette[1]}" stroke-width="3"/>
    <text x="${x + 24}" y="605" fill="${palette[2]}" font-size="23" font-weight="700">${index + 1}. ${escapeXml(step)}</text>`;
      })
      .join("")}
    <rect x="884" y="384" width="254" height="138" rx="20" fill="#ffffff" stroke="${palette[1]}" stroke-width="4"/>
    <text x="928" y="438" fill="${palette[2]}" font-size="28" font-weight="800">${escapeXml(keyword)}</text>
    <text x="928" y="480" fill="#475569" font-size="21">当前文章专属图</text>
    <path d="M1012 548l24 25 54-70" fill="none" stroke="${palette[1]}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  });
}
