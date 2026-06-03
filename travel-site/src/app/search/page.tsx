import { PageShell } from "@/components/layout/site-shell";
import { TravelAdSlot } from "@/components/ads/travel-ad-slot";
import { ExperienceCard } from "@/components/search/experience-card";
import { SearchFilters } from "@/components/search/search-filters";
import { SearchForm } from "@/components/search/search-form";
import { MapPanel } from "@/components/map/map-panel";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { searchExperiences } from "@/lib/data";
import { searchSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function filterKey(filters: unknown) {
  return JSON.stringify(filters);
}

export default async function SearchPage({ searchParams }: PageProps) {
  const raw = await searchParams;
  const parsed = searchSchema.parse({
    destination: first(raw.destination),
    date: first(raw.date),
    partySize: first(raw.partySize),
    budgetMin: first(raw.budgetMin),
    budgetMax: first(raw.budgetMax),
    theme: first(raw.theme),
    duration: first(raw.duration),
    language: first(raw.language),
    includesMeal: first(raw.includesMeal),
    rating: first(raw.rating),
    sort: first(raw.sort),
  });
  const results = await searchExperiences(parsed);
  const currentFilterKey = filterKey(parsed);

  return (
    <PageShell>
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold text-primary">搜索结果</p>
            <h1 className="mt-2 text-3xl font-semibold">查找体验与路线</h1>
          </div>
          <SearchForm
            key={`search-${currentFilterKey}`}
            compact
            defaults={{
              destination: parsed.destination,
              date: parsed.date,
              partySize: parsed.partySize?.toString(),
              theme: parsed.theme,
            }}
          />
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <aside className="h-fit lg:sticky lg:top-24">
          <Card className="p-5">
            <SearchFilters
              key={`filters-${currentFilterKey}`}
              filters={parsed}
            />
          </Card>
        </aside>
        <div className="grid gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">
                {results.length} 个可选体验
              </h2>
              <p className="text-sm text-muted-foreground">
                筛选状态会保留在 URL 查询参数中。
              </p>
            </div>
            <Badge>
              {parsed.destination || "日本全域"} · {parsed.theme || "全部主题"}
            </Badge>
          </div>
          {results.length ? (
            <>
              <MapPanel
                title="结果地点"
                points={results.slice(0, 5).map((item) => ({
                  label: item.title,
                  address: item.meetingPoint,
                  lat: item.lat,
                  lng: item.lng,
                }))}
              />
              <TravelAdSlot source="search" compact />
              <div className="grid gap-5">
                {results.map((experience) => (
                  <ExperienceCard
                    key={experience.id}
                    experience={experience}
                  />
                ))}
              </div>
            </>
          ) : (
            <Card className="grid gap-3 p-8 text-center">
              <h3 className="text-xl font-semibold">没有匹配结果</h3>
              <p className="text-muted-foreground">
                可以清除部分筛选，或改搜东京、京都、大阪、北海道、冲绳。
              </p>
            </Card>
          )}
        </div>
      </section>
    </PageShell>
  );
}
