import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, ExternalLink, MapPin, Star, Users } from "lucide-react";
import { AddToItineraryButton } from "@/components/itinerary/add-to-itinerary-button";
import { PageShell } from "@/components/layout/site-shell";
import { MapPanel } from "@/components/map/map-panel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getExperienceBySlug } from "@/lib/data";
import { durationLabel, formatCurrency } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = await getExperienceBySlug(slug);
  if (!experience) notFound();

  return (
    <PageShell>
      <section className="bg-card">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8">
          <div className="grid gap-5">
            <div className="overflow-hidden rounded-md border border-border bg-muted">
              <img
                src={experience.coverImage}
                alt={experience.title}
                className="h-[440px] w-full object-cover"
              />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Link
                  href={`/destinations/${experience.destinationSlug}`}
                  className="hover:text-foreground hover:underline"
                >
                  {experience.destinationName}
                </Link>
                <span>·</span>
                <span>{experience.placeName ?? experience.meetingPoint}</span>
              </div>
              <h1 className="mt-2 text-4xl font-semibold leading-tight">
                {experience.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">
                {experience.summary}
              </p>
            </div>
          </div>

          <aside className="grid h-fit gap-4 lg:sticky lg:top-24">
            <Card className="grid gap-4 p-5">
              <div>
                <p className="text-sm text-muted-foreground">价格起点</p>
                <p className="mt-1 text-3xl font-semibold">
                  {formatCurrency(experience.priceFrom)}
                  <span className="text-sm font-normal text-muted-foreground">
                    /人
                  </span>
                </p>
              </div>
              <div className="grid gap-3 text-sm">
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                  {durationLabel(experience.durationHours)} ·{" "}
                  {experience.startTime} 开始
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                  {experience.meetingPoint}
                </p>
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" aria-hidden="true" />
                  {experience.audience.join("、")}
                </p>
                <p className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-accent text-accent" aria-hidden="true" />
                  {experience.rating.toFixed(1)} · {experience.reviewCount} 条评价线索
                </p>
              </div>
              <AddToItineraryButton
                experienceId={experience.id}
                title={experience.title}
              />
              <Button asChild variant="outline">
                <Link href={`/inquiry?experience=${experience.slug}`}>
                  直接询价
                </Link>
              </Button>
            </Card>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_390px] lg:px-8">
        <div className="grid gap-6">
          <Card className="grid gap-4 p-6">
            <h2 className="text-2xl font-semibold">体验说明</h2>
            <p className="leading-7 text-muted-foreground">
              {experience.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {experience.themes.map((theme) => (
                <Badge key={theme}>{theme}</Badge>
              ))}
              <Badge>{experience.difficulty}</Badge>
              <Badge>{experience.language}</Badge>
              {experience.includesMeal ? <Badge>含餐</Badge> : null}
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="grid gap-3 p-6">
              <h2 className="text-xl font-semibold">包含</h2>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {experience.includes.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </Card>
            <Card className="grid gap-3 p-6">
              <h2 className="text-xl font-semibold">不包含</h2>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                {experience.excludes.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="grid gap-3 p-6">
            <h2 className="text-xl font-semibold">限制与取消政策</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              {experience.restrictions}
            </p>
            <p className="text-sm leading-6 text-muted-foreground">
              {experience.cancellationPolicy}
            </p>
          </Card>
        </div>

        <aside className="grid h-fit gap-5 lg:sticky lg:top-24">
          <MapPanel
            title="集合地点"
            points={[
              {
                label: experience.meetingPoint,
                address: experience.placeName,
                lat: experience.lat,
                lng: experience.lng,
              },
            ]}
          />
          <Card className="grid gap-3 p-5">
            <p className="font-semibold">第三方评价来源</p>
            {experience.reviewLinks.map((link) => (
              <a
                key={link.provider}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-md border border-border p-3 text-sm hover:bg-muted"
              >
                <span>
                  {link.provider} · {link.rating.toFixed(1)}
                </span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            ))}
          </Card>
        </aside>
      </section>
    </PageShell>
  );
}
