import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/site-shell";
import { ExperienceCard } from "@/components/search/experience-card";
import { MapPanel } from "@/components/map/map-panel";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getDestinationBySlug } from "@/lib/data";
import { formatCurrency } from "@/lib/format";
import { splitList } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = await getDestinationBySlug(slug);
  if (!destination) notFound();

  return (
    <PageShell>
      <section className="relative min-h-[460px] overflow-hidden bg-foreground text-white">
        <img
          src={destination.coverImage}
          alt={destination.name}
          className="absolute inset-0 h-full w-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative mx-auto flex min-h-[460px] w-full max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8">
          <Badge className="w-fit border-white/30 bg-white/14 text-white backdrop-blur">
            {destination.region}
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold sm:text-6xl">
            {destination.name}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/88">
            {destination.summary}
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="grid gap-8">
          <Card className="grid gap-4 p-6">
            <h2 className="text-2xl font-semibold">目的地概览</h2>
            <p className="leading-7 text-muted-foreground">
              {destination.description}
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm text-muted-foreground">最佳季节</p>
                <p className="mt-1 font-medium">{destination.season}</p>
              </div>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm text-muted-foreground">预算区间</p>
                <p className="mt-1 font-medium">
                  {formatCurrency(destination.budgetMin)} -{" "}
                  {formatCurrency(destination.budgetMax)} / 天
                </p>
              </div>
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm text-muted-foreground">体验数量</p>
                <p className="mt-1 font-medium">
                  {destination.experiences.length} 个
                </p>
              </div>
            </div>
          </Card>

          <section className="grid gap-4">
            <h2 className="text-2xl font-semibold">推荐体验</h2>
            {destination.experiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </section>
        </div>

        <aside className="grid h-fit gap-5 lg:sticky lg:top-24">
          <MapPanel
            title={`${destination.name}地点`}
            points={destination.places.map((place) => ({
              label: place.name,
              address: place.address,
              lat: place.lat ?? undefined,
              lng: place.lng ?? undefined,
            }))}
          />
          <Card className="grid gap-3 p-5">
            <p className="font-semibold">路线模板</p>
            {destination.routeTemplates.map((route) => (
              <div key={route.id} className="border-t border-border pt-3 first:border-t-0 first:pt-0">
                <p className="font-medium">{route.title}</p>
                <p className="text-sm text-muted-foreground">{route.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {splitList(route.themes).map((theme) => (
                    <Badge key={theme}>{theme}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </aside>
      </section>
    </PageShell>
  );
}
