import { CheckCircle2, TriangleAlert } from "lucide-react";
import { aiCodingTools } from "@/content/aiTools";

export function ToolComparison() {
  return (
    <div className="tool-grid">
      {aiCodingTools.map((tool) => (
        <article key={tool.slug} className="tool-card" id={tool.slug}>
          <div className="tool-card-header">
            <div>
              <span>{tool.company}</span>
              <h3>{tool.name}</h3>
            </div>
            <a href={tool.sourceUrl} target="_blank" rel="noreferrer">
              官方资料
            </a>
          </div>
          <p className="tool-best">{tool.bestFor}</p>
          <div className="pros-cons">
            <section>
              <h4>
                <CheckCircle2 size={16} aria-hidden="true" />
                优点
              </h4>
              <ul>
                {tool.strengths.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
            <section>
              <h4>
                <TriangleAlert size={16} aria-hidden="true" />
                注意
              </h4>
              <ul>
                {tool.weaknesses.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
          <dl className="tool-details">
            <div>
              <dt>实用方式</dt>
              <dd>{tool.practicalUse}</dd>
            </div>
            <div>
              <dt>适合人群</dt>
              <dd>{tool.audience}</dd>
            </div>
            <div>
              <dt>价格备注</dt>
              <dd>{tool.pricingNote}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}
