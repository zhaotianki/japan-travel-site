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
      <Image src={visual.src} alt={visual.alt} width={1280} height={720} loading="lazy" unoptimized />
      <div className="article-body">
        <div className="meta-row">
          <span>{tutorial.category}</span>
          <span>{tutorial.difficulty}</span>
          <span>{tutorial.status}</span>
        </div>
        <h3>
          <Link href={getTutorialUrl(tutorial)}>{tutorial.title}</Link>
        </h3>
        <p>{tutorial.excerpt}</p>
        <dl className="card-facts">
          <div>
            <dt>适合人群</dt>
            <dd>{tutorial.audience}</dd>
          </div>
          {!compact ? (
            <div>
              <dt>真实操作主题</dt>
              <dd>{tutorial.realTask}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </article>
  );
}
