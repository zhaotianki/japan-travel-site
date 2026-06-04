import Link from "next/link";
import Image from "next/image";
import { getTutorialUrl, getTutorialVisual, type Tutorial } from "@/content/tutorials";

type ArticleCardProps = {
  tutorial: Tutorial;
  compact?: boolean;
};

export function ArticleCard({ tutorial, compact = false }: ArticleCardProps) {
  const visual = getTutorialVisual(tutorial);

  return (
    <article className={compact ? "article-card compact" : "article-card"}>
      <Image src={visual.src} alt={visual.alt} width={1280} height={720} loading="lazy" />
      <div className="article-body">
        <div className="meta-row">
          <span>{tutorial.category}</span>
          <span>{tutorial.status}</span>
          <span>{tutorial.sourceType}</span>
        </div>
        <h3>
          <Link href={getTutorialUrl(tutorial)}>{tutorial.title}</Link>
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
