import Image from "next/image";
import Link from "next/link";
import type { Tutorial } from "@/content/tutorials";

type ArticleCardProps = {
  tutorial: Tutorial;
  compact?: boolean;
};

export function ArticleCard({ tutorial, compact = false }: ArticleCardProps) {
  return (
    <article className={compact ? "article-card compact" : "article-card"}>
      <Link href={`/tutorials#${tutorial.slug}`} className="article-media" aria-label={tutorial.title}>
        <Image src={tutorial.image} alt="" width={560} height={320} priority={!compact} />
      </Link>
      <div className="article-body">
        <div className="meta-row">
          <span>{tutorial.category}</span>
          <span>{tutorial.level}</span>
          <span>{tutorial.readMinutes} 分钟</span>
        </div>
        <h3>
          <Link href={`/tutorials#${tutorial.slug}`}>{tutorial.title}</Link>
        </h3>
        <p>{tutorial.excerpt}</p>
      </div>
    </article>
  );
}
