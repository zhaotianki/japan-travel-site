import { learningResources } from "@/content/resources";
import { getTutorialUrl, tutorialCatalog } from "@/content/tutorials";
import { getSiteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const siteUrl = getSiteUrl();
  const tutorialItems = tutorialCatalog.map((tutorial) => ({
    title: tutorial.title,
    url: `${siteUrl}${getTutorialUrl(tutorial)}`,
    description: tutorial.excerpt,
    date: tutorial.updatedAt
  }));
  const resourceItems = learningResources.map((resource) => ({
    title: resource.title,
    url: `${siteUrl}/resources#${resource.slug}`,
    description: resource.summary,
    date: "2026-06-04"
  }));

  const items = [...tutorialItems, ...resourceItems]
    .map(
      (item) => `<item>
  <title>${escapeXml(item.title)}</title>
  <link>${escapeXml(item.url)}</link>
  <guid>${escapeXml(item.url)}</guid>
  <description>${escapeXml(item.description)}</description>
  <pubDate>${new Date(item.date).toUTCString()}</pubDate>
</item>`
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>${escapeXml(siteConfig.name)}</title>
  <link>${escapeXml(siteUrl)}</link>
  <description>${escapeXml(siteConfig.description)}</description>
  <language>zh-CN</language>
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
