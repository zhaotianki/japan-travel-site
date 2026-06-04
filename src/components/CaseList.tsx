import { ExternalLink } from "lucide-react";
import type { CaseStudy } from "@/lib/site";

type CaseListProps = {
  cases: CaseStudy[];
};

export function CaseList({ cases }: CaseListProps) {
  return (
    <div className="case-list">
      {cases.map((item) => (
        <article key={item.id} className="case-row">
          <div>
            <div className="meta-row">
              <span>{item.tool}</span>
              <span>{item.region}</span>
              <span>{item.publishedAt}</span>
            </div>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <strong>{item.impact}</strong>
            <div className="tag-row">
              {item.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
          <a href={item.sourceUrl} className="source-link" target="_blank" rel="noreferrer">
            来源
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </article>
      ))}
    </div>
  );
}
