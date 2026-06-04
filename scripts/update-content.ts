import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

type CaseStudy = {
  id: string;
  title: string;
  organization: string;
  tool: string;
  region: string;
  summary: string;
  impact: string;
  publishedAt: string;
  sourceUrl: string;
  sourceLabel: string;
  tags: string[];
  generatedByAi: boolean;
};

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const casePath = join(root, "src", "content", "cases.json");

const sourcePages = [
  {
    url: "https://openai.com/business/customer-stories/",
    label: "OpenAI Customer Stories",
    tool: "Codex"
  }
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function inferOrganization(title: string) {
  const cleaned = title
    .replace(/^How\s+/i, "")
    .replace(/\s+uses\s+.+$/i, "")
    .replace(/\s+used\s+.+$/i, "")
    .replace(/\s+and\s+OpenAI.+$/i, "");
  return cleaned.split(" ")[0] || "Unknown";
}

function extractOpenAiCustomerStories(html: string): CaseStudy[] {
  const matches = [...html.matchAll(/>([^<]*(?:Codex|Copilot|Cursor|Claude Code|Windsurf)[^<]*)\s+(May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Jan|Feb|Mar|Apr)\s+(\d{1,2}),\s+(20\d{2})</gi)];
  return matches.map((match) => {
    const title = match[1].replace(/\s+/g, " ").trim();
    const publishedAt = new Date(`${match[2]} ${match[3]}, ${match[4]} UTC`).toISOString().slice(0, 10);
    const organization = inferOrganization(title);
    return {
      id: `auto-${slugify(title)}`,
      title,
      organization,
      tool: title.toLowerCase().includes("codex") ? "Codex" : "AI 编程工具",
      region: "全球",
      summary: `${title}。本条由公开来源自动整理，发布前保留来源链接和更新时间。`,
      impact: "公开案例显示 AI 编程工具正在进入真实软件交付流程。",
      publishedAt,
      sourceUrl: "https://openai.com/business/customer-stories/",
      sourceLabel: "OpenAI Customer Stories",
      tags: ["AI编程", title.toLowerCase().includes("codex") ? "Codex" : "案例"],
      generatedByAi: true
    };
  });
}

async function fetchCasesFromSources() {
  const generated: CaseStudy[] = [];

  for (const source of sourcePages) {
    try {
      const response = await fetch(source.url, {
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "User-Agent": "Mozilla/5.0 compatible; codex-global-blog-content-updater/1.0"
        }
      });

      if (!response.ok) {
        console.warn(`Skipped ${source.url}: ${response.status}`);
        continue;
      }

      const html = await response.text();
      if (source.label === "OpenAI Customer Stories") {
        generated.push(...extractOpenAiCustomerStories(html));
      }
    } catch (error) {
      console.warn(`Skipped ${source.url}:`, error);
    }
  }

  return generated;
}

async function main() {
  const existing = JSON.parse(await readFile(casePath, "utf8")) as CaseStudy[];
  const generated = await fetchCasesFromSources();
  const byId = new Map<string, CaseStudy>();

  for (const item of existing) {
    byId.set(item.id, item);
  }

  for (const item of generated) {
    if (!byId.has(item.id)) {
      byId.set(item.id, item);
    }
  }

  const merged = [...byId.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  await writeFile(casePath, `${JSON.stringify(merged, null, 2)}\n`);

  console.log(`Updated cases: ${existing.length} -> ${merged.length}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
