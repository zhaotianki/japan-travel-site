import Link from "next/link";
import type { Tutorial } from "@/content/tutorials";

type ArticleCardProps = {
  tutorial: Tutorial;
  compact?: boolean;
};

export function ArticleCard({ tutorial, compact = false }: ArticleCardProps) {
  return (
    <article className={compact ? "article-card compact" : "article-card"}>
      <div className="article-body">
        <div className="meta-row">
          <span>{tutorial.category}</span>
          <span>{tutorial.status}</span>
          <span>{tutorial.sourceType}</span>
        </div>
        <h3>
          <Link href={`/tutorials#${tutorial.slug}`}>{tutorial.title}</Link>
        </h3>
        <p>{tutorial.excerpt}</p>
        <ul className="plain-list">
          {tutorial.steps.slice(0, compact ? 3 : 5).map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
